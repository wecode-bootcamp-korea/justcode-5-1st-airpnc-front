import { useEffect, useState } from 'react';
import css from './PayOptionSelector.module.scss';

const PayOptionSelector = props => {
  const [show, setShow] = useState(false);

  const closeHandler = e => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      className={css.container}
      onClick={() => {
        closeHandler(false);
      }}
    >
      <div className={show ? css.dropDownVisible : css.dropDown}>
        inner selector
      </div>
    </div>
  );
};
export default PayOptionSelector;
