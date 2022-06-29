import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './RoomList.module.scss';

function RoomList({ room, won, sytle, btnStyle }) {
  console.log(room.photo[0].url);
  const profileImg = room.photo[0].url;
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const data = {
    name: room.name,
    images: room.photo,
    price: room.price,
    hostname: room.users.name,
    profileImage: room.users.profile_image,
    //profileImage: '/data/backend/images/cabin.png',
    guests: room.guests,
    bedrooms: room.bedrooms,
    beds: room.beds,
    baths: room.baths,
    description: room.description,
    wish: room.wish !== null ? room.wish : false,
  };

  const goToDetail = () => {
    //navigate('/detail', { state: { ...data } });
    navigate('/detail', { state: { data } });
  };

  const sliderImage = {
    backgroundImage: `url(${room.photo[currentIndex].url})`,
  };

  const onClickPrev = () => {
    currentIndex > 0
      ? setCurrentIndex(currentIndex - 1)
      : setCurrentIndex((currentIndex = 0));
  };

  const onClickNext = () => {
    currentIndex < 4
      ? setCurrentIndex(currentIndex + 1)
      : setCurrentIndex((currentIndex = 0));
  };

  return (
    <>
      <div className={css.container} style={sytle}>
        <div
          className={css.sliderStyle}
          style={sliderImage}
          onClick={goToDetail}
        ></div>
        <p className={css.name}>{room.name}</p>
        <p className={css.price}>
          {room.price}
          {won}
        </p>
        <div className={css.btn} style={btnStyle}>
          <button className={css.prevBtnStyle} onClick={onClickPrev}>
            &lt;
          </button>
          <button className={css.nextBtnStyle} onClick={onClickNext}>
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}

export default RoomList;
