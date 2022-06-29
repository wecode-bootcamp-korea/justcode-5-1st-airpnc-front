import css from './RoomType.module.scss';

function RoomType({ isTypeClick }) {
  const checkOnlyOne = checkThis => {
    const checkboxes = document.getElementsByName('roomType');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
  };
  return (
    <div className={css.roomType}>
      <p>숙소 유형</p>
      <div className={css.container}>
        <label className={css.formControl}>
          <input
            onChange={e => checkOnlyOne(e.target)}
            onClick={isTypeClick}
            type="checkbox"
            name="roomType"
            value="1"
          />
          집 전체
        </label>
        <label className={css.formControl}>
          <input
            onChange={e => checkOnlyOne(e.target)}
            onClick={isTypeClick}
            type="checkbox"
            name="roomType"
            value="2"
          />
          개인실
        </label>
        <label className={css.formControl}>
          <input
            onChange={e => checkOnlyOne(e.target)}
            onClick={isTypeClick}
            type="checkbox"
            name="roomType"
            value="3"
          />
          다인실
        </label>
      </div>
    </div>
  );
}

export default RoomType;
