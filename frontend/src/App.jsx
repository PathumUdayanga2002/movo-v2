import React from "react";
import PresenterDashBoard from "./components/PresenterDashboard/PresenterDashBoard";
import Home from "./components/Home/Home";
import SigninPresenter from "./Presenter/Signin/SigninPresenter";


const App = () => {
  return <div>
    <SigninPresenter/>
    <Home/>
    <PresenterDashBoard/>
  </div>;
};

export default App;
