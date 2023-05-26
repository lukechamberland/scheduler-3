export function getAppointmentsForDay(days, name, appointments) {
  const filteredDay = days.find(day => day.name === name);
  
  if (!filteredDay) {
    console.log('test:', filteredDay)
    return [];
  }
  
  const appointmentsForDay = filteredDay.appointments.map(appointmentId => appointments[appointmentId]);
  console.log('test:', appointmentsForDay)
  return appointmentsForDay;
}