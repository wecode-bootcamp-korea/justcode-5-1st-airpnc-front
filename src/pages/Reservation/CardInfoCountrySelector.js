import { useEffect, useState } from 'react';
import css from './CardInfoCountrySelector.module.scss';
import { MdClose } from 'react-icons/md';
import CountryList from './CountryList';

// MockData //
const countries = ['Canada', 'Korea', 'Unite States'];
//
const CardInfoCountrySelector = props => {
  const [show, setShow] = useState(false);

  const closeHandler = e => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  //const innerComponent = countries.map((country) => <></>);

  //function getInnerComponent(countries) {
  //  return countries.map((country) => <></>);
  //}

  return (
    <div>
      {show && (
        <div className={css.container}>
          <div className={css.dropDown} id="country-drop-down">
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
              {countries.map(country => (
                <CountryList
                  key={countries.indexOf(country)}
                  setValue={props.setValue}
                  country={country}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardInfoCountrySelector;
