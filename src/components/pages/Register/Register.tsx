import React, { useState, useRef, ChangeEvent } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../services/userslice/userSlice";
import { RootState, AppDispatch } from "../../../services/store";


const Register: React.FC = () => {

  const [name, setName] = useState<string>('');  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const nameInputRef = useRef<HTMLInputElement>(null); 
  const emailInputRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null); // Типизация для рефа

const dispatch = useDispatch<AppDispatch>();
const {isLoading, hasError} = useSelector((state: RootState) => state.user);


const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({email, password, name}));
};
  //Состояние управления паролем
  const [isSwitchingPassword, setSwitchingPassword] = useState<boolean>(false);

const handleNameChange =(e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
}

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onIconClick = () => {
    if (inputPasswordRef.current) {
      inputPasswordRef.current.focus(); // Фокусируем элемент при клике на иконку
    }
    alert("Icon Click Callback");
  };

  // Функция для переключения видимости пароля

  const switchingPassword = () => {
    setSwitchingPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.RegistrationBlock}>
      <h2 className={styles.title}>Регистрация</h2>
      <form onSubmit={handleRegister}>
        <div className={styles.InputOne}>
          <Input
            type="text"
            value={name}
            ref={nameInputRef} // Передаем реф
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            onPointerEnterCapture={() => {}} // Передаем пустую функцию
            onPointerLeaveCapture={() => {}} // Передаем пустую функцию
          />
        </div>
        <div className={styles.InputTwo}>
          <Input
            type="email"
            ref={emailInputRef} // Передаем реф
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            onPointerEnterCapture={() => {}} // Передаем пустую функцию
            onPointerLeaveCapture={() => {}} // Передаем пустую функцию
          />
        </div>
        <div className={styles.InputTwo}>
          <Input
            type={isSwitchingPassword ? "text" : "password"}
            onIconClick={switchingPassword}
            ref={inputPasswordRef} // Передаем реф
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            onPointerEnterCapture={() => {}} // Передаем пустую функцию
            onPointerLeaveCapture={() => {}} // Передаем пустую функцию
            icon={"ShowIcon"}
          />
        </div>
        <div className={styles.buttom}>
          <button type="submit" disabled={isLoading}>
           Регистрация
          </button>
          {hasError && <p>Error during registration</p>}
        </div>
      </form>
      
      <div className={styles.footerLinks}>
        <p className="text text_type_main-default mt-2">
          Уже зарегистрированны?
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;