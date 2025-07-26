import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { getUser } from '../api/index';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/userSlice';
import Cookies from 'js-cookie';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const user = await getUser();
      dispatch(addUser(user));
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  };

  useEffect(() => {
    if (!user && Cookies.get('token')) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
