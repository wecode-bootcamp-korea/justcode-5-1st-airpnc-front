import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './RoomList.module.scss';

function RoomList({ image, name, price, won, sytle }) {
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

  return (
    <>
      <div className={css.container} style={sytle}>
        <div
          className={css.sliderStyle}
          style={sliderImage}
          onClick={goToDetail}
        ></div>
        <p className={css.name}>{name}</p>
        <p className={css.price}>
          {price}
          {won}
        </p>
        <div className={css.btn}>
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
