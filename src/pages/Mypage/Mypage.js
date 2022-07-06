import React, { useState, useEffect } from 'react';
import BASE_URL from '../../config';
import { ImStarFull } from 'react-icons/im';
import MyProfile from './components/MyProfile';
import { useNavigate } from 'react-router-dom';
import SubHeader from '../../components/Header/SubHeader';
import './Mypage.scss';

function MyPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = localStorage.getItem('login-token');
  console.log(token);

  useEffect(() => {
    (async () => {
      const email = localStorage.getItem('user-email');
      console.log(email, 10);
      const res = await fetch(`http://localhost:10010/mypage/${email}`);
      //const res = await fetch(`${BASE_URL}/mypage/${email}`);
      const json = await res.json();
      setData(json);
    })();
  }, []);

  if (data.length === 0) {
    return <div>데이터없음</div>;
  }
  console.log(data, 888888);

  return (
    <>
      {token ? <SubHeader login /> : <SubHeader />}
      <div>
        <article className="MyPageWrapper">
          <MyProfile userName={data.name} />
          <section className="MyLog-box">
            <div className="HelloUser">
              <h2 className="MyName">
                <span className="Name">{data.name}</span>
                님&nbsp;환영합니다.
              </h2>
            </div>

            <h4
              onClick={() => navigate('/reservationlist')}
              className="Title-history"
            >
              <ImStarFull size="20" color="rgb(255, 56, 92)" />
              &nbsp;예약 내역
            </h4>

            <h4 onClick={() => navigate('/review')} className="Title-history">
              <ImStarFull size="20" color="rgb(255, 56, 92)" />
              &nbsp;리뷰 내역
            </h4>
          </section>
          <MyProfile userName={data.name} />
        </article>
      </div>
    </>
  );
}

export default MyPage;
