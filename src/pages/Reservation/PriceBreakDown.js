import { useEffect, useState } from 'react';
import css from './PriceBreakDown.module.scss';

const currencyFomatter = (num, currency) => {
  let type = 'en-US';
  let custom = 'USD';
  if (currency === 'kr') {
    type = 'kr-KR';
    custom = 'KRW';
  }
  return Intl.NumberFormat(type, {
    style: 'currency',
    currency: custom,
  }).format(Number(num));
};

const PriceBreakDown = props => {
  let roomPrice = props.roomPrice;
  let totalNights = props.totalNights;
  let totalAmount = props.totalAmount;
  return (
    <div class={css.container}>
      <div className={css.priceDetails}>
        <div className={css.priceDetailsInner}>
          <h2>Price details</h2>
          <div className={css.priceBreakDown}>
            <div className={css.priceByNights}>
              <div className={css.priceByNightsDetail}>
                {currencyFomatter(roomPrice, 'kr')} &nbsp;x&nbsp;
                {totalNights}
                &nbsp;nights
              </div>
              <div>{currencyFomatter(totalAmount, 'kr')}</div>
            </div>
            <div className={css.priceCleaning}>
              <div>Cleaning fee</div>
              <div>
                {currencyFomatter(
                  (parseFloat(totalAmount) * 0.084).toFixed(0),
                  'kr'
                )}
              </div>
            </div>
            <div className={css.priceServiceFee}>
              <div>Service fee</div>
              <div>
                {currencyFomatter(
                  (parseFloat(totalAmount) * 0.17).toFixed(0),
                  'kr'
                )}
              </div>
            </div>
            <div className={css.priceTaxes}>
              <div>Occupancy taxed and fees</div>
              <div>{currencyFomatter(totalAmount, 'kr')}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={css.total}>
        <div>ToTal (KRW)</div>
        <div>{currencyFomatter(totalAmount, 'kr')}</div>
      </div>
    </div>
  );
};
export default PriceBreakDown;
