import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay"; 

interface ModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
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
    <>
   
      {active && <ModalOverlay onClick={() => setActive(false)} />}
      <div
        className={active ? `${styles.modal} ${styles.active}` : styles.modal}
        onClick={() => setActive(false)}
      >
        <div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()} // Останавливаем всплытие события клика, чтобы не закрывать модальное окно при клике внутри него
        >
          <div className={styles.ModalHeader}>
            <div className="text text_type_main-large"></div>
            <div className={`p-2 ${styles.pointer}`}>
              <CloseIcon type="primary" onClick={() => setActive(false)} />
            </div>
          </div>

          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
