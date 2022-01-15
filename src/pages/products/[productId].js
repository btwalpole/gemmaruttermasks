import Image from "next/image";
import { useState } from "react";
import { useCart } from "@hooks/use-cart";
import Button from "@components/Button";
import styles from "@styles/Product.module.scss";
import styled from "styled-components";
import products from "@data/products.json";

const LiningButton = styled.button`
  padding: 0px 5px;
  border-radius: 50px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin: 10px 10px;
  background: ${(props) => props.color};
  border: ${(props) =>
    props.selected
      ? "6px solid rgb(240, 240, 240)"
      : "2px solid rgb(240, 240, 240)"};
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    border: 6px solid rgb(240, 240, 240);
  }
  transition: border 150ms ease-in-out, transform 150ms ease;
`;

export default function Product({ product }) {
  let { variants, groupTitle } = product;
  const [variant, setVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeButtonId, setActiveButtonId] = useState(variants[0].id);
  const { addToCart } = useCart();

  function showVariant(id) {
    let selectedVariant = variants.find((variant) => variant.id === id);
    setVariant(selectedVariant);
    setActiveButtonId(id);
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

  let { id, image, price, liningName, inStock } = variant;

  const outOfStock = () => {
    if (!inStock) {
      return " - Out of stock";
    }
  };

  const addToCartButtonStyles = inStock
    ? styles.enabledAddToCartButton
    : styles.disabledAddToCartButton;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.productImage}>
          <Image src={image} width="1024" height="768" alt={groupTitle} />
        </div>

        <div>
          <h1>{groupTitle}</h1>
          <h2>
            {liningName} {outOfStock()}
          </h2>
          <div className={styles.liningButtonsWrapper}>
            {variants.map((mask) => {
              const { id, color } = mask;
              return (
                <LiningButton
                  key={id}
                  color={color}
                  onClick={() => showVariant(id)}
                  selected={activeButtonId === id ? true : false}
                ></LiningButton>
              );
            })}
          </div>
          <p className={styles.price}>£{price.toFixed(2)}</p>
          <div className={styles.addToCartWrapper}>
            <div className={styles.quantityButtonsWrapper}>
              <Button
                className={styles.editQuantityButton}
                onClick={() => handleQuantityChange("decrement")}
              >
                -
              </Button>
              <h2>{quantity}</h2>
              <Button
                className={styles.editQuantityButton}
                onClick={() => handleQuantityChange("increment")}
              >
                +
              </Button>
            </div>
            <div className={styles.addToCartButtonWrapper}>
              <Button
                className={addToCartButtonStyles}
                onClick={() => addToCart(variant, quantity)}
                disabled={!inStock}
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
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
