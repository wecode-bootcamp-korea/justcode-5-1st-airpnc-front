import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Detail from '../../pages/Detail/Detail';
import css from './RoomList.module.scss';

function RoomList({ image, name, price }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const data = {
    name: name,
    image: image,
    price: price,
  };
  const goToDetail = () => {
    navigate('/detail', { state: { ...data } });
  };

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

  const btnClick = e => {
    console.log(e);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <>
      <div className={css.container}>
        <div
          className={css.sliderStyle}
          style={sliderImage}
          onClick={goToDetail}
        ></div>
        <button className={css.prevBtnStyle} onClick={onClickPrev}>
          &lt;
        </button>
        <button className={css.nextBtnStyle} onClick={onClickNext}>
          &gt;
        </button>
        <p>{name}</p>
        <p>{price}</p>
        <form onSubmit={onSubmit}>
          <button onClick={btnClick} value={123}>
            like
          </button>
        </form>
      </div>
    </>
  );
}

export default RoomList;
