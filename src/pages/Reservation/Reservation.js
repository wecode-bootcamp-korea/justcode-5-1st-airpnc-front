import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Reservation.module.scss';
import footer from '../../components/Footer/Footer';
import { MdNavigateBefore } from 'react-icons/fa';

function Reservation() {
  const navigate = useNavigate();
  const homepage = 'http://localhost:3000';
  const airbnbLogo = 'icons/256px-Airbnb_Logo_Bélo.svg.png';

  const logoOnClick = () => {
    navigate(homepage);
  };

  return (
    <div className={css.container}>
      <div>
        <header className={css.reserveBanner}>
          <div className={css.logoBox}>
            <img
              className={css.logoToHome}
              id={css.logoButton}
              alt="airbnb"
              src={airbnbLogo}
              onClick={logoOnClick}
            />
          </div>
        </header>
      </div>
      <div>
        <main className={css.reserveContentMain} id="reserve-content">
          <section>
            <div className={css.reserveContentTitle}>
              <h1 className={css.rctText}>Confirm and pay Airbnb</h1>
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
                  <div className={css.rclChooseHowToPay}>
                    'Choose how to pay'
                  </div>
                  <div className={css.rclPayHow}>
                    <div> Pay in full </div>
                    <div> Pay part now, part later </div>
                  </div>
                  <div className={css.rclPayMethod}> Pay with </div>
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
        <footer className={css.reserveContentFooter}>
          <div className={css.rcfLeft}>
            @ 2022 Airbnb, Inc, Privacy Terms Sitemap
          </div>
          <div className={css.rcfRight}> English (US) $ USD </div>
        </footer>
      </div>
    </div>
  );
}

export default Reservation;
