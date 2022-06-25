import React from 'react';
import MyLogDetail from './MyLogDetail';
import './MyReservation.scss';
export default function MyReservation({ roomList }) {
  return (
    <div className="MyLogWrapper">
      <MyLogDetail roomList={roomList} />
    </div>
  );
}
