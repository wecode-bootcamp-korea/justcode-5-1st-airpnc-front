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
  /*return boolean ? setWish([...wish, data[Number(wishs) - 1]]) : wish.splice(wish.findIndex(i => i.id == wishs)));*/
  /*
  const wishsright = wish.splice(alreadySelectedIndex + 1);
    const wishsleft = wish.splice(0, alreadySelectedIndex);
  alreadySelectedIndex === -1
      ? setWish([...wish, newSelected])
      : setWish([...wishsleft, ...wishsright]);
      */
  const btnClick = e => {
    const wishs = e.target.value;
    const alreadySelectedIndex = wish.findIndex(i => i.id == wishs);
    console.log(alreadySelectedIndex === -1);
    if (alreadySelectedIndex === -1) {
      setWish([...wish, data[Number(wishs) - 1]]);
    } else {
      const wishsright = wish.splice(alreadySelectedIndex + 1);
      const wishsleft = wish.splice(0, alreadySelectedIndex);
      setWish([...wishsleft, ...wishsright]);
    }
  };

  console.log(wish);
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
