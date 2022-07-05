import { useState, useEffect } from 'react';
import css from './ReservationHistory.module.scss';

function ReservationHistory({ data, detailsOn }) {
  console.log(data, 11111);
  return (
    <div className={css.container}>
      <div className={css.reservation_info}>
        {/* <img src={data.photo_url[0].url}></img> */}
        <div className={css.info_text}>
          <span>
            {data.city},{data.country}
          </span>
          <h1>{data.name}</h1>
          <span className={css.date}>
            체크인 : {data.check_in.substring(0, 10)}, 체크아웃 :{' '}
            {data.check_out.substring(0, 10)}
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          detailsOn(data.idx);
        }}
        className={css.review}
      >
        상세보기
      </button>
    </div>
  );
}

export default ReservationHistory;
