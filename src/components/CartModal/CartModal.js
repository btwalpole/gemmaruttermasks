import { FaTimes } from "react-icons/fa";
import { useCart } from "@hooks/use-cart";
import Image from "next/image";
import styles from "./CartModal.module.scss";

export default function CartModal() {
  let {
    active,
    toggleModal,
    subTotal,
    totalItems,
    checkout,
    cartItems,
    removeFromCart,
  } = useCart();

  return (
    <div className={styles.modalWrapper} active={active} id="modal">
      <div className={styles.buttonContainer}>
        <button className={styles.exitButton} onClick={toggleModal}>
          <FaTimes />
        </button>
      </div>
      <h1>Cart</h1>
      <h2>Subtotal £{subTotal}</h2>
      <button onClick={checkout}>Checkout</button>
      {cartItems.map((product) => {
        let { id, name, image, quantity } = product;
        return (
          <div key={id} className={styles.modalItem}>
            <h3 className={styles.productName}>{name}</h3>
            <div className={styles.imageButtonWrapper}>
              <button
                onClick={() => removeFromCart(id)}
                className={styles.removeButton}
              >
                <FaTimes />
              </button>
              <div className={styles.productImage}>
                <Image src={image} width={1024} height={768} alt={name} />
              </div>
            </div>

            <h3>Quantity: {quantity}</h3>
          </div>
        );
      })}
    </div>
  );
}
