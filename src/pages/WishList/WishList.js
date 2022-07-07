import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';
import RoomList from '../../components/RoomList/RoomList';
import css from './WishList.module.scss';
import SubHeader from '../../components/Header/SubHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function WishList() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [wishFilter, setWishFilter] = useState([]);
  const user = localStorage.getItem('user-id');
  const [isThereWish, setIsThereWish] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/home`); //room api GET request
      const json = await res.json();

      setData(json);
    })();
  }, []);
  console.log(data);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/wishlist/${user}`);
      const json = await res.json();
      setSelected(json.data);
    })();
  }, [data]);

  useEffect(() => {
    const arr = selected.map(i => i.id);
    const filter = arr.map(i => data.filter(a => a.id === i)[0]);
    setWishFilter([...filter]);
  }, [data]);
  console.log(wishFilter);

  const goHome = () => {
    navigate('/');
    setIsThereWish(false);
  };

  const imageSize = {
    width: '400px',
    maxWidth: '400px',
    height: '280px',
    maxHeight: '280px',
    marginBottom: '100px',
  };

  const btnStyle = {
    top: '-57%',
  };

  const token = localStorage.getItem('login-token');

  return (
    <>
      {token ? <SubHeader login /> : <SubHeader />}
      <div className={css.backBtn} onClick={goHome}>
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </div>
      <div className={css.title}>위시리스트</div>
      <div className={css.container}>
        {wishFilter.map((data, ind) => {
          return (
            <div key={ind + 3} className={css.wishList}>
              <RoomList
                isThereWish={isThereWish}
                key={ind + 10}
                id={data.id}
                room={data}
                image={data.photo.file_url}
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
