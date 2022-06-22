import React from 'react';
import { useLocation } from 'react-router-dom';
import css from './Detail.module.scss';

function Detail() {
  const data = useLocation();
  return <div className={css.container}>{data.state.name}</div>;
}

export default Detail;
