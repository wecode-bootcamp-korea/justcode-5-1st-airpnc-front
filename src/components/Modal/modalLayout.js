import ReactDom from 'react-dom';
import css from './modalLayout.module.scss';
const modal = document.getElementById('modal');

function ModalLayout(props) {
  return ReactDom.createPortal(
    <div onClick={props.reviewOff} className={css.background}>
      {props.children}
    </div>,
    modal
  );
}

export default ModalLayout;
