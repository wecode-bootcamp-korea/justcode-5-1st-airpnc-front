import React, { useEffect, useRef, useState, useMemo } from 'react';
import RoomList from '../../components/RoomList/RoomList';
import css from './Home.module.scss';
import Header from '../../components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import MainFilter from '../../components/MainFilter/MainFilter';
import { set } from 'react-hook-form';

function Home() {
  const [data, setData] = useState([]);
  const [select, setSelect] = useState('');
  const [selected, setSelected] = useState();
  const [wish, setWish] = useState([]);
  //const [filters, setfilters] = useState({});
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();
  const button = useRef();
  const filtersIn = useLocation().state;

  const user = useLocation().state;
  console.log(user, '19');
  // const filtersIn = {
  //   guests: 1,
  //   bedrooms: 1,
  //   beds: 1,
  //   baths: 1,
  //   room_type: 1,
  //   location_type: 6,
  //   residential_type: 2,
  //   price: {
  //     min: 100000,
  //     max: 2000000,
  //   },
  // };
  useEffect(() => {


  useMemo(() => {
    setFilters(filtersIn);
  }, [filtersIn]);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:10010/home'); //room api GET request
      const json = await res.json();
      setData(json);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const requestOption = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(filtersIn),
        body: JSON.stringify(filters),
      };
      if (requestOption.body === 'null') requestOption.body = [];
      const res = await fetch('http://localhost:10010/home', requestOption); //room api POST request
      const json = await res.json();
      setData(json);
      setFilters({});
    })();
  }, [filtersIn]);


  //start wishList 갱신 함수
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:10010/wishlist/${user.id}`);
      const json = await res.json();

      setSelected(json);
    })();
  }, [wish]);
  console.log(wish);
  console.log(selected);

  //filters  <= useState
  //filtersIn <= useLocation


  const btnClick = e => {
    const wishs = e.target.value;
    console.log(wishs);
    const room_id = Number(wishs);
    console.log(room_id);
    setSelect(Number(wishs));
    const alreadySelectedIndex = wish.findIndex(i => i.id == wishs);
    // console.log(alreadySelectedIndex === -1);
    const res = {
      user_id: user.id,
      room_id: room_id,
    };
    if (alreadySelectedIndex === -1) {
      data[Number(wishs) - 1].like = true;
      setWish([...wish, data[Number(wishs) - 1]]);
      console.log(user.id, room_id);
      fetch(`http://localhost:10010/wishlist/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      })
        .then(res => res.json())
        .then(res => console.log(res));
    } else {
      const wishsright = wish.splice(alreadySelectedIndex + 1);
      const wishsleft = wish.splice(0, alreadySelectedIndex);
      data[Number(wishs) - 1].like = false;
      setWish([...wishsleft, ...wishsright]);
      fetch(`http://localhost:10010/wishlist/${user.id}/${room_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      })
        .then(res => res.json())
        .then(res => console.log(res));
    }
  };
  //end wishList 갱신 함수
  const cantClick = () => {
    alert('로그인 먼저 해주세요');
  };

  const imageSize = {
    width: '350px',
    height: '320px',
    marginBottom: '100px',
  };

  const goWishList = () => {
    navigate('/wishlist', { state: [...wish] });
  };

  const cantGoWishList = () => {
    alert('로그인 먼저 해주세요');
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

  const token = localStorage.getItem('login-token');

  // const res = {
  //   userId: user.id,
  //   roomId: select,
  // };
  // console.log(JSON.stringify(res));
  // fetch('http://localhost:10010/wishlist', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(res),
  // })
  //   .then(res => res.json())
  //   .then(res => {
  //     if (res.success) {
  //       goHome();
  //       console.log(res.token, 123123);

  //       localStorage.setItem('login-token', res.token);
  //     } else {
  //       alert(res.message);
  //     }
  //   });
  // }

  return (
    <>
      {token ? <Header login /> : <Header />}
      <MainFilter />
      <div onClick={token ? goWishList : cantGoWishList}>wish</div>
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
                onClick={token ? btnClick : cantClick}
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
