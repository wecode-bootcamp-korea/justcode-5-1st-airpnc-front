import { useRef, useState } from 'react';
import ReactDom from 'react-dom';
import css from './modalLayout.module.scss';
const modal = document.getElementById('modal');

function ModalLayout({ reviewOff, children }) {
  return ReactDom.createPortal(
    <div onClick={reviewOff} className={css.background}>
      {children}
    </div>,
    modal
  );
}

export default ModalLayout;
