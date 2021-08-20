import { useState, createContext, useContext } from "react";

export const CartContext = createContext();

export function useCartState() {
  const [cartContents, setCartContents] = useState([]);
  const [cartModal, setCartModal] = useState(false);

  function toggleModal() {
    if (cartModal) {
      closeCartModal();
    } else {
      openCartModal();
    }
    setCartModal((prevState) => {
      return !prevState;
    });
  }

  function openCartModal() {
    document.getElementById("modal").style.right = "0px";
  }

  function closeCartModal() {
    document.getElementById("modal").style.right = "-300px";
  }

  function AddToCart(newProduct, newLining, quantity) {
    console.log("adding product: ");
    console.log(newProduct);
    console.log(newLining);

    if (
      cartContents.some(
        (product) =>
          product.item.id === newProduct.id &&
          product.lining.name === newLining.name
      )
    ) {
      console.log(
        `${newProduct.id} already present in cart, incrementing quantity`
      );
      const updatedItems = cartContents.map((product) => {
        if (
          product.item.id === newProduct.id &&
          product.lining.name === newLining.name
        ) {
          return { ...product, quantity: product.quantity + quantity };
        }
        return product;
      });
      setCartContents(updatedItems);
    } else {
      console.log("addding new product");
      setCartContents((prevContents) => [
        ...prevContents,
        {
          item: newProduct,
          lining: newLining,
          quantity: quantity
        }
      ]);
    }

    if (!cartModal) {
      toggleModal();
    }
  }

  function removeFromCart(id, liningName) {
    console.log("removing product: " + id + " with lining " + liningName);

    function isMatch(product) {
      if (product.item.id === id && product.lining.name === liningName) {
        return false;
      }
      return true;
    }

    setCartContents(cartContents.filter((product) => isMatch(product)));
  }

  console.log("cart contents: ");
  console.log(cartContents);

  return {
    cartContents,
    AddToCart,
    removeFromCart,
    toggleModal,
    cartModal
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
