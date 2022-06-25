import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoomList from '../../components/RoomList/RoomList';
import css from './WishList.module.scss';
import Header from '../../components/Header/Header';

function WishList() {
  const navigate = useNavigate();
  const wish = useLocation();
  console.log(wish.state);
  const goHome = () => {
    navigate('/', { state: [...wish.state] });
  };

  const imageSize = {
    width: '400px',
    height: '280px',
    marginBottom: '100px',
  };
  return (
    <>
      <Header />
      <div onClick={goHome}>back</div>
      <div className={css.title}>위시리스트</div>
      <div className={css.container}>
        {wish.state.map((data, ind) => {
          return (
            <div className={css.wishList}>
              <RoomList
                key={data.ind}
                id={data.id}
                room={data}
                image={data.image}
                sytle={imageSize}
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
