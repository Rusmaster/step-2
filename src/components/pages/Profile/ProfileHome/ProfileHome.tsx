// src/components/ProfileHome.tsx

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../../../services/userslice/userSlice";
import { RootState, AppDispatch } from "../../../../services/store";

const ProfileHome: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, updateSuccess, error, user } = useSelector(
    (state: RootState) => state.user
  );

  // Локальные состояния для имени, email и пароля
  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>("");

  // Сброс состояния формы после успешного обновления данных
  useEffect(() => {
    if (updateSuccess) {
      setPassword(""); // Очищаем пароль
    }
  }, [updateSuccess]);
  // Функция для сброса значений в исходное состояние
  const handleReset = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPassword("");
  };

  // Обработка отправки формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Создаем объект с обновленными данными
    const updatedData: { name: string; email: string; password?: string } = {
      name,
      email,
    };
    if (password) {
      updatedData.password = password;
    }

    // Отправляем запрос на обновление данных
    dispatch(updateUserInfo(updatedData));
  };

  return (
    <div className={styles.RegistrationBlock}>
      <h2 className={styles.title}>Обновление персональных данных</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.InputTwo}>
          <Input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon="EditIcon"
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>
        <div className={styles.InputTwo}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon="EditIcon"
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>
        <div className={styles.InputTwo}>
          <Input
            type="password"
            placeholder="Новый пароль (если хотите сменить)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="ShowIcon"
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          />
        </div>
        <div className={styles.buttom}>
          <button className={styles.cancelButton} onClick={handleReset}>
            Отменить
          </button>
          <Button
            disabled={isLoading}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            {isLoading ? "Загрузка..." : "Сохранить"}
          </Button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {updateSuccess && (
          <p style={{ color: "green" }}>Данные успешно обновлены!</p>
        )}
      </form>
    </div>
  );
};

export default ProfileHome;
