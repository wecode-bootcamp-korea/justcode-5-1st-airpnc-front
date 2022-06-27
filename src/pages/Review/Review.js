import React, { useState, useEffect } from 'react';
import css from './Review.module.scss';
import ToReview from '../../components/Review/toReview';
import MyReview from '../../components/Review/myReview';
import ModalLayout from '../../components/Modal/modalLayout';
import MakeReview from './modals/makeReview';
import { FaAngleRight } from 'react-icons/fa';

function Review() {
  const [review, setReview] = useState([]);
  const [toReviewList, setToReviewList] = useState([1]);
  const [toggle, setToggle] = useState(true);
  const [reviewOn, setReviewOn] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/data/reviewData2.json');
      const json = await res.json();
      setReview(json);
    })();
  }, []);
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.route}>
          <span>프로필</span>
          <FaAngleRight />
          <span> 후기</span>
        </div>
        {toggle ? <h1>작성해야 할 후기</h1> : <h1>내가 작성한 후기</h1>}
      </div>
      <div className={css.tab}>
        <span onClick={() => setToggle(true)}>작성해야 할 후기</span>
        <span onClick={() => setToggle(false)}>내가 작성한 후기</span>
      </div>
      <div className={css.review_container}>
        {toggle ? (
          <div className={css.review_box}>
            <h2 className={css.review_title}>작성해야 할 후기</h2>
            {toReviewList.length !== 0 ? (
              <div className={css.review_contents}>
                {toReviewList.map((toReview, idx) => {
                  <ToReview
                    key={idx}
                    data={toReview}
                    reviewOn={() => setReviewOn(true)}
                  />;
                })}
              </div>
            ) : (
              <div className={css.review_contents}>
                현재 작성할 후기가 없습니다. 여행을 한번 다녀올 때가 된 것
                같네요!
              </div>
            )}
          </div>
        ) : (
          <div className={css.review_box}>
            <h2 className={css.review_title}>내가 작성한 후기</h2>
            {review.length !== 0 ? (
              <div className={css.review_contents}>
                {review.map((review, idx) => {
                  return <MyReview key={idx} data={review} />;
                })}
              </div>
            ) : (
              <div className={css.review_contents}>
                아직 후기를 남기지 않으셨습니다.
              </div>
            )}
          </div>
        )}
      </div>
      {reviewOn && (
        <ModalLayout reviewOff={() => setReviewOn(false)}>
          <MakeReview />
        </ModalLayout>
      )}
    </div>
  );
}

export default Review;
