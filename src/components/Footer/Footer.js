import React from 'react';
import { useState } from 'react';

import css from './Footer.module.scss';
import Modal from './Modal';

function Footer() {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <footer className={css.container}>
        {/* <div className={css.footer1}>footer fix1</div> */}
        <div className={css.footer1}>
          <div>
            <span class="cwdsfi8 dir dir-ltr" dir="ltr">
              © 2022 Airbnb, Inc.
            </span>
            <span class="_15vc6yg" aria-hidden="true">
              ·
            </span>
            <a href="/terms/privacy_policy" class="_1e6wtwm5">
              개인정보 처리방침
            </a>
            <span class="_15vc6yg" aria-hidden="true">
              ·
            </span>
            <a href="/terms" class="_1e6wtwm5">
              이용약관
            </a>
            <span class="_15vc6yg" aria-hidden="true">
              ·
            </span>
            <a href="/sitemaps/v2" class="_1e6wtwm5">
              사이트맵
            </a>
            <span class="_15vc6yg" aria-hidden="true">
              ·
            </span>
            <a
              target="_blank"
              href="/home/updated_cancellation_policies?korean_strict_policy=true#strict"
              class="_1e6wtwm5"
            >
              한국의 변경된 환불 정책
            </a>
            <span class="_15vc6yg" aria-hidden="true">
              ·
            </span>
            <a target="_blank" href="/about/company-details" class="_1e6wtwm5">
              회사 세부정보
            </a>
          </div>
          <div class="atm_am_a81sdw dir dir-ltr"></div>
          <div class="atm_9s_1txwivl atm_h_h9n0ih dir dir-ltr">
            <div class="_jro6t0">
              <span class="_19c5bku">
                <button type="button" class="_f2hxk3s">
                  <span class="a8jt5op dir dir-ltr">언어 선택</span>
                  <span class="_14tkmhr"></span>
                  <span class="_144l3kj">한국어 (KR)</span>
                </button>
              </span>
              <span class="_19c5bku">
                <button type="button" class="_f2hxk3s">
                  <span class="a8jt5op dir dir-ltr">통화 선택</span>
                  <span class="_14tkmhr">
                    <span class="_pgfqnw">₩</span>
                  </span>
                  <span class="_144l3kj">KRW</span>
                </button>
              </span>
            </div>
            <button type="button" class="_1emy0x17">
              <span class="atm_9s_116y0ak atm_vh_yfq0k3 atm_ar_vrvcex atm_h_esu3gu dir dir-ltr">
                <span class=" dir dir-ltr">지원 및 참고 자료</span>
              </span>
            </button>
            <button onClick={openModal}>모달팝업</button>
          </div>
        </div>
      </footer>
      <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>
    </>
  );
}

export default Footer;
