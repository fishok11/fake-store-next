'use client'

import { FC } from 'react';
import { Product, ProductInCart } from '@/types';
import styles from './ProductCard.module.scss'
import Link from 'next/link';
import { addProductToCart } from '@/services/requests';
import { getCookie } from 'cookies-next';

type ProductCardProps = Omit<Product, 'description' | 'rating' | 'category'>;

const ProductCard: FC<ProductCardProps> = ({id, image, title, price}) => {
  const cartId = getCookie('cart');
  const product: ProductInCart = {
    productId: id,
    quantity: 1,
  }

  if (cartId === undefined) { 
    return (
      <div className={styles.container}>
        <Link href={`/product/${id}`} className={styles.link}>
          <div className={styles.imageContainer}>
            <img src={image} alt='' className={styles.image}/> 
          </div>
          <p className={styles.title}>{title}</p>
        </Link>
        <div className={styles.actionContainer}>
          <p className={styles.price}>$ {price}</p>
          {/* <button className={styles.button} onClick={() => }>Add to cart</button> */}
        </div>
      </div>
    )
  };

  return (
    <div className={styles.container}>
      <Link href={`/product/${id}`} className={styles.link}>
        <div className={styles.imageContainer}>
          <img src={image} alt='' className={styles.image}/> 
        </div>
        <p className={styles.title}>{title}</p>
      </Link>
      <div className={styles.actionContainer}>
        <p className={styles.price}>$ {price}</p>
        <button className={styles.button} onClick={() => addProductToCart(cartId.toString(), product)}>Add to cart</button>
      </div>
    </div>
  )
};

export default ProductCard;