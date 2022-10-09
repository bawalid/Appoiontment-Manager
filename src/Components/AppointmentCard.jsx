import React, { useState } from 'react';
import './AppointmentCard.scss';
import { ArrowDropUp } from '@mui/icons-material';
import { useTransition, config, animated } from 'react-spring';

export default function AppointmentCard({ object, type }) {
  const date = Array.isArray(object)
    ? new Date(object[0].date)
    : new Date(object.date);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [open, setOpen] = useState(false);
  const btnTransitions = useTransition(open, {
    from: {
      opacity: 0,
      position: 'absolute',
      right: 0,
      top: open ? "25px" : "20px",
      rotateZ: open ? -180 : 0,
    },
    enter: { opacity: 1, rotateZ: open ? 0 : -180},
    leave: { opacity: 0, rotateZ: open ? -180 : 0 },
    config: config.wobbly,
    delay: 50,
  });

  const dateDetails = (date) => {
    return {
      day: date.getDate(),
      month: monthNames[date.getMonth()],
      hours: date.getHours().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
      minutes: date.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
    };
  };

  return type === 'single' ? (
    <div className="appointment-card single">
      <div className="card-date">
        <h2 className="date-day">{dateDetails(date).day}</h2>
        <p className="date-month">{dateDetails(date).month}</p>
      </div>
      <div className="card-infos">
        <h3 className="infos-name">{object.name}</h3>
        <p className="infos-time">
          {dateDetails(date).hours}:{dateDetails(date).minutes}
        </p>
      </div>
    </div>
  ) : (
    <div className="appointment-card multiple">
      <div className="multiple-head">
        <div className="card-date">
          <h2 className="date-day">{dateDetails(date).day}</h2>
          <p className="date-month">{dateDetails(date).month}</p>
        </div>
        <div className="card-infos">
          <h3 className="infos-appointments">
            {object.length + ' Appointments'}
          </h3>
        </div>
        {btnTransitions((styles, item) =>
          !item ? (
            <animated.div style={styles}>
              <ArrowDropUp
                className="container-expand-btn"
                onClick={() => setOpen(!open)}
              />
            </animated.div>
          ) : (
            <animated.div style={styles}>
              <ArrowDropUp
                className="container-expand-btn"
                onClick={() => setOpen(!open)}
              />
            </animated.div>
          )
        )}
      </div>

      <div className="multiple-details">
        {open &&
          object.map((appointment, index) => (
            <div className="group-infos" key={index}>
              <h3 className="infos-name">{appointment.name}</h3>
              <p className="infos-time">
                {dateDetails(new Date(appointment.date)).hours}:
                {dateDetails(new Date(appointment.date)).minutes}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
