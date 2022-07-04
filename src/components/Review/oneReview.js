import { useState, useEffect } from 'react';
import css from './oneReview.module.scss';
import { FaStar } from 'react-icons/fa';

function oneReview({ data }) {
  return (
    <div className={css.contents}>
      <div className={css.profile}>
        <img src={data.profile_image} className={css.profile_image}></img>
        <div className={css.profile_info}>
          <h3>{data.name}</h3>
          {data.updated_at ? (
            <span>{data.updated_at.substring(0, 10)}</span>
          ) : (
            <span>{data.created_at.substring(0, 10)}</span>
          )}
        </div>
        <div className={css.score}>
          <FaStar />
          <span>{data.score}</span>
        </div>
      </div>
      <p>{data.review}</p>
    </div>
  );
}

export default oneReview;
