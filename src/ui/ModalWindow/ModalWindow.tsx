import React, { useEffect } from "react";
import styles from "./styles.module.css";

interface ModalWindowProps {
  active: boolean;
  setActive: (active: boolean) => void;
  children: React.ReactNode;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
  active,
  setActive,
  children,
}) => {
  useEffect(() => {
    // Функция для закрытия модального окна по нажатию клавиши Escape
    const handleModalKeyClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    // Добавляем обработчик событий при активации модального окна
    if (active) {
      window.addEventListener("keydown", handleModalKeyClose);
    }

    // Удаляем обработчик событий при размонтировании компонента или изменении активации
    return () => {
      window.removeEventListener("keydown", handleModalKeyClose);
    };
  }, [active, setActive]);

  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()} // Останавливаем всплытие события клика, чтобы не закрывать модальное окно при клике внутри него
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
