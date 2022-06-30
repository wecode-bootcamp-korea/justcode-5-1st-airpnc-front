import React, { useEffect, useRef, useState } from 'react';
import RoomList from '../../components/RoomList/RoomList';
import css from './Home.module.scss';
import Header from '../../components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import MainFilter from '../../components/MainFilter/MainFilter';
import { set } from 'react-hook-form';

function Home() {
  const [data, setData] = useState([]);
  const [wish, setWish] = useState([]);
<<<<<<< HEAD
  const [filters, setFilters] = useState({});
=======
>>>>>>> main
  const navigate = useNavigate();
  const button = useRef();
  const filtersIn = useLocation().state;
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
    setFilters(filtersIn);
  }, [filtersIn]);

  const filterTemplate = {
    guests: 1,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    room_type: 1,
    location_type: 6,
    residential_type: 2,
    price: { min: 100000, max: 2000000 },
  };

  const filterFromModal = {
    price: { min: 0, max: 0 },
    room_type: 0,
    bed: 4,
    bedrooms: 0,
  };

  console.log('filters : ', filters);
  console.log('filtersIn : ', filtersIn);
  console.log('json:: filtersIn ', JSON.stringify(filtersIn));
  console.log('json:: filters ', JSON.stringify(filters));

  const requestOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
    //body: JSON.stringify(filtersIn),
  };
  // const loadRooms = fetch('http://localhost:10010/home', requestOption)
  //   .then(res => {
  //     if (res.status === 200) {
  //       console.log('here :', data);
  //       console.log('res.json : ', res);
  //       console.log('promise.result : ');
  //       const dataReceived = res.json();
  //       setData(dataReceived);
  //       console.log('in loadRoom res.json', res.json());
  //       return res.json();
  //     } else {
  //       console.log('res.status', res.status);
  //       return res.status;
  //     }
  //   })
  //   .catch(() => {
  //     console.error('ROOM NOT LOADED');
  //   });

  // console.log('loadRooms ::::: ', loadRooms);

  // useEffect(() => {
  //   (async () => {
  //     const rooms = await loadRooms;
  //     console.log('at loading rooms', rooms);
  //     setData(rooms);
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const rooms = await loadRooms;
  //     console.log('at filter changes rooms', rooms);
  //     setData(rooms);
  //   })();
  // }, [filters]);

  // NO FILTER OPTION APPLIED
  // useEffect(() => {
  //   (async () => {
  //     //const res = await fetch('http://localhost:10010/home');
  //     const json = await res.json();
  //     //console.log('res : ', res);
  //     console.log('json : ', json);
  //     //console.log('json.data : ', json.data);
  //     setData(json);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      //setFilters(filtersIn);
      console.log('filters : ', filters);
      console.log('requestOption', requestOption);
      const res = await fetch('http://localhost:10010/home', requestOption);
      console.log('at filter changes res : ', res);
      const json = await res.json();
      console.log('at filter changes json : ', json);
      setData(json);
      console.log('data : ', data);
    })();
  }, [filtersIn]);

  const btnClick = e => {
    const wishs = e.target.value;
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

  const token = localStorage.getItem('login-token');

  //   const res = {
  //     email: identify,
  //     password: password,
  //   };
  //   console.log(JSON.stringify(res));
  //   fetch({API}, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(res),
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       if (res.success) {
  //         goHome();
  //         console.log(res.token, 123123);

  //         localStorage.setItem('login-token', res.token);
  //       } else {
  //         alert(res.message);
  //       }
  //     });
  // };

  return (
    <>
      {token ? <Header login /> : <Header />}
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
