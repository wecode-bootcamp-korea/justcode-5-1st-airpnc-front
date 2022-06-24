import React from 'react';
import css from './makeReview.module.scss';

function makeReview() {
  return (
    <div className={css.container}>
      <h1>리뷰 쓰기</h1>
      <div className={css.room_info_box}>
        <img src="https://ifh.cc/g/x1WbXD.jpg"></img>
        <div className={css.room_info}>
          <span>skalen</span>
          <h1>The island</h1>
        </div>
      </div>
      <div className={css.score}>
        <h2>종합 점수</h2>
        <input type="range" />
      </div>
      <div className={css.comment}>
        <h2>리뷰 작성</h2>
        <textarea placeholder="자세하고 솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다."></textarea>
      </div>
      <button>완료</button>
    </div>
  );
}

export default makeReview;
