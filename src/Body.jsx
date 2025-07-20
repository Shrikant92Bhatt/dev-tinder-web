import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import Footer from './Footer'
import {getUser} from './api/index';
import { useDispatch } from 'react-redux';
import { addUser } from './store/userSlice';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async() => {
        try {
            const user = await getUser();
            dispatch(addUser(user));
        } catch (error) {
            console.error(error);
            navigate("/login")
        }
    }

    useEffect(()=>{
        fetchUser();
    },[]);
    
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body