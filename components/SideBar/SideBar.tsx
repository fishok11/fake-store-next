'use client'

import { FC, FormEventHandler } from 'react';
import styles from './SideBar.module.scss'
import { getProducts, getProductsInCategory } from '@/services/requests';
import useSWR from 'swr';

export type SideBarProps = {
  categories: Array<string>
};

const SideBar: FC<SideBarProps> = ({ categories }) => {
  const { mutate } = useSWR("products");
  // const [cat, setSearch] = useState("");
  // const getPostsBySearch = usePosts((state) => state.getPostsBySearch);

  const handleFilterCategory = async (category: string) => {
    const products = await getProductsInCategory(category);

    mutate(products);
    console.log(products);
  };

  const handleClear = async () => {
    const products = await getProducts();

    mutate(products);
    console.log(products);
  };

  return (
    <div className={styles.container}>
      <p className={styles.titleCategories}>Categories</p>
      <ul>
        {categories.map((category: string) => (
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
