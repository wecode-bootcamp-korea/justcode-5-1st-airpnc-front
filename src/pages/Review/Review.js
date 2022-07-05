import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Review.module.scss';
import ToReview from '../../components/Review/toReview';
import MyReview from '../../components/Review/myReview';
import ModalLayout from '../../components/Modal/modalLayout';
import MakeReview from './modals/makeReview';
import Header from '../../components/Header/Header';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import SubHeader from '../../components/Header/SubHeader';

function Review() {
  const [reviews, setReviews] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [toReviewList, setToReviewList] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [fetchToggle, setFetchToggle] = useState(true);
  const [reviewMode, setReviewMode] = useState('create');
  const [reviewOn, setReviewOn] = useState(false);
  const navigate = useNavigate();
  const el = useRef();
  const token = localStorage.getItem('login-token');
  const userId = localStorage.getItem('user-id');
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:10010/reservation/toReview/${userId}`
      );
      const json = await res.json();
      // console.log(json, 3423);
      const toReviews = json[0];
      const photos = json[1];
      toReviews.map(toReview => {
        for (let i = 0; i < photos.length; i++) {
          if (toReview.room_id === photos[i].room_id) {
            toReview.photo_url = photos[i].photo_url;
            break;
          }
        }
      });
      setToReviewList(toReviews);
      // console.log(toReviewList, 222);
    })();
    (async () => {
      const res = await fetch(`http://localhost:10010/review/my/${userId}`);
      const json = await res.json();
      const reviewList = json[0];
      const photos = json[1];
      reviewList.map(review => {
        for (let i = 0; i < photos.length; i++) {
          if (review.room_id === photos[i].room_id) {
            review.photo_url = photos[i].photo_url;
            break;
          }
        }
      });
      setReviews(reviewList);
      // console.log(reviews, 333);
    })();
    // if (!toggle) {
    //   document.querySelector('.container').style.borderBottom =
    //     '2px solid gray';
    // }
    // else {
    //   document.querySelector(
    //     '.tab_box > span:last-of-type'
    //   ).style.borderBottom = '2px solid gray';
    // }
  }, [toggle]);

  const offModal = e => {
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

  const remainedReview = idx => {
    if (toggle) {
      setToReviewList(
        toReviewList.filter(ToReview => ToReview !== toReviewList[idx])
      );
    } else {
      setReviews(reviews.filter(review => review !== reviews[idx]));
    }
  };

  return (
    <>
      {/* {token ? <Header login /> : <Header />} */}
      <SubHeader />
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.route}>
            <span onClick={() => navigate('/Mypage')}>프로필</span>
            <FaAngleRight />
            <span> 후기</span>
          </div>
          {toggle ? <h1>작성해야 할 후기</h1> : <h1>내가 작성한 후기</h1>}
        </div>
        <div className={css.tab_box}>
          <span
            className={toggle ? `${css.tab}` : null}
            onClick={() => setToggle(true)}
          >
            작성해야 할 후기
          </span>
          <span
            className={!toggle ? `${css.tab}` : null}
            onClick={() => setToggle(false)}
          >
            내가 작성한 후기
          </span>
        </div>
        <div className={css.review_container}>
          {toggle ? (
            <div className={css.review_box}>
              <h2 className={css.review_title}>작성해야 할 후기</h2>
              {toReviewList.length !== 0 ? (
                <div className={css.review_contents}>
                  {toReviewList.map((toReview, idx) => {
                    toReview.idx = idx;
                    toReview.userId = userId;
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
              {reviews.length !== 0 ? (
                <div className={css.review_contents}>
                  {reviews.map((review, idx) => {
                    review.idx = idx;
                    return (
                      <MyReview
                        key={idx}
                        data={review}
                        reviewOnClick={onReview}
                        remainedReview={remainedReview}
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
          <ModalLayout modalOff={offModal}>
            <div ref={el} className={css.modal}>
              {toggle ? (
                <MakeReview
                  data={toReviewList[reviewIndex]}
                  mode={reviewMode}
                  setReviewOn={setReviewOn}
                  remainedReview={remainedReview}
                />
              ) : (
                <MakeReview // edit review
                  data={reviews[reviewIndex]}
                  mode={reviewMode}
                  setReviewOn={setReviewOn}
                  remainedReview={remainedReview}
                />
              )}
            </div>
          </ModalLayout>
        )}
      </div>
    </>
  );
}

export default Review;
