import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './ReservationBox.module.scss';
import PriceBreakDown from './PriceBreakDown';
import { TiStarFullOutline } from 'react-icons/ti';

//////////////// CONSTs /////////////
const airbnbConst = {
  chargeAtText: `You won't be charged yet`,
};
const reservationPage = '/reservation';
const current = new Date();
const currentYear = current.getFullYear();
const currentMonth = current.getMonth() + 1;
const currentDate = current.getDate();
const today = new Date(`${currentYear}-${currentMonth}-${currentDate}`);
const tomorrow = today.getDate() + 1;
/////////////////////////////////////

const ReservationBox = props => {
  const { rawData, userId, room, reservation, reviewScore, reviewCnt } = props;
  const [checkin, setCheckIn] = useState(reservation.checkin);
  const [checkout, setCheckOut] = useState(reservation.checkout);
  const [isDateValid, setDateValid] = useState(false);
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(reservation.guests || 1);
  const [isBtnActive, setBtnActive] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    checkDateValid(checkin, checkout);
  }, [checkin, checkout]);

  useMemo(() => {
    reservation.guests = guests;
  }, [guests]);

  useMemo(() => {
    reservation.nights = nights;
  }, [nights]);

  const getTotalNights = (date1, date2) => {
    let checkin = new Date(date1);
    let checkout = new Date(date2);
    let diff = Math.abs(checkout.getTime() - checkin.getTime());
    let noofdays = Math.ceil(diff / (1000 * 3600 * 24));
    return noofdays;
  };

  const checkDateValid = (d1, d2) => {
    const date1 = new Date(d1);
    const date1Year = date1.getFullYear();
    const date1Month = date1.getMonth() + 1;
    const date1Date = date1.getDate() + 1;
    // date1 is checkin date to compare with today
    const dateIn = new Date(`${date1Year}-${date1Month}-${date1Date}`);

    const date2 = new Date(d2);
    const date2Year = date2.getFullYear();
    const date2Month = date2.getMonth() + 1;
    const date2Date = date2.getDate() + 1;
    // dateIn is checkin date to compare with today
    const dateOut = new Date(`${date2Year}-${date2Month}-${date2Date}`);

    if (isNaN(date1) || isNaN(date2)) {
      setDateValid(false);
      setBtnActive(false);
      setAlertMsg(`날짜를 확인해주세요.`);
      return;
    } else if (dateIn.getTime() < today.getTime()) {
      setAlertMsg(
        `날짜를 확인해주세요.\n오늘 이후 날짜 ${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()} 를 선택해주세요`
      );
      setDateValid(false);
      setBtnActive(false);
      return;
    } else if (dateIn.getTime() === dateOut.getTime()) {
      setAlertMsg('체크인 날짜와 체크아웃 날짜를 확인해주세요');
      setDateValid(false);
      setBtnActive(false);
      return;
    } else if (dateIn.getTime() > dateOut.getTime()) {
      setAlertMsg('체크인 날짜와 체크아웃 날짜를 확인해주세요');
      setDateValid(false);
      setBtnActive(false);
      return;
    } else {
      setDateValid(true);
      setNights(getTotalNights(date1, date2));
      setBtnActive(true);
      reservation.checkin = dateIn;
      reservation.checkout = dateOut;
      return;
    }
  };

  const navigate = useNavigate();
  const handleReservationBtn = () => {
    navigate(reservationPage, {
      state: {
        data: rawData,
        room: room,
        reservation: reservation,
        reviewScore: reviewScore,
        reviewCnt: reviewCnt,
        today: today,
      },
    });
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
              <span>&nbsp;per night</span>
            </div>
            <div className={css.roomRateBox}>
              <div className={css.iconStar}>
                <TiStarFullOutline />
              </div>
              <div className={css.roomRate} id="room-score">
                {isNaN(reviewScore) ? 'n/a' : Number(reviewScore).toFixed(1)}
              </div>
              <span>&nbsp;·&nbsp;&nbsp;</span>
              <div className={css.roomReviewCnt} id="review-count">
                {reviewCnt || 0} reviews
              </div>
            </div>
          </div>
          <div className={css.reserveInfoContainer}>
            <div className={css.reserveInfoInner}>
              <div
                className={
                  isDateValid
                    ? `${css.checkInOut}`
                    : `${css.checkInOut} ${css.checkInOutInvalid}`
                }
              >
                <div className={`${css.checkIn} ${css.borderRight}`}>
                  <input
                    className={css.checkInInput}
                    id="checkin-input"
                    type="date"
                    value={checkin || today}
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
              disabled={!isBtnActive}
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
            <PriceBreakDown room={room} reservation={reservation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationBox;
