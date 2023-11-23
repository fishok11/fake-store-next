"use client"

import styles from '@/components/CounterProducts/CounterProducts.module.scss'
import { addProductToCart } from '@/services/requests';
import { ProductInCart } from '@/types';
import { getCookie } from 'cookies-next';
import { FC, useState } from 'react';

type CounterProductsProps = {
  price: number;
  id: string;
}

const CounterProducts: FC<CounterProductsProps> = ({ price, id }) => {
  const cartId = getCookie('cart');
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
      <h1>
        Log in to add to cart
      </h1>
    )
  };
  
  return (
    <div className={styles.actionContainer}>
      <p className={styles.price}>{price * count} $</p>
      <div className={styles.counterContainer}>
        <button className={styles.counterSimbol} onClick={() => decrease()}>-</button>
        <div className={styles.counterSimbol}>{count}</div>
        <button className={styles.counterSimbol} onClick={() => increase()}>+</button>
      </div>
      <button className={styles.button} onClick={() => addProductToCart(cartId.toString(), product)}>Add to cart</button>
    </div> 
)

}

export default CounterProducts;