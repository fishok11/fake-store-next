'use client'

import { FC } from 'react';
import { Product } from '@/types';
import styles from './ProductCard.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import { getCookie } from 'cookies-next';

type ProductCardProps = Omit<Product, 'description' | 'rating' | 'category'>;

const ProductCard: FC<ProductCardProps> = ({id, image, title, price}) => {
  const cartId = getCookie('cart');

  if (cartId === undefined) { 
    return (
      <div className={styles.container}>
        <Link href={`/product/${id}`} className={styles.link}>
          <div className={styles.imageContainer}>
            <img src={image} alt={title} className={styles.image} width={128} height={150}/> 
          </div>
          <p className={styles.title}>{title}</p>
        </Link>
        <div className={styles.actionContainer}>
          <p className={styles.price}>$ {price}</p>
        </div>
      </div>
    )
  };

  return (
    <div className={styles.container}>
      <Link href={`/product/${id}`} className={styles.link}>
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} width={128} height={150}/> 
        </div>
        <p className={styles.title}>{title}</p>
          <div className={styles.actionContainer}>
          <p className={styles.price}>$ {price}</p>
          <button className={styles.button}>Buy</button>
        </div>
      </Link>
    </div>
  )
};

export default ProductCard;