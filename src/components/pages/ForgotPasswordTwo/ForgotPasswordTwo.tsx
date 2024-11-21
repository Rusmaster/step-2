
import React, { useState, useRef, ChangeEvent } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";


const ForgotPasswordTwo: React.FC = () => {

  const[newpassword, setNewpassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const newpasswordRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null); // Типизация для рефа



  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNewpasswordChange =(e: ChangeEvent<HTMLInputElement>) => {
setNewpassword(e.target.value);
  };

  const onIconClick = () => {
    if (inputPasswordRef.current) {
      inputPasswordRef.current.focus(); // Фокусируем элемент при клике на иконку
    }
    alert("Icon Click Callback");
  };

  return (
    <div className={styles.RegistrationBlock}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <div className={styles.InputOne}>
        <Input
          type={"text"}
          placeholder={"Введите новый пароль"}
          onChange={handleNewpasswordChange} // Используем типизированный обработчик
          value={newpassword}
          name={"email"}
          error={false}
          ref={newpasswordRef} // Передаем реф
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          onPointerEnterCapture={() => {}} // Передаем пустую функцию
          onPointerLeaveCapture={() => {}} // Передаем пустую функцию
        />
      </div>
      <div className={styles.InputTwo}>
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleEmailChange} // Используем типизированный обработчик
          value={email}
          name={"email"}
          error={false}
          ref={emailInputRef} // Передаем реф
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          onPointerEnterCapture={() => {}} // Передаем пустую функцию
          onPointerLeaveCapture={() => {}} // Передаем пустую функцию
        />
      </div>
      <div className={styles.buttom}>
        <Button htmlType="button" type="primary" size="medium">
          Сохранить
        </Button>
      </div>
      <div className={styles.footerLinks}>
        <p className="text text_type_main-default mt-2">
          Вспомнили пароль?
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
export default ForgotPasswordTwo;