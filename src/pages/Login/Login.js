import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalLayout from '../../components/Modal/modalLayout';
import BASE_URL from '../../config';
import css from './Login.module.scss';

function Login({ login, loginModalOff }) {
  const navigate = useNavigate();
  const [reviewOn, setReviewOn] = useState();
  const [identify, setIdentify] = useState('');
  const [password, setPassword] = useState('');
  const el = useRef();

  useEffect(() => {
    setReviewOn(login);
  }, [login]);

  const onClick = e => {
    if (!el.current.contains(e.target)) {
      setReviewOn(false);
      loginModalOff(false);
    }
  };

  const validation = (idText, pwText) => {
    if (!idText.includes('@')) {
      return false;
    }
    if (pwText.length < 7) {
      return false;
    }

    return true;
  };
  const goHome = res => {
    navigate('/', { state: res });
  };
  const handleLogin = () => {
    const res = {
      email: identify,
      password: password,
    };
    console.log(JSON.stringify(res));
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(res),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          goHome(res.token.users);
          console.log(res.token.users.email);
          localStorage.setItem('login-token', res.token.token);
          localStorage.setItem('user-id', res.token.users.id);
          localStorage.setItem('user-email', res.token.users.email);
          loginModalOff(false);
        } else {
          alert(res.message);
        }
      });
  };

  const valid = validation(identify, password);

  const prevent = event => {
    event.preventDefault();
  };

  return (
    <>
      {reviewOn && (
        <ModalLayout modalOff={onClick}>
          <div ref={el} className={css.container}>
            <form className={css.loginWindow} onSubmit={prevent}>
              <div className={css.loginContainer}>
                <h1 className={css.logo}>AirPnC??? ?????? ?????? ???????????????.</h1>
                <input
                  id="id"
                  className={css.input}
                  name="identify"
                  type="text"
                  placeholder="????????????, ????????? ?????? ?????? ?????????"
                  value={identify}
                  onChange={event => {
                    setIdentify(event.target.value);
                  }}
                />
                <input
                  id="pw"
                  className={css.input}
                  name="password"
                  type="password"
                  placeholder="????????????"
                  value={password}
                  onChange={event => {
                    setPassword(event.target.value);
                  }}
                />
                <button
                  className={
                    valid
                      ? `${css.login_button} ${css.active}`
                      : `${css.login_button} ${css.inactive}`
                  }
                  disabled={!valid}
                  onClick={handleLogin}
                >
                  ?????????
                </button>

                <Link className={css.forgotPassword} to="/login">
                  ??????????????? ????????????????
                </Link>
              </div>
            </form>
          </div>
        </ModalLayout>
      )}
    </>
  );
}

export default Login;
