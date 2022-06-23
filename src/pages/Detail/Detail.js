import React from 'react';
import { useLocation } from 'react-router-dom';
import css from './Detail.module.scss';
import ReservationBox from '../Reservation/ReservationBox';

function Detail() {
  const data = useLocation();
  return (
    <div className={css.container}>
      <ReservationBox />
    </div>
  );
}

export default Detail;
