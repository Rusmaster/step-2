
import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/userslice/userSlice";
import { AppDispatch, RootState } from "../../../services/store";


const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  //Состояние для обработки загрузки и ошибок

  const { loading, error } = useSelector((state: RootState) => state.user);
 const dispatch: AppDispatch = useDispatch();
 const navigate = useNavigate();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null); // Типизация для рефа

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onIconClick = () => {
    if (inputPasswordRef.current) {
      inputPasswordRef.current.focus(); // Фокусируем элемент при клике на иконку
    }
    alert("Icon Click Callback");
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Отправляем запрос на восстановление пароля
      await dispatch(forgotPassword(email)).unwrap();

      // Перенаправляем пользователя на страницу с подтверждением после успешного запроса
      navigate("/reset-password");
    } catch (err) {
      console.error(
        "Ошибка при отправке запроса на восстановление пароля",
        err
      );
    }
  };

  return (
    <div className={styles.RegistrationBlock}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.InputOne}>
          <Input
            type={"text"}
            placeholder={"Укажите e-mail"}
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
          <Button htmlType="submit" type="primary" size="medium" disabled={loading}>
            {loading ? "Загрузка..." : "Восстановить"}
          </Button>
        </div>
        {error && <p>{error}</p>}
      </form>

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
export default ForgotPassword;