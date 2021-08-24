import { useState, createContext, useContext } from "react";
import { initiateCheckout } from "@lib/payments";
import products from "@data/products.json";

const defaultCart = {
  products: {}, //easier to icompare one object to another than with arrays
};

export const CartContext = createContext();

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);
  const [cartModal, setCartModal] = useState(false);

  function toggleModal() {
    console.log("toggling modal");
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
  });

  console.log("cart items ", cartItems);

  const subTotal = cartItems.reduce(
    (accumulator, { pricePerItem, quantity }) => {
      return accumulator + pricePerItem * quantity;
    },
    0
  );

  const totalItems = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  function addToCart({ id, quantity } = {}) {
    updateCart((prev) => {
      //deep clone of prev state
      let cartState = JSON.parse(JSON.stringify(prev));

      console.log("prev Cart State ", cartState);

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
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
