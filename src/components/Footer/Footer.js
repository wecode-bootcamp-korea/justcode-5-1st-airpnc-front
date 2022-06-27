import React from 'react';
import { useState } from 'react';

import css from './Footer.module.scss';

function Footer() {
  /*
<div className={css.footer1}>
<div>
  <span className="cwdsfi8 dir dir-ltr" dir="ltr">
    © 2022 Airbnb, Inc.
  </span>
  <span className="_15vc6yg" aria-hidden="true">
    ·
  </span>
  <a href="/terms/privacy_policy" className="_1e6wtwm5">
    개인정보 처리방침
  </a>
  <span className="_15vc6yg" aria-hidden="true">
    ·
  </span>
  <a href="/terms" className="_1e6wtwm5">
    이용약관
  </a>
  <span className="_15vc6yg" aria-hidden="true">
    ·
  </span>
  <a href="/sitemaps/v2" className="_1e6wtwm5">
    사이트맵
  </a>
  <span className="_15vc6yg" aria-hidden="true">
    ·
  </span>
  <a
    target="_blank"
    href="/home/updated_cancellation_policies?korean_strict_policy=true#strict"
    className="_1e6wtwm5"
  >
    한국의 변경된 환불 정책
  </a>
  <span className="_15vc6yg" aria-hidden="true">
    ·
  </span>
  <a
    target="_blank"
    href="/about/company-details"
    className="_1e6wtwm5"
  >
    회사 세부정보
  </a>
</div>
<div className="atm_am_a81sdw dir dir-ltr"></div>
<div className="atm_9s_1txwivl atm_h_h9n0ih dir dir-ltr">
  <div className="_jro6t0">
    <span className="_19c5bku">
      <button type="button" className="_f2hxk3s">
        <span className="a8jt5op dir dir-ltr">언어 선택</span>
        <span className="_14tkmhr"></span>
        <span className="_144l3kj">한국어 (KR)</span>
      </button>
    </span>
    <span className="_19c5bku">
      <button type="button" className="_f2hxk3s">
        <span className="a8jt5op dir dir-ltr">통화 선택</span>
        <span className="_14tkmhr">
          <span className="_pgfqnw">₩</span>
        </span>
        <span className="_144l3kj">KRW</span>
      </button>
    </span>
  </div>
  <button type="button" className="_1emy0x17">
    <span className="atm_9s_116y0ak atm_vh_yfq0k3 atm_ar_vrvcex atm_h_esu3gu dir dir-ltr">
      <span className=" dir dir-ltr">지원 및 참고 자료</span>
    </span>
  </button>
  <button onClick={openModal}>모달팝업</button>
</div>
</div>*/
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)

  return (
    <>
      <footer className={css.container}>
        <div className={css.top}>
          <div className={css.arguments}>
            <div>© 2022 Airbnb, Inc.</div>
            <div>개인정보 처리 방침 |</div>
            <div>| 이용약관 |</div>
            <div>| 사이트맵 |</div>
            <div>| 한국의 변경된 환불 정책 |</div>
            <div>| 회사 세부정보</div>
          </div>
          <div className={css.infomation}>
            <div>지원 및 참고 자료</div>
          </div>
        </div>
        <div className={css.etcs}>
          <p className={css.etc}>
            웹사이트 제공자:airpnc lreland UC, private unlimited company, 8
            Hanover Quay Dublin 2, DP23 lreland | 이사:kim min uk, kim ji eun,
            kim yeah chan, yuk ji, choi jung hoon | VAT 번호:IE9827384L | 사업자
            등록 번호:IE35759 | 연락처:airpnc@justcode.com | 호스팅 서비스
          </p>
          <p className={css.etc}>
            제공업체:justcode 웹서비스 | 에어피앤씨는 에어비앤비를 클론한
            웹사이트입니다. 에어피앤씨 플랫폼을 통하여 예약된 숙소, 체험, 호스트
            서비스에 관한 의무와 책임은 해당 서비스를 제공하는 호스트에게
            있습니다.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
