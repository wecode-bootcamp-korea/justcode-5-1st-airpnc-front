import { useState, useEffect } from 'react';
import css from './toReview.module.scss';

function ToReview({ data, reviewOn }) {
  console.log(data, 11111);
  return (
    <div className={css.container}>
      <div className={css.room_info}>
        <img src={data.file_url}></img>
        <div className={css.info_text}>
          <span>
            {data.city},{data.country}
          </span>
          <h1>{data.name}</h1>
        </div>
      </div>
      <button onClick={reviewOn} className={css.review}>
        리뷰쓰기
      </button>
    </div>
  );
}

export default ToReview;
