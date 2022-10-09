import React, { useState, useEffect, useContext } from 'react';
import './NewAppointment.scss';
import useIsMobile from '../useIsMobile';
import Button from './Button';
import Lottie from 'lottie-react';
import check from '../check.json';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useSpring, a, config } from 'react-spring';
import { DataContext } from '../DataContext';

export default function NewAppointment() {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [appointment, setAppointment] = useState(null);

  const { data, setData } = useContext(DataContext);
  const mobile = useIsMobile();

  const anim = useSpring({
    opacity: isAdded ? 0.5 : 1,
    config: config.stiff,
  });

  const dateIsValid = (date) =>
    !Number.isNaN(new Date(date).getTime());

  const handleClick = () => {
    if (name && dateIsValid(date) && !isAdded) {
      setAppointment({ name: name, date: date });
      return;
    }
    setError(true);
  };

  useEffect(() => {
    if (appointment) {
      const newData = data.concat([appointment])
      localStorage.setItem('appointments', JSON.stringify(newData));
      setData(newData)
    }
  }, [appointment]);

  const handleReset = () => {
    if (!isAdded) {
      setName('');
      setDate(new Date());
    }
  };

  useEffect(() => {
    if (name) {
      setError(false);
    }
  }, [name]);

  useEffect(() => {
    if (appointment) {
      // console.log(appointment);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
        handleReset();
      }, 2000);
    }
  }, [appointment]);

  return (
    <div className="new-appointment-container">
      {isAdded && (
        <Lottie className="check-animation" animationData={check} />
      )}
      <a.div className="new-appointment" style={anim}>
        <OutlinedInput
          className="inputName"
          id="client-name"
          placeholder="Client's Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          error={error}
          autoComplete="off"
          endAdornment={
            <InputAdornment position="end">
              <AccountCircle />
            </InputAdornment>
          }
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {!mobile ? (
            <CalendarPicker
              className="inputDate"
              date={date}
              onChange={(newDate) => setDate(newDate)}
              disablePast
            />
          ) : (
            <MobileDatePicker
              className="inputDate"
              disablePast
              inputFormat="dd MMM yyyy"
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {!mobile ? (
            <DesktopTimePicker
              className="inputTime"
              value={date}
              disableMaskedInput
              onChange={(newValue) => {
                dateIsValid(newValue) && setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          ) : (
            <MobileTimePicker
              className="inputTime"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        </LocalizationProvider>
        <div className="confirmation">
          <Button
            text="Confirm"
            variant="second"
            onClick={handleClick}
          />
          <Button
            text="reset"
            variant="danger"
            onClick={handleReset}
          />
        </div>
      </a.div>
    </div>
  );
}
