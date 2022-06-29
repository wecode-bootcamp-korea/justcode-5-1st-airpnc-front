import css from './Detail.module.scss';

const RoomImages = props => {
  const { img } = props;
  return <img className={css.sub} alt="img" src={img} />;
};

export default RoomImages;
