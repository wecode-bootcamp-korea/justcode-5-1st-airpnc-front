import { useEffect, useState } from 'react';
import css from './ReservationConfirmed.module.scss';
import { MdClose } from 'react-icons/md';

const ReservationConfirmed = props => {
  let yourTripDate = props.yourTripDate;
  let guests = props.guests;
  const [show, setShow] = useState(false);

  const closeHandler = e => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const reservationNumber = Math.floor(Math.random() * 1000000 + 1);
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
              <div>Guests : {guests}</div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationConfirmed;
