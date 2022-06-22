import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Reservation.module.scss';
import footer from '../../components/Footer/Footer';
import PayOptionSelector from './PayOptionSelector';
import CardInfoCountrySelector from './CardInfoCountrySelector';
import { MdNavigateBefore, MdCreditCard } from 'react-icons/md';
import { SiVisa, SiMastercard } from 'react-icons/si';
import { GrAmex } from 'react-icons/gr';
import { RiArrowDropDownLine, RiMedalFill } from 'react-icons/ri';
import { TiTags, TiStarFullOutline } from 'react-icons/ti';
///////////////////////////////////////////////////
/* temporary import for test // need to be deleted*/
// temp mock data
// img and icons
const profileImgCat = '/images/profile/cat.png';
const roomCabin = '/images/room_rep/cabin.png';
//
const priceRateSummary = 'Good Price';
const priceRateDetail =
  'Your dates are $456 CAD less than the avg. nightly rate over the last 3 months.';

const requirements = {
  title: 'Message the host',
  message: `Let the host know why you're travelling and when you'll check in.`,
};
const host = {
  profileImg: profileImgCat,
  name: 'Sarah',
  joinedIn: '2018',
};

const room = {
  name: 'Winter Wonderland, 3BR, FirePlace, Farm',
  type: 'Entire Villa',
  repImg: roomCabin,
  rate: 4.9,
  rateCnt: 11,
  hostType: 'superhost',
  price: 400000,
};
const reservation = {
  checkin: `2022.06.10`,
  checkout: `2022.06.14`,
  guests: 4,
};

const airbnbConst = {
  customerAgreement: `By selecting the button below, I agree to the Host's House Rules, Airbnb's Rebooking and Refund Policy, and that Airbnb can charge my payment method if I’m responsible for damage.`,
  aircover: `Your booking is potected by aircover`,
  nonRefundable: `This reservation is non-refundable.`,
};

//////////////////////////////////////////////////

function Reservation() {
  const navigate = useNavigate();
  const homepage = 'http://localhost:3000';
  const airbnbLogo = 'icons/256px-Airbnb_Logo.svg.png';

  const logoOnClick = () => {
    navigate(homepage);
  };

  const getTotalNights = (date1, date2) => {
    let checkin = new Date(date1);
    let checkout = new Date(date2);
    let diff = Math.abs(checkout.getTime() - checkin.getTime());
    let noofdays = Math.ceil(diff / (1000 * 3600 * 24));
    return noofdays - 1;
  };

  const getTotalAmount = () => {
    return (
      room.price * getTotalNights(reservation.checkin, reservation.checkout)
    );
  };

  const [totalNights, setTotalNights] = useState(
    getTotalNights(reservation.checkin, reservation.checkout)
  );

  const [totalAmount, setTotalAmount] = useState(getTotalAmount());

  useEffect(() => {
    setTotalNights(getTotalNights(reservation.checkin, reservation.checkout));
    setTotalAmount(getTotalAmount());
  }, [reservation.checkin]);

  const [isPayOptVisible, setPayOptVisible] = useState(false);
  const payOptionSelector = () => {
    console.log('pay option selector is clicked');
  };

  const payOptCloseHandler = e => {
    setPayOptVisible(e);
    console.log(`closeHandler called ${isPayOptVisible}`);
  };

  const [isCountryOptVisible, setCountryOptVisible] = useState(false);
  const countryOptCloseHandler = e => {
    setPayOptVisible(e);
    console.log(`closeHandler called ${isPayOptVisible}`);
  };

  // CardNumber Input Control
  const [cardNumber, setCardNumber] = useState('');
  const [isCardNumberInputActive, setCardNumberInputActive] = useState(false);

  const setInputPlaceholder = (id, str) => {
    document.getElementById(id).placeholder = str;
  };

  const [cardExpiration, setCardExpiration] = useState('');
  const [isCardExpirationInputActive, setCardExpirationInputActive] =
    useState(false);

  const setCardExpireDateFormat = input => {
    if (input < 3) {
      return input;
    } else {
      return input;
    }
  };

  const [cardCVV, setCardCVV] = useState('');
  const [isCardCVVInputActive, setCardCVVInputActive] = useState(false);

  const [cardPostalCode, setCardPostalCode] = useState('');
  const [isCardPostalCodeInputActive, setCardPostalCodeInputActive] =
    useState(false);

  const [cardInfoCountry, setCardCountry] = useState('Country/region');
  const [isCardCountryVisible, setCardCountryVisible] = useState(false);

  const [isCardDropDown, setCardDropDown] = useState(false);
  const [iscardDropDownVisible, setCardDropDownVisible] = useState(false);

  const [isPayClicked, setConfirmAndPay] = useState(false);

  const handleConfirmBtn = () => {
    console.log('button clicked');
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
    let checkin = new Date(reservation.checkin).toDateString().split(' ');
    let checkout = new Date(reservation.checkout).toDateString().split(' ');
    if (checkin[3] === checkout[3]) {
      if (checkin[1] === checkin[1]) {
        return `${checkin[1]}. ${checkin[2]} - ${checkout[2]}`; // same year and month
      } else {
        return `${checkin[1]}. ${checkin[2]} -  ${checkout[1]}. ${checkout[2]}`;
      }
    }
    return `${checkin[3]} ${checkin[1]}. ${checkin[2]} - ${checkout[3]} ${checkout[1]}. ${checkout[2]}`;
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
              onClick={logoOnClick}
            />
          </div>
        </div>
      </header>
      <div className={css.reserveContentBody}>
        <main className={css.reserveContentMain} id="reserve-content">
          <section>
            <div className={css.reserveContentTitle}>
              <div className={css.reserveContentTitleInner}>
                <button className={css.iconNavigateBefore}>
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
                      <div className={css.iconPriceTag}>
                        <TiTags />
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
                            console.log(isPayOptVisible);
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
                                  value={setCardExpireDateFormat(
                                    cardExpiration
                                  )}
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
                              onClick={() => {
                                console.log(isPayOptVisible);
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
                    >
                      Confirm and pay • Airbnb
                    </button>
                  </div>
                </div>
              </section>
              <section>
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
                          <div className={css.priceByNights}>
                            <div className={css.priceByNightsDetail}>
                              {room.price} * {totalNights} nights
                            </div>
                            <div>{totalAmount}</div>
                          </div>
                          <div>
                            <div>Cleaning fee</div>
                            <div>
                              {(parseFloat(totalAmount) * 0.084).toFixed(0)}
                            </div>
                          </div>
                          <div>
                            <div>Service fee</div>
                            <div>
                              {(parseFloat(totalAmount) * 0.17).toFixed(0)}
                            </div>
                          </div>
                          <div>
                            <div>Occupancy taxed and fees</div>
                            <div>{totalAmount}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={css.rcrTotal}>
                      ToTal (KRW)
                      {Intl.NumberFormat('kr-KR', {
                        style: 'currency',
                        currency: 'KRW',
                      }).format(Number(totalAmount))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
      <div>
        <footer className={css.reserveContentFooter}> footer </footer>
      </div>
    </div>
  );
}

export default Reservation;
