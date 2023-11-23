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

  console.log(cartId);

  if (cartId === undefined) {
    return null
  }

  const userCart = await getUserCart(cartId.toString());

  if (cartId === undefined) {
    return (
      <>
        loading...
      </>
    )
  }
  
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