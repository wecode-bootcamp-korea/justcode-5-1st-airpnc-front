import { useEffect, useState } from 'react';
import css from './PayOptionSelector.module.scss';
import { MdClose } from 'react-icons/md';
import Selections from './Selections';

// MockData //
const payOptions = ['Visa', 'Master', 'Amex'];
/////////////

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
    <div id="pay-option-drop-down" onMouseLeave={() => closeHandler()}>
      {show && (
        <div className={css.container}>
          <div className={css.dropDown} id="pay-option-drop-down">
            <div className={css.dropDownHeader}>
              <div className={css.dropdownCloseBtnBox}>
                <button
                  className={css.dropdownCloseBtn}
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  <MdClose />
                </button>
              </div>
              <div className={css.dropdownHeaderTextBox}>
                <p></p>
              </div>
            </div>
            <div className={css.dropDownSelectors}>
              {payOptions.map(option => (
                <Selections
                  key={payOptions.indexOf(option)}
                  setValue={props.setValue}
                  option={option}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayOptionSelector;
