import Image from "next/image";
import AfterOrderModal from "@components/AfterOrderModal";
import HomeProductCard  from "@components/HomeProductCard";
import useViewport from "@hooks/Viewport";
import { useEffect, useState } from "react";
import styles from "@styles/Home.module.scss";
import products from "@data/products.json";

import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

export default function Home() {
  const [modalActive, setModalActive] = useState(false);
  const [modalText, setModalText] = useState("");

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
      setModalText("Order placed! You will receive an email confirmation.");
      setModalActive(true);
    }
    if (query.get("canceled")) {
      setModalText(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
      setModalActive(true);
    }
  }, []);

  function closeModal() {
    setModalActive(false);
  }

  return (
    <>
      <div className={styles.heroWrapper}>
        <div className={styles.heroImg}>{ResponsiveHeroImg}</div>
      </div>

      <div className={styles.container}>
        {modalActive && (
          <AfterOrderModal closeModal={closeModal}>{modalText}</AfterOrderModal>
        )}

        <main className={styles.container}>
            <div className={styles.headingWrapper}>
              <h1 className={styles.heading}>
                Handmade Masks &amp; Scrunchies
              </h1>
              <p>Each set is £8 + £2 P+P and includes:</p>
              <ul>
                <li>Reversible face mask with PM2.5 filter</li>
                <li>Scrunchie</li>
                <li>Travel Pouch</li>
              </ul>
            </div>

            <ul className={styles.products}>
              {products.map((product) => {
                return (<HomeProductCard key={product.groupId} product={product} />)
              })}
            </ul>
        </main>
      </div>
    </>
  );
}
