import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./AuthProvider/AuthProvider";
import Header from "./Header/Header";
import Home from "./Home";
import Login from "./Login/Login";
import PrivateRoute from "./Private/PrivateRoute";
import Register from "./Register/Register";
import UserInfoForm from "./UserInfoForm/UserInfoForm";
import UserInfo from "./UserInfos/UserInfo";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <PrivateRoute path="/userinfoform">
              <UserInfoForm></UserInfoForm>
            </PrivateRoute>
            <PrivateRoute path="/userinfo">
              <UserInfo></UserInfo>
            </PrivateRoute>
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
