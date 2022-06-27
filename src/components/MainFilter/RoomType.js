import css from './RoomType.module.scss';

function RoomType() {
  return (
    <div className={css.roomType}>
      <p>숙소 유형</p>
      <div className={css.container}>
        <label className={css.formControl}>
          <input type="checkbox" name="checkbox" />집 전체
        </label>
        <label className={css.formControl}>
          <input type="checkbox" name="checkbox" />
          개인실
        </label>
        <label className={css.formControl}>
          <input type="checkbox" name="checkbox" />
          다인실
        </label>
      </div>
    </div>
  );
}

export default RoomType;
