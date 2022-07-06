import React, { useEffect, useRef, useState, useMemo } from 'react';
import BASE_URL from '../../config';
import RoomList from '../../components/RoomList/RoomList';
import css from './Home.module.scss';
import Header from '../../components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import MainFilter from '../../components/MainFilter/MainFilter';

function Home() {
  const [data, setData] = useState([]);
  const [select, setSelect] = useState('');
  const [selected, setSelected] = useState([]);
  const [wish, setWish] = useState([]);
  const [headerfilters, setheaderfilters] = useState({});
  const [location, setlocation] = useState(0);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();
  const button = useRef();
  const filtersIn = useLocation().state;
  const user = localStorage.getItem('user-id');
  // console.log(user.id);
  console.log(selected);

<<<<<<< HEAD
=======
  const user = localStorage.getItem('user-id');
  console.log(user, '19');
  console.log('filters : ', filters);
>>>>>>> main
  useMemo(() => {
    setFilters(Object.assign(filters, filtersIn, headerfilters));
  }, [filtersIn, headerfilters]);

  const setHeders = location => {
    setheaderfilters({ location_type: Number(location) });
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/home`); //room api GET request
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

        body: JSON.stringify(filters),
      };
      if (requestOption.body === 'null') requestOption.body = [];
      const res = await fetch(`${BASE_URL}/home`, requestOption); //room api POST request
      const json = await res.json();

      setData(json);
      setFilters({});
    })();
  }, [filtersIn, headerfilters]);

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:10010/wishlist/${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => setSelected([...res.data]));
    }
  }, []);
  // const goMyPage = () => {

  // };

  //start wishList 갱신 함수
  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/wishlist/${user}`);
      const json = await res.json();

      setSelected(json);
    })();
  }, [wish]);
  console.log(wish);
  console.log(selected);

  const btnClick = e => {
    const wishs = e.target.value;
    const room_id = Number(wishs);
    setSelect(Number(wishs));

    const res = {
      user_id: user,
      room_id: room_id,
    };
<<<<<<< HEAD
    fetch(`http://localhost:10010/wishlist/${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => setSelected([...res.data]));

    if (selected.length === 0) {
      fetch(`http://localhost:10010/wishlist/${user}`, {
=======
    if (alreadySelectedIndex === -1) {
      data[Number(wishs) - 1].like = true;
      setWish([...wish, data[Number(wishs) - 1]]);
      console.log(user.id, room_id);
      fetch(`${BASE_URL}/wishlist/${user}`, {
>>>>>>> main
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      })
        .then(res => res.json())
        .then(res => console.log(res));
      fetch(`http://localhost:10010/wishlist/${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => setSelected([...res.data]));
      console.log(selected);
    } else if (selected.findIndex(i => i.id == room_id) === -1) {
      fetch(`http://localhost:10010/wishlist/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      })
        .then(res => res.json())
        .then(res => console.log(res));
      fetch(`http://localhost:10010/wishlist/${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => setSelected([...res.data]));
      console.log(selected);
    } else {
<<<<<<< HEAD
      fetch(`http://localhost:10010/wishlist/${user}/${room_id}`, {
=======
      const wishsright = wish.splice(alreadySelectedIndex + 1);
      const wishsleft = wish.splice(0, alreadySelectedIndex);
      data[Number(wishs) - 1].like = false;
      setWish([...wishsleft, ...wishsright]);
      fetch(`${BASE_URL}/${user}/${room_id}`, {
>>>>>>> main
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      })
        .then(res => res.json())
        .then(res => console.log(res));
      fetch(`http://localhost:10010/wishlist/${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => setSelected([...res.data]));
      console.log(selected);
    }
  };

  const cantClick = () => {
    alert('로그인 먼저 해주세요');
  };

  const imageSize = {
    width: '350px',
    height: '320px',
    marginBottom: '100px',
  };

  const goWishList = () => {
    navigate('/wishlist', { state: [...selected] });
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

  return (
    <>
      {token ? (
        <Header wish={goWishList} setHeders={setHeders} login />
      ) : (
        <Header wish={cantGoWishList} setHeders={setHeders} />
      )}
      <MainFilter />
      <div className={css.container}>
        {data.map((data, ind) => {
          return (
            <div key={ind + 10}>
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
