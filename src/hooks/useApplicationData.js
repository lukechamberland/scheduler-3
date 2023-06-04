import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
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
  
  const setDay = day => setState({ ...state, day });

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  }
}