import Image from "next/image";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <p>
          Contact us at gemmaruttermasks@gmail.<span>com</span> or{" "}
          <a
            href="https://instagram.com/gemmaruttermasks?igshid=1riu84ysctghb"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instaLink}
          >
            gemmaruttermasks
          </a>{" "}
          on Instagram
        </p>
        <a
          href="https://instagram.com/gemmaruttermasks?igshid=1riu84ysctghb"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.instaLogo}
        >
          <Image
            src="/images/instalogo.png"
            alt="Instagram Logo"
            width={50}
            height={50}
            //layout="responsive"
          />
        </a>
      </div>

      <div className={styles.credits}>
        <p className={styles.p}>Website made by Ben Walpole</p>
        <a
          href="https://github.com/btwalpole/gemmaruttermasks"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          <Image
            src="/images/GitHub_Mark.png"
            alt="GitHub Logo"
            width={32}
            height={32}
            layout="intrinsic"
          />
        </a>
      </div>
      <p className={`${styles.copyrightText} ${styles.p}`}>
        <p className={`${styles.copyrightLogo} ${styles.p}`}>&#xa9;</p>
        <p className={styles.p}>
          Gemma Rutter Masks, {new Date().getFullYear()}
        </p>
      </p>
    </footer>
  );
}

export default Footer;
