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
  score: 4.9,
  reviewCnt: 11,
  hostType: 'superhost',
  repImg: '/images/room_rep/cabin.png',
};

const reservation = {
  id: 1,
  guests: 4,
  checkin: '2022-06-10',
  checkout: '2022-06-14',
};

//<div className={css.container}>
//      <ReservationBox room={room} reservation={reservation} />
//</div>

////////////////
function Detail() {
  const data = useLocation();
  console.log(data);
  return <div className={css.container}>{data.state.name}</div>;
}

export default Detail;
