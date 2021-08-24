import Image from "next/image";
import { useState } from "react";
import { useCart } from "@hooks/use-cart";
import styles from "@styles/Product.module.scss";
import products from "@data/products.json";

export default function Product({ product }) {
  let { variants, groupTitle } = product;
  const [variant, setVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);

  console.log("current variant", variant);

  const { addToCart } = useCart();

  function showVariant(id) {
    let selectedVariant = variants.find((variant) => variant.id === id);
    console.log("trying to select id", id);
    console.log(selectedVariant);
    setVariant(selectedVariant);
    //setActiveButton(selected.name);
  }

  function handleQuantityChange(direction) {
    if (direction === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (direction === "decrement") {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  }

  let { id, image, price } = variant;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.productImage}>
          <Image src={image} width="1024" height="768" alt={groupTitle} />
        </div>

        <div>
          <h1>{groupTitle}</h1>
          <div>
            {variants.map((mask) => {
              const { id, color } = mask;
              return (
                <button
                  className={styles.liningButton}
                  key={id}
                  style={{ background: color }}
                  onClick={() => showVariant(id)}
                ></button>
              );
            })}
          </div>
          <p className={styles.description}>£{price.toFixed(2)}</p>
          <div className={styles.addToCartWrapper}>
            <div className={styles.quantityButtonsWrapper}>
              <button
                className={styles.editQuantityButton}
                onClick={() => handleQuantityChange("decrement")}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button
                className={styles.editQuantityButton}
                onClick={() => handleQuantityChange("increment")}
              >
                +
              </button>
            </div>
            <button
              className={styles.addToCartButton}
              onClick={() => addToCart({ id, quantity })}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>&copy; Gemma Rutter Masks, 2021</footer>
    </div>
  );
}

export async function getStaticProps({ params }) {
  console.log("params", params);
  const product = products.find(({ groupId }) => groupId === params.productId);

  //make the product which matches the path available to the product page
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const paths = products.map((product) => {
    return {
      params: {
        productId: product.groupId,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
