import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import css from './Signup.module.scss';
//import "./App.css";
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch('email'));

  const password = useRef();
  password.current = watch('password');

  const onSubmit = data => {
    const req = {
      email: data.email,
      name: data.name,
      password: data.password,
      password_confirm: data.password_confirm,
      phone_number: data.phone_number,
    };
    fetch('http://localhost:10010/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          navigate('/login');
        } else {
          alert(res.msg);
        }
      })
      .catch(() => {
        console.error('회원가입 중 에러 발생');
      });
  };

  return (
    <div className={css.container0}>
      <div className={css.container}>
        <h1 className={css.title}>회원가입 정보를 입력해주세요.</h1>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={css.label}>Email</label>
          <input
            className={css.input}
            placeholder="example@gmail.com"
            name="email"
            type="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && errors.email.type === 'required' && (
            <p className={css.p}>이메일은 필수 항목입니다.</p>
          )}
          {/* {errors.email?.type === "required" && "This email field is required"} */}

          <label className={css.label}>Name</label>
          <input
            className={css.input}
            name="name"
            type="text"
            {...register('name', { required: true, maxLength: 10 })}
          />
          {errors.name && errors.name.type === 'required' && (
            <p className={css.p}>이름은 필수 항목입니다.</p>
          )}
          {errors.name && errors.name.type === 'maxLength' && (
            <p className={css.p}>입력한 내용이 최대 길이를 초과합니다.</p>
          )}

          <label className={css.label}>Password</label>
          <input
            className={css.input}
            name="password"
            type="password"
            {...register('password', { required: true, minLength: 7 })}
          />
          {errors.password && errors.password.type === 'required' && (
            <p className={css.p}>패스워드는 필수 항목입니다.</p>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <p className={css.p}>패스워드는 7자 이상이어야 합니다.</p>
          )}

          <label className={css.label}>Password Confirm</label>
          <input
            className={css.input}
            name="password_confirm"
            type="password"
            {...register('password_confirm', {
              required: true,
              validate: value => value === password.current,
            })}
          />
          {errors.password_confirm &&
            errors.password_confirm.type === 'required' && (
              <p className={css.p}>패스워드 확인은 필수 항목입니다.</p>
            )}
          {errors.password_confirm &&
            errors.password_confirm.type === 'validate' && (
              <p className={css.p}>패스워드가 매치하지 않습니다.</p>
            )}

          <label className={css.label}>Mobile number</label>
          <input
            className={css.input}
            type="tel"
            {...register('phone_number', {
              required: true,
              maxLength: 11,
              minLength: 8,
            })}
          />
          {errors.phone_number && errors.phone_number.type === 'required' && (
            <p className={css.p}>휴대전화 번호는 필수 항목입니다.</p>
          )}
          {errors.phone_number && errors.phone_number.type === 'maxLength' && (
            <p className={css.p}>11자 이하로 입력해주세요.</p>
          )}
          {errors.phone_number && errors.phone_number.type === 'minLength' && (
            <p className={css.p}>8자 이상으로 입력해주세요.</p>
          )}

          <input className={css.signup_button} type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Signup;
