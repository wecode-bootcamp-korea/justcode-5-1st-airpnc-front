import React, { useState, useEffect } from 'react';
import { AiFillSafetyCertificate, AiOutlineCheck } from 'react-icons/ai';
import './MyProfile.scss';

export default function MyProfile({ userImg, userName, getMyProfile }) {
  const [imgFile, setImgFile] = useState(null);
  const [data, setData] = useState([]);

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
  useEffect(() => {
    (async () => {
      const email = localStorage.getItem('user-email');
      console.log(email, 10);
      const res = await fetch(`http://localhost:10010/mypage/${email}`);
      const json = await res.json();
      setData(json);
    })();
  }, []);

  if (data.length === 0) {
    return <div>데이터없음</div>;
  }
  console.log(data[0]);
  return (
    <div>
      <section className="ProfileWrapper">
        <div className="UserProfile">
          <form className="ImageWrapper">
            <input className="UploadBtn" type="File" />
            프로필을 고르세요.
            <button className="SubmitBtn" type="submit" onClick={handlePostImg}>
              확인
            </button>
          </form>

          <div className="FreeUser">
            <p className="CheckUser">
              <AiOutlineCheck size="18" />
              <p className="Check_user">이름:{data.name}</p>
            </p>
            <p className="CheckUser">
              <AiOutlineCheck size="18" />
              <p className="Check_user">Email:{data.email}</p>
            </p>
            <p className="CheckUser">
              <AiOutlineCheck size="18" />
              <p className="Check_user">전화번호:{data.phone_number}</p>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
