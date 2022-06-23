import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import css from './Detail.module.scss';
import ReservationBox from '../Reservation/ReservationBox';

//JK Mock Test//
const room = {
  id: 1,
  name: 'Winter Wonderland, 3BR, Fireplace, Cozy',
  type: 'Entire Villa',
  price: 603000,
  rate: 4.9,
  rateCnt: 11,
  hostType: 'superhost',
  repImg: '/images/room_rep/cabin.png',
};

const reservation = {
  id: 1,
  guests: 4,
  checkin: '2022-06-10 23:55:45.000000',
  checkout: '2022-06-14 23:55:45.000000',
};

////////////////
function Detail() {
  const data = useLocation();
  return (
    <div className={css.container}>
      <ReservationBox room={room} reservation={reservation} />
    </div>
  );
}

export default Detail;
