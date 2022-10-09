import React, { useState } from 'react';
import NewAppointment from './NewAppointment';
import AppointmentsGrid from './AppointmentsGrid';
import { Close } from '@mui/icons-material';
import { useTransition, config, animated } from 'react-spring';
import './Container.scss';

export default function Container({
  name,
  title,
  variant,
  appointments
}) {
  const [open, setOpen] = useState(true);
  const btnTransitions = useTransition(open, {
    from: {
      opacity: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      rotateZ: open ? -45 : 0,
    },
    enter: { opacity: 1, rotateZ: open ? 0 : -45},
    leave: { opacity: 0, rotateZ: open ? -45 : 0 },
    config: config.wobbly,
    delay: 50,
  });

  const contentTransitions = useTransition(open, {
    from: { opacity: 0, display: 'none' },
    enter: { opacity: 1, display: 'block' },
    leave: { opacity: 0, display: 'none' },
    config: config.molasses,
  });

  return (
    <div className={'container ' + name}>
      <div className={open ? 'head open' : 'head'}>
        <h1>{title}</h1>
        {btnTransitions((styles, item) =>
          !item ? (
            <animated.div style={styles}>
              <Close
                className="container-expand-btn"
                onClick={() => setOpen(!open)}
              />
            </animated.div>
          ) : (
            <animated.div style={styles}>
              <Close
                className="container-expand-btn"
                onClick={() => setOpen(!open)}
              />
            </animated.div>
          )
        )}
      </div>
      {contentTransitions((styles, item) =>
        item ? (
          variant === 'newAppointment' ? (
            <animated.div style={styles}>
              <NewAppointment/>
            </animated.div>
          ) : (
            <animated.div style={styles}>
              <AppointmentsGrid
                appointments={appointments}
                variant={variant}
              />
            </animated.div>
          )
        ) : null
      )}
    </div>
  );
}
