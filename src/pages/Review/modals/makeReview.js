import React, { useState, useEffect, useRef } from 'react';
import BASE_URL from '../../../config';
import css from './makeReview.module.scss';

function MakeReview({ data, mode, setReviewOn, remainedReview }) {
  const [score, setScore] = useState(0);
  const [review, setReview] = useState('');
  const [title, setTitle] = useState('작성');
  const [fetchOptions, setFetchOptions] = useState({});
  const [toggle, setToggle] = useState(true);
  const star = useRef();

  useEffect(() => {
    setScore(data.score);
    setReview(data.review);
    star.current.style.width = `${data.score * 20}%`;
  }, []);
  useEffect(() => {
    data.score = score;
    console.log(data.score, 'score');
  }, [score]);

  useEffect(() => {
    data.review = review;
    console.log(data.review, 'review');
  }, [review]);

  useEffect(() => {
    if (mode === 'create') {
      setFetchOptions({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score,
          review,
          reservation_id: data.id,
          user_id: data.userId,
          room_id: data.room_id,
        }),
      });
    } else if (mode === 'put') {
      setTitle('수정');
      setFetchOptions({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score,
          review,
          id: data.id,
        }),
      });
    }
  }, [score, review]);

  const drawStar = e => {
    // console.log(star.current);
    let value = score;
    if (e) {
      value = e.target.value;
    }
    star.current.style.width = `${value * 20}%`;
    setScore(value);
  };

  const onSubmit = async () => {
    let url = '';
    if (mode === 'create') {
      url = `${BASE_URL}/review`;
      remainedReview(data.idx);
    } else if (mode === 'put') {
      url = `${BASE_URL}/review/${data.id}`;
    }
    if (score === 0) {
      alert('별점 입력을 확인하세요');
      return;
    }
    if (review === '') {
      alert('리뷰 입력을 확인하세요');
      return;
    }
    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    // console.log(json, 77777);
    setReviewOn(!toggle);
  };

  return (
    <div className={css.MakeReview}>
      {data ? (
        <div className={css.container}>
          <h1>리뷰 {title}</h1>
          <div className={css.review_info_box}>
            {/* <img src={data.photo_url[0].url}></img> */}
            <div className={css.room_info}>
              <span>
                {data.city}, {data.country}
              </span>
              <h1 className={css.room_name}>{data.name}</h1>
            </div>
          </div>
          <div className={css.score}>
            <h2>종합 점수</h2>
            <span className={css.background_star}>
              ★★★★★
              <span ref={star} className={css.star}>
                ★★★★★
              </span>
              <input
                onChange={drawStar}
                type="range"
                min="0"
                max="5"
                step="1"
                value={score}
              />
            </span>
          </div>
          <div className={css.comment}>
            <h2>리뷰</h2>
            <textarea
              onChange={e => setReview(e.target.value)}
              value={review}
              placeholder="자세하고 솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다."
            ></textarea>
          </div>
          <button
            onClick={e => {
              onSubmit();
            }}
          >
            완료
          </button>
        </div>
      ) : (
        <div>데이터가 없습니다.</div>
      )}
    </div>
  );
}

export default MakeReview;
