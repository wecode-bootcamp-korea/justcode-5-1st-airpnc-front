import React, { useState } from 'react';
import { AiFillSafetyCertificate, AiOutlineCheck } from 'react-icons/ai';
import './MyProfile.scss';

export default function MyProfile({ userImg, userName, getMyProfile }) {
  const [imgFile, setImgFile] = useState(null);

  const handleChangeFile = e => {
    setImgFile(e.target.files[0]);
  };

  const handlePostImg = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('filename', imgFile);

    fetch(``, {
      method: 'POST',
      headers: {},
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'SUCCESS') {
          alert('프로필이 업로드 되었습니다!');
          getMyProfile();
        } else {
          alert('프로필 사진을 업로드 해 주세요!');
        }
      });
  };

  return (
    <div>
      <section className="ProfileWrapper">
        <div classnem="UserProfile">
          <form className="ImageWrapper">
            <label className="UploadBtn" htmlFor="inputFile">
              프로필을 고르세요.
            </label>

            <button className="SubmitBtn" type="submit" onClick={handlePostImg}>
              확인
            </button>
          </form>

          <div className="FreeUser">
            <p claanem="CheckUser">
              <AiOutlineCheck size="18" />
              이름
            </p>
            <p claanem="CheckUser">
              <AiOutlineCheck size="18" />
              Email
            </p>
            <p claanem="CheckUser">
              <AiOutlineCheck size="18" />
              전화번호
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
