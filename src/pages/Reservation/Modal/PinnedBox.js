import PriceBreakDown from './PriceBreakDown';
import css from './PinnedBox.module.scss';
import { TiTags, TiStarFullOutline } from 'react-icons/ti';
import { RiMedalFill } from 'react-icons/ri';

const PinnedBox = props => {
  const { room, reservation, airbnbConst } = props;
  return (
    <section className={css.container}>
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
                <div className={css.roomType}>{room.roomType.name}</div>
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
            <div className={css.rcrAircoverInner}>{airbnbConst.aircover}</div>
          </div>
          <div className={css.rcrPriceDetails}>
            <div className={css.rcrPriceDetailsInner}>
              <h2>Price details</h2>
              <div className={css.rcrPriceBreakDown}>
                <PriceBreakDown room={room} reservation={reservation} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnedBox;
