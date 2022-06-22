import { useEffect, useState } from 'react';
import css from './CardInfoCountrySelector.module.scss';
import { MdClose } from 'react-icons/md';

const CardInfoCountrySelector = props => {
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
        <div className={css.container}>
          <div className={css.dropDown} id="drop-down">
            <div className={css.dropDownHeader}>
              <div className={css.dropdownCloseBtnBox}>
                <button
                  className={css.dropdownCloseBtn}
                  onClick={() => {
                    closeHandler(false);
                  }}
                >
                  <MdClose />
                </button>
              </div>
              <div className={css.dropdownHeaderTextBox}>
                <p>Country/region</p>
              </div>
            </div>
            <div className={css.dropDownSelectors}>
              <div>Canada</div>
              <div>Korea</div>
              <div>United States</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardInfoCountrySelector;
