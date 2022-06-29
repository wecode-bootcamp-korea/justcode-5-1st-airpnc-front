import React, { useState, useEffect } from 'react';
import css from './myReview.module.scss';
import { FaStar } from 'react-icons/fa';
function MyReview({ data, reviewOn }) {
  return (
    <div className={css.container}>
      <div className={css.myReview}>
        <img src={data.photo_url[0].url}></img>
        <div className={css.room_info}>
          <div className={css.room_score}>
            <FaStar />
            <span>{data.reviewScore}</span>
          </div>
          <h1 className={css.room_title}> {data.name}</h1>
          <p className={css.review}>{data.review}</p>
        </div>
      </div>

      <div className={css.button_group}>
        <button onClick={reviewOn}>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
}

export default MyReview;
