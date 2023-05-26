import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state.days, state.day, state.appointments);
  
  useEffect(() => {
    Promise.all([axios.get('/api/days'), axios.get('/api/appointments', axios.get('/api/interviewers'))])
      .then(([daysResponse, appointmentsResponse, interviewerResponse]) => {
        setState(prevState => ({
          ...prevState,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewerResponse
        }));
      })
      .catch(error => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, []);

  const appointmentLists = dailyAppointments.map((appt) => {
    return <Appointment key={appt.id} {...appt} />
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
        {appointmentLists}
      </section>
    </main>
  );
}
