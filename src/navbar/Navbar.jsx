import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAPI } from '../api/index';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { removeUser } from '../store/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const resp = await logoutAPI();
      console.log(resp);
      dispatch(removeUser());
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">devTinder</a>
      </div>
      {user && (
        <>
          <span>Welcome {user?.firstName}</span>
          <div className="flex gap-2">
            <div className="dropdown dropdown-end mx-5">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt={`${user?.firstName} avatar`} src={user?.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <Link onClick={logoutHandler}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
