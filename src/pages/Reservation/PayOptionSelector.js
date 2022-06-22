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

  //const innerComponent = state.map((item) => <></>);

  //function getInnerComponent(state) {
  //  return state.map((item) => <></>);
  //}

  return (
    <div>
      {show && (
        <div
          className={css.container}
          onClick={() => {
            closeHandler(false);
          }}
        >
          <div className={`${css.dropDownVisible}`}>
            <ui>payment&nbsp;option1</ui>
            <ui>payment&nbsp;option2</ui>
            <ui>payment&nbsp;option3</ui>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayOptionSelector;
