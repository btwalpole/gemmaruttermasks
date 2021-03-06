import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@hooks/use-cart";
import styles from "./Header.module.scss";

function Header() {
  let { toggleModal, subTotal } = useCart();
  return (
    <header className={styles.header}>
      <div className={styles.logoTitleWrapper}>
        <Link href="/">
          <a className={styles.logo}>
            <Image src="/images/logo.png" alt="logo" width={215} height={213} />
          </a>
        </Link>
        <Link href="/">
          <a>
            <p className={styles.headerTitle}>Gemma Rutter Masks</p>
          </a>
        </Link>
      </div>
      <p className={styles.headerCart} onClick={toggleModal}>
        £{subTotal}
        <FaShoppingCart />
      </p>
    </header>
  );
}

export default Header;
