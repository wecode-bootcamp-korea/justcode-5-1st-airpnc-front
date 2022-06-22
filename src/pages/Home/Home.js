import React, { useEffect, useState } from 'react';
import RoomList from '../../components/RoomList/RoomList';
import RoomTypeBar from '../../components/RoomTypeBar/RoomTypeBar';
import css from './Home.module.scss';

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/data/roomData.json');
      const json = await res.json();
      setData(json);
    })();
  }, []);

  return (
    <>
      <RoomTypeBar />
      <div className={css.container}>
        {data.map(data => {
          return (
            <RoomList
              key={data.id}
              image={data.image}
              name={data.name}
              price={data.price}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
