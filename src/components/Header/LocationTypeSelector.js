import css from './LocationTypeSelector.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  fas,
  faHouseTsunami,
  faWater,
  faTree,
  faCampground,
  faFerry,
  faUmbrellaBeach,
  faHotel,
  faCity,
  faMountainSun,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fas,
  faHouseTsunami,
  faWater,
  faTree,
  faCampground,
  faFerry,
  faUmbrellaBeach,
  faHotel,
  faCity,
  faMountainSun
);
const locationTypes = [
  { id: 1, name: 'Lakefront', icon: faHouseTsunami },
  { id: 2, name: 'National Parks', icon: faTree },
  { id: 3, name: 'Cabin', icon: faCampground },
  { id: 4, name: 'Islands', icon: faFerry },
  { id: 5, name: 'Beach', icon: faUmbrellaBeach },
  { id: 6, name: 'Luxe', icon: faHotel },
  { id: 7, name: 'Countryside', icon: faMountainSun },
  { id: 8, name: 'Urban', icon: faCity },
];
const LocationTypeSelector = props => {
  const { getLocationType, closeHandler } = props;

  return (
    <div
      id="location-selector"
      className={css.container}
      onMouseLeave={() => {
        //closeHandler(false);
      }}
    >
      <div className={css.outer}>
        <div className={css.inner}>
          {locationTypes.map(locationType => (
            <button
              className={locationType}
              key={locationType.id}
              onClick={e => getLocationType(locationType.id, locationType.name)}
            >
              <div className={css.icon}>
                <FontAwesomeIcon icon={locationType.icon} />
              </div>
              <p className={css.name}>
                <p>{locationType.name}</p>
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationTypeSelector;
