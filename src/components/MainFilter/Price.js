import { useEffect, useState } from 'react';
import css from './Price.module.scss';

function Price({ lowOnChange, highOnChange }) {
  return (
    <div className={css.price}>
      <p>가격 범위</p>
      <div className={css.priceBox}>
        <input placeholder="  최저 요금" onChange={lowOnChange} />
        <span>~</span>
        <input placeholder="  최고 요금" onChange={highOnChange} />
      </div>
    </div>
  );
}

export default Price;
