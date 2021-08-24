import Image from "next/image";
import Link from "next/link";
import Container from "@components/Container";
import useViewport from "@hooks/Viewport";
import { useEffect } from "react";
import styles from "@styles/Home.module.scss";
import products from "@data/products.json";

export default function Home() {
  const width = useViewport();
  const breakpoint = 600;
  let ResponsiveHeroImg;

  if (width < breakpoint) {
    ResponsiveHeroImg = (
      <Image
        src="/images/hero_mobile.jpeg"
        alt="hero image"
        layout="fill"
        objectFit="cover"
        priority="true"
      />
    );
  } else {
    ResponsiveHeroImg = (
      <Image
        src="/images/hero_desktop.jpeg"
        alt="hero image"
        layout="fill"
        objectFit="cover"
        priority="true"
      />
    );
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroImg}>{ResponsiveHeroImg}</div>
      </div>

      <main>
        <Container>
          <div className={styles.headingWrapper}>
            <h1 className={styles.heading}>Handmade Masks &amp; Scrunchies</h1>
            <p>Each set is £8 + £2 P+P and includes:</p>
            <ul>
              <li>Reversible face mask with PM2.5 filter</li>
              <li>Scrunchie</li>
              <li>Travel Pouch</li>
            </ul>
          </div>

          <ul className={styles.products}>
            {products.map((product) => {
              return (
                <li key={product.groupId}>
                  <Link href={`/products/${product.groupId}`}>
                    <a>
                      <Image
                        width="4032"
                        height="3024"
                        src={product.variants[0].image}
                        alt={`Card of ${product.groupTitle}`}
                      />
                      <h3 className={styles.productTitle}>
                        {product.groupTitle}
                      </h3>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </main>
    </div>
  );
}
