import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './Detail/Detail';
import Filter from './Filter/Filter';
import Home from './Home/Home';
import Login from './Login/Login';
import Mypage from './Mypage/Mypage';
import Reservation from './Reservation/Reservation';
import Review from './Review/Review';
import Signup from './Signup/Signup';
import WishList from './WishList/WishList';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/review" element={<Review />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
