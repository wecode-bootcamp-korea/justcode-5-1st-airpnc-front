import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';
import RoomList from '../../components/RoomList/RoomList';
import css from './WishList.module.scss';
import SubHeader from '../../components/Header/SubHeader';

function WishList() {
  const navigate = useNavigate();

  const selected = useLocation().state;
  console.log(selected);
  const wish = useLocation();

  const user = useLocation().state;
  console.log(wish.state);

<<<<<<< HEAD
  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch(`http://localhost:10010/wishlist/${user.id}`);
  //     const json = await res.json();
  //     console.log(json, '확인콘솔');
  //   })();
  // }, [wish]);
=======
  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/wishlist/${user.id}`);
      const json = await res.json();
      console.log(json, '확인콘솔');
    })();
  }, [wish]);
>>>>>>> main

  const goHome = () => {
    navigate('/');
  };

  const imageSize = {
    width: '400px',
    height: '280px',
    marginBottom: '100px',
  };

  const btnStyle = {
    top: '-60%',
  };

  const token = localStorage.getItem('login-token');
  console.log(token);
  return (
    <>
      {token ? <SubHeader login /> : <SubHeader />}
      <div onClick={goHome}>back</div>
      <div className={css.title}>위시리스트</div>
      <div className={css.container}>
        {selected.map((data, ind) => {
          return (
            <div key={ind + 3} className={css.wishList}>
              <RoomList
                key={ind + 10}
                id={data.id}
                room={data}
                //image={data.image}
                sytle={imageSize}
                btnStyle={btnStyle}
              />
              <div key={ind + 2} className={css.info}>
                <div className={css.name} key={ind}>
                  {data.name}
                </div>
                <div className={css.price} key={ind + 1}>
                  {data.price}원
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WishList;
