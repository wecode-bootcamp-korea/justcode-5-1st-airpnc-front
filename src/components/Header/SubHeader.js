import { useLocation, useNavigate } from 'react-router-dom';
import css from './SubHeader.module.scss';

const airbnbLogo = 'icons/256px-Airbnb_Logo.svg.png';

function SubHeader() {
  const homepage = '/';
  const navigate = useNavigate();
  const handleNavigateBtn = address => {
    navigate(address);
  };

  return (
    <header className={css.banner}>
      <div className={css.bannerInner}>
        <div className={css.logoBox}>
          <img
            className={css.logoToHome}
            id={css.logoButton}
            alt="airbnb"
            src={airbnbLogo}
            onClick={event => {
              handleNavigateBtn(homepage);
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default SubHeader;
