import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './ReservationBox.module.scss';
import PriceBreakDown from './PriceBreakDown';

const reservationPage = '../reservation';

const ReservationBox = props => {
  const { room, reservation } = props;
  const navigate = useNavigate();
  const isBtnActive = () => {
    return true;
  };
  const handleReservationBtn = () => {
    if (isBtnActive) {
      navigate(reservationPage);
    }
  };
  return (
    <div>
      <div className={css.container}>
        <div className={css.containerInner}>
          <div className={css.BtnBox}>
            <button
              className={css.rclConfirmAndPayBtn}
              id="confirm-pay-btn"
              onClick={event => {
                handleReservationBtn();
              }}
            >
              Confirm and pay • Airbnb
            </button>
          </div>
          <div className={css.priceBreakDown}>
            <PriceBreakDown room={room} reservation={reservation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationBox;
