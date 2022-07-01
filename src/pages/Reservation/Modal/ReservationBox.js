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
  const [isBtnActive, setBtnActive] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

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

  const getTotalNights = (date1, date2) => {
    let checkin = new Date(date1);
    let checkout = new Date(date2);
    let diff = Math.abs(checkout.getTime() - checkin.getTime());
    let noofdays = Math.ceil(diff / (1000 * 3600 * 24));
    return noofdays;
  };

  const isDateValid = (inout, date) => {
    const today = new Date();
    const dateToCheck = new Date();
    console.log('checkin ', checkin);
    console.log('checkout ', checkout);
    console.log('today ', today);
    console.log('dateToCheck ', dateToCheck);

    if (new Date(date) < today) {
      setAlertMsg(
        `날짜를 확인해주세요. ${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()} 이후 날짜를 선택해주세요`
      );
      return false;
    }
    if (inout === 'in') {
      if (dateToCheck > new Date(checkout)) {
        setAlertMsg('체크인 날짜를 확인해주세요');
        setBtnActive(false);
      } else {
        setBtnActive(true);
      }
    } else {
      if (dateToCheck < new Date(checkin)) {
        setAlertMsg('체크아웃 날짜를 확인해주세요');
        setBtnActive(false);
      } else {
        setBtnActive(true);
      }
    }
    console.log('alertMsg', alertMsg);
    setBtnActive(true);
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
      if (!reservation.user_id) {
        alert('로그인 먼저 해주세요');
      } else {
        alert(`날짜를 확인해주세요  ${alertMsg}`);
      }
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
