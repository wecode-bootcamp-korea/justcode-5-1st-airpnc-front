import React, { useState, useEffect } from 'react';
import { AiFillSafetyCertificate, AiOutlineCheck } from 'react-icons/ai';
import './MyProfile.scss';

export default function MyProfile({ userImg, userName, getMyProfile }) {
  const [imgFile, setImgFile] = useState(null);
  console.log(imgFile, 'test');
  const [data, setData] = useState([]);

  const handleChangeFile = e => {
    const url = URL.createObjectURL(e.target.files[0]);
    console.log(e.target.files[0], 'img');
    setImgFile(url);
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
            <img className="ImageSize" src={imgFile}></img>
            <input
              className="UploadBtn"
              type="file"
              onChange={handleChangeFile}
            />
            프로필을 고르세요.
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
