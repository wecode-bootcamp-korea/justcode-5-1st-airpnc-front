import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Review.module.scss';
import ToReview from '../../components/Review/toReview';
import MyReview from '../../components/Review/myReview';
import ModalLayout from '../../components/Modal/modalLayout';
import MakeReview from './modals/makeReview';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

function Review() {
  const [review, setReview] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [toReviewList, setToReviewList] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [fetchToggle, setFetchToggle] = useState(true);
  const [reviewMode, setReviewMode] = useState('create');
  const [reviewOn, setReviewOn] = useState(false);
  const navigate = useNavigate();
  const el = useRef();
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:10010/reservation/toReview/2');
      const json = await res.json();
      console.log(json, 3423);
      setToReviewList(json);
      console.log(toReviewList, 222);
    })();
    (async () => {
      const res = await fetch('http://localhost:10010/review/my/1');
      const json = await res.json();
      setReview(json);
      console.log(review, 333);
    })();
  }, [toggle]);
  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch('http://localhost:10010/review/my/1');
  //     const json = await res.json();
  //     setReview(json);
  //     console.log(review, 333);
  //   })();
  // }, [toggle]);
  const offModal = e => {
    // console.log(el.current.contains(e.target));
    if (!el.current.contains(e.target)) {
      setReviewOn(false);
    }
  };
  //const isReview = () => setReviewOn(true);
  const onReview = idx => {
    console.log(idx);
    setReviewIndex(idx);
    if (!toggle) {
      setReviewMode('put');
    } else {
      setReviewMode('create');
    }
    setReviewOn(true);
  };

  // const toggleFetch = () => {
  //   if (fetchToggle) {
  //     console.log('false');
  //     setFetchToggle(false);
  //   } else {
  //     console.log('true');
  //     setFetchToggle(true);
  //   }
  // };
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.route}>
          <span onClick={() => navigate('/Mypage')}>프로필</span>
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
                  toReview.idx = idx;
                  return (
                    <ToReview
                      key={idx}
                      data={toReview}
                      reviewOnClick={onReview}
                    />
                  );
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
                  review.idx = idx;
                  return (
                    <MyReview
                      key={idx}
                      data={review}
                      reviewOnClick={onReview}
                    />
                  );
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
        <ModalLayout reviewOff={offModal}>
          <div ref={el} className={css.modal}>
            {toggle ? (
              <MakeReview
                data={toReviewList[reviewIndex]}
                mode={reviewMode}
                // toggleBtn={toggleFetch}
              />
            ) : (
              <MakeReview
                data={review[reviewIndex]}
                mode={reviewMode}
                // toggleBtn={toggleFetch}
                // toggleBtns={setFetchToggle}
                // toglemessage={fetchToggle}
              />
            )}
          </div>
        </ModalLayout>
      )}
    </div>
  );
}

export default Review;
