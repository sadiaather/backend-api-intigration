
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/context.jsx";
import { Navbar as BsNavbar, Nav, Container } from "react-bootstrap";


const Navbar = () => {
  const { state, dispatch } = useContext(GlobalContext);
    console.log("NAVBAR STATE:", state);

  const handleLogout = () => {
    dispatch({
      type: "USER_LOGOUT",
    });

    localStorage.removeItem("token");
  };

  return (
    
    <nav className="navbar navbar-expand-lg navbar-white bg-white text-bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          My Portfolio
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">
            Home
          </Link>

          {!state.isLoggedIn ? (
            <>
              <Link className="nav-link" to="/signup">
                Signup
              </Link>

              <Link className="nav-link" to="/login">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/myProjects">
                My Projects
              </Link>

              <button
                className="btn btn-danger ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

