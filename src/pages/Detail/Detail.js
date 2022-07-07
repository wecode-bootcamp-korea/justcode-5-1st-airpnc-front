import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';
import css from './Detail.module.scss';
import DisplayReview from '../../components/Review/displayReview';
import ModalLayout from '../../components/Modal/modalLayout';
import ReservationBox from '../Reservation/Modal/ReservationBox';
import SubHeader from '../../components/Header/SubHeader';
import AirCover from '../../components/Modal/airCover';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // or for Day.js
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // or for Luxon
// import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
// // or for Moment.js
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
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
  const [reviewOn, setReviewOn] = useState(false);
  const [coverOn, setCoverOn] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgScore, setAvgScore] = useState();
  // const [wish, setWish] = useState([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  // let userId = '';
  // rawData should gets raw room api from home, my pages, wishlist //
  const rawData = useLocation().state.data;
  const reserveStored = useLocation().state.reservation;
  const token = localStorage.getItem('login-token');

  const handleNavigateBtn = address => {
    navigate(address);
  };
  // room : trimmed data is passed to detail, reservation pages
  const room = {
    id: rawData.id,
    name: rawData.name,
    images: rawData.photo,
    price: rawData.price,
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
  console.log(room.wish, room.like, 45345345345);
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
  const reservation = reserveStored || {
    user_id: userId,
    room_id: room.id,
  };
  // console.log(reservation.user_id, 2222222);
  // console.log(reviews, 111);
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

  // const locationName = data.state.name;
  return (
    <>
      <SubHeader />
      <div className={css.container}>
        <section className={css.header_container}>
          <h1>{room.name}</h1>
          <div className={css.function_container}>
            <div className={css.score}>
              <FaStar />
              {reviews.length > 0 && (
                <span>
                  {avgScore} · <strong>후기 {reviews.length}개</strong>
                </span>
              )}
              <span className={css.location}>스웨덴</span>
            </div>
            <div className={css.function_group}>
              <div className={css.function}>
                <FaShare />
                <span className={css.function_text}>공유하기</span>
              </div>
              {room.wish === 0 ? (
                <div className={css.function}>
                  <FaHeart />
                  <span className={css.function_text}>저장</span>
                </div>
              ) : (
                <div className={css.function}>
                  <FaHeart color="red" />
                  <span className={css.function_text}>저장 목록</span>
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
            <span>사진 모두 보기</span>
          </button>
        </section>
        <section className={css.room_detail_container}>
          <div className={css.room_detail}>
            <div className={css.header}>
              <div className={css.room_contents}>
                <h2>{room.hostname}님이 호스팅하는 집 전체</h2>
                <span>
                  최대 인원 {room.guests}명 침실 {room.bedrooms}개 침대
                  {room.beds}개 욕실{room.baths}개
                </span>
              </div>
              <img src={room.profileImage} className={css.profile_image}></img>
            </div>
            <div className={css.noti}>
              <div className={css.contents}>
                <FaDoorClosed />
                <div className={css.contents_text}>
                  <h3>셀프 체크인</h3>
                  <span>열쇠 보관함을 이용해 체크인 하세요</span>
                </div>
              </div>
              <div className={css.contents}>
                <FaParking />
                <div className={css.contents_text}>
                  <h3>무료 주차 혜택을 누리세요</h3>
                  <span>
                    해당 지역에서 무료 주차가 가능한 몇 안 되는 숙소 중
                    하나입니다.
                  </span>
                </div>
              </div>
              <div className={css.contents}>
                <FaCalendarAlt />
                <div className={css.contents_text}>
                  <h3>8월 2일 전까지 무료로 취소하실 수 있습니다.</h3>
                </div>
              </div>
            </div>
            <div className={css.insurance}>
              <h2>에어커버</h2>
              <p>
                모든 예약에는 호스트가 예약을 취소하거나 숙소 정보가 정확하지
                않은 경우 또는 체크인에 문제가 있는 상황에 대비한 무료 보호
                프로그램이 포함됩니다.
              </p>
              <span onClick={() => setCoverOn(true)}>더 알아보기</span>
            </div>
            <div className={css.description}>
              <p>{room.description}</p>
            </div>
            <div className={css.facilities}>
              <h2>숙소 편의시설</h2>
              <ul>
                <li className={css.contents}>
                  <FaUtensils />
                  <span>주방</span>
                </li>
                <li className={css.contents}>
                  <FaCarAlt />
                  <span>무료 주차</span>
                </li>
                <li className={css.contents}>
                  <FaTv />
                  <span>tv</span>
                </li>
              </ul>
              {/* <button>편의시설 50개 모두 보기</button> */}
            </div>
            {/* <div className={css.calendar}>
            <div className={css.calendar_header}>
              <h2>체크인 날짜를 선택해주세요.</h2>
              <span>여행 날짜를 입력하여 정확한 요금을 확인하세요</span>
            </div>
            <div>달력 자리</div>
            <div>
              <img></img>
              <span>날짜 지우기</span>
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
        {reviews.length > 0 ? (
          <section className={css.additional_inform}>
            <DisplayReview
              data={reviews}
              displayCnt={4}
              search={false}
              getAvg={getAvgFunc}
            />
            <button onClick={() => setReviewOn(true)}>
              후기 {reviews.length}개 모두 보기
            </button>
          </section>
        ) : (
          <div>
            <h1>후기가 아직 없어요</h1>
            <p>
              여행에 차질이 없도록 최선을 다해 도와드리겠습니다. 모든 예약은
              에어비앤비의 게스트 환불 정책에 따라 보호를 받습니다.
            </p>
          </div>
        )}
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
