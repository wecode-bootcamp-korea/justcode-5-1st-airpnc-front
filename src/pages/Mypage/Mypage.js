import React, { useState, useEffect } from 'react';
import { ImStarFull } from 'react-icons/im';
import MyProfile from './components/MyProfile';
import Header from '../../components/Header/Header';
import './Mypage.scss';

function MyPage() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('login-token');
  console.log(token);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/data/profile.json');
      const json = await res.json();
      setData(json);
    })();
  }, []);

  if (data.length === 0) {
    return <div>데이터없음</div>;
  }
  console.log(data[0]);

  return (
    <>
      {token ? <Header login /> : <Header />}
      <div>
        {
          <article className="MyPageWrapper">
            <MyProfile
              userImg={data[0].profile_image_url}
              userName={data[0].name}
            />

            <section className="MyLog-box">
              <div className="HelloUser">
                <h2 className="MyName">
                  <span className="Name">{data[0].name}</span>
                  님&nbsp;환영합니다.
                </h2>
              </div>

              <h4 className="Title-history">
                <ImStarFull size="20" color="rgb(255, 56, 92)" />
                &nbsp;예약 내역
              </h4>

              <div className="List-box">리스트 뿌려주는곳!</div>

              <h4 className="Title-history">
                <ImStarFull size="20" color="rgb(255, 56, 92)" />
                &nbsp;리뷰 내역
              </h4>

              <div className="List-box">리스트 뿌려주는곳!</div>
            </section>

            <MyProfile
              userImg={data[0].profile_image_url}
              userName={data[0].name}
            />
          </article>
        }
      </div>
    </>
  );
}

export default MyPage;
