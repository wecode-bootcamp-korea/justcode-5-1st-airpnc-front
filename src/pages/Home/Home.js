import React, { useEffect, useRef, useState, useMemo } from 'react';
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
  const user = useLocation().state;
  // console.log(user.id);
  console.log(selected);
  console.log(user, '19');
  console.log('filters : ', filters);
  useMemo(() => {
    setFilters(Object.assign(filters, filtersIn, headerfilters));
    console.log('in useMemo filters ', filters);
    console.log('in useMemo filtersIn ', filtersIn);
    console.log('in useMemo headerfilters ', headerfilters);
    console.log('in useMemo filters second ', filters);
  }, [filtersIn, headerfilters]);
  console.log('filters ', filters);
  console.log('headerfilters ', headerfilters);
  // Enable when login api passes user.id
  // const isLogin = false;
  // const homeFetchUrl = () => {
  //   if (isLogin) {
  //     return 'http://localhost:10010/home/${user.id}';
  //   } else {
  //     return 'http://localhost:10010/home';
  //   }
  // };

  const setHeders = location => {
    setheaderfilters({ location_type: Number(location) });
  };

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:10010/home'); //room api GET request
      const json = await res.json();

      setData(json);
    })();
  }, []);

  // useEffect(() => {
  //   console.log(user, 234234343);
  //   navigate('/MyPage', { state: user });
  // }, [user]);

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
      const res = await fetch('http://localhost:10010/home', requestOption); //room api POST request
      const json = await res.json();

      setData(json);
      setFilters({});
    })();
  }, [filtersIn, headerfilters]);

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:10010/wishlist/${user.id}`, {
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
  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch(`http://localhost:10010/wishlist/${user.id}`);
  //     const json = await res.json();

  //     setSelected(json);
  //   })();
  // }, [wish]);
  console.log(wish);
  console.log(selected);

  const btnClick = e => {
    const wishs = e.target.value;
    const room_id = Number(wishs);
    setSelect(Number(wishs));

    const res = {
      user_id: user.id,
      room_id: room_id,
    };
    fetch(`http://localhost:10010/wishlist/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => setSelected([...res.data]));

    if (selected.length === 0) {
      fetch(`http://localhost:10010/wishlist/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      })
        .then(res => res.json())
        .then(res => console.log(res));
      fetch(`http://localhost:10010/wishlist/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => setSelected([...res.data]));
      console.log(selected);
    } else if (selected.findIndex(i => i.id == room_id) === -1) {
      fetch(`http://localhost:10010/wishlist/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      })
        .then(res => res.json())
        .then(res => console.log(res));
      fetch(`http://localhost:10010/wishlist/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => setSelected([...res.data]));
      console.log(selected);
    } else {
      fetch(`http://localhost:10010/wishlist/${user.id}/${room_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      })
        .then(res => res.json())
        .then(res => console.log(res));
      fetch(`http://localhost:10010/wishlist/${user.id}`, {
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
        <Header setHeders={setHeders} login />
      ) : (
        <Header setHeders={setHeders} />
      )}
      <MainFilter />
      <div className={css.wish} onClick={token ? goWishList : cantGoWishList}>
        wish
      </div>
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
