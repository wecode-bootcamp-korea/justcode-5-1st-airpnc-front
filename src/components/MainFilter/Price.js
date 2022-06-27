import css from './Price.module.scss';

function Price() {
  return (
    <div className={css.price}>
      <p>가격 범위</p>
      <div className={css.priceBox}>
        <input placeholder="  최저 요금" />
        <span>~</span>
        <input placeholder="  최고 요금" />
      </div>
    </div>
  );
}

export default Price;
