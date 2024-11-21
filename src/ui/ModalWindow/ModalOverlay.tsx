import React from "react";
import styles from "./styles.module.css";

interface ModalOverlayProps {
    onClick: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({onClick}) => {

 return (
   <div className={` ${styles.overlay}`} onClick={onClick}></div>
 );

};
export default ModalOverlay;