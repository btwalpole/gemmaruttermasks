import Header from '@components/Header'
import CartModal from "@components/CartModal";
import '@styles/globals.scss'
import { CartContext, useCartState } from '@hooks/use-cart'

function MyApp({ Component, pageProps }) {
  let cart = useCartState()
  return (
    <CartContext.Provider value={cart}>
      <Header />
      <CartModal />
      <Component {...pageProps} />
    </CartContext.Provider>
  )
}

export default MyApp
