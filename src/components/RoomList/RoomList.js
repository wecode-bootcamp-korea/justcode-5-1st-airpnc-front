import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './RoomList.module.scss';

function RoomList({ room, won, sytle, btnStyle, userId }) {
  console.log('userId : ', userId);
  console.log('room.id : ', room.id);
  const repImg = room.photo[0].file_url;
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate('/detail', { state: { data: room, userId } });
  };

  // const sliderImage = {
  //   backgroundImage: `url(${room.photo[currentIndex].file_url})`,
  // };

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
          // style={sliderImage}
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
