import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './ActivatedHeader.scss';

function SearchNav({ setIsClickedNav, isClickedNav }) {
  const [whichIsClicked, setWhichIsClicked] = useState('');
  const [personCardData, setPersonCardData] = useState([]);
  const [searchLocation, setSerchLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
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

  return (
    <div className="Navigation">
      <nav>
        <div className="Room">
          <div className="text">숙소</div>
        </div>
        <div className="SearchBarContainer">
          <div className="SearchBar" type="button">
            <div
              className="Location"
              whichIsClicked={whichIsClicked}
              onClick={() => userSelectThis('location')}
            >
              <div className="LocationDiv">
                <span className="LocationText">위치</span>
                <input
                  classnem="LocationInput"
                  placeholder="어디로 여행가세요?"
                  value={searchLocation}
                  onChange={changeLocationInput}
                  name="location"
                />
              </div>
            </div>
            <div
              className="CheckIn"
              whichIsClicked={whichIsClicked}
              onClick={() => userSelectThis('checkIn')}
            >
              <div className="CheckInDiv">
                <span className="CheckInText">체크인</span>
                <input
                  className="CheckInInput"
                  placeholder="날짜입력"
                  value={checkInDate}
                  onChange={changeLocationInput}
                  name="checkIn"
                />
              </div>
            </div>
            <div
              className="CheckOut"
              whichIsClicked={whichIsClicked}
              onClick={() => userSelectThis('checkOut')}
            >
              <div className="CheckOutDiv">
                <span className="CheckOutText">체크아웃</span>
                <input
                  className="CheckOutInput"
                  placeholder="날짜 입력"
                  value={checkOutDate}
                  onChange={changeLocationInput}
                  name="checkOut"
                />
              </div>
            </div>

            <button className="PersonNum" whichIsClicked={whichIsClicked}>
              <div
                className="PersonDiv"
                onClick={() => userSelectThis('personNum')}
              >
                {/* <span className="PersonText">인원</span>
              <span classneme="PersonInput">
                {personNum + childNum > 0
                  ? `게스트 ${personNum + childNum}명`
                  : '게스트 추가'}
              </span> */}
              </div>
              <div className="MapContainer">
                {whichIsClicked === 'personNum' &&
                  personCardData.map(card => {
                    return (
                      <span
                        className="Person"
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
                className="SearchZoom"
                type="button"
                onClick={() => {
                  return goToListPage(), setIsClickedNav(!isClickedNav);
                }}
                disabled={searchBtnDisabled}
              >
                <FaSearch className="search" />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SearchNav;
