import React, { useState } from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import ActivatedHeader from './ActivatedHeader';
// import LoginPop from './LoginPop';

import { IoAirplaneOutline } from 'react-icons/io5';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { VscThreeBars } from 'react-icons/vsc';

function Header() {
  const [isClickedNav, setIsClickedNav] = useState(false);
  const [Menu, ClickedMenu] = useState(false);
  const [Login, ClickedLogin] = useState(false);
  const [Signup, ClickedSignUp] = useState(false);
  const [Mypage, ClickedMypage] = useState(false);
  const navigate = useNavigate();

  const isMenued = () => {
    //
    if (localStorage.getItem('back_token')) {
      Menu(!ClickedMenu);
    } else {
      navigate('/');
    }
  };
  const isSignUped = () => {
    //
    if (localStorage.getItem('back_token')) {
      Signup(!ClickedSignUp);
    } else {
      navigate('/Signup');
    }
  };
  const isMyPaged = () => {
    //
    if (localStorage.getItem('back_token')) {
      Mypage(!ClickedMypage);
    } else {
      navigate('/Mypage');
    }
  };
  const isLogined = () => {
    //
    if (localStorage.getItem('back_token')) {
      Login(!ClickedLogin);
    } else {
      navigate('/Login');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="logo" onClick={() => navigate('/')}>
          <IoAirplaneOutline size="40" />
          <div>AirPnc</div>
        </div>
        {isClickedNav ? (
          <ActivatedHeader
            setIsClickedNav={setIsClickedNav}
            isClickedNav={isClickedNav}
          />
        ) : (
          <div onClick={() => setIsClickedNav(!isClickedNav)}>
            <p className="search">
              <FaSearch />
              검색 시작하기
            </p>
          </div>
        )}
        <div className="container_right">
          <div className="container_menu">
            <div type="button" onClick={isMenued}>
              <VscThreeBars />
            </div>
          </div>

          <div className="container_login">
            <div type="button" onClick={isLogined}>
              Login
            </div>
          </div>

          <div className="container_signup">
            <div type="button" onClick={isSignUped}>
              signup
            </div>
          </div>

          <div className="container_myPage">
            <div type="button" onClick={isMyPaged}>
              <FaUserCircle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
