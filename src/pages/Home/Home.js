import React from 'react';
import RoomList from '../../components/RoomList/RoomList';
import css from './Home.module.scss';

function Home() {
  const data = [
    {
      name: '몰디브',
      image: [
        { url: 'https://ifh.cc/g/x1WbXD.jpg' },
        { url: 'https://ifh.cc/g/NbgqVO.jpg' },
        { url: 'https://ifh.cc/g/rgW8Zq.jpg' },
        { url: 'https://ifh.cc/g/bNZrzD.jpg' },
        { url: 'https://ifh.cc/g/a0dFSn.jpg' },
      ],
      price: '8,000,123',
    },
    {
      name: '필리핀',
      image: [
        { url: 'https://ifh.cc/g/x1WbXD.jpg' },
        { url: 'https://ifh.cc/g/NbgqVO.jpg' },
        { url: 'https://ifh.cc/g/rgW8Zq.jpg' },
        { url: 'https://ifh.cc/g/bNZrzD.jpg' },
        { url: 'https://ifh.cc/g/a0dFSn.jpg' },
      ],
      price: '9,234,123',
    },
    {
      name: '크로아티아',
      image: [
        { url: 'https://ifh.cc/g/x1WbXD.jpg' },
        { url: 'https://ifh.cc/g/NbgqVO.jpg' },
        { url: 'https://ifh.cc/g/rgW8Zq.jpg' },
        { url: 'https://ifh.cc/g/bNZrzD.jpg' },
        { url: 'https://ifh.cc/g/a0dFSn.jpg' },
      ],
      price: '1,234',
    },
    {
      name: '태국',
      image: [
        { url: 'https://ifh.cc/g/x1WbXD.jpg' },
        { url: 'https://ifh.cc/g/NbgqVO.jpg' },
        { url: 'https://ifh.cc/g/rgW8Zq.jpg' },
        { url: 'https://ifh.cc/g/bNZrzD.jpg' },
        { url: 'https://ifh.cc/g/a0dFSn.jpg' },
      ],
      price: '234,552',
    },
    {
      name: '일본',
      image: [
        { url: 'https://ifh.cc/g/x1WbXD.jpg' },
        { url: 'https://ifh.cc/g/NbgqVO.jpg' },
        { url: 'https://ifh.cc/g/rgW8Zq.jpg' },
        { url: 'https://ifh.cc/g/bNZrzD.jpg' },
        { url: 'https://ifh.cc/g/a0dFSn.jpg' },
      ],
      price: '234,552',
    },
    {
      name: '중국',
      image: [
        { url: 'https://ifh.cc/g/x1WbXD.jpg' },
        { url: 'https://ifh.cc/g/NbgqVO.jpg' },
        { url: 'https://ifh.cc/g/rgW8Zq.jpg' },
        { url: 'https://ifh.cc/g/bNZrzD.jpg' },
        { url: 'https://ifh.cc/g/a0dFSn.jpg' },
      ],
      price: '234,552',
    },
    {
      name: '미국',
      image: [
        { url: 'https://ifh.cc/g/x1WbXD.jpg' },
        { url: 'https://ifh.cc/g/NbgqVO.jpg' },
        { url: 'https://ifh.cc/g/rgW8Zq.jpg' },
        { url: 'https://ifh.cc/g/bNZrzD.jpg' },
        { url: 'https://ifh.cc/g/a0dFSn.jpg' },
      ],
      price: '234,552',
    },
    {
      name: '영국',
      image: [
        { url: 'https://ifh.cc/g/x1WbXD.jpg' },
        { url: 'https://ifh.cc/g/NbgqVO.jpg' },
        { url: 'https://ifh.cc/g/rgW8Zq.jpg' },
        { url: 'https://ifh.cc/g/bNZrzD.jpg' },
        { url: 'https://ifh.cc/g/a0dFSn.jpg' },
      ],
      price: '234,552',
    },
    {
      name: '영국',
      image: [
        { url: 'https://ifh.cc/g/x1WbXD.jpg' },
        { url: 'https://ifh.cc/g/NbgqVO.jpg' },
        { url: 'https://ifh.cc/g/rgW8Zq.jpg' },
        { url: 'https://ifh.cc/g/bNZrzD.jpg' },
        { url: 'https://ifh.cc/g/a0dFSn.jpg' },
      ],
      price: '234,552',
    },
    {
      name: '영국',
      image: [
        { url: 'https://ifh.cc/g/x1WbXD.jpg' },
        { url: 'https://ifh.cc/g/NbgqVO.jpg' },
        { url: 'https://ifh.cc/g/rgW8Zq.jpg' },
        { url: 'https://ifh.cc/g/bNZrzD.jpg' },
        { url: 'https://ifh.cc/g/a0dFSn.jpg' },
      ],
      price: '234,552',
    },
    {
      name: '영국',
      image: [
        { url: 'https://ifh.cc/g/x1WbXD.jpg' },
        { url: 'https://ifh.cc/g/NbgqVO.jpg' },
        { url: 'https://ifh.cc/g/rgW8Zq.jpg' },
        { url: 'https://ifh.cc/g/bNZrzD.jpg' },
        { url: 'https://ifh.cc/g/a0dFSn.jpg' },
      ],
      price: '234,552',
    },
    {
      name: '영국',
      image: [
        { url: 'https://ifh.cc/g/x1WbXD.jpg' },
        { url: 'https://ifh.cc/g/NbgqVO.jpg' },
        { url: 'https://ifh.cc/g/rgW8Zq.jpg' },
        { url: 'https://ifh.cc/g/bNZrzD.jpg' },
        { url: 'https://ifh.cc/g/a0dFSn.jpg' },
      ],
      price: '234,552',
    },
  ];

  return (
    <div className={css.container}>
      {data.map(data => (
        <RoomList image={data.image} name={data.name} price={data.price} />
      ))}
    </div>
  );
}

export default Home;
