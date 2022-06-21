import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import css from './Signup.module.scss';

function Signup() {
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

  const handleLogin = () => {
    console.log(1);

    fetch('http://52.79.143.176:8000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: identify,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(result => console.log('결과: ', result));
  };

  const valid = validation(identify, password);

  const prevent = event => {
    event.preventDefault();
  };

  return (
    <div className={css.container}>
      <form className={css.loginWindow} onSubmit={prevent}>
        <div className={css.loginContainer}>
          <h1 className={css.logo}>회원가입</h1>
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

          <Link className={css.forgotPassword} to="/login-Jy">
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
