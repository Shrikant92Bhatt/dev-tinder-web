import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Body from './components/Body';
import Login from './components/Login';
import About from './components/About';
import Signup from './components/Signup';
import Feed from './components/Feed';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import Connections from './components/Connections';
import Requests from './components/Requests';

function App() {
  const user = useSelector((state) => state.user);
  const token = Cookies.get('token');

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Navigate to="/feed" />} />
            <Route
              path="/feed"
              element={
                <PrivateRoute>
                  <Feed />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={user || token ? <Navigate to="/feed" /> : <Login />} />
            <Route path="/signup" element={user || token ? <Navigate to="/feed" /> : <Signup />} />
            <Route
              path="/About"
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
              }
            />
            <Route
              path="/Profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/connections"
              element={
                <PrivateRoute>
                  <Connections />
                </PrivateRoute>
              }
            />
            <Route
              path="/requests"
              element={
                <PrivateRoute>
                  <Requests />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
