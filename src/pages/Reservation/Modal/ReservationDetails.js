import React, { useState, useEffect, useRef } from 'react';
import BASE_URL from '../../../config';
import css from './ReservationDetails.module.scss';

function ReservationDetails({ data, frontUpdate, setDetailsOn }) {
  // console.log(data, 111111111);
  const onDelete = async () => {
    // alert('정말 리뷰를 삭제하시겠습니까?');
    if (window.confirm('정말 리뷰를 삭제하시겠습니까?')) {
      const res = await fetch(
        `${BASE_URL}/reservation/${data.reservation_no}`,
        {
          method: 'DELETE',
        }
      );
      const json = await res.json();
      setDetailsOn(false);
      frontUpdate(data.idx);
    }
  };
  return (
    <div className={css.ReservationDetails}>
      <div className={css.container}>
        <h1>예약 상세 보기</h1>
        <div className={css.room_info_box}>
          <div className={css.room_info}>
            <span>
              {data.city}, {data.country}
            </span>
            <h1 className={css.room_name}>{data.name}</h1>
          </div>
        </div>
        <div className={css.score}>
          <h2>예약 번호</h2>
          {data.reservation_no}
        </div>
        <div className={css.comment}>
          <h2>예약 날짜</h2>
          <span className={css.date}>
            체크인 : {data.check_in.substring(0, 10)}, 체크아웃 :{' '}
            {data.check_out.substring(0, 10)}
          </span>
        </div>
        <div className={css.button_group}>
          {/* <button>수정</button> */}
          <button onClick={onDelete}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default ReservationDetails;
