import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';
import css from './Detail.module.scss';
import DisplayReview from '../../components/Review/displayReview';
import ModalLayout from '../../components/Modal/modalLayout';
import ReservationBox from '../Reservation/Modal/ReservationBox';
import SubHeader from '../../components/Header/SubHeader';
import AirCover from '../../components/Modal/airCover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import {
  FaStar,
  FaShare,
  FaHeart,
  FaTh,
  FaDoorClosed,
  FaParking,
  FaCalendarAlt,
  FaUtensils,
  FaCarAlt,
  FaTv,
} from 'react-icons/fa';
//import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
const airbnbLogo = 'icons/256px-Airbnb_Logo.svg.png';

function Detail() {
  const homepage = '/';
  const user = localStorage.getItem('user-id');
  const token = localStorage.getItem('login-token');
  const [reviewOn, setReviewOn] = useState(false);
  const [coverOn, setCoverOn] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgScore, setAvgScore] = useState();
  const [wish, setWish] = useState(false);
  const [selected, setSelected] = useState([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  // rawData should gets raw room api from home, my pages, wishlist //
  const rawData = useLocation().state.data;
  const reserveStored = useLocation().state.reservation;
  const handleNavigateBtn = address => {
    navigate(address);
  };
  // room : trimmed data is passed to detail, reservation pages
  const room = {
    id: rawData.id,
    name: rawData.name,
    images: rawData.photo,
    price: rawData.price,
    address: rawData.address,
    hostId: rawData.users.id,
    hostname: rawData.users.name,
    profileImage: rawData.users.profile_image,
    hostJoinedIn: rawData.users.created_at,
    guests: rawData.guests,
    bedrooms: rawData.bedrooms,
    beds: rawData.beds,
    baths: rawData.baths,
    description: rawData.description,
    roomType: rawData.roomType,
    locationType: rawData.locationType,
    wish: rawData.wish !== null ? rawData.wish : false,
  };
  room.repImg = room.images[0].file_url;
  room.hostType = 'superhost'; // constant for current version
  const el = useRef();
  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/review/${room.id}`);
      const json = await res.json();
      setReviews(json);
      if (localStorage.getItem('user-id')) {
        setUserId(localStorage.getItem('user-id'));
      }
      console.log(reviews, 86868);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/wishlist/${user}`);
      const json = await res.json();
      setSelected(json.data);
      console.log(json.data[0].id, json.data[1].id, room.id, 3242342);
      if (json.data.filter(el => el.id === room.id).length > 0) {
        setWish(true);
      } else {
        setWish(false);
      }
      // setSelected(json.data);
      // setLike(json.data.map(i => i.id));
    })();
  }, []);
  const reservation = reserveStored || {
    user_id: userId,
    room_id: room.id,
  };

  const cantClick = () => {
    alert('????????? ?????? ????????????');
  };
  const offModal = e => {
    //console.log(el.current.contains(e.target));
    if (!el.current.contains(e.target)) {
      if (reviewOn) {
        setReviewOn(false);
      }
      if (coverOn) {
        setCoverOn(false);
      }
    }
  };
  const getAvgFunc = avgScore => {
    setAvgScore(avgScore);
  };

  const btnClick = async () => {
    const req = {
      user_id: userId,
      room_id: room.id,
    };
    if (wish) {
      setWish(false);
      const res = await fetch(`${BASE_URL}/wishlist/${userId}/${room.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      console.log('delete : ', json);
    } else {
      setWish(true);
      const res = await fetch(`${BASE_URL}/wishlist/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });
      const json = await res.json();
      console.log('post : ', json);
    }

    const res = await fetch(`${BASE_URL}/wishlist/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    setSelected(json.data);
  };
  const goHome = () => {
    navigate('/');
  };

  // const locationName = data.state.name;
  return (
    <>
      {token ? <SubHeader login /> : <SubHeader />}
      <div className={css.backBtn} onClick={goHome}>
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </div>
      <div className={css.container}>
        <section className={css.header_container}>
          <h1>{room.name}</h1>
          <div className={css.function_container}>
            <div className={css.score}>
              <FaStar />
              {reviews.length > 0 && (
                <span>
                  {avgScore} ?? <strong>?????? {reviews.length}???</strong>
                </span>
              )}
              <span className={css.location}>{room.address}</span>
            </div>
            <div className={css.function_group}>
              <div className={css.function}>
                <FaShare />
                <span className={css.function_text}>????????????</span>
              </div>
              {!wish ? (
                <div
                  onClick={userId ? btnClick : cantClick}
                  className={css.function}
                >
                  <FaHeart />
                  <span className={css.function_text}>??????</span>
                </div>
              ) : (
                <div className={css.function}>
                  <FaHeart
                    onClick={userId ? btnClick : cantClick}
                    color="red"
                  />
                  <span
                    onClick={() => navigate('/wishlist')}
                    className={css.function_text}
                  >
                    ?????? ??????
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className={css.image_container}>
          <div className={css.image_box}>
            <img className={css.main} src={room.repImg} />
          </div>
          <div className={css.image_box}>
            {room.images
              .filter((image, idx) => idx !== 0)
              .map((image, idx) => {
                return (
                  <img className={css.sub} key={idx} src={image.file_url} />
                );
              })}
          </div>
          <button className={css.display_button}>
            <FaTh />
            <span>?????? ?????? ??????</span>
          </button>
        </section>
        <section className={css.room_detail_container}>
          <div className={css.room_detail}>
            <div className={css.header}>
              <div className={css.room_contents}>
                <h2>{room.hostname}?????? ??????????????? ??? ??????</h2>
                <span>
                  ?????? ?????? {room.guests}??? ?????? {room.bedrooms}??? ??????
                  {room.beds}??? ??????{room.baths}???
                </span>
              </div>
              <img src={room.profileImage} className={css.profile_image}></img>
            </div>
            <div className={css.noti}>
              <div className={css.contents}>
                <FaDoorClosed />
                <div className={css.contents_text}>
                  <h3>?????? ?????????</h3>
                  <span>?????? ???????????? ????????? ????????? ?????????</span>
                </div>
              </div>
              <div className={css.contents}>
                <FaParking />
                <div className={css.contents_text}>
                  <h3>?????? ?????? ????????? ????????????</h3>
                  <span>
                    ?????? ???????????? ?????? ????????? ????????? ??? ??? ?????? ?????? ???
                    ???????????????.
                  </span>
                </div>
              </div>
              <div className={css.contents}>
                <FaCalendarAlt />
                <div className={css.contents_text}>
                  <h3>8??? 2??? ????????? ????????? ???????????? ??? ????????????.</h3>
                </div>
              </div>
            </div>
            <div className={css.insurance}>
              <h2>
                <strong>??????</strong>??????
              </h2>
              <p>
                ?????? ???????????? ???????????? ????????? ??????????????? ?????? ????????? ????????????
                ?????? ?????? ?????? ???????????? ????????? ?????? ????????? ????????? ?????? ??????
                ??????????????? ???????????????.
              </p>
              <span onClick={() => setCoverOn(true)}>??? ????????????</span>
            </div>
            <div className={css.description}>
              <p>{room.description}</p>
            </div>
            <div className={css.facilities}>
              <h2>?????? ????????????</h2>
              <ul>
                <li className={css.contents}>
                  <FaUtensils />
                  <span>??????</span>
                </li>
                <li className={css.contents}>
                  <FaCarAlt />
                  <span>?????? ??????</span>
                </li>
                <li className={css.contents}>
                  <FaTv />
                  <span>tv</span>
                </li>
              </ul>
              {/* <button>???????????? 50??? ?????? ??????</button> */}
            </div>
            {/* <div className={css.calendar}>
            <div className={css.calendar_header}>
              <h2>????????? ????????? ??????????????????.</h2>
              <span>?????? ????????? ???????????? ????????? ????????? ???????????????</span>
            </div>
            <div>?????? ??????</div>
            <div>
              <img></img>
              <span>?????? ?????????</span>
            </div>
          </div> */}
          </div>
          <div className={css.reservation}>
            <ReservationBox
              rawData={rawData}
              userId={userId}
              room={room}
              reservation={reservation}
              reviewScore={avgScore}
              reviewCnt={reviews.length}
            />
          </div>
        </section>
        <section className={css.additional_inform}>
          {reviews.length > 0 ? (
            <div className={css.review_container}>
              <DisplayReview
                data={reviews}
                displayCnt={4}
                search={false}
                getAvg={getAvgFunc}
              />
              <button onClick={() => setReviewOn(true)}>
                ?????? {reviews.length}??? ?????? ??????
              </button>
            </div>
          ) : (
            <div className={css.review_container}>
              <h2>????????? ?????? ?????????</h2>
              <p>
                ????????? ????????? ????????? ????????? ?????? ????????????????????????. <br />
                ?????? ????????? ?????????????????? ????????? ?????? ????????? ?????? ?????????
                ????????????.
              </p>
            </div>
          )}
        </section>
        {coverOn && (
          <ModalLayout modalOff={offModal}>
            <div ref={el} className={css.modal}>
              <AirCover />
            </div>
          </ModalLayout>
        )}
        {reviewOn && (
          <ModalLayout modalOff={offModal}>
            <div ref={el} className={css.modal}>
              <DisplayReview
                data={reviews}
                displayCnt={reviews.length}
                search={true}
                getAvg={getAvgFunc}
              />
            </div>
          </ModalLayout>
        )}
      </div>
    </>
  );
}

export default Detail;
