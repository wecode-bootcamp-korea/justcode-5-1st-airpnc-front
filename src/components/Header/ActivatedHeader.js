import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import css from './ActivatedHeader.module.scss';

function SearchNav({ setIsClickedNav, isClickedNav }) {
  const [whichIsClicked, setWhichIsClicked] = useState('');
  const [personCardData, setPersonCardData] = useState([]);
  const [searchLocation, setSerchLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('날짜입력');
  const [checkOutDate, setCheckOutDate] = useState('날짜입력');
  const [personNum, setPersonNum] = useState(0);
  const [childNum, setChildNum] = useState(0);
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('data/PersonData.json')
      .then(res => res.json())
      .then(data => {
        setPersonCardData(data);
      });
  }, []);

  const goToListPage = () => {
    if (!searchLocation) {
      alert('장소를 입력해주세요');
      return;
    } else if (!checkInDate) {
      alert('체크인 날짜를 입력해주세요');
      return;
    } else if (!checkOutDate) {
      alert('체크아웃 날짜를 입력해주세요');
      return;
    }
    // else if (!personNum + childNum) {
    //   alert('인원을 선택해주세요');
    //   return;
    // }

    setWhichIsClicked('ㅇ');

    // navigate(
    //   `roomlist?location=${searchLocation}&check_in=${checkInDate}&check_out=${checkOutDate}&guest=${
    //     personNum + childNum
    //   }`
    // );
  };

  const userSelectThis = buttonName => {
    setWhichIsClicked(buttonName);
  };

  //   const plusPersonNumber = title => {
  //     if (title === '성인') {
  //       setPersonNum(personNum + 1);
  //     } else if (title === '어린이') {
  //       setChildNum(childNum + 1);
  //     }
  //   };

  //   const minusPersonNumber = title => {
  //     if (title === '성인') {
  //       setPersonNum(personNum - 1);
  //     } else if (title === '어린이') {
  //       setChildNum(childNum - 1);
  //     }
  //   };

  const changeLocationInput = e => {
    if (e.target.name === 'location') {
      setSerchLocation(e.target.value);
    } else if (e.target.name === 'checkIn') {
      setCheckInDate(e.target.value);
    } else if (e.target.name === 'checkOut') {
      setCheckOutDate(e.target.value);
    }
  };

  const changeInputType = (id, type) => {
    document.getElementById(id).type = type;
  };

  const setInputPlaceholder = (id, str) => {
    document.getElementById(id).placeholder = str;
  };

  return (
    <div className={css.navigation}>
      <nav>
        <div className={css.room}>
          <div className={`${css.text} ${css.textHeaderBig}`}>
            <span>숙소</span>
          </div>
        </div>
        <div className={css.searchBarContainer}>
          <div className={css.searchBar} type="button">
            <div
              className={css.location}
              whichIsClicked={whichIsClicked}
              onClick={() => userSelectThis('location')}
            >
              <div className={css.innerDivider}>
                <div className={css.locationDiv}>
                  <span
                    className={`${css.locationText} ${css.textHeaderSmall}`}
                  >
                    위치
                  </span>
                  <input
                    id="location-input-on-header"
                    className={`${css.locationInput} ${css.textInput}`}
                    type="text"
                    placeholder="어디로 여행가세요?"
                    value={searchLocation}
                    onChange={changeLocationInput}
                    name="location"
                    onFocus={event => {
                      setInputPlaceholder(event.target.id, '');
                    }}
                    onBlur={event => {
                      if (event.target.value.length < 1) {
                        setInputPlaceholder(
                          event.target.id,
                          '어디로 여행가세요?'
                        );
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className={css.checkIn}
              whichIsClicked={whichIsClicked}
              onClick={() => userSelectThis('checkIn')}
            >
              <div className={`${css.innerDivider} ${css.centerLine}`}>
                <div className={css.checkInDiv}>
                  <span className={`${css.checkInText} ${css.textHeaderSmall}`}>
                    체크인
                  </span>
                  <input
                    id="check-in-input-on-header"
                    className={`${css.checkInInput} ${css.textInput}`}
                    type="text"
                    placeholder={checkInDate}
                    value={checkInDate}
                    onChange={changeLocationInput}
                    name="checkIn"
                    onFocus={event => changeInputType(event.target.id, 'date')}
                    onBlur={event => changeInputType(event.target.id, 'text')}
                  />
                </div>
              </div>
            </div>
            <div
              className={css.checkOut}
              whichIsClicked={whichIsClicked}
              onClick={() => userSelectThis('checkOut')}
            >
              <div className={`${css.innerDivider}`}>
                <div className={css.checkOutDiv}>
                  <span
                    className={`${css.checkOutText}  ${css.textHeaderSmall}`}
                  >
                    체크아웃
                  </span>
                  <input
                    id="check-out-input-on-header"
                    className={`${css.checkOutInput} ${css.textInput}`}
                    type="text"
                    placeholder={checkOutDate}
                    value={checkOutDate}
                    onChange={changeLocationInput}
                    name="checkOut"
                    onFocus={event => changeInputType(event.target.id, 'date')}
                    onBlur={event => changeInputType(event.target.id, 'text')}
                  />
                </div>
              </div>
            </div>
            <div className={css.personNum} whichIsClicked={whichIsClicked}>
              <div className={`${css.innerDivider} ${css.searchButton}`}>
                <div
                  className={css.personDiv}
                  onClick={() => userSelectThis('personNum')}
                >
                  {/* <span className={`${css.personText} ${css.textHeaderSmall}`}
                    >
                      인원
                    </span>
                    <span className={`${css.personInput}`}>
                      {personNum + childNum > 0
                        ? `게스트 ${personNum + childNum}명`
                        : '게스트 추가'}
                    </span> */}
                </div>
                <div className={css.mapContainer}>
                  {whichIsClicked === 'personNum' &&
                    personCardData.map(card => {
                      return (
                        <span
                          className={css.person}
                          key={card.id}
                          id={card.id}
                          title={card.title}
                          subtitle={card.subTitle}
                          backgroundcolor={card.backgroundcolor}
                          personNum={personNum}
                          childNum={childNum}
                          //   plusPersonNumber={plusPersonNumber}
                          //   minusPersonNumber={minusPersonNumber}
                        />
                      );
                    })}
                </div>
                <div
                  className={css.searchZoom}
                  type="button"
                  onClick={() => {
                    goToListPage();
                    setIsClickedNav(!isClickedNav);
                  }}
                  disabled={searchBtnDisabled}
                >
                  <FaSearch className={css.searchIcon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SearchNav;
