import React, { useState, useEffect } from 'react';
import css from './myReview.module.scss';
import { FaStar, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
function MyReview() {
  return (
    <div className={css.container}>
      <div className={css.myReview}>
        <img src="https://ifh.cc/g/x1WbXD.jpg"></img>
        <div className={css.room_info}>
          <div className={css.room_score}>
            <FaStar />
            <span>4.5</span>
          </div>
          <h1 className={css.room_title}> The Island</h1>
          <p className={css.review}>최고의 숙소!!</p>
        </div>
      </div>
      <div className={css.page_button}>
        <FaAngleLeft />
        <span className={css.current}>1</span>
        <FaAngleRight />
      </div>
      <div className={css.button_group}>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
}

export default MyReview;
