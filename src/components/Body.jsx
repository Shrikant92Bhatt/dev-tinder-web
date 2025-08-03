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
    <div className="min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Body;
