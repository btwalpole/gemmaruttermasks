import { FaTimes } from "react-icons/fa";
import Button from "@components/Button";
import styles from "./AfterOrderModal.module.scss";

function AfterOrderModal({ children, closeModal }) {
  return (
    <div className={styles.modal}>
      <Button className={styles.exitButton} onClick={closeModal}>
        <FaTimes />
      </Button>
      <h2 className={styles.text}>{children}</h2>
    </div>
  );
}

export default AfterOrderModal;
