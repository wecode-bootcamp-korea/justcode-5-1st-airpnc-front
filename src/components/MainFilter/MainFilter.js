import { useEffect, useRef, useState } from 'react';
import ModalLayout from '../Modal/modalLayout';
import BedRoom from './BedRoom';
import css from './MainFilter.module.scss';
import Price from './Price';
import RoomType from './RoomType';
import Title from './Title';

function MainFilter() {
  const [reviewOn, setReviewOn] = useState(false);
  const el = useRef();
  const onSubmit = e => {
    e.preventDefaul();
  };
  const onClick = e => {
    if (!el.current.contains(e.target)) {
      setReviewOn(false);
    }
    console.log(e.target);
  };
  return (
    <>
      {reviewOn && (
        <ModalLayout reviewOff={onClick}>
          <div ref={el} onSubmit={onSubmit} className={css.filter}>
            <Title />
            <Price />
            <RoomType />
            <BedRoom />
          </div>
        </ModalLayout>
      )}
      <button onClick={() => setReviewOn(true)}>필터</button>
    </>
  );
}

export default MainFilter;
