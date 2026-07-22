
import Home from "./pages/Home.jsx";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SignUp from "./pages/SignUp.jsx"

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

const App = () => {
  return (
    <>
    
      <BrowserRouter>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    `${isActive}? bg-primary : bg-success `;
                  }}
                >
                  Home
                </NavLink>
                  <NavLink
                  to="/signUp"
                  className={({ isActive }) => {
                    `${isActive}? bg-primary : bg-success `;
                  }}
                >
                  SignUp
                </NavLink>
              
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
};

export default App