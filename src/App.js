import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Home from "./components/Routes/Home";
import Register from "./components/Routes/Register";
import Login from "./components/Routes/Login";
import Profile from "./components/Routes/Profile";
import PostAccount from "./components/Routes/PostAccount";
import Account from "./components/Routes/Account";
import AuthService from "./services/auth.service";
import env from "react-dotenv";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route
            path="login"
            element={
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="profile"
            element={
              <Profile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="account"
            element={
              <Account
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="postAccount"
            element={
              <PostAccount
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
