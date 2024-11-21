import React from "react";
import styles from "./header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./../../services/store"; // Импорт состояния из Redux
const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Получаем текущий путь
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const handleOrdersClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Предотвращаем переход по умолчанию

    if (isAuthenticated) {
      // Если пользователь авторизован, переходим на /profile/orders
      navigate("/profile/orders");
    } else {
      // Если пользователь не авторизован, переходим на /register
      navigate("/register");
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.leftBlock1}>
          <NavLink
            // className={styles.centerBlock}
            to="/"
            className={({ isActive }) =>
              `${styles.navigationLink} ${styles.centerBlock} ${
                isActive ? styles.active : ""
              }`
            }
          >
            <div className={styles.navigationLink}>
              <BurgerIcon type="primary" />{" "}
              <span className="text text_type_main-default">Конструктор</span>
            </div>
          </NavLink>
        </div>

        <div className={styles.leftBlock2}>
          <NavLink
            to="/orders"
            onClick={handleOrdersClick}
            className={({ isActive }) =>
              `${styles.navigationLink} ${
                isActive || location.pathname === "/profile/orders"
                  ? styles.active
                  : ""
              }`
            }
          >
            <div className={styles.navigationLink}>
              <ListIcon type="primary" />
              <span className="text text_type_main-default">
                Лента заказов{" "}
              </span>
            </div>
          </NavLink>
        </div>

        <Link className={styles.centerBlock} to="/">
          <Logo />
        </Link>

        <div className={styles.rightBlock}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${styles.navigationLink} ${isActive ? styles.active : ""}`
            }
          >
            <div className={styles.navigationLink}>
              <ProfileIcon type="primary" />
              <span className="text text_type_main-default">
                Личный кабинет
              </span>
            </div>
          </NavLink>
        </div>
      </header>
      <Outlet />
    </>
  );
};
export default AppHeader;
