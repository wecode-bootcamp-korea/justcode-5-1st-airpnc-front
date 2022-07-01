import React, { useEffect, useRef, useState } from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import ActivatedHeader from './ActivatedHeader';
// import LoginPop from './LoginPop';

import { FaAirbnb } from 'react-icons/fa';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { VscThreeBars } from 'react-icons/vsc';
import ModalLayout from '../Modal/modalLayout';

function Header({ setHeders, login }) {
  const [isClickedNav, setIsClickedNav] = useState(false);
  const [Menu, ClickedMenu] = useState(false);
  const [Login, ClickedLogin] = useState(false);
  const [Signup, ClickedSignUp] = useState(false);
  const [Mypage, ClickedMypage] = useState(false);
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [location, setLocation] = useState(0);
  const navigate = useNavigate();

  console.log('location : ', location);
  useEffect(() => {
    console.log('changed');
    setHeders(Number(location));
  }, [location]);
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
    navigate('/Login');
    // if (localStorage.getItem('back_token')) {
    //   Login(!ClickedLogin);
    // } else {
    //   navigate('/Login');
    // }
  };

  const isLogout = () => {
    localStorage.removeItem('login-token');
    navigate('/');
  };

  return (
    <div className="container">
      <div className="logo" onClick={() => navigate('/')}>
        <FaAirbnb size="40" />
        <div>airpnc</div>
      </div>
      {isClickedNav ? (
        <ActivatedHeader
          setIsClickedNav={setIsClickedNav}
          isClickedNav={isClickedNav}
          setLocation={setLocation}
        />
      ) : (
        <div
          className="searchBarContainer"
          onClick={() => setIsClickedNav(!isClickedNav)}
        >
          <div className="search">
            <div className="searchComment">
              <span className="where">어디로</span>
              <span className="when">언제</span>
            </div>
            <div className="iconSearch">
              <FaSearch />
            </div>
          </div>
        </div>
      )}
      <div className="container_right">
        <div className="container_menu">
          <div type="button" onClick={isMenued}>
            <VscThreeBars />
          </div>
        </div>

        {login ? (
          <div className="container_login">
            <div type="button" onClick={isLogout}>
              Logout
            </div>
          </div>
        ) : (
          <div className="container_login">
            <div type="button" onClick={isLogined}>
              Login
            </div>
          </div>
        )}
        {login ? null : (
          <div className="container_signup">
            <div type="button" onClick={isSignUped}>
              signup
            </div>
          </div>
        )}

        {login ? (
          <div className="container_myPage">
            <div type="button" onClick={isMyPaged}>
              <FaUserCircle size="35" color="#EEEEEE" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
