import css from './Selections.module.scss';

const Selections = props => {
  const { setValue, option } = props;
  return (
    <div
      className={css.container}
      id="countryListContainer"
      onClick={() => setValue(option)}
    >
      <p>{option}</p>
    </div>
  );
};

export default Selections;
