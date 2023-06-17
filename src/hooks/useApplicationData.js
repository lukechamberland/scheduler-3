import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  
  // Setting state

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Getting correct index for day

  function getDay(day) {
    const weekdays = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    };
    return weekdays[day];
  }

  function updateSpots(appointments) {

    // Updating spots based on number of appointments booked

    const singleDay = getDay(state.day);

    const dayObj = state.days[singleDay];
    let spotsRemaining = 0;

    dayObj.appointments.forEach(item => {
      if (!appointments[item].interview) {
        spotsRemaining++
      }
    });
      dayObj.spots = spotsRemaining;
      const days = state.days;

      days.splice(singleDay, 1, dayObj);

      return days;
  }

  

  function bookInterview(id, interview) {

  // Booking an Interview

    console.log(id, interview);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {

        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
    
        const updatedAppointments = {
          ...state.appointments,
          [id]: appointment
        };

        setState((prev) => {
          

          const { appointments, ...rest } = prev;
          const days = updateSpots(updatedAppointments)
          return { ...rest, days, appointments: updatedAppointments };
        });
      });
  }

  function cancelInterview(id) {

    // Cancelling an interview

    return axios.delete(`/api/appointments/${id}`).then((response) => {

      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const updatedAppointments = {
        ...state.appointments,
        [id]: appointment
      };

      setState((prev) => {
        

        const { appointments, ...rest } = prev;
        const days = updateSpots(updatedAppointments);

        return { ...rest, days, appointments: updatedAppointments };
    })
      
    });
  }

  useEffect(() => {

    // Fetching the data

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(([daysResponse, appointmentsResponse, interviewerResponse]) => {
        
        setState((prevState) => ({
          ...prevState,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewerResponse.data
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
