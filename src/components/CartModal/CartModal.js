import { FaTimes } from "react-icons/fa";
import { useCart } from "@hooks/use-cart";
import Button from "@components/Button";
import Image from "next/image";
import styles from "./CartModal.module.scss";

export default function CartModal() {
  let {
    active,
    toggleModal,
    subTotal,
    totalItems,
    checkout,
    checkoutAPI,
    cartItems,
    removeFromCart,
  } = useCart();

  return (
    <div className={styles.modalWrapper} active={active} id="modal">
      <div className={styles.buttonContainer}>
        <Button className={styles.exitButton} onClick={toggleModal}>
          <FaTimes />
        </Button>
      </div>
      <h1>Cart</h1>
      <h2>Subtotal £{subTotal}</h2>
      <Button onClick={checkoutAPI} className={styles.checkout}>
        Checkout
      </Button>
      {cartItems.map((product) => {
        let { id, name, image, quantity } = product;
        return (
          <div key={id} className={styles.modalItem}>
            <h3 className={styles.productName}>{name}</h3>
            <div className={styles.imageButtonWrapper}>
              <Button
                onClick={() => removeFromCart(id)}
                className={styles.removeButton}
              >
                <FaTimes />
              </Button>
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
