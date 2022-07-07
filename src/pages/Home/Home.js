import React, { useEffect, useRef, useState, useMemo } from 'react';
import BASE_URL from '../../config';
import RoomList from '../../components/RoomList/RoomList';
import css from './Home.module.scss';
import Header from '../../components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import MainFilter from '../../components/MainFilter/MainFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Login from '../Login/Login';

function Home() {
  const [login, setLogin] = useState(false);
  const [like, setLike] = useState([]);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [headerfilters, setheaderfilters] = useState({});
  const [location, setlocation] = useState(0);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();
  const button = useRef();
  const filtersIn = useLocation().state;
  const user = localStorage.getItem('user-id');
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
      console.log(data.like, 77777);
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

  //start wishList 갱신 함수
  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASE_URL}/wishlist/${user}`);
      const json = await res.json();
      setSelected(json.data);
      setLike(json.data.map(i => i.id));
    })();

  }, [user]);


  const btnClick = e => {
    const wishs = e.currentTarget.value;
    const room_id = Number(wishs);
    console.log(wishs);
    const res = {
      user_id: user,
      room_id: room_id,
    };
    fetch(`${BASE_URL}/wishlist/${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setSelected([...res.data]);
        setLike([...res.data].map(i => i.id));
      });

    if (selected.length === 0) {
      fetch(`${BASE_URL}/wishlist/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      })
        .then(res => res.json())
        .then(res => console.log(res));
      fetch(`${BASE_URL}/wishlist/${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          setSelected([...res.data]);
          setLike([...res.data].map(i => i.id));
        });
    } else if (selected.findIndex(i => i.id == room_id) === -1) {
      fetch(`${BASE_URL}/wishlist/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      })
        .then(res => res.json())
        .then(res => console.log(res));
      fetch(`${BASE_URL}/wishlist/${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          setSelected([...res.data]);
          setLike([...res.data].map(i => i.id));
        });
    } else {
      fetch(`${BASE_URL}/wishlist/${user}/${room_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      })
        .then(res => res.json())
        .then(res => console.log(res));

      fetch(`${BASE_URL}/wishlist/${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          setSelected([...res.data]);
          setLike([...res.data].map(i => i.id));
        });
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
    color: 'red',
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
  const loginModalValue = value => {
    setLogin(value);
  };
  const loginModalOff = value => {
    setLogin(value);
  };
  console.log(login);
  return (
    <>
      {token ? (
        <Header wish={goWishList} setHeders={setHeders} login />
      ) : (
        <Header
          loginModalValue={loginModalValue}
          wish={cantGoWishList}
          setHeders={setHeders}
        />
      )}
      <MainFilter />
      <Login login={login} loginModalOff={loginModalOff} />
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
                style={like.includes(data.id) ? likeBtnStyle : undefined}
              >
                <FontAwesomeIcon icon={faHeart} />
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
