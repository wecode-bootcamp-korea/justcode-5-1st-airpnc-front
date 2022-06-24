import React, { useState, useEffect } from 'react';
import css from './myReview.module.scss';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
function MyReview() {
  return (
    <div className={css.container}>
      <div className={css.myReview}>
        <img src="https://ifh.cc/g/x1WbXD.jpg"></img>
        <div className={css.room_info}>
          <h1 className={css.room_title}> The Island</h1>
          <div className={css.room_score}>
            <span>4.5</span>
            <span>2022.06.23</span>
          </div>

          <p className={css.review}>최고의 숙소!!</p>
        </div>
      </div>
      <div className={css.page_button}>
        <FaAngleLeft />
        <span className={css.current}>1</span>
        <FaAngleRight />
      </div>
      <span>수정</span>
    </div>
  );
}

export default MyReview;
