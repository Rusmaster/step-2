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
        {/* <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        /> */}
        <div className={styles.InputOne}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleNameChange} // Используем типизированный обработчик
          value={name}
          name={"name"}
          error={false}
          ref={nameInputRef} // Передаем реф
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          // onChange={(e) => setName(e.target.value)}
          onPointerEnterCapture={() => {}} // Передаем пустую функцию
          onPointerLeaveCapture={() => {}} // Передаем пустую функцию
        />
        </div>
 <div className={styles.InputTwo}>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={handleEmailChange} // Используем типизированный обработчик
          //onChange={(e) => setEmail(e.target.value)}
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
        <div className={styles.InputTwo}>
          <Input
            type={isSwitchingPassword ? "text" : "password"}
            placeholder={"Пароль"}
            onChange={handlePasswordChange} // Используем типизированный обработчик
            //onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"pass"}
            error={false}
            icon={"ShowIcon"}
            ref={inputPasswordRef} // Передаем реф
            onIconClick={switchingPassword}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            onPointerEnterCapture={() => {}} // Передаем пустую функцию
            onPointerLeaveCapture={() => {}} // Передаем пустую функцию
          />
        </div>
 <div className={styles.buttom}>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          disabled={isLoading}
        >
          Зарегистрироваться
        </Button>
      </div>
        {/* <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        /> */}
        {/* <button type="submit" disabled={isLoading}>
          Register
        </button> */}
        {hasError && <p>Error during registration</p>}
      </form>

      {/* <div className={styles.InputOne}>
        
        <Input
          type={"text"}
          placeholder={"Имя"}
           onChange={handleNameChange} // Используем типизированный обработчик
          value={name}
          name={"name"}
          error={false}
          ref={nameInputRef} // Передаем реф
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
         // onChange={(e) => setName(e.target.value)}
          onPointerEnterCapture={() => {}} // Передаем пустую функцию
          onPointerLeaveCapture={() => {}} // Передаем пустую функцию
        />
      </div>
      <div className={styles.InputTwo}>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          //onChange={handleEmailChange} // Используем типизированный обработчик
          onChange={(e) => setEmail(e.target.value)}
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
      <div className={styles.InputTwo}>
        <Input
          type={isSwitchingPassword ? "text" : "password"}
          placeholder={"Пароль"}
          //onChange={handlePasswordChange} // Используем типизированный обработчик
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"pass"}
          error={false}
          icon={"ShowIcon"}
          ref={inputPasswordRef} // Передаем реф
          onIconClick={switchingPassword}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          onPointerEnterCapture={() => {}} // Передаем пустую функцию
          onPointerLeaveCapture={() => {}} // Передаем пустую функцию
        />
      </div>
      <div className={styles.buttom}>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          disabled={isLoading}
        >
          Зарегистрироваться
        </Button>
      </div> */}

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