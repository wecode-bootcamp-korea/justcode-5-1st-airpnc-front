import { useRef, useState } from 'react';
import ReactDom from 'react-dom';
import css from './modalLayout.module.scss';
const modal = document.getElementById('modal');

function ModalLayout({ modalOff, children }) {
  return ReactDom.createPortal(
    <div onClick={modalOff} className={css.background}>
      {children}
    </div>,
    modal
  );
}

export default ModalLayout;
