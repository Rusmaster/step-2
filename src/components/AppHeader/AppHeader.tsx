import React from "react";
import styles from "./header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftBlock1}>
        <div className={styles.navigationLink}>
          <BurgerIcon type="primary" />{" "}
          <span className="text text_type_main-default">Конструктор</span>
        </div>
      </div>
      <div className={styles.leftBlock2}>
        <div className={styles.navigationLink}>
          <ListIcon type="primary" />
          <span className="text text_type_main-default">Лента заказов </span>
        </div>
      </div>
      <div className={styles.centerBlock}>
        <Logo />
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.navigationLink}>
          <ProfileIcon type="primary" />
          <span className="text text_type_main-default">Личный кабинет</span>
        </div>
      </div>
    </header>
  );
};
export default AppHeader;
