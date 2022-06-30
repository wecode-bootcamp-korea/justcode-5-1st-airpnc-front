import { useState, useEffect } from 'react';
import oneReview from './oneReview';
import css from './toReview.module.scss';

function ToReview({ data, reviewOnClick }) {
  console.log(data, 11111);
  return (
    <div className={css.container}>
      <div className={css.room_info}>
        <img src={data.photo_url[0].url}></img>
        <div className={css.info_text}>
          <span>
            {data.city},{data.country}
          </span>
          <h1>{data.name}</h1>
        </div>
      </div>
      <button
        onClick={() => {
          reviewOnClick(data.idx);
        }}
        className={css.review}
      >
        리뷰쓰기
      </button>
    </div>
  );
}

export default ToReview;
