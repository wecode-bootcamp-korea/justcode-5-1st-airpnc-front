import { useState, useEffect } from 'react';
import css from './displayReview.module.scss';
import { FaStar } from 'react-icons/fa';
import OneReview from '../../components/Review/oneReview';

function displayReview() {
  return (
    <div className={css.review}>
      <div className={css.score}>
        <FaStar />
        <h2>4.60 · 후기 15개</h2>
      </div>
      <div className={css.search_bar}>
        <input type="text" placeholder="후기 검색"></input>
      </div>
      <div className={css.review_box}>
        <OneReview />
      </div>
    </div>
  );
}

export default displayReview;
