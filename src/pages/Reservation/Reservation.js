import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import css from './Reservation.module.scss';
import Footer from '../../components/Footer/Footer';
import PayOptionSelector from './Modal/PayOptionSelector';
import CardInfoCountrySelector from './Modal/CardInfoCountrySelector';
import ReservationConfirmed from './Modal/ReservationConfirmed';
import ReservationNotValid from './Modal/ReservationNotValid';
import PinnedBox from './Modal/PinnedBox';
import { MdNavigateBefore, MdCreditCard } from 'react-icons/md';
import { SiVisa, SiMastercard } from 'react-icons/si';
import { GrAmex } from 'react-icons/gr';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { TiTag } from 'react-icons/ti';
import { IoDiamondOutline } from 'react-icons/io5';
import SubHeader from '../../components/Header/SubHeader';

///////////////        CONSTANTS              //////////////////
const priceRateSummary = 'This is a rare find.';
const priceRateDetail = `'s place is usually booked.`;

const requirements = {
  title: 'Message the host',
  message: `Let the host know why you're travelling and when you'll check in.`,
};

const airbnbConst = {
  customerAgreement: `By selecting the button below, I agree to the Host's House Rules, Airbnb's Rebooking and Refund Policy, and that Airbnb can charge my payment method if I’m responsible for damage.`,
  aircover: `Your booking is potected by aircover`,
  nonRefundable: `This reservation is non-refundable.`,
};

/////////////////////////////////////////////////////////////////////////////////////////

const Reservation = props => {
  //const token = localStorage.getItem('login-token');
  // use room, reservation info from useLocation when reservationBox is imported to detail page
  const rawData = useLocation().state.data;
  const room = useLocation().state.room;
  const reservation = useLocation().state.reservation;
  const reviewScore = useLocation().state.Score;
  const reviewCnt = useLocation().state.reviewCnt;
  const today = useLocation().state.today;

  const hostJoinedIn = room.hostJoinedIn.split('-')[0];

  // useState for reservation //
  const [checkin, setCheckin] = useState(reservation.checkin);
  const [checkout, setCheckout] = useState(reservation.checkout);
  const [nights, setNights] = useState(reservation.nights);
  const [guests, setGuests] = useState(reservation.guests || 1);
  const [reservationNumber, setReservationNumber] = useState(-1);
  const [isDateValid, setDateValid] = useState(true);
  const [isBtnActive, setBtnActive] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const navigate = useNavigate();
  const detailpage = '/detail';

  const handleNavigateBtn = address => {
    navigate(address, { state: { data: rawData, reservation } });
  };

  const getTotalNights = (date1, date2) => {
    let checkin = new Date(date1);
    let checkout = new Date(date2);
    let diff = Math.abs(checkout.getTime() - checkin.getTime());
    let noofdays = Math.ceil(diff / (1000 * 3600 * 24));
    return noofdays;
  };

  useEffect(() => {
    checkDateValid(checkin, checkout);
  }, [checkin, checkout]);

  useMemo(() => {
    reservation.nights = nights;
  }, [nights]);

  useEffect(() => {
    reservation.guests = guests;
  }, [guests]);

  const yourTripDate = () => {
    if (moment(checkin).year() === moment(checkout).year()) {
      if (moment(checkin).month() === moment(checkout).month()) {
        return `${moment(checkin).format('MMM. D')} - ${moment(checkout).format(
          'D'
        )}`; // same year and month
      } else {
        return `${moment(checkin).format('MMM, D')} ${moment(checkout).format(
          'MMM, D'
        )}`;
      }
    }
    return `${moment(checkin).format('YYYY. MMM. D')} ${moment(checkout).format(
      'YYYY. MMM. D'
    )}`;
  };

  const checkDateValid = (d1, d2) => {
    const date1 = new Date(d1);
    const date1Year = date1.getFullYear();
    const date1Month = date1.getMonth() + 1;
    const date1Date = date1.getDate() + 1;
    // date1 is checkin date to compare with today
    const dateIn = new Date(`${date1Year}-${date1Month}-${date1Date}`);

    const date2 = new Date(d2);
    const date2Year = date2.getFullYear();
    const date2Month = date2.getMonth() + 1;
    const date2Date = date2.getDate() + 1;
    // dateIn is checkin date to compare with today
    const dateOut = new Date(`${date2Year}-${date2Month}-${date2Date}`);

    if (isNaN(date1) || isNaN(date2)) {
      setDateValid(false);
      setBtnActive(false);
      setAlertMsg(`날짜를 확인해주세요.`);
      return;
    } else if (dateIn.getTime() < today.getTime()) {
      setAlertMsg(
        `날짜를 확인해주세요.\n오늘 이후 날짜 ${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()} 를 선택해주세요`
      );
      setDateValid(false);
      setBtnActive(false);
      return;
    } else if (dateIn.getTime() === dateOut.getTime()) {
      setAlertMsg('체크인 날짜와 체크아웃 날짜를 확인해주세요');
      setDateValid(false);
      setBtnActive(false);
      return;
    } else if (dateIn.getTime() > dateOut.getTime()) {
      setAlertMsg('체크인 날짜와 체크아웃 날짜를 확인해주세요');
      setDateValid(false);
      setBtnActive(false);
      return;
    } else {
      setDateValid(true);
      setNights(getTotalNights(date1, date2));
      setBtnActive(true);
      reservation.checkin = dateIn;
      reservation.checkout = dateOut;
      //setNights(moment(checkout).diff(moment(checkin), 'days'));
      return;
    }
  };

  const [isDateEditClicked, setDateEditClicked] = useState(false);
  const handleDateEditBtn = e => {
    setDateEditClicked(!isDateEditClicked);
  };

  const [isPayOptVisible, setPayOptVisible] = useState(false);

  const payOptCloseHandler = e => {
    setPayOptVisible(false);
  };

  const [payOption, setPayOption] = useState('Credit or debit card');
  const [payOptionIcon, setPayOptionIcon] = useState(<MdCreditCard />);
  const [isCountryOptVisible, setCountryOptVisible] = useState(false);
  const token = localStorage.getItem('login-token');
  const countryOptCloseHandler = e => {
    setCountryOptVisible(false);
  };

  useEffect(() => {
    if (payOption === 'Visa') {
      setPayOptionIcon(<SiVisa color="#122d98" />);
    } else if (payOption === `Amex`) {
      setPayOptionIcon(<GrAmex color="#2578bc" />);
    } else if (payOption === 'Master') {
      setPayOptionIcon(<SiMastercard color="#f26122" />);
    } else {
      setPayOptionIcon(<MdCreditCard />);
    }
  }, [payOption]);

  // CardNumber Input Control
  const [cardNumber, setCardNumber] = useState('');
  const [isCardNumberValid, setCardNumberValidity] = useState(false);

  useMemo(() => {
    let text = cardNumber.replace(/\s/g, '');
    let pattern = /[0-9]{12}/;
    pattern.test(text)
      ? setCardNumberValidity(true)
      : setCardNumberValidity(false);
  }, [cardNumber]);
  const setInputPlaceholder = (id, str) => {
    document.getElementById(id).placeholder = str;
  };

  const [cardExpiration, setCardExpiration] = useState('');
  const [isCardExpirationValid, setCardExpirationValidity] = useState(false);

  useMemo(() => {
    let text = cardExpiration;
    let pattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    pattern.test(text)
      ? setCardExpirationValidity(true)
      : setCardExpirationValidity(false);
  }, [cardExpiration]);

  const [cardCVV, setCardCVV] = useState('');
  const [isCardCVVValid, setCardCVVValidity] = useState(false);
  useMemo(() => {
    let text = cardCVV;
    let pattern = /[0-9]{3}/;
    pattern.test(text) ? setCardCVVValidity(true) : setCardCVVValidity(false);
  }, [cardCVV]);

  const [cardPostalCode, setCardPostalCode] = useState('');
  const [isCardPostalCodeValid, setCardPostalCodeValidity] = useState(false);
  useMemo(() => {
    let text = cardPostalCode;
    let pattern = /[0-9]{6}/;
    pattern.test(text)
      ? setCardPostalCodeValidity(true)
      : setCardPostalCodeValidity(false);
  }, [cardPostalCode]);

  const [cardInfoCountry, setCardCountry] = useState('Country/region');
  const [isPayable, setPayable] = useState(false);

  useMemo(() => {
    if (
      isDateValid &&
      isCardNumberValid &&
      isCardExpirationValid &&
      isCardCVVValid &&
      isCardPostalCodeValid
    ) {
      setPayable(true);
    } else {
      setPayable(false);
    }
  }, [
    isDateValid,
    isCardNumberValid,
    isCardExpirationValid,
    isCardCVVValid,
    isCardPostalCodeValid,
  ]);

  const [isConfirmedVisible, setConfirmationVisible] = useState(false);

  const handleConfirmBtn = () => {
    setConfirmationVisible(!isConfirmedVisible);
  };

  const confirmationCloseHandler = e => {
    setConfirmationVisible(false);
  };

  const [isNotConfirmedVisible, setConfirmationFailedVisible] = useState(false);
  const notPayable = () => {
    setConfirmationFailedVisible(!isNotConfirmedVisible);
  };

  const confirmationFailedCloseHandler = e => {
    setConfirmationFailedVisible(e);
  };

  // TO DO : input validation on 'pay with' section
  function checkValidity(aID, aSearchTerm, aMsg) {
    let elem = document.getElementById(aID);
    let invalid = elem.value.indexOf(aSearchTerm) < 0;
    if (invalid) {
      elem.setAttribute('aria-invalid', 'true');
      updateAlert(aMsg);
    } else {
      elem.setAttribute('aria-invalid', 'false');
      updateAlert();
    }
  }

  function updateAlert(msg) {
    let oldAlert = document.getElementById('alert');
    if (oldAlert) {
      document.body.removeChild(oldAlert);
    }

    if (msg) {
      let newAlert = document.createElement('div');
      newAlert.setAttribute('role', 'alert');
      newAlert.setAttribute('id', 'alert');
      let content = document.createTextNode(msg);
      newAlert.appendChild(content);
      document.body.appendChild(newAlert);
    }
  }

  return (
    <>
      {token ? <SubHeader login /> : <SubHeader />}
      <div className={css.container}>
        <div className={css.reserveContentBody}>
          <main className={css.reserveContentMain} id="reserve-content">
            <section>
              <div className={css.reserveContentTitle}>
                <div className={css.reserveContentTitleInner}>
                  <button
                    className={css.iconNavigateBefore}
                    onClick={event => {
                      handleNavigateBtn(detailpage);
                    }}
                  >
                    <MdNavigateBefore />
                  </button>
                  <h1 className={css.reserveContentTitleText}>확인 및 결제</h1>
                </div>
              </div>
            </section>
            <section className={css.reserveContentSection}>
              <div className={css.reserveContent}>
                <section>
                  <div className={css.reserveContentLeft}>
                    <div className={css.rclPriceRateAvgContainer}>
                      <div
                        className={`${css.rclPriceRateAvg} ${css.reserveContentLeftInner}`}
                      >
                        <p className={css.priceRateSummary}>
                          {priceRateSummary}
                        </p>
                        <p className={css.priceRateDetail}>
                          {room.hostname}
                          {priceRateDetail}
                        </p>
                        <div className={css.iconPriceTag} id="price-tag">
                          <IoDiamondOutline />
                        </div>
                      </div>
                    </div>
                    <div className={css.rclYourTripContainer}>
                      <div className={`${css.rclYourTrip}`}>
                        <div className={css.rclYouTripTitle}>
                          <h2>Your trip</h2>
                        </div>
                        <div className={`${css.rclDates}`}>
                          <div>
                            <h3>Dates</h3>
                            <p className={css.yourTripDate}>{yourTripDate()}</p>
                            <p>{isDateValid ? '' : '!Date not Valid!'}</p>
                          </div>
                          <div>
                            <button
                              className={`${css.dateEdit} ${css.editBtn} ${css.editBtnvisible}`}
                              onClick={event => {
                                handleDateEditBtn();
                              }}
                              disabled={false}
                            >
                              Edit
                            </button>
                            {isDateEditClicked && (
                              <div
                                className={
                                  isDateValid
                                    ? `${css.checkInOut}`
                                    : `${css.checkInOut} ${css.checkInOutInvalid}`
                                }
                              >
                                <input
                                  className={css.checkInInput}
                                  id="checkin-input-edit"
                                  type="date"
                                  value={moment(checkin).format('YYYY-MM-DD')}
                                  min={moment(today).format('YYYY-MM-DD')}
                                  onChange={event => {
                                    setCheckin(event.target.value);
                                  }}
                                />
                                <input
                                  className={css.checkInInput}
                                  id="checkout-input-edit"
                                  type="date"
                                  min={moment(checkin)
                                    .add(1, 'days')
                                    .format('YYYY-MM-DD')}
                                  value={moment(checkout).format('YYYY-MM-DD')}
                                  onChange={event => {
                                    setCheckout(event.target.value);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={`${css.rclGuests}`}>
                          <div>
                            <h3>Guests</h3>
                            <p>
                              {guests}
                              {guests > 1 ? ' guests' : ' guest'}
                            </p>
                          </div>
                          <div>
                            <button className={css.editBtn}>Edit</button>
                            <input
                              className={css.editGuestInput}
                              id="guests-edit"
                              type="number"
                              value={guests}
                              onChange={event => {
                                setGuests(event.target.value);
                              }}
                              min="1"
                              max="20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={css.rclPayWithContainer}>
                      <div
                        className={`${css.rclPayWith} ${css.reserveContentLeftInner}`}
                      >
                        <div className={css.rclPayWithHeader}>
                          <div className={css.rclPayWithTitle}>
                            <h2>Pay with</h2>
                          </div>
                          <div className={css.payOptionIcons}>
                            <div className={css.cardIconVisa}>
                              <SiVisa />
                            </div>
                            <div className={css.cardIconAmex}>
                              <GrAmex />
                            </div>
                            <div className={css.cardIconMaster}>
                              <SiMastercard />
                            </div>
                          </div>
                        </div>
                        <div className={css.payOptionSelector}>
                          <button
                            className={css.payOptionSelectorBtn}
                            id="dropdown-selector-pay-option-btn"
                            onClick={() => {
                              setPayOptVisible(!isPayOptVisible);
                            }}
                          >
                            <div className={css.payOptionSelectorInner}>
                              <div className={css.payOptionSelectorIcon}>
                                {payOptionIcon}
                              </div>
                              <div className={css.payOptionSelectorDescription}>
                                <span>{payOption}</span>
                              </div>
                              <div className={css.payOptionSelectorArrowDrop}>
                                <RiArrowDropDownLine />
                              </div>
                              <PayOptionSelector
                                id="pay-option-drop-down"
                                show={isPayOptVisible}
                                onClose={payOptCloseHandler}
                                setValue={setPayOption}
                              />
                            </div>
                          </button>
                        </div>
                        <div className={css.cardInfo}>
                          <div className={css.onCard}>
                            <div className={css.cardInfoForm}>
                              <div className={css.cardNumber}>
                                <input
                                  className={css.cardNumberInput}
                                  id="cardNumberInput"
                                  type="text"
                                  pattern="[0-9\s]{13,19}"
                                  placeholder="Card Number"
                                  maxLength="19"
                                  value={cardNumber}
                                  autoComplete="cc-number"
                                  onFocus={event => {
                                    setInputPlaceholder(
                                      event.target.id,
                                      '0000 0000 0000 0000'
                                    );
                                    setCardNumber(event.target.value);
                                  }}
                                  onBlur={event => {
                                    setInputPlaceholder(
                                      event.target.id,
                                      'Card Number'
                                    );
                                  }}
                                  onChange={event => {
                                    setCardNumber(event.target.value);
                                  }}
                                  required
                                />
                              </div>
                              <div className={css.cardOtherInfo}>
                                <div className={css.cardExpiration}>
                                  <input
                                    className={css.cardExpirationInput}
                                    id="cardExpirationInput"
                                    type="text"
                                    placeholder="Expiration Date"
                                    pattern="^(0[1-9]|1[0-2])\/?([0-9]{2})$"
                                    maxLength="5"
                                    value={cardExpiration}
                                    autoComplete="off"
                                    onFocus={event => {
                                      setInputPlaceholder(
                                        event.target.id,
                                        'MM / YY'
                                      );
                                      setCardExpiration(event.target.value);
                                    }}
                                    onBlur={event => {
                                      setInputPlaceholder(
                                        event.target.id,
                                        'Expiration Date'
                                      );
                                    }}
                                    onChange={event => {
                                      setCardExpiration(event.target.value);
                                    }}
                                    required
                                  />
                                </div>
                                <div className={css.cardCVV}>
                                  <input
                                    className={css.cardCVVInput}
                                    id="cardCVVInput"
                                    type="text"
                                    pattern="[0-9]{3}"
                                    maxLength="3"
                                    placeholder="CVV"
                                    value={cardCVV}
                                    autoComplete="off"
                                    onFocus={event => {
                                      setInputPlaceholder(
                                        event.target.id,
                                        '123'
                                      );
                                      setCardCVV(event.target.value);
                                    }}
                                    onBlur={event => {
                                      setInputPlaceholder(
                                        event.target.id,
                                        'CVV'
                                      );
                                    }}
                                    onChange={event => {
                                      setCardCVV(event.target.value);
                                    }}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className={css.cardInfoPostalCode}>
                              <input
                                className={css.cardPostalCodeInput}
                                id="card-cvv-input"
                                type="text"
                                placeholder="Postal code"
                                pattern="[0-9]{6}"
                                maxLength="6"
                                value={cardPostalCode}
                                autoComplete="off"
                                onFocus={event => {
                                  setInputPlaceholder(
                                    event.target.id,
                                    '000000'
                                  );
                                  setCardPostalCode(event.target.value);
                                }}
                                onBlur={event => {
                                  setInputPlaceholder(
                                    event.target.id,
                                    'Postal Code'
                                  );
                                }}
                                onChange={event => {
                                  setCardPostalCode(event.target.value);
                                }}
                                required
                              />
                            </div>
                            <div className={css.cardInfoCountry}>
                              <button
                                className={css.cardCountryBtn}
                                id="dropdown-selector-pay-option-btn"
                                value={cardInfoCountry}
                                onClick={() => {
                                  setCountryOptVisible(!isCountryOptVisible);
                                }}
                              >
                                <div className={css.cardCountryInner}>
                                  <div className={css.cardCountryDescription}>
                                    <span>{cardInfoCountry}</span>
                                  </div>
                                  <div className={css.cardCountryArrowDrop}>
                                    <RiArrowDropDownLine />
                                  </div>
                                  <CardInfoCountrySelector
                                    id="country-drop-down"
                                    show={isCountryOptVisible}
                                    onClose={countryOptCloseHandler}
                                    setValue={setCardCountry}
                                  />
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${css.rclEnterCoupon} ${css.reserveContentLeftInner}`}
                        >
                          <p>Enter a coupon</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${css.rclRequirements} ${css.reserveContentLeftInner}`}
                    >
                      <div className={css.rclRequirementsInner}>
                        <h2>Required for your trip</h2>
                        <h3>{requirements.title}</h3>
                        <p>{requirements.message}</p>
                        <div className={css.hostProfile}>
                          <div className={css.hostProfilePhotoContainer}>
                            <img
                              className={css.hostProfilePhoto}
                              id="host-img"
                              alt="host"
                              src={room.profileImage}
                            />
                          </div>
                          <div className={css.hostProfileDescription}>
                            <div className={css.hostName}>{room.hostname}</div>
                            <div className={css.hostJoinedIn}>
                              Joined In {hostJoinedIn}
                            </div>
                          </div>
                        </div>
                        <div
                          className={css.messageToHost}
                          id="message-to-host"
                        />
                      </div>
                    </div>
                    <div
                      className={`${css.rclCancellationPolicy} ${css.reserveContentLeftInner}`}
                    >
                      <div className={css.rclCancellationPolicyInner}>
                        <h2>Cancellation Policy</h2>
                        <p>
                          {airbnbConst.nonRefundable}&nbsp;
                          <span>Learn more</span>
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${css.rclCovid19Policy} ${css.reserveContentLeftInner}`}
                    />
                    <div
                      className={`${css.rclAgreementUpon} ${css.reserveContentLeftInner}`}
                    >
                      <div className={css.rclAgreementUponInner}>
                        <p>{airbnbConst.customerAgreement}</p>
                      </div>
                    </div>
                    <div
                      className={`${css.rclConfirmAndPay} ${css.reserveContentLeftInner}`}
                    >
                      <button
                        className={
                          token && isPayable
                            ? `${css.rclConfirmAndPayBtn} ${css.rclConfirmAndPayBtnVisible}`
                            : `${css.rclConfirmAndPayBtn} ${css.rclConfirmAndPayBtnDisabled}`
                        }
                        id="confirm-pay-btn"
                        onClick={event => {
                          isPayable
                            ? handleConfirmBtn(event)
                            : notPayable(event);
                        }}
                      >
                        Confirm and pay • Airbnb
                      </button>
                      {token && isPayable ? (
                        <ReservationConfirmed
                          getNum={reservationNum =>
                            setReservationNumber(reservationNum)
                          }
                          show={isConfirmedVisible}
                          onClose={confirmationCloseHandler}
                          yourTripDate={yourTripDate()}
                          reservation={reservation}
                        />
                      ) : (
                        <ReservationNotValid
                          show={isNotConfirmedVisible}
                          onClose={confirmationFailedCloseHandler}
                          message={
                            token
                              ? 'Please check payment option !'
                              : 'Please login to process !'
                          }
                        />
                      )}
                    </div>
                  </div>
                </section>
                <section className={css.reserveContentRightSection}>
                  <PinnedBox
                    room={room}
                    reservation={reservation}
                    reviewScore={reviewScore}
                    reviewCnt={reviewCnt}
                    airbnbConst={airbnbConst}
                  />
                </section>
              </div>
            </section>
          </main>
        </div>
        <div className={css.reserveFooterContainer}>
          <footer className={css.reserveContentFooter}>
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
};

export default Reservation;
