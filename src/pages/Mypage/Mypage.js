import React, { useState, useEffect } from 'react';
import { ImStarFull } from 'react-icons/im';
import { MdReviews } from 'react-icons/md';
import MyProfile from './components/MyProfile';
import MyReservation from './components/MyReservation';

import Header from '../../components/Header/Header';
import './Mypage.scss';

function MyPage() {
  const [profile, setProfile] = useState('');
  const [roomLists, setRoomLists] = useState([]);
  const [reviews, setReviews] = useState('');

  return (
    <>
      <Header />
      <div>
        {
          <article classame="b">
            <section className="MyLog-jh">
              <div className="HelloUser">
                <h2 classnem="MyName">
                  안녕하세요. <span className="Name">{profile.name}</span>님.
                </h2>
                <div className="b">
                  <h4 className="Title">
                    <ImStarFull size="20" color="#999" />
                    &nbsp;예약 내역
                  </h4>
                </div>
              </div>

              <MyReservation roomList={roomLists} />

              <h4 className="NextTitle">
                <MdReviews size="20" color="#999" />
                &nbsp;리뷰 내역
              </h4>
            </section>
            <div className="a">
              <MyProfile
                userImg={profile.profile_image_url}
                userName={profile.name}
                // getMyProfile={getMyProfile}
              />
            </div>
          </article>
        }
      </div>
    </>
  );
}

export default MyPage;
