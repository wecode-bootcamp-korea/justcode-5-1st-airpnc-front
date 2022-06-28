import React, { useEffect, useRef, useState } from 'react';
import RoomList from '../../components/RoomList/RoomList';
import css from './Home.module.scss';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import MainFilter from '../../components/MainFilter/MainFilter';

function Home() {
  const [data, setData] = useState([]);
  const [wish, setWish] = useState([]);
  const navigate = useNavigate();
  const button = useRef();
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/data/roomData.json');
      const json = await res.json();
      setData(json);
    })();
  }, []);

  const btnClick = e => {
    const wishs = e.target.value;
    console.log(wishs);
    const alreadySelectedIndex = wish.findIndex(i => i.id == wishs);
    // console.log(alreadySelectedIndex === -1);
    if (alreadySelectedIndex === -1) {
      data[Number(wishs) - 1].like = true;
      setWish([...wish, data[Number(wishs) - 1]]);
    } else {
      const wishsright = wish.splice(alreadySelectedIndex + 1);
      const wishsleft = wish.splice(0, alreadySelectedIndex);
      data[Number(wishs) - 1].like = false;
      setWish([...wishsleft, ...wishsright]);
    }
  };

  console.log(wish.map(e => (e.liked = true)));
  console.log(wish);
  const imageSize = {
    width: '350px',
    height: '320px',
    marginBottom: '100px',
  };

  const goWishList = () => {
    navigate('/wishlist', { state: [...wish] });
  };

  const likeBtnStyle = {
    color: 'rgb(255, 114, 114)',
    fontWeight: '900',
    fontSize: '15px',
    position: 'relative',
    top: '-89%',
    left: '86%',
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: 'rgb(232, 232, 232)',
    opacity: '1',
  };

  return (
    <>
      <Header />
      <MainFilter />
      <div onClick={goWishList}>wish</div>
      <div className={css.container}>
        {data.map((data, ind) => {
          return (
            <div>
              <RoomList key={ind} room={data} sytle={imageSize} won={'원'} />
              <button
                ref={button}
                id={data.id}
                className={css.likeBtn}
                key={data.id}
                onClick={btnClick}
                value={data.id}
                style={data.like ? likeBtnStyle : undefined}
              >
                like
              </button>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Home;
