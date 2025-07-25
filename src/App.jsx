import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Body from './components/Body';
import Login from './components/Login';
import About from './components/About';
import Signup from './components/Signup';
import Feed from './components/Feed';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/login" element={user ? <Navigate to="/feed" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/feed" /> : <Signup />} />
            <Route path="/About" element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            } />
            <Route path="/Profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
