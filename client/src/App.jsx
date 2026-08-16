
import Home from "./pages/Home.jsx"
import SignUp from "./pages/SignUp.jsx"
import Login from "./pages/Login.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyProjects from "./pages/MyProjects.jsx";
import Navbar from "./component/Navbar.jsx";



const App = () => {


return(
<>

  <BrowserRouter>
  <Navbar/>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/login" element={<Login />} />
  <Route path="/myProjects" element={<MyProjects />} />
</Routes> 
<ToastContainer/>
                
  </BrowserRouter>
    

      
      
    </>
  );
};

export default App