import React from "react";
import PresenterDashBoard from "./components/PresenterDashboard/PresenterDashBoard";
import Home from "./components/Home/Home";
import SigninPresenter from "./Presenter/Signin/SigninPresenter";
import SignInAdmin from "./Admin/SignInAdmin/SignInAdmin";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

const App = () => {
  return <div>
    {/* <SignInAdmin/>
    <SigninPresenter/>
    <Home/>
    <PresenterDashBoard/> */}

<Router>
  <Routes>
    <Route path="/register-admin" element={<SignInAdmin/>} />
    <Route path="/register-presenter" element={<SigninPresenter/>} />
    <Route path="/" element={<Home />} />
  </Routes>
</Router>
    
  </div>;
};

export default App;
