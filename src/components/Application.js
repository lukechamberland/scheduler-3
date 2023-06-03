import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState((prev) => {
          const appointments = { ...prev.appointments };
          appointments[id] = {
            ...appointments[id],
            interview: { ...interview }
          };
          return { ...prev, appointments };
        });
      });
  }

  function cancelInterview(id) {
    
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      setState({
        ...state,
        appointments
      });
    })
  }

  const daysInterviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={daysInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  useEffect(() => {
    Promise.all([axios.get('/api/days'), axios.get('/api/appointments'), axios.get('/api/interviewers')])
      .then(([daysResponse, appointmentsResponse, interviewerResponse]) => {
        setState(prevState => ({
          ...prevState,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewerResponse.data
        }));
      })
      .catch(error => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, []);

  const appointmentLists = dailyAppointments.map((appt) => {
    return <Appointment key={appt.id} {...appt} interviewers={state.interviewers} />
  });

  const setDay = day => setState({ ...state, day });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
