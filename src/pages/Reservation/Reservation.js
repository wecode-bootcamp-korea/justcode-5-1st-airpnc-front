import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Home from '../Home/Home';
import css from './Reservation.module.scss';
import footer from '../../components/Footer/Footer';
import PayOptionSelector from './PayOptionSelector';
import CardInfoCountrySelector from './CardInfoCountrySelector';
import PriceBreakDown from './PriceBreakDown';
import ReservationConfirmed from './ReservationConfirmed';
import ReservationNotValid from './ReservationNotValid';
import { MdNavigateBefore, MdCreditCard } from 'react-icons/md';
import { SiVisa, SiMastercard } from 'react-icons/si';
import { GrAmex } from 'react-icons/gr';
import { RiArrowDropDownLine, RiMedalFill } from 'react-icons/ri';
import { TiTags, TiStarFullOutline } from 'react-icons/ti';
import { IoDiamondOutline } from 'react-icons/io5';

///////////////////////////////////////////////////
/////      img and icons
const profileImgCat = '/images/profile/cat.png';

const priceRateSummary = 'This is a rare find.';
const priceRateDetail = `Sarah's place is usually booked.`;

const requirements = {
  title: 'Message the host',
  message: `Let the host know why you're travelling and when you'll check in.`,
};

/////////// MockData ///////////////////
const host = {
  profileImg: profileImgCat,
  name: 'Sarah',
  joinedIn: '2018',
};

const room = {
  id: 1,
  name: 'Winter Wonderland, 3BR, Fireplace, Cozy',
  type: 'Entire Villa',
  price: 603000,
  rate: 4.9,
  rateCnt: 11,
  hostType: 'superhost',
  repImg: '/images/room_rep/cabin.png',
};

const reservation = {
  id: 1,
  guests: 4,
  checkin: '2022-06-10 23:55:45.000000',
  checkout: '2022-06-14 23:55:45.000000',
};

const airbnbConst = {
  customerAgreement: `By selecting the button below, I agree to the Host's House Rules, Airbnb's Rebooking and Refund Policy, and that Airbnb can charge my payment method if I’m responsible for damage.`,
  aircover: `Your booking is potected by aircover`,
  nonRefundable: `This reservation is non-refundable.`,
};

//////////////////////////////////////////////////

const Reservation = props => {
  const navigate = useNavigate();
  const homepage = '/';
  const detailpage = '/detail';
  const airbnbLogo = 'icons/256px-Airbnb_Logo.svg.png';

  const handleNavigateBtn = address => {
    navigate(address);
  };

  // useState for reservation //
  // todo: edit option for dates and guests
  const [checkin, setCheckin] = useState(reservation.checkin);
  const [checkout, setCheckout] = useState(reservation.checkout);
  const [guests, setGuests] = useState(reservation.guests);

  useEffect(() => {
    reservation.checkin = checkin;
  }, [checkin]);

  useEffect(() => {
    reservation.checkout = checkout;
  }, [checkout]);

  useEffect(() => {
    reservation.guests = guests;
  }, [guests]);

  const [isPayOptVisible, setPayOptVisible] = useState(false);

  const payOptCloseHandler = e => {
    setPayOptVisible(e);
  };

  const [isCountryOptVisible, setCountryOptVisible] = useState(false);
  const countryOptCloseHandler = e => {
    setPayOptVisible(e);
  };

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
    setConfirmationVisible(e);
  };

  const [isNotConfirmedVisible, setConfirmationFailedVisible] = useState(false);
  const notPayable = () => {
    setConfirmationFailedVisible(!isNotConfirmedVisible);
  };

  const confirmationFailedCloseHandler = e => {
    setConfirmationFailedVisible(e);
  };

  //input validation
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

  const yourTripDate = () => {
    let checkinDate = new Date(checkin).toDateString().split(' ');
    let checkoutDate = new Date(checkout).toDateString().split(' ');
    if (checkinDate[3] === checkoutDate[3]) {
      if (checkinDate[1] === checkoutDate[1]) {
        return `${checkinDate[1]}. ${checkinDate[2]} - ${checkoutDate[2]}`; // same year and month
      } else {
        return `${checkinDate[1]}. ${checkinDate[2]} -  ${checkoutDate[1]}. ${checkoutDate[2]}`;
      }
    }
    return `${checkinDate[3]} ${checkinDate[1]}. ${checkinDate[2]} - ${checkoutDate[3]} ${checkoutDate[1]}. ${checkoutDate[2]}`;
  };

  return (
    <div className={css.container}>
      <header className={css.reserveBanner}>
        <div className={css.reserveBannerInner}>
          <div className={css.logoBox}>
            <img
              className={css.logoToHome}
              id={css.logoButton}
              alt="airbnb"
              src={airbnbLogo}
              onClick={event => {
                handleNavigateBtn(homepage);
              }}
            />
          </div>
        </div>
      </header>
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
                <h1 className={css.reserveContentTitleText}>
                  Confirm and pay • Airbnb
                </h1>
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
                      <p className={css.priceRateSummary}>{priceRateSummary}</p>
                      <p className={css.priceRateDetail}>{priceRateDetail}</p>
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
                        <h3>Dates</h3>
                        <p className={css.yourTripDate}>{yourTripDate()}</p>
                      </div>
                      <div className={`${css.rclGuests}`}>
                        <h3>Guests</h3>
                        <p>
                          {reservation.guests}
                          {reservation.guests > 1 ? ' guests' : ' guest'}
                        </p>
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
                              <MdCreditCard />
                            </div>
                            <div className={css.payOptionSelectorDescription}>
                              <span>Credit or debit card</span>
                            </div>
                            <div className={css.payOptionSelectorArrowDrop}>
                              <RiArrowDropDownLine />
                            </div>
                            <PayOptionSelector
                              show={isPayOptVisible}
                              onClose={payOptCloseHandler}
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
                                    setInputPlaceholder(event.target.id, '123');
                                    setCardCVV(event.target.value);
                                  }}
                                  onBlur={event => {
                                    setInputPlaceholder(event.target.id, 'CVV');
                                  }}
                                  onChange={event => {
                                    setCardCVV(event.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={css.cardInfoPostalCode}>
                            <input
                              className={css.cardPostalCodeInput}
                              id="cardCVVInput"
                              type="text"
                              placeholder="Postal code"
                              pattern="[0-9]{6}"
                              maxLength="6"
                              value={cardPostalCode}
                              autoComplete="off"
                              onFocus={event => {
                                setInputPlaceholder(event.target.id, '');
                                setCardPostalCode(event.target.value);
                              }}
                              onBlur={event => {
                                setInputPlaceholder(event.target.id, '');
                              }}
                              onChange={event => {
                                setCardPostalCode(event.target.value);
                              }}
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
                            src={host.profileImg}
                          />
                        </div>
                        <div className={css.hostProfileDescription}>
                          <div className={css.hostName}>{host.name}</div>
                          <div className={css.hostJoinedIn}>
                            Joined In {host.joinedIn}
                          </div>
                        </div>
                      </div>
                      <div
                        className={css.messageToHost}
                        id="message-to-host"
                      ></div>
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
                  ></div>
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
                      className={css.rclConfirmAndPayBtn}
                      id="confirm-pay-btn"
                      onClick={event => {
                        isPayable ? handleConfirmBtn(event) : notPayable();
                      }}
                    >
                      Confirm and pay • Airbnb
                    </button>
                    {isPayable ? (
                      <ReservationConfirmed
                        show={isConfirmedVisible}
                        onClose={confirmationCloseHandler}
                        yourTripDate={yourTripDate()}
                        guests={guests}
                      />
                    ) : (
                      <ReservationNotValid
                        show={isNotConfirmedVisible}
                        onClose={confirmationFailedCloseHandler}
                      />
                    )}
                  </div>
                </div>
              </section>
              <section className={css.reserveContentRightSection}>
                <div className={css.reserveContentRight}>
                  <div className={css.rcrPinnedBox}>
                    <div className={css.rcrAccommodationSummary}>
                      <div className={css.rcrAccommodationSummaryInner}>
                        <div className={css.accommodationPhotoBox}>
                          <img
                            className={css.accommodationPhoto}
                            alt="where?"
                            src={room.repImg}
                          />
                        </div>
                        <div className={css.accommodationDescription}>
                          <div className={css.roomType}>{room.type}</div>
                          <div className={css.roomName}>{room.name}</div>
                          <div className={css.roomEtcInfo}>
                            <div className={css.roomRate}>
                              <TiStarFullOutline />
                              {room.rate}({room.rateCnt}reviews)
                            </div>
                            <p>&nbsp; • &nbsp;</p>
                            <div className={css.roomHostType}>
                              <RiMedalFill />
                              {room.hostType}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={css.rcrAircover}>
                      <div className={css.rcrAircoverInner}>
                        {airbnbConst.aircover}
                      </div>
                    </div>
                    <div className={css.rcrPriceDetails}>
                      <div className={css.rcrPriceDetailsInner}>
                        <h2>Price details</h2>
                        <div className={css.rcrPriceBreakDown}>
                          <PriceBreakDown
                            room={room}
                            reservation={reservation}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
      <div>
        <footer className={css.reserveContentFooter}>
          ! footer need to be added here!
        </footer>
      </div>
    </div>
  );
};

export default Reservation;
