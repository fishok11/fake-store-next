"use client"

import Loading from '@/app/loading';
import styles from '@/components/CounterProducts/CounterProducts.module.scss'
import { addProductToCart } from '@/services/requests';
import { ProductInCart } from '@/types';
import { getCookie } from 'cookies-next';
import { FC, useEffect, useState } from 'react';

type CounterProductsProps = {
  price: number | undefined;
  id: string;
}

const CounterProducts: FC<CounterProductsProps> = ({ price, id }) => {
  const cartId = getCookie('cart')?.toString();
  const [count, setCount] = useState(1);
  const decrease = () => {
    if (count > 1) {
      setCount(count => count - 1);
    }
  };
  const increase = () => {
    setCount(count => count + 1);
  };
  const product: ProductInCart = {
    productId: id,
    quantity: count,
  }

  if (cartId === undefined) {
    return (
      <h2 className={styles.actionContainer}>
        Log in to view the shopping cart
      </h2>
    )
  }

  if (price === undefined) {
    return (
      <Loading />
    )
  }
  
  return (
    <div className={styles.actionContainer}>
      <p className={styles.price}>{price * count} $</p>
      <div className={styles.counterContainer}>
        <button className={styles.counterSimbol} onClick={() => decrease()}>-</button>
        <div className={styles.counterSimbol}>{count}</div>
        <button className={styles.counterSimbol} onClick={() => increase()}>+</button>
      </div>
      <button className={styles.button} onClick={() => addProductToCart(cartId, product)}>Add to cart</button>
    </div> 
)

}

export default CounterProducts;