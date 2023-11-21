'use client'

import { FC } from 'react';
import { CartItemToAdded, Product } from '@/types';
import styles from './ProductCard.module.scss'
import Link from 'next/link';

type ProductCardProps = Omit<Product, 'description' | 'rating' | 'category'>;

const ProductCard: FC<ProductCardProps> = ({id, image, title, price}) => {
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
        <button className={styles.button} onClick={() => console.log(1)}>Add to cart</button>
      </div>
    </div>
  )
};

export default ProductCard;