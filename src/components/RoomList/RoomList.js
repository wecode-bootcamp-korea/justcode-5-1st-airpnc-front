import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './RoomList.module.scss';

function RoomList({ room, won, sytle, btnStyle, userId, isThereWish }) {
  //console.log('room in home', room);
  //console.log('room.file_url : ', room.photo[0].file_url);

  // const repImg = room.photo[0].file_url;
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const goToDetail = () => {
    //navigate('/detail', { state: { ...data } });
    navigate('/detail', { state: { data: room, userId } });
  };

  const sliderImage = {
    backgroundImage: `url(${room.photo[currentIndex].file_url})`,
    maxWidth: '310px',
    maxHeight: '280px',
  };

  const onClickPrev = () => {
    currentIndex > 0
      ? setCurrentIndex(currentIndex - 1)
      : setCurrentIndex((currentIndex = 0));
  };

  const onClickNext = () => {
    currentIndex < room.photo.length - 1
      ? setCurrentIndex(currentIndex + 1)
      : setCurrentIndex((currentIndex = 0));
  };

  return (
    <>
      {isThereWish ? (
        <div className={css.container} style={sytle}>
          <button className={css.prevBtnStyle} onClick={onClickPrev}>
            &lt;
          </button>
          <button className={css.nextBtnStyle} onClick={onClickNext}>
            &gt;
          </button>

          <div
            className={css.sliderStyle}
            style={sliderImage}
            onClick={goToDetail}
          ></div>
        </div>
      ) : (
        <div className={css.container} style={sytle}>
          <button className={css.prevBtnStyle} onClick={onClickPrev}>
            &lt;
          </button>
          <button className={css.nextBtnStyle} onClick={onClickNext}>
            &gt;
          </button>

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
        </div>
      )}
    </>
  );
}

export default RoomList;
