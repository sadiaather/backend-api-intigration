
import Home from "./pages/Home.jsx";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SignUp from "./pages/SignUp.jsx"
import Login from "./pages/Login.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { GlobalContext } from "./context/context.jsx";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import logo from "/log.png"


const App = () => {
    let {
    state: {
      isLoggedIn,
      user: { formData },
    },
    dispatch,
  } = useContext(GlobalContext);
  console.log(isLoggedIn);
  console.log(formData);
  return (
    <>
    
      <BrowserRouter>
       <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>
              {" "}
              <Link to="/">
                <img src={logo} alt="logo" width={50} height={50} />{" "}
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              
              <Nav className="ms-auto">
                <Nav.Link
                  href="/" className="text-primary">

                  Home
                </Nav.Link>
                {isLoggedIn ? (
                  <Nav.Link href="logout" className="text-primary">
                   Logout
                  </Nav.Link>
                ) : (
                  <Nav.Link href="signup" className="text-primary">
                    Signup
                  </Nav.Link>
                )}
              </Nav>
			   <Nav>
                 {isLoggedIn ? (
                  <Nav.Link href="projects" className="text-primary">
                    My projects
                  </Nav.Link>
                ) : (
                  <Nav.Link  className="text-primary">
                    
                  </Nav.Link>
                )}
              </Nav>
              <Nav>
                 {isLoggedIn ? (
                  <Nav.Link href="signup" className="text-primary">
                  
                  </Nav.Link>
                ) : (
                  <Nav.Link href="signup" className="text-primary">
                    Login
                  </Nav.Link>
                )}
                {isLoggedIn && <span>{formData?.email}</span>}
                <span>{formData?.name}</span>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
      
    </>
  );
};

export default App