import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../services/userslice/userSlice"; // Экшен для отправки запроса
import { AppDispatch, RootState } from "../../../services/store";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>(""); // Состояние для нового пароля
  const [token, setToken] = useState<string>(""); // Состояние для кода из письма

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Подключаем состояние для обработки загрузки и ошибок
  const { loading, error } = useSelector((state: RootState) => state.user);

  // Обработчик изменения пароля
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Обработчик изменения кода
  const handleTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Отправляем запрос на изменение пароля
      await dispatch(resetPassword({ password, token })).unwrap();

      // Перенаправляем пользователя на страницу авторизации после успешного запроса
      navigate("/login");
    } catch (err) {
      console.error("Ошибка при восстановлении пароля", err);
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.InputOne}>
          <Input
            type="password"
            placeholder="Введите новый пароль"
            onChange={handlePasswordChange}
            value={password}
            name="password"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="ml-1"
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>
        <div className={styles.InputTwo}>
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={handleTokenChange}
            value={token}
            name="token"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="ml-1"
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>
        <div className={styles.buttom}>
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Сохранить"}
          </Button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
