import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Contact us at gemmaruttermasks@gmail.<span>com</span> or at{" "}
        <a
          href="https://instagram.com/gemmaruttermasks?igshid=1riu84ysctghb"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.instaLink}
        >
          gemmaruttermasks
        </a>{" "}
        on Instagram.
      </p>
      &copy; Gemma Rutter Masks, {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;
