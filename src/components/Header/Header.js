import React from 'react';

import css from './Header.module.scss';

function Header() {
  return(
  <div className={css.container}>
    <div className={css.logo}></div>
    <div className={css.searchBar}></div>
    <div className={css.user}></div>
  </div>
  );

}

export default Header;
