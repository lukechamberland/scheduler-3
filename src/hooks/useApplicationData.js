import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  console.log(state.days);

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

  function updateSpots(state, id) {
    const singleDay = getDay(state.day);
    const appointment = state.appointments[id];
    const isSpotReserved = appointment.interview;

    const updatedDays = state.days.map((day, index) => {
      if (index !== singleDay) {
        return day;
      }

      const updatedSpots = isSpotReserved ? day.spots - 1 : day.spots + 1;

      return {
        ...day,
        spots: updatedSpots
      };
    });

    return {
      ...state,
      days: updatedDays
    };
  }

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

    setState((prev) => {
      const updatedState = {
        ...prev,
        appointments
      };
      return updateSpots(updatedState, id);
    });

    return axios
      .put(`/api/appointments/${id}`, { interview })
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

    setState((prev) => {
      const updatedState = {
        ...prev,
        appointments
      };
      return updateSpots(updatedState, id);
    });

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState((prev) => {
        const appointments = { ...prev.appointments };
        appointments[id] = {
          ...appointments[id],
          interview: null
        };
        return { ...prev, appointments };
      });
    });
  }

  useEffect(() => {
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
        // Handle errors
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
