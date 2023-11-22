'use client'

import { FC } from 'react';
import styles from './SideBar.module.scss'
import { getCategories, getProducts, getProductsInCategory } from '@/services/requests';
import useSWR from 'swr';

const SideBar: FC = () => {
  const { data: categories } = useSWR("categories", getCategories);

  const { mutate } = useSWR("products");

  const handleFilterCategory = async (category: string) => {
    const products = await getProductsInCategory(category);

    mutate(products);
  };

  const handleClear = async () => {
    const products = await getProducts();

    mutate(products);
  };

  return (
    <div className={styles.container}>
      <p className={styles.titleCategories}>Categories</p>
      <ul>
        {categories?.map((category: string) => (
          <li key={category}>
            <button onClick={() => handleFilterCategory(category)} className={styles.button}>
              {category}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleClear()} className={styles.clearButton}>Clear</button>
    </div>
  );
}

export default SideBar;
