import React, { useRef, useState, useEffect } from 'react';
import { AiFillSafetyCertificate, AiOutlineCheck } from 'react-icons/ai';
import BASE_URL from '../../../config';
import './MyProfile.scss';
import { FaUserAlt } from 'react-icons/fa';

export default function MyProfile({ user }) {
  const [imgFile, setImgFile] = useState(null);
  console.log(imgFile, 'test');
  const [data, setData] = useState([]);
  const input = useRef();
  const handleChangeFile = e => {
    const url = URL.createObjectURL(e.target.files[0]);
    console.log(e.target.files[0], 'img');
    setImgFile(url);
  };

  return (
    <div>
      <section className="ProfileWrapper">
        <div className="UserProfile">
          {imgFile ? (
            <div className="ImageWrapper">
              <img className="ImageSize" src={imgFile}></img>
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
