import React from "react";
import styles from "./styles.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../services/userslice/userSlice";// Импорт экшена для выхода
import { AppDispatch, RootState } from "../../../services/store";// Типизация dispatch
import OrdersProfile from "./OrdersProfile/OrdersProfile";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


const Profile:React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Получаем данные пользователя из Redux
  //const { name } = useSelector((state: RootState) => state.user);
  // Получаем refreshToken из Redux или локального хранилища
  const refreshToken =
    useSelector((state: RootState) => state.user.refreshToken) ||
    localStorage.getItem("refreshToken");

  // Обработчик выхода из системы
  const handleLogout = () => {
    if (refreshToken) {
      // Диспатчим экшен с refreshToken
      dispatch(logoutUser(refreshToken)).then(() => {
        navigate("/login"); // Перенаправляем на страницу логина после выхода
      });
    } else {
      console.error("Refresh token not found");
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.leftBox}>
        <nav className="navbar">
          <ul>
            <li>
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to="orders"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Выход
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.rightBox}>

        <Outlet />
      </div>
    </div>
  );
}
export default Profile;