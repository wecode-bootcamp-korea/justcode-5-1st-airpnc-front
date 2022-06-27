import { useState, useEffect } from 'react';
import css from './displayReview.module.scss';
import { FaStar, FaSearch } from 'react-icons/fa';
import OneReview from '../../components/Review/oneReview';

function DisplayReview({ data, displayCnt, search, getAvg }) {
  // console.log(data, 22222);
  const [reviews, setReviews] = useState([]);
  const [avgScore, setAvgScore] = useState(2.5);
  useEffect(() => {
    getAvgScore(data);
  }, [data]);
  // console.log(review);
  // const review = {
  //   score: data.score,
  //   user_id: data.user_id,
  //   created_at: data.created_at,
  //   review: data.review,
  // };
  const getAvgScore = data => {
    const scoreArr = [];
    // console.log(data);
    data.forEach((el, idx) => {
      scoreArr.push(el.score);
    });
    // console.log(scoreArr, 234);
    const average = scoreArr.reduce((a, b) => a + b, 0) / scoreArr.length;
    // console.log(average, 2340000);
    setAvgScore(average);
    getAvg(average);
  };
  return (
    <div className={css.review}>
      <div className={css.score}>
        <FaStar />
        <h2>
          {avgScore} · 후기 {data.length}개
        </h2>
      </div>
      {search && (
        <div className={css.search_bar}>
          <FaSearch />
          <input type="text" placeholder="후기 검색" />
        </div>
      )}
      <div className={css.review_box}>
        {data.slice(0, displayCnt).map((review, idx) => {
          return <OneReview key={idx} data={review} />;
        })}
      </div>
    </div>
  );
}

export default DisplayReview;
