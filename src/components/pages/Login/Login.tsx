import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../services/userslice/userSlice"; // Импорт экшена
import { AppDispatch, RootState } from "../../../services/store"; // Импортируем типы

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const [isSwitchingPassword, setSwitchingPassword] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Подключаем состояние для обработки загрузки и ошибок
  const { loading, error } = useSelector((state: RootState) => state.user);

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
  };

  const switchingPassword = () => {
    setSwitchingPassword((prevState) => !prevState);
  };

  // Функция для отправки формы
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Отправляем запрос на вход
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/profile"); // Перенаправляем на страницу профиля при успешном входе
      })
      .catch((err) => {
        console.error("Login error: ", err); // Обработка ошибки
      });
  };

  return (
    <div className={styles.RegistrationBlock}>
      <h2 className={styles.title}>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.InputOne}>
          <Input
            type={"text"}
            placeholder={"E-mail"}
            onChange={handleEmailChange}
            value={email}
            name={"email"}
            error={false}
            ref={emailInputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>
        <div className={styles.InputTwo}>
          <Input
            type={isSwitchingPassword ? "text" : "password"}
            placeholder={"Пароль"}
            onChange={handlePasswordChange}
            value={password}
            name={"pass"}
            error={false}
            icon={"ShowIcon"}
            ref={inputPasswordRef}
            onIconClick={switchingPassword}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>
        <div className={styles.buttom}>
          <Button htmlType="submit" type="primary" size="medium">
            {loading ? "Загрузка..." : "Войти"}
          </Button>
        </div>
      </form>
      {error && <p className={styles.errorText}>Ошибка: {error}</p>}{" "}
      {/* Показываем ошибку, если она есть */}
      <div className={styles.footerLinks}>
        <p className="text text_type_main-default">
          Вы новый пользователь?
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default mt-2">
          Забыли пароль?
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
