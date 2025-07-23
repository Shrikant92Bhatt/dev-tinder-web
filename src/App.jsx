import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Body from './Body';
import Login from './Login';
import About from './About';
import Signup from './Signup';
import Feed from './Feed';

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/About" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
