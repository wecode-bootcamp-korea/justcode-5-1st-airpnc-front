import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Reservation.module.scss';
import footer from '../../components/Footer/Footer';
import { MdNavigateBefore, MdCreditCard } from 'react-icons/md';
import { SiVisa, SiMastercard } from 'react-icons/si';
import { GrAmex } from 'react-icons/gr';
import { RiArrowDropDownLine } from 'react-icons/ri';

function Reservation() {
  const navigate = useNavigate();
  const homepage = 'http://localhost:3000';
  const airbnbLogo = 'icons/256px-Airbnb_Logo_Bélo.svg.png';

  const logoOnClick = () => {
    navigate(homepage);
  };

  const payOptionSelector = () => {
    console.log('pay option selector is clicked');
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
      <div>
        <main className={css.reserveContentMain} id="reserve-content">
          <section>
            <div className={css.reserveContentTitle}>
              <div className={css.reserveContentTitleInner}>
                <div className={css.navigateBefore}>
                  <MdNavigateBefore />
                </div>
                <h1 className={css.rctText}>Confirm and pay • Airbnb</h1>
              </div>
            </div>
          </section>
          <section>
            <div className={css.reserveContent}>
              <section>
                <div className={css.reserveContentLeft}>
                  <div className={css.rclPriceRateAvg}> This is rare find.</div>
                  <div className={css.rclYourTrip}> Your trip </div>
                  <div className={css.rclDates}> Dates </div>
                  <div className={css.rclGuests}> Guests </div>
                  <div className={css.rclPayWith}>
                    <div className={css.rclPayWithTitle}>
                      <span>Pay with</span>
                    </div>
                    <div className={css.payOptionIcons}>
                      <SiVisa />
                      <GrAmex />
                      <SiMastercard />
                    </div>
                    <div className={css.payOptionSelector}>
                      <button
                        id="dropdown-selector-pay-option-btn"
                        className={css.payOptionSelectorBtn}
                        onClick={payOptionSelector}
                      >
                        <div className={css.payOptionSelectorInner}>
                          <div className={css.payOptionSelectorIcon}>
                            <MdCreditCard />
                          </div>
                          <div className={css.payOptionSelectorDescription}>
                            <span>Credit or debit card</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className={css.rclEnterCoupon}> Enter a coupon </div>
                  <div className={css.rclRequirements}>
                    'Required for your trip'
                  </div>
                  <div className={css.rclCancellationPolicy}>
                    Cancellation Policy
                  </div>
                  <div className={css.rclCovid19Policy}>'covid 19'</div>
                  <div className={css.rclAgreementUpon}>agreement</div>
                  <div className={css.rclConfirmAndPay}>
                    Confirm and pay Airbnb
                  </div>
                </div>
              </section>
              <aside>
                <div className={css.reserveContentRight}>
                  <div className={css.rcrPinnedBox}>
                    <div className={css.rcrAccommodationSummary}>
                      Entire home
                    </div>
                    <div className={css.rcrAircover}>
                      Your booking is potected by aircover
                    </div>
                    <div className={css.rcrPriceDetails}> Price details </div>
                    <div className={css.rcrTotal}> Total (USD) $ </div>
                  </div>
                </div>
              </aside>
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
