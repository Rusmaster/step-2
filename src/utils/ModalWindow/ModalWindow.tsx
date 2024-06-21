import React from "react";
import styles from "./styles.module.css";

interface ModalWindowProps {
  active: boolean;
  setActive: (active: boolean) => void;
  children: React.ReactNode;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => setActive(false)}
    >
      <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
