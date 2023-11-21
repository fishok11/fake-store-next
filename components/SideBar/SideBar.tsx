'use client'

import { FC } from 'react';
import styles from './SideBar.module.scss'

export type SideBarProps = {
  categories: Array<string>
};

const SideBar: FC<SideBarProps> = ({ categories }) => {

  return (
    <div className={styles.container}>
      <p className={styles.titleCategories}>Categories</p>
      <ul>
        {categories.map((category: string) => (
          <li key={category}>
            <button onClick={() => console.log(category)} className={styles.button}>
              {category}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => console.log("Clear")} className={styles.clearButton}>Clear</button>
    </div>
  );
}

export default SideBar;
