import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';
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
  const userId = localStorage.getItem('user-id');
  const token = localStorage.getItem('login-token');
  console.log(reviewOn, 345435435);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/reservation/toReview/${userId}`);
      const json = await res.json();
      console.log(json, 3423);
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
      const res = await fetch(`${BASE_URL}/review/my/${userId}`);
      const json = await res.json();
      const reviewList = json[0];
      const photos = json[1];
      console.log(reviewList, 'review');
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
      {token ? <SubHeader login /> : <SubHeader />}
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.route}>
            <span onClick={() => navigate('/Mypage')}>?????????</span>
            <FaAngleRight />
            <span> ??????</span>
          </div>
          {toggle ? <h1>???????????? ??? ??????</h1> : <h1>?????? ????????? ??????</h1>}
        </div>
        <div className={css.tab_box}>
          <span
            className={toggle ? `${css.tab}` : null}
            onClick={() => setToggle(true)}
          >
            ???????????? ??? ??????
          </span>
          <span
            className={!toggle ? `${css.tab}` : null}
            onClick={() => setToggle(false)}
          >
            ?????? ????????? ??????
          </span>
        </div>
        <div className={css.review_container}>
          {toggle ? (
            <div className={css.review_box}>
              <h2 className={css.review_title}>???????????? ??? ??????</h2>
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
                  ?????? ????????? ????????? ????????????. ????????? ?????? ????????? ?????? ??? ???
                  ?????????!
                </div>
              )}
            </div>
          ) : (
            <div className={css.review_box}>
              <h2 className={css.review_title}>?????? ????????? ??????</h2>
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
                  ?????? ????????? ????????? ??????????????????.
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
