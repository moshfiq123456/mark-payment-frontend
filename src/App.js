// App.js
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./pages/login";
import Home from "./pages/home";
import jwt_decode, { jwtDecode } from "jwt-decode";
import axios from "axios";
import Layout from "./components/Layout";
import { Icecream, Payment } from "./pages";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
        if (currentTime >= decodedToken.exp) {
          console.log("Access token is expired, try refreshing it");
          // Access token is expired, try refreshing it
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const response = await axios.post(
                "http://localhost:10000/api/refreshToken",
                {
                  refreshToken,
                }
              );
              const newAccessToken = response.data.accessToken;
              // Update the access token in local storage
              localStorage.setItem("accessToken", newAccessToken);
              console.log("Update the access token in local storage");
              setIsLoggedIn(true);
            } catch (error) {
              console.error("Error refreshing access token:", error);
              setIsLoggedIn(false);
            }
          } else {
            // No refresh token available, user needs to log in again
            localStorage.removeItem("accessToken");
            // Set new access token to local storage
            localStorage.removeItem("refreshToken");
            setIsLoggedIn(false);
            console.log(
              "No refresh token available, user needs to log in again"
            );
          }
        } else {
          // Access token is still valid
          setIsLoggedIn(true);
          console.log("Access token is still valid");
        }
      } else {
        // No access token available, user needs to log in
        console.log("No access token available, user needs to log in");
        setIsLoggedIn(false);
      }
    };

    checkAccessToken();
  }, []);
  console.log(isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          exact
          path="/"
          element={isLoggedIn ?<Layout><Home /></Layout>  : <Navigate to="/login" />}
        >
          <Route  
            exact
            path="/food"
            element={isLoggedIn ?<food />  : <Navigate to="/login" />}/>
            <Route  
            exact
            path="/payment"
            element={isLoggedIn ?<Payment />  : <Navigate to="/login" />}/>
            <Route  
            exact
            path="/icecream"
            element={isLoggedIn ?<Icecream />  : <Navigate to="/login" />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    // return <Routes>{getRoute()}</Routes>;
  );
}

export default App;
