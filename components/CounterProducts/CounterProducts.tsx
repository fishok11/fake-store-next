"use client"

import styles from '@/components/CounterProducts/CounterProducts.module.scss'
import { useState } from 'react';

const CounterProducts = ({ price }: { price: number }) => {
 const [count, setCount] = useState(1);
  const decrease = () => {
    if (count > 1) {
      setCount(count => count - 1);
    }
  };
  const increase = () => {
    setCount(count => count + 1);
  };

  return (
    <div className={styles.actionContainer}>
      <p className={styles.price}>{price * count} $</p>
      <div className={styles.counterContainer}>
        <button className={styles.counterSimbol} onClick={() => decrease()}>-</button>
        <div className={styles.counterSimbol}>{count}</div>
        <button className={styles.counterSimbol} onClick={() => increase()}>+</button>
      </div>
      <button className={styles.button} onClick={() => console.log('Add to cart')}>Add to cart</button>
    </div> 
)

}

export default CounterProducts;