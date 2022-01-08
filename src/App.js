import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./AuthProvider/AuthProvider";
import Home from "./Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import UserInfoForm from "./UserInfoForm/UserInfoForm";
import UserInfo from "./UserInfos/UserInfo";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <Route path="/userinfoform">
              <UserInfoForm></UserInfoForm>
            </Route>
            <Route path="/userinfo">
              <UserInfo></UserInfo>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
