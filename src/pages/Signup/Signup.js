import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Signup.module.scss';

function Signup() {
  const navigate = useNavigate();
  const [identify, setIdentify] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const validation = (idText, pwText, name) => {
    if (!idText.includes('@')) {
      return false;
    }
    if (pwText.length < 7) {
      return false;
    }

    if (name.length < 7) {
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

  const valid = validation(identify, password, name);

  const prevent = event => {
    event.preventDefault();
  };

  return (
    <div className={css.container}>
      <form className={css.loginWindow} onSubmit={prevent}>
        <div className={css.loginContainer}>
          <h1 className={css.logo}>회원가입</h1>
          <h1 className="information">회원가입 정보를 입력해주세요.</h1>
          <input
            id="id"
            className={css.input}
            name="identify"
            type="text"
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
            placeholder="패스워드"
            value={password}
            onChange={event => {
              setPassword(event.target.value);
            }}
          />
          <input
            id="name"
            className={css.input}
            name="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
          />
          <input
            id="phone"
            className={css.input}
            name="phone"
            type="text"
            placeholder="전화번호"
            // value={password}
            onChange={event => {
              setPhone(event.target.value);
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
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
