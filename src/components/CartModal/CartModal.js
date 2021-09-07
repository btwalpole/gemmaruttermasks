import { FaTimes } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useCart } from "@hooks/use-cart";
import { useState } from 'react';
import Button from "@components/Button";
import Image from "next/image";
import styles from "./CartModal.module.scss";

export default function CartModal() {
  const [isLoading, setIsLoading] = useState(false);

  let {
    active,
    toggleModal,
    subTotal,
    checkoutAPI,
    cartItems,
    removeFromCart,
  } = useCart();

  function handleCheckout() {
    if(subTotal > 0) {
      checkoutAPI();
      setIsLoading(true);
    }
  }

  const spinLogo = (
    <div className={styles.spinLogo}>
      <Image src="/images/logo.png" alt="logo" width={215} height={213} />    
    </div>
  )

  return (
    <div className={styles.modalWrapper} active={active} id="modal">
      <div className={styles.buttonContainer}>
        <Button className={styles.exitButton} onClick={toggleModal}>
          <FaTimes />
        </Button>
      </div>
      <h1>Cart: £{subTotal}</h1>
      <Button onClick={handleCheckout} className={styles.checkout}>
        {isLoading ? spinLogo : 'Checkout'}
      </Button>
      {cartItems.map((product) => {
        let { id, name, image, quantity } = product;
        return (
          <div key={id} className={styles.modalItem}>
            <div className={styles.productWrapper}>
              <Button
                onClick={() => removeFromCart(id)}
                className={styles.removeButton}
              >
                <ImBin />
              </Button>
              <div className={styles.imgQtyWrapper}>
                <h2 className={styles.productName}>{name}</h2>
                <div className={styles.productImage}>
                  <Image src={image} width={1024} height={768} alt={name} />
                </div>
                <h3 className={styles.quantity}>Quantity: {quantity}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
