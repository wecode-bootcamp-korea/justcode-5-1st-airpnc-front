import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import css from './Detail.module.scss';
import DisplayReview from '../../components/Review/displayReview';
import ModalLayout from '../../components/Modal/modalLayout';
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

function Detail() {
  const data = useLocation();
  const [reviewOn, setReviewOn] = useState(false);
  // const locationName = data.state.name;
  return (
    <div className={css.container}>
      <section className={css.header_container}>
        <h1>아다란 클럽 Rannalhi</h1>
        <div className={css.function_container}>
          <div className={css.score}>
            <FaStar />
            <span>
              4.60 · <strong>후기 15개</strong>
            </span>
            <span className={css.location}>스웨덴</span>
          </div>
          <div className={css.function_group}>
            <div className={css.function}>
              <FaShare />
              <span className={css.function_text}>공유하기</span>
            </div>
            <div className={css.function}>
              <FaRegHeart />
              <span className={css.function_text}>저장</span>
            </div>
          </div>
        </div>
      </section>
      <section className={css.image_container}>
        <div className={css.image_box}>
          <img className={css.main} src="https://ifh.cc/g/x1WbXD.jpg"></img>
        </div>
        <div className={css.image_box}>
          <img className={css.sub} src="https://ifh.cc/g/x1WbXD.jpg"></img>
          <img className={css.sub} src="https://ifh.cc/g/x1WbXD.jpg"></img>
          <img className={css.sub} src="https://ifh.cc/g/x1WbXD.jpg"></img>
          <img className={css.sub} src="https://ifh.cc/g/x1WbXD.jpg"></img>
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
              <h2>Rowena님이 호스팅하는 집 전체</h2>
              <span>최대 인원 4명 침실 3개 침대 4개 간이 욕실</span>
            </div>
            <img
              src="https://ifh.cc/g/bc20qA.jpg"
              className={css.profile_image}
            ></img>
          </div>
          <div className={css.noti}>
            <div className={css.contents}>
              <FaDoorClosed />
              <div>
                <h3>셀프 체크인</h3>
                <span>열쇠 보관함을 이용해 체크인 하세요</span>
              </div>
            </div>
            <div className={css.contents}>
              <FaParking />
              <div>
                <h3>무료 주차 혜택을 누리세요</h3>
                <span>
                  해당 지역에서 무료 주차가 가능한 몇 안 되는 숙소 중
                  하나입니다.
                </span>
              </div>
            </div>
            <div className={css.contents}>
              <FaCalendarAlt />
              <div>
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
            <p>
              Adaaran Club Rannalhi는 몰디브 최고의 호텔 중 하나이며 몰디브로
              알려진 이국적인 섬 컬렉션 내에서 남말레 환초 끝에 독점적으로
              자리잡고 있습니다.{' '}
            </p>
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
          <div className={css.calendar}>
            <div className={css.calendar_header}>
              <h2>체크인 날짜를 선택해주세요.</h2>
              <span>여행 날짜를 입력하여 정확한 요금을 확인하세요</span>
            </div>
            <div>달력 자리</div>
            <div>
              <img></img>
              <span>날짜 지우기</span>
            </div>
          </div>
        </div>
        <div className={css.reservation}>reservation and payment</div>
      </section>
      <section className={css.additional_inform}>
        <DisplayReview />
        <button onClick={() => setReviewOn(true)}>후기 모두 보기</button>
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
        <ModalLayout reviewOff={() => setReviewOn(false)}>
          <DisplayReview />
        </ModalLayout>
      )}
    </div>
  );
  // console.log(data);
  // return <div className={css.container}>{data.state.name}</div>;
}

export default Detail;
