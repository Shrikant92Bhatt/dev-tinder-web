import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Navbar from "./navbar/Navbar"
import Body from "./Body"
import Login from "./Login"
import About from "./About"


function App() {

  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}> 
          <Route path="/login" element={<Login />} />
          <Route path="/About" element={<About/>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
