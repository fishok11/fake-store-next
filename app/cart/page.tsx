'use client'

import { getUserCart } from '@/services/requests';
import CartItem from "@/components/CartItem/CartItem";
import Loading from "../loading";
import {  ProductInCart } from "@/types";
import useSWR from 'swr';

const Cart = () => {
  const { data: userCart, isLoading } = useSWR("cart", getUserCart);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <div>
      {userCart?.products.map((product: ProductInCart) => (
        <CartItem id={product.productId} key={product.productId}/>
      ))}
    </div>
  )
}

export default Cart;