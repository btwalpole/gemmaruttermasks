import { useState, createContext, useContext } from "react";
import { initiateCheckout } from "@lib/payments";
import products from "@data/products.json";
import getStripe from '../lib/get-stripe';

/*
const defaultCart = {
  //products: {}, //easier to icompare one object to another than with arrays
};
*/

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

  //create array from current cart state, map over it and return
  //each item and it's price (taken from the products.json)
  
  /*
  const cartItems = Object.keys(cart.products).map((key) => {
    let product = undefined;
    for (let prodGroup of products) {
      product = prodGroup.variants.find(({ id }) => `${id}` === `${key}`);
      if (product) {
        break;
      }
    }
  

    return {
      ...cart.products[key],
      name: product.name,
      image: product.image,
      pricePerItem: product.price,
    };
  }); */

  const subTotal = cart.reduce(
    (accumulator, { pricePerItem, quantity }) => {
      return accumulator + pricePerItem * quantity;
    },
    0
  );

  const totalItems = cart.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  const lineItems = cart.map((item) => {
    return {
      price: item.id,
      quantity: item.quantity,
    };
  });

  function addToCart({ id, quantity } = {}) {
    updateCart((prev) => {
      //deep clone of prev state
      //let cartState = JSON.parse(JSON.stringify(prev));

      //if product is in cart array, just update quantity
      if (cartState.products[id]) {
        cartState.products[id].quantity =
          cartState.products[id].quantity + quantity;
      } else {
        cartState.products[id] = {
          id,
          quantity,
        };
      }

      return cartState;
    });

    if (!cartModal) {
      toggleModal();
    }
  }

  function removeFromCart(id) {
    console.log("removing product: " + id);
    updateCart((prev) => {
      let cartState = JSON.parse(JSON.stringify(prev));
      if (cartState.products[id]) {
        delete cartState.products[id];
        console.log("deleting ", id);
      }
      return cartState;
    });
  }

  console.log("cart contents: ");
  console.log(cart);

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity,
        };
      }),
    });
  }

  async function checkoutAPI() {    
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
    console.log("api req data", data);
  }

  return {
    cart,
    subTotal,
    totalItems,
    cartItems,
    addToCart,
    removeFromCart,
    toggleModal,
    cartModal,
    checkout,
    checkoutAPI,
    lineItems,
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
