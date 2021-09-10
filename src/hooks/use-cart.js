import { useState, createContext, useContext } from "react";
import getStripe from '../lib/get-stripe';

export const CartContext = createContext();

export function useCartState() {
  const [cart, updateCart] = useState([]);
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

  const subTotal = cart.reduce(
    (accumulator, { price, quantity }) => {
      return accumulator + price * quantity;
    },
    0
  );

  const lineItems = cart.map((item) => {
    return {
      price: item.id,
      quantity: item.quantity,
    };
  });

  function addToCart(variant, quantity) {
    updateCart((prev) => {
      //bit of annoying duplication here
      if(prev.find(product => product.id === variant.id)) {
        console.log(`${variant.id} found in cart, updating quantity`);
        let updatedCart = prev.map(product => {
          if (product.id === variant.id) {
            return {...product, quantity: product.quantity + quantity}
          } else {
            return product;
          }
        })
        return updatedCart;
      } else {
        console.log(`${variant.id} not found in cart, now adding`);
        return [...prev, {
          id: variant.id,
          name: variant.name,
          image: variant.image,
          price: variant.price,
          quantity
        }]
      }
    });

    if (!cartModal) {
      toggleModal();
    }
  }

  function removeFromCart(id) {
    updateCart(prev => {
      //clone prev state
      let prevArrayClone = [...prev];

      //find index of product to be deleted
      let indexToRemove = prevArrayClone.findIndex(product => product.id === id);

      //use splice to return new array without that index
      prevArrayClone.splice(indexToRemove, 1);
      return prevArrayClone;
    });
  }

  async function checkout() {    
    const response = await fetch("/api/checkoutSessions", {
      method: "POST",
      body: JSON.stringify(lineItems),
    });
    const data = await response.json();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: data.id,
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
  }

  return {
    cart,
    subTotal,
    addToCart,
    removeFromCart,
    toggleModal,
    cartModal,
    checkout,
    lineItems,
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
