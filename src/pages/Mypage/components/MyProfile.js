import React, { useRef, useState, useEffect } from 'react';
import { AiFillSafetyCertificate, AiOutlineCheck } from 'react-icons/ai';
import BASE_URL from '../../../config';
import './MyProfile.scss';
import { FaUserAlt } from 'react-icons/fa';

export default function MyProfile({ user }) {
  console.log(user.profile_image, 3456);
  const [imgFile, setImgFile] = useState();
  console.log(imgFile, 'test');
  const [data, setData] = useState([]);
  const input = useRef();

  useEffect(() => {
    setImgFile(user.profile_image);
  }, [user]);

  console.log(imgFile, 1234);
  useEffect(() => {
    (async () => {
      if (imgFile) {
        const res = await fetch('http://localhost:10010/mypage', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: user.name,
            phone_number: user.phone_number,
            profile_image: imgFile,
            email: user.email,
          }),
        });
        const json = await res.json();
      }
    })();
  }, [imgFile]);

  const handleChangeFile = e => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImgFile(url);
  };

  return (
    <div>
      <section className="ProfileWrapper">
        <div className="UserProfile">
          {imgFile ? (
            <div className="ImageWrapper">
              <img className="ImageSize" src={imgFile}></img>
              <input
                id="input"
                className="UploadBtn"
                type="file"
                onChange={handleChangeFile}
              />
              <label className="input_label" for="input">
                사진 업데이트하기
              </label>
            </div>
          ) : (
            <div className="ImageWrapper">
              <FaUserAlt size="50" />
              <input
                id="input"
                className="UploadBtn"
                type="file"
                onChange={handleChangeFile}
              />
              <label className="input_label" for="input">
                사진 업데이트하기
              </label>
            </div>
          )}

          <div className="FreeUser">
            <p className="CheckUser">
              <AiOutlineCheck size="18" />
              <p className="Check_user">이름:{user.name}</p>
            </p>
            <p className="CheckUser">
              <AiOutlineCheck size="18" />
              <p className="Check_user">Email:{user.email}</p>
            </p>
            <p className="CheckUser">
              <AiOutlineCheck size="18" />
              <p className="Check_user">전화번호:{user.phone_number}</p>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
