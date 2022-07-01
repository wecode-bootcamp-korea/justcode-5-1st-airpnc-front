import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './ReservationList.module.scss';
import ModalLayout from '../../components/Modal/modalLayout';
import ReservationHistory from '../../components/Reservation/ReservationHistory';
import ReservationDetails from './Modal/ReservationDetails';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Header from '../../components/Header/Header';

function ReservationList() {
  const [reservationList, setReservationList] = useState([]);
  const [detailsOn, setDetailsOn] = useState(false);
  const [reservationIdx, setReservationIdx] = useState(0);
  const el = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem('login-token');
  const userId = localStorage.getItem('user-id');
  console.log(userId, 252352);
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:10010/reservation/${userId}`);
      const json = await res.json();
      console.log(json);
      setReservationList(json);
      console.log(reservationList);
    })();
  }, []);
  const offModal = e => {
    console.log(el.current.contains(e.target));
    if (!el.current.contains(e.target)) {
      setDetailsOn(false);
    }
  };
  const onDetail = idx => {
    setReservationIdx(idx);
    console.log(reservationIdx, 64235);
    setDetailsOn(true);
  };
  return (
    <>
      {token ? <Header login /> : <Header />}
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.route}>
            <span onClick={() => navigate('/Mypage')}>프로필</span>
            <FaAngleRight />
            <span> 예약내역</span>
          </div>
          <h1>예약내역</h1>
        </div>
        <div className={css.reservation_container}>
          <div className={css.reservation_box}>
            <h2 className={css.reservation_title}>확정된 예약</h2>
            {reservationList.length !== 0 ? (
              <div className={css.reservation_contents}>
                {reservationList.map((reservation, idx) => {
                  reservation.idx = idx;
                  return (
                    <ReservationHistory
                      key={idx}
                      data={reservation}
                      detailsOn={onDetail}
                    />
                  );
                })}
              </div>
            ) : (
              <div className={css.reservation_contents}>
                현재 확정된 예약이 없습니다. 여행을 한번 다녀올 때가 된 것
                같네요!
              </div>
            )}
          </div>
        </div>
        {detailsOn && (
          <ModalLayout reviewOff={offModal}>
            <div ref={el} className={css.modal}>
              <ReservationDetails data={reservationList[reservationIdx]} />
            </div>
          </ModalLayout>
        )}
      </div>
    </>
  );
}
export default ReservationList;
