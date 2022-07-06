import { useEffect, useState } from 'react';
import BASE_URL from '../../../config';
import css from './ReservationConfirmed.module.scss';
import { MdClose } from 'react-icons/md';

const ReservationConfirmed = props => {
  let yourTripDate = props.yourTripDate;
  let reservation = props.reservation;
  const [show, setShow] = useState(false);
  const reservationNumber = Math.floor(Math.random() * 1000000 + 1);

  const closeHandler = e => {
    setShow(false);
    props.onClose(false);
  };

  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      check_in: reservation.checkin,
      check_out: reservation.checkout,
      guests: reservation.guests,
      reservation_no: reservationNumber,
      user_id: reservation.user_id,
      room_id: reservation.room_id,
    }),
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/reservation`, postOptions);
      const json = await res.json();
      console.log(json);
    })();
  }, []);
  useEffect(() => {
    console.log(yourTripDate);
  }, []);
  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  //const innerComponent = state.map((item) => <></>);

  //function getInnerComponent(state) {
  //  return state.map((item) => <></>);
  //}

  return (
    <div>
      {show && (
        <div className={css.container}>
          <div className={css.confirmationMessage} id="confirmation-message">
            <div className={css.messageHeader}>
              <div className={css.CloseBtnBox}>
                <button
                  className={css.CloseBtn}
                  onClick={() => {
                    closeHandler(false);
                  }}
                >
                  <MdClose />
                </button>
              </div>
              <div className={css.confirmationHeaderTextBox}>
                <p>Reservation&nbsp;Confirmed!</p>
              </div>
            </div>
            <div className={css.dropDownSelectors}>
              <div>Reservation number : {reservationNumber}</div>
              <div>Dates : {yourTripDate}</div>
              <div>Guests : {reservation.guests}</div>
              <div />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationConfirmed;
