import React, { useState, useEffect, useContext } from 'react';
import Container from './Components/Container';
import './AppointmentManager.scss';
import { DataContext } from './DataContext';

function AppointmentManager() {
  const {data, setData} = useContext(DataContext);

  const [todayAppointments, setTodayAppointments] = useState(null);
  const [thisMonthAppointments, setThisMonthAppointments] =
    useState(null);

  const getTodayAppointments = () => {
    const today = new Date();
    const todayAppointments = data.filter(
      (e) =>
        new Date(e.date).getDate() === today.getDate() &&
        new Date(e.date).getMonth() === today.getMonth() &&
        new Date(e.date).getFullYear() === today.getFullYear()
    );
    return todayAppointments;
  };

  const getThisMonthAppointments = () => {
    const today = new Date();
    const thisMonthAppointments = data.filter(
      (e) =>
        new Date(e.date).getMonth() === today.getMonth() &&
        new Date(e.date).getDate() > today.getDate()
    );
    return thisMonthAppointments;
  };

  useEffect(() => {
    getTodayAppointments().length > 0 &&
      setTodayAppointments(getTodayAppointments());
    getThisMonthAppointments().length > 0 &&
      setThisMonthAppointments(getThisMonthAppointments());
  }, [data]);

  return (
    <div className="appointment-manager">
      <Container
        name="add-appointment"
        title="Add Appointment"
        variant="newAppointment"
      />
      <section className="appointments">
        <Container
          name="today-appointment"
          title="Today's Appointments"
          appointments={todayAppointments}
          variant="today"
        />
        <Container
          name="this-month-appointments"
          title="This Month's Appointments"
          appointments={thisMonthAppointments}
          variant="month"
        />
      </section>
    </div>
  );
}

export default AppointmentManager;
