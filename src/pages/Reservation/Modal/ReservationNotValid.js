import { useEffect, useState } from 'react';
import css from './ReservationNotValid.module.scss';
import { MdClose } from 'react-icons/md';

const ReservationNotValid = props => {
  const [show, setShow] = useState(false);

  const closeHandler = e => {
    setShow(false);
    props.onClose(false);
  };

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
          <div
            className={css.reservationNotValidmessage}
            id="reservation-not-valid"
          >
            <div className={css.messageHeader}>
              <div className={css.CloseBtnBox}>
                <button
                  className={css.CloseBtn}
                  onClick={() => {
                    closeHandler();
                  }}
                >
                  <MdClose />
                </button>
              </div>
              <div className={css.confirmationFailedHeaderTextBox}>
                <p>Please&nbsp;check&nbsp;payment&nbsp;option</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationNotValid;
