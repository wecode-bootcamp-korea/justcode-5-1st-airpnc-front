import React, { useEffect, useState, useMemo, useInsertionEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './ReservationBox.module.scss';
import PriceBreakDown from './PriceBreakDown';
import { TiStarFullOutline } from 'react-icons/ti';

// MockData for test //
const airbnbConst = {
  chargeAtText: `You won't be charged yet`,
};
//////////////////////

const reservationPage = '/reservation';
const ReservationBox = props => {
  const { room, reservation, reviewScore, reviewCnt } = props;
  const [checkin, setCheckIn] = useState(reservation.checkin);
  const [checkout, setCheckOut] = useState(reservation.checkout);
  const [nights, setNights] = useState(0);
  const [guests, setGuests] = useState(reservation.guests);
  console.log(reservation.user_id, 111111);
  // const reservationDTO = {
  //   checkin,
  //   checkout,
  //   guests,
  //   user_id: idObject.user_id,
  //   room_id: room.id
  // };

  const getTotalNights = (date1, date2) => {
    let checkin = new Date(date1);
    let checkout = new Date(date2);
    let diff = Math.abs(checkout.getTime() - checkin.getTime());
    let noofdays = Math.ceil(diff / (1000 * 3600 * 24));
    return noofdays;
  };

  useEffect(() => {
    reservation.checkin = checkin;
    setNights(getTotalNights(checkin, checkout));
  }, [checkin]);

  useEffect(() => {
    reservation.checkout = checkout;
    setNights(getTotalNights(checkin, checkout));
  }, [checkout]);

  useMemo(() => {
    reservation.guests = guests;
  }, [guests]);

  const isBtnActive = () => {
    return true;
  };

  const navigate = useNavigate();
  const handleReservationBtn = () => {
    if (isBtnActive && reservation.user_id !== '') {
      navigate(reservationPage, {
        state: {
          room: room,
          reservation: reservation,
          reviewScore: reviewScore,
          reviewCnt: reviewCnt,
        },
      });
    } else {
      alert('로그인 먼저 해주세요');
    }
  };

  const setInputPlaceholder = (id, str) => {
    document.getElementById(id).placeholder = str;
  };

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.containerInner}>
          <div className={css.roomInfo}>
            <div className={css.pricePerNightBox}>
              <span>₩</span>
              <span className={css.pricePerNight} id="price-per-night">
                {room.price}
              </span>
              <span>&nbsp;night</span>
            </div>
            <div className={css.roomRateBox}>
              <div className={css.iconStar}>
                <TiStarFullOutline />
              </div>
              <div className={css.roomRate} id="room-score">
                {reviewScore}
              </div>
              <span>&nbsp;·&nbsp;&nbsp;</span>
              <div className={css.roomReviewCnt} id="review-count">
                {reviewCnt} reviews
              </div>
            </div>
          </div>
          <div className={css.reserveInfoContainer}>
            <div className={css.reserveInfoInner}>
              <div className={css.checkInOut}>
                <div className={`${css.checkIn} ${css.borderRight}`}>
                  <input
                    className={css.checkInInput}
                    id="checkin-input"
                    type="date"
                    value={checkin}
                    autoComplete="off"
                    onChange={event => {
                      setCheckIn(event.target.value);
                    }}
                  />
                </div>
                <div className={css.checkOut}>
                  <input
                    className={css.checkOutInput}
                    id="checkout-input"
                    type="date"
                    value={checkout}
                    autoComplete="off"
                    onChange={event => {
                      setCheckOut(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className={`${css.guests} ${css.borderTop}`}>
                <input
                  className={css.guestsInput}
                  id="guest-input"
                  type="number"
                  pattern="[0-9]{1,100}"
                  placeholder={guests}
                  value={guests}
                  autoComplete="off"
                  onChange={event => {
                    setGuests(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={css.BtnBox}>
            <button
              className={css.rclConfirmAndPayBtn}
              id="confirm-pay-btn"
              onClick={event => {
                handleReservationBtn();
              }}
            >
              Reserve
            </button>
          </div>
          <div className={css.chargeAt}>
            <div className={css.chargeAtTextBox}>
              <p className={css.chargeAtText}>{airbnbConst.chargeAtText}</p>
            </div>
          </div>
          <div className={css.priceBreakDown}>
            <PriceBreakDown
              room={room}
              reservation={reservation}
              nights={nights}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationBox;
