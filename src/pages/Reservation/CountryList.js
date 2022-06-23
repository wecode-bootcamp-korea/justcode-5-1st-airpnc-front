import css from './CountryList.module.scss';

const CountryList = props => {
  const { setValue, country } = props;
  return (
    <div
      className={css.container}
      id="countryListContainer"
      onClick={() => setValue(country)}
    >
      <p>{country}</p>
    </div>
  );
};

export default CountryList;
