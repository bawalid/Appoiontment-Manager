import React from 'react';
import './AppointmentsGrid.scss';
import AppointmentCard from './AppointmentCard';

export default function AppointmentsGrid({ appointments, variant }) {
  const uniqueDates = () => {
    let list = [
      {
        date: new Date(appointments[0].date).getDate(),
        month: new Date (appointments[0].date).getMonth(),
      },
    ];
    for (let i = 1; i < appointments.length; i++) {
      const date = {
        date: new Date(appointments[i].date).getDate(),
        month: new Date(appointments[i].date).getMonth(),
      };
      let found = false
      for (let j=0; j<list.length;j++){
        if (date.date === list[j].date && date.month === list[j].month){
          found = true;
        }
      }

      !found && list.push(date);
    }
    return list
  };

  const isNotDuplicate = () => {
    return uniqueDates().length === appointments.length;
  };

  const duplication = (date) => {
    let counter = 0;
    let group = [];
    appointments.forEach((appointment) => {
      if (
        date.month === new Date(appointment.date).getMonth() &&
        date.date === new Date(appointment.date).getDate()
      ) {
        counter++;
        group.push(appointment);
      }
    });
    if (counter === 1) {
      return group[0];
    } else {
      return group;
    }
  };

  const getArray = () => {
    const list = uniqueDates();
    let newArray = [];
    list.forEach((appointment) => {
      newArray.push(duplication(appointment));
    });
    return newArray;
  };
  return (
    <div className="appointments-grid">
      {appointments !== null ? (
        variant !== 'today' && !isNotDuplicate() ? (
          getArray().map((appointment, index) =>
          Array.isArray(appointment) ? (
            <AppointmentCard
            key={index}
            object={appointment}
            type="multiple"
          />
            ) : (
              <AppointmentCard
              key={index}
              object={appointment}
              type="single"
            />
            )
          )
        ) : (
          appointments.map((appointment, index) => (
            <AppointmentCard
              key={index}
              object={appointment}
              type="single"
            />
          ))
        )
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}
