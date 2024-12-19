import React from "react";
import PresenterDashBoard from "./components/PresenterDashboard/PresenterDashBoard";
import Home from "./components/Home/Home";
import SigninPresenter from "./Presenter/Signin/SigninPresenter";
import SignInAdmin from "./Admin/SignInAdmin/SignInAdmin";


const App = () => {
  return <div>
    <SignInAdmin/>
    <SigninPresenter/>
    <Home/>
    <PresenterDashBoard/>
  </div>;
};

export default App;
