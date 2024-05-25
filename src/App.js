// App.js
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";

import Login from "./pages/login";
import Layout from "./components/Layout";
import { Icecream, Payment, Food } from "./pages";
import Product from "./pages/ProductPage";
import User from "./pages/UserPage";
import api from "./helpers/api";
import { jwtDecode } from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const savedRoute = localStorage.getItem("currentRoute");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkAccessToken = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        let decodedToken;
        try {
          decodedToken = jwtDecode(token);
        } catch (e) {
          console.error("Invalid token", e);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setIsLoggedIn(false);
          return;
        }

        const currentTime = Date.now() / 1000;
        if (currentTime >= decodedToken.exp) {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const response = await api.post("refreshToken", { refreshToken });
              const newAccessToken = response.data.accessToken;
              localStorage.setItem("accessToken", newAccessToken);
              setIsLoggedIn(true);
            } catch (error) {
              console.error("Error refreshing token", error);
              setIsLoggedIn(false);
            }
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAccessToken();
  }, []);

  const hasRole = (roles, allowedRoles) => {
    return allowedRoles.some((role) => roles.includes(role));
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to={savedRoute || "/"} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          exact
          path="/"
          element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
        >
          <Route
            exact
            path="/"
            element={isLoggedIn ? <Food /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/payment"
            element={isLoggedIn ? <Payment /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/icecream"
            element={isLoggedIn ? <Icecream /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/product"
            element={
              isLoggedIn
                ? hasRole(jwtDecode(localStorage.getItem("accessToken")).roles, ["admin", "super_admin"])
                  ? <Product />
                  : <div>Not permitted</div>
                : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/users"
            element={
              isLoggedIn
                ? hasRole(jwtDecode(localStorage.getItem("accessToken")).roles, ["super_admin"])
                  ? <User />
                  : <div>Not permitted</div>
                : <Navigate to="/login" />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
