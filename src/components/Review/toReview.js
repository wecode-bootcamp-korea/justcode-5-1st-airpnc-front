import React, { useState, useEffect } from 'react';
import css from './toReview.module.scss';

function ToReview(props) {
  return (
    <div className={css.container}>
      <div className={css.room_info}>
        <img src="https://ifh.cc/g/x1WbXD.jpg"></img>
        <div className={css.info_text}>
          <span>skalen</span>
          <h1>The island</h1>
          <p>최대 인원 4명,침실 3개,침대 4개, 간이욕실</p>
        </div>
      </div>
      <button onClick={props.reviewOn} className={css.review}>
        리뷰쓰기
      </button>
    </div>
  );
}

export default ToReview;
