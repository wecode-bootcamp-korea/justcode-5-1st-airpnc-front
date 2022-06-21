import React, { useState } from 'react';
import css from './RoomList.module.scss';

function RoomList({ image, name, price }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderImage = {
    backgroundImage: `url(${image[currentIndex].url})`,
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

  console.log(currentIndex > 4);

  return (
    <>
      <div className={css.container}>
        <div className={css.sliderStyle} style={sliderImage}></div>
        <button className={css.prevBtnStyle} onClick={onClickPrev}>
          prev
        </button>
        <button className={css.nextBtnStyle} onClick={onClickNext}>
          next
        </button>
        <p>{name}</p>
        <p>{price}</p>
      </div>
    </>
  );
}

export default RoomList;
