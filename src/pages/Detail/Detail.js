import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import css from './Detail.module.scss';
import DisplayReview from '../../components/Review/displayReview';
import ModalLayout from '../../components/Modal/modalLayout';
import ReservationBox from '../Reservation/Modal/ReservationBox';
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
  FaRegHeart,
  FaTh,
  FaDoorClosed,
  FaParking,
  FaCalendarAlt,
  FaUtensils,
  FaCarAlt,
  FaTv,
} from 'react-icons/fa';

import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

// Mock Data for testing //
const room = {
  id: 1,
  name: 'Winter Wonderland, 3BR, Fireplace, Cozy',
  type: 'Entire Villa',
  price: 603000,
  score: 4.9,
  reviewCnt: 11,
  hostType: 'superhost',
  repImg: '/images/room_rep/cabin.png',
};

const reservation = {
  id: 1,
  guests: 4,
  checkin: '2022-06-10',
  checkout: '2022-06-14',
};

//////////////////////////

function Detail() {
  const [reviewOn, setReviewOn] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgScore, setAvgScore] = useState();
  const [wish, setWish] = useState([]);
  const navigate = useNavigate();
  const data = useLocation();
  const room = data.state.data;
  console.log('room: ', room);
  const el = useRef();
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/data/reviewData.json');
      const json = await res.json();
      setReviews(json);
      // console.log(reviews);
    })();
  }, []);
  // console.log(reviews, 111);
  const offModal = e => {
    console.log(el.current.contains(e.target));
    if (!el.current.contains(e.target)) {
      setReviewOn(false);
    }
  };
  const getAvgFunc = avgScore => {
    setAvgScore(avgScore);
  };
  // const locationName = data.state.name;
  return (
    <div className={css.container}>
      <section className={css.header_container}>
        <h1>{room.name}</h1>
        <div className={css.function_container}>
          <div className={css.score}>
            <FaStar />
            <span>
              {avgScore} · <strong>후기 {reviews.length}개</strong>
            </span>
            <span className={css.location}>스웨덴</span>
          </div>
          <div className={css.function_group}>
            <div className={css.function}>
              <FaShare />
              <span className={css.function_text}>공유하기</span>
            </div>
            {room.wish === 0 ? (
              <div className={css.function}>
                <FaRegHeart />
                <span className={css.function_text}>저장</span>
              </div>
            ) : (
              <div className={css.function}>
                <FaRegHeart color="red" />
                <span className={css.function_text}>저장 목록</span>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className={css.image_container}>
        <div className={css.image_box}>
          <img className={css.main} src={room.profileImage} />
        </div>
        <div className={css.image_box}>
          {room.images.map((image, idx) => {
            return <img className={css.sub} key={idx} src={image.url} />;
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
              <h2>{data.state.hostname}님이 호스팅하는 집 전체</h2>
              <span>
                최대 인원 {data.state.guests}명 침실 {data.state.bedrooms}개
                침대 {data.state.beds}개 욕실{data.state.baths}개
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
              모든 예약에는 호스트가 예약을 취소하거나 숙소 정보가 정확하지 않은
              경우 또는 체크인에 문제가 있는 상황에 대비한 무료 보호 프로그램이
              포함됩니다.
            </p>
            <span>더 알아보기</span>
          </div>
          <div className={css.description}>
            <p>{data.state.description}</p>
            <span>더 보기</span>
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
            <button>편의시설 50개 모두 보기</button>
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
          <ReservationBox room={room} reservation={reservation} />
        </div>
      </section>
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
        {/* <div className={css.instruction_container}>
          <h2>알아두어야 할 사항</h2>
          <div className={css.instruction}>
            <div className={css.rule}>
              <h3>숙소 이용규칙</h3>
              <ul className={css.contents}>
                <li>
                  <img></img>
                  <span>주방</span>
                </li>
                <li>
                  <img></img>
                  <span>무료 주차</span>
                </li>
                <li>
                  <img></img>
                  <span>tv</span>
                </li>
              </ul>
              <span>더 보기 </span>
            </div>
            <div className={css.safety}>
              <h3>건강과 안전</h3>
              <ul className={css.contents}>
                <li>
                  <img></img>
                  <span>주방</span>
                </li>
                <li>
                  <img></img>
                  <span>무료 주차</span>
                </li>
                <li>
                  <img></img>
                  <span>tv</span>
                </li>
              </ul>
              <span>더 보기 </span>
            </div>
            <div className={css.refund}>
              <h3>환불 정책</h3>
              <span>더 보기 </span>
            </div>
          </div>
        </div> */}
      </section>
      {reviewOn && (
        <ModalLayout reviewOff={offModal}>
          <div ref={el} className={css.modal}>
            <DisplayReview
              data={reviews}
              displayCnt={data.length}
              search={true}
              getAvg={getAvgFunc}
            />
          </div>
        </ModalLayout>
      )}
    </div>
  );
}

export default Detail;
