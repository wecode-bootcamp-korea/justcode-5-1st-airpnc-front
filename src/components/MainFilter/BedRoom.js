import { useState } from 'react';
import css from './BedRoom.module.scss';

const Btn = ({ style, selected }) => {
  const [value, setValue] = useState('0');
  const onClick = e => {
    const clicked = e.currentTarget.value;
    setValue(clicked);
  };

  return (
    <div>
      <button
        style={value === '0' ? selected : style}
        onClick={onClick}
        value="0"
      >
        상관없음
      </button>
      <button
        style={value === '1' ? selected : style}
        onClick={onClick}
        value="1"
      >
        1
      </button>
      <button
        style={value === '2' ? selected : style}
        onClick={onClick}
        value="2"
      >
        2
      </button>
      <button
        style={value === '3' ? selected : style}
        onClick={onClick}
        value="3"
      >
        3
      </button>
      <button
        style={value === '4' ? selected : style}
        onClick={onClick}
        value="4"
      >
        4
      </button>
      <button
        style={value === '5' ? selected : style}
        onClick={onClick}
        value="5"
      >
        5
      </button>
      <button
        style={value === '6' ? selected : style}
        onClick={onClick}
        value="6"
      >
        6
      </button>
      <button
        style={value === '7' ? selected : style}
        onClick={onClick}
        value="7"
      >
        7
      </button>
      <button
        style={value === '8' ? selected : style}
        onClick={onClick}
        value="8"
      >
        8+
      </button>
    </div>
  );
};

const btnStyle = {
  border: '0.5px solid rgb(211, 211, 211)',
  borderRadius: '20px',
  backgroundColor: 'white',
  height: '40px',
  padding: '0px 25px',
  margin: '5px',
  fontSize: '13px',
  transition: 'all, 0.3s',
};

const selectedBtn = {
  border: 'none',
  borderRadius: '20px',
  backgroundColor: 'black',
  color: 'white',
  height: '40px',
  padding: '0px 25px',
  margin: '5px',
  fontSize: '13px',
  transition: 'all, 0.3s',
};

function BedRoom() {
  return (
    <div className={css.bedRoom}>
      <Btn style={btnStyle} selected={selectedBtn} />
      <Btn style={btnStyle} selected={selectedBtn} />
    </div>
  );
}

export default BedRoom;
