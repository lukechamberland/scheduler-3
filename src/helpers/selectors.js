export function getAppointmentsForDay(state, name) {
  const filteredDay = state.days.find(day => day.name === name);
  
  if (!filteredDay) {
    return [];
  }
  
  const appointmentsForDay = filteredDay.appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if(!interview) return null;
  const newInterview = {};
  newInterview.student = interview.student;
  newInterview.interviewer = state.interviewers[interview.interviewer];
  return newInterview;
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find((d) => d.name === day);
  if (!selectedDay) {
    return [];
  }
  return selectedDay.interviewers.map((id) => state.interviewers[id]);
}