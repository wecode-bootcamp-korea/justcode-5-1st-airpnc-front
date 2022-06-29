import React, { useState, useEffect, useRef } from 'react';
import css from './ReservationDetails.module.scss';

function ReservationDetails({ data }) {
  console.log(data, 111111111);
  return (
    <div className={css.container}>
      <h1>예약 상세 보기</h1>
      <div className={css.room_info_box}>
        <div className={css.room_info}>
          <span>
            {data.city}, {data.country}
          </span>
          <h1>{data.name}</h1>
        </div>
      </div>
      <div className={css.score}>
        <h2>예약 번호</h2>
        {data.reservation_no}
      </div>
      <div className={css.comment}>
        <h2>예약 날짜</h2>
        <span className={css.date}>
          체크인 : {data.check_in}, 체크아웃 : {data.check_out}
        </span>
      </div>
      <button>수정</button>
      <button>삭제</button>
    </div>
  );
}

export default ReservationDetails;
