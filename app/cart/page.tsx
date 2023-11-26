'use client'

import { Metadata } from "next";
import { FC } from "react";
import styles from '@/app/cart/Cart.module.scss'
import { getCookie } from "cookies-next";
import { getUserCart } from '@/services/requests';

// export const metadata: Metadata = {
//   title: 'Cart',
// }

const Cart: FC = async() => {
  const cartId = getCookie('cart');

  if (cartId === undefined) {
    return (
      <h2>
        Log in to view the shopping cart
      </h2>
    )
  }

  const userCart = await getUserCart(cartId.toString());

  return (
    <div>
      {userCart?.products.map((product) => (
        <p>
          {product.productId}
          {product.quantity}
        </p>
      ))}
    </div>
  )
}

export default Cart;