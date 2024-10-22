import React from "react";
import styles from "./header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Outlet} from 'react-router-dom';

const AppHeader = () => {
  return (
    <> 
    <header className={styles.header}>
      <div className={styles.leftBlock1}>
<Link className={styles.centerBlock}  to="/">
        <div className={styles.navigationLink}>
          <BurgerIcon type="primary" />{" "}
          <span className="text text_type_main-default">Конструктор</span>
        </div>
</Link>
      </div>
      <div className={styles.leftBlock2}>
        <div className={styles.navigationLink}>
          <ListIcon type="primary" />
          <span className="text text_type_main-default">Лента заказов </span>
        </div>
      </div>
      <Link className={styles.centerBlock}  to="/">
       
          <Logo />
        
      </Link>
     
      <div className={styles.rightBlock}>
 <Link to="/profile"> 
        <div className={styles.navigationLink}>
          <ProfileIcon type="primary" />
          <span className="text text_type_main-default">Личный кабинет</span>
        </div>
        </Link>
      </div>     
    </header>
    <Outlet/>
    </>
  )
};
export default AppHeader;
