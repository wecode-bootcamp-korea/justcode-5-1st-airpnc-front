import { useState, useEffect } from 'react';
import css from './oneReview.module.scss';

function oneReview() {
  return (
    <div className={css.contents}>
      <div className={css.profile}>
        <img
          src="https://ifh.cc/g/bc20qA.jpg"
          className={css.profile_image}
        ></img>
        <div className={css.profile_info}>
          <h3>Johannes Rudolf</h3>
          <span>2021년 8월</span>
        </div>
      </div>
      <p>섬에서의 환상적인 휴가였습니다.</p>
    </div>
  );
}

export default oneReview;
