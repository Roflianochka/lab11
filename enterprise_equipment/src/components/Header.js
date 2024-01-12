import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "../pages/MainPage";
import Commisions from "../pages/Commisions";
import Enterprises from "../pages/Enterprises";
import CheckShedule from "../pages/CheckShedule";
import FaqPage from "../pages/FAQPage";
import UserProfilePage from "../pages/UserProfilePage";
import Employees from "../pages/Employees";
import AuthorizationPage from "../pages/AuthorizationPage";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../redux/actions";
import { jwtDecode } from "jwt-decode";
import "./../styles/Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken) {
          dispatch(
            setUser({
              fullname: decodedToken.fullname,
              nickname: decodedToken.nickname,
              email: decodedToken.email,
              bio: decodedToken.bio,
            })
          );
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        dispatch(clearUser());
      }
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <div className="header-container">
        <Link to="/">
          <h1 className="app-title">AssetGuardian</h1>
        </Link>

        <ul>
          <li>
            <Link to="/commissions"> Коммисии </Link>
          </li>
          <li>
            <Link to="/enterprises"> Предприятия </Link>
          </li>
          <li>
            <Link to="/checkShedule"> График проверок </Link>
          </li>
          <li>
            <Link to="/FAQPage"> FAQ </Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/UserProfile"> Профиль </Link>
              </li>
              <li>
                <Link to="/employees"> Сотрудники </Link>
              </li>
              <li>
                <Link to="/authorizationPage" onClick={handleLogout}>
                  Выйти
                </Link>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <li>
              <Link to="/authorizationPage"> Войти </Link>
            </li>
          )}
        </ul>
      </div>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/commissions" element={<Commisions />} />
        <Route path="/enterprises" element={<Enterprises />} />
        <Route path="/checkShedule" element={<CheckShedule />} />
        <Route path="/FAQPage" element={<FaqPage />} />
        {isAuthenticated && (
          <>
            <Route path="/UserProfile" element={<UserProfilePage />} />
            <Route path="/employees" element={<Employees />} />
          </>
        )}
        <Route
          path="/authorizationPage"
          element={
            isAuthenticated ? <Navigate to="/" /> : <AuthorizationPage />
          }
        />
      </Routes>
    </Router>
  );
};

export default Header;
