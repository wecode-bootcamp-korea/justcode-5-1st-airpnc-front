import React, { useState, useEffect, useRef } from 'react';
import css from './makeReview.module.scss';

function MakeReview({ data, mode }) {
  console.log(data, mode, 121312);
  const [score, setScore] = useState(data.score);
  const [review, setReview] = useState(data.review);
  const [title, setTitle] = useState('작성');
  const [fetchOptions, setFetchOptions] = useState({});
  const [toggle, setToggle] = useState(true);
  const star = useRef();
  useEffect(
    e => {
      data.score = score;
      console.log(data.score);
      drawStar(e);
    },
    [score]
  );

  useEffect(() => {
    data.review = review;
    console.log(data.review);
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
          user_id: 1,
          room_id: data.room_id,
        }),
      });
    } else if (mode === 'put') {
      setTitle('수정');
      setFetchOptions({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score: data.score,
          review: data.review,
          id: data.review_id,
        }),
      });
    }
  }, [score, review]);
  useEffect(() => {
    console.log(score);
  }, [score]);
  useEffect(() => {
    console.log(review);
  }, [review]);
  const drawStar = e => {
    // console.log(star.current);
    let value = score;
    if (e) {
      value = e.target.value;
    }
    console.log(data.score, 63463);
    star.current.style.width = `${value * 20}%`;
    setScore(value);
  };
  const onSubmit = async () => {
    console.log(review, score, data.review_id, 124535);
    let url = '';
    if (mode === 'create') {
      url = 'http://localhost:10010/review';
    } else if (mode === 'put') {
      url = `http://localhost:10010/review/${data.review_id}`;
    }
    console.log(url, 563636);
    if (score == 0) {
      alert('별점 입력을 확인하세요');
      return;
    }
    if (review == '') {
      alert('리뷰 입력을 확인하세요');
      return;
    }
    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    console.log(json);
    // console.log('a', toggleBtn());
    // console.log('b', toggleBtns(toglemessage));
    // console.log('c', toglemessage);
    // toggleBtn();
  };

  return (
    <div className={css.MakeReview}>
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
              step="0.5"
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
        <button onClick={onSubmit}>완료</button>
      </div>
    </div>
  );
}

export default MakeReview;
