import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalLayout from '../Modal/modalLayout';
import BedRoom from './BedRoom';
import css from './MainFilter.module.scss';
import Price from './Price';
import RoomType from './RoomType';
import Title from './Title';

function MainFilter() {
  const [reviewOn, setReviewOn] = useState(false);
  const [low, setLow] = useState();
  const [high, setHigh] = useState();
  const [type, setType] = useState();
  const [bed, setBed] = useState();
  const [room, setRoom] = useState();
  const navigate = useNavigate();
  const el = useRef();
  const back = useRef();
  const onSubmit = e => {
    e.preventDefaul();
  };
  const onClick = e => {
    if (!el.current.contains(e.target)) {
      setReviewOn(false);
    }
  };

  const lowOnChange = e => {
    setLow(e.target.value);
  };
  const highOnChange = e => {
    setHigh(e.target.value);
  };

  const isTypeClick = e => {
    if (e.target.checked) {
      setType(e.target.value);
    }
  };

  const onClickBed = e => {
    const clicked = e.currentTarget.value;
    setBed(clicked);
  };
  const onClickRoom = e => {
    const clicked = e.currentTarget.value;
    setRoom(clicked);
  };

  const confirm = e => {
    if (back.current.contains(e.target)) {
      setReviewOn(false);
    }
    navigate('/', {
      state: {
        price: {
          min: Number(low),
          max: Number(high),
        },
        room_type: Number(type),
        beds: Number(bed),
        bedrooms: Number(room),
      },
    });
  };
  return (
    <>
      {reviewOn && (
        <ModalLayout modalOff={onClick}>
          <div ref={el} onSubmit={onSubmit} className={css.filter}>
            <Title />
            <Price lowOnChange={lowOnChange} highOnChange={highOnChange} />
            <RoomType isTypeClick={isTypeClick} />
            <BedRoom
              bed={bed}
              room={room}
              onClickBed={onClickBed}
              onClickRoom={onClickRoom}
            />
            <button className={css.confirmBtn} ref={back} onClick={confirm}>
              확인
            </button>
          </div>
        </ModalLayout>
      )}
      <button className={css.filterBtn} onClick={() => setReviewOn(true)}>
        Filter
      </button>
    </>
  );
}

export default MainFilter;
