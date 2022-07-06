import React, { useState, useEffect } from 'react';
import BASE_URL from '../../config';
import css from './myReview.module.scss';
import { FaStar } from 'react-icons/fa';

function MyReview({ data, reviewOnClick, remainedReview }) {
  console.log('data : ', data);
  const onDelete = async () => {
    // alert('정말 리뷰를 삭제하시겠습니까?');
    if (window.confirm('정말 리뷰를 삭제하시겠습니까?')) {
      const res = await fetch(`${BASE_URL}/${data.review_id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      // console.log(json);
      remainedReview(data.idx);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.myReview}>
        {/* <img src={data.photo_url[0].url}></img> */}
        <div className={css.room_info}>
          <div className={css.room_score}>
            <FaStar />
            <span>{data.score}</span>
          </div>
          <h1 className={css.room_title}> {data.name}</h1>
          <p className={css.review}>{data.review}</p>
        </div>
      </div>

      <div className={css.button_group}>
        <button onClick={() => reviewOnClick(data.idx)}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </div>
    </div>
  );
}

export default MyReview;
