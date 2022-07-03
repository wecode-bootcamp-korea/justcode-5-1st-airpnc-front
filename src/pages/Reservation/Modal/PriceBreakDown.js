import { useEffect, useState } from 'react';
import css from './PriceBreakDown.module.scss';

const cleaningRate = 0.084;
const serviceFeeRate = 0.17;
const taxRate = 0.08;

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
  const { room, reservation, nights } = props;

  const price = {
    perNight: room.price,
  };
  const getTotalNights = (date1, date2) => {
    let checkin = new Date(date1);
    let checkout = new Date(date2);
    let diff = Math.abs(checkout.getTime() - checkin.getTime());
    let noofdays = Math.ceil(diff / (1000 * 3600 * 24));
    return noofdays;
  };
  if (nights === null)
    nights = getTotalNights(reservation.checkin, reservation.checkout);
  price.byNights = room.price * nights;
  price.cleaningFee = price.byNights * cleaningRate;
  price.serviceFee = price.byNights * serviceFeeRate;
  price.tax = price.byNights * taxRate;

  price.total =
    price.byNights + price.cleaningFee + price.serviceFee + price.tax;

  return (
    <div className={css.container}>
      <div className={css.priceDetails}>
        <div className={css.priceBreakDown}>
          <div className={css.priceByNights}>
            <div className={css.priceByNightsDetail}>
              {currencyFomatter(room.price, 'kr')} &nbsp;x&nbsp;
              {nights}
              &nbsp;nights
            </div>
            <div>{currencyFomatter(price.byNights, 'kr')}</div>
          </div>
          <div className={css.priceCleaning}>
            <div>Cleaning fee</div>
            <div>{currencyFomatter(price.cleaningFee, 'kr')}</div>
          </div>
          <div className={css.priceServiceFee}>
            <div>Service fee</div>
            <div>{currencyFomatter(price.serviceFee, 'kr')}</div>
          </div>
          <div className={css.priceTaxes}>
            <div>Occupancy taxed and fees</div>
            <div>{currencyFomatter(price.tax, 'kr')}</div>
          </div>
        </div>
      </div>
      <div className={css.total}>
        <div>ToTal (KRW)</div>
        <div>{currencyFomatter(price.total, 'kr')}</div>
      </div>
    </div>
  );
};

export default PriceBreakDown;
