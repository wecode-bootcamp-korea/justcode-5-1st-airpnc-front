import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';
import css from './Login.module.scss';

function Login() {
  const navigate = useNavigate();
  const [identify, setIdentify] = useState('');
  const [password, setPassword] = useState('');

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
    <div className={css.container}>
      <form className={css.loginWindow} onSubmit={prevent}>
        <div className={css.loginContainer}>
          <h1 className={css.logo}>AirPnC에 오신 것을 환영합니다.</h1>
          <input
            id="id"
            className={css.input}
            name="identify"
            type="text"
            placeholder="전화번호, 사용자 이름 또는 이메일"
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
            placeholder="비밀번호"
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
            로그인
          </button>

          <Link className={css.forgotPassword} to="/login">
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
