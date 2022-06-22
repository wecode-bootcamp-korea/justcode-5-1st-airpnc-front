import React, { useEffect, useState } from 'react';
import RoomList from '../../components/RoomList/RoomList';
import css from './Home.module.scss';
import Header from '../../components/Header/Header';

function Home() {
  const [data, setData] = useState([]);
  const [wish, setWish] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/data/roomData.json');
      const json = await res.json();
      setData(json);
    })();
  }, []);
  /*return boolean ? setWish([wishs, ...wish]) : wish.splice(wish.indexOf(wishs));*/
  const btnClick = e => {
    const wishs = e.target.value;
    setWish([...wish, data[Number(wishs) - 1]]);
  };

  return (
    <>
      <Header />
      <div className={css.container}>
        {data.map(data => {
          return (
            <>
              <RoomList
                key={data.id}
                id={data.id}
                image={data.image}
                name={data.name}
                price={data.price}
              />
              <button onClick={btnClick} value={data.id}>
                like
              </button>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Home;
