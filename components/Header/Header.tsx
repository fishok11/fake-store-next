'use client'

import { FC } from 'react';
import styles from './Header.module.scss'
import Link from 'next/link';

const Header: FC = () => {
  // const dispatch = useAppDispatch();

  return (
    <header className={styles.container}>
      <div className={styles.items}>
        <Link href={'/'} className={styles.logo}> Fake</Link>
        <div className={styles.serch}>
          <input className={styles.input} placeholder={'Serch...'} name='serch'/>
          <button className={styles.button}>ok</button>
        </div>
        <div className={styles.actionContainer}>
          <>
            <Link className={styles.ico} href={`/profile`}>Profile</Link>
            <Link className={styles.ico} href={`/cart`}>Cart</Link>
          </>
          <button className={styles.ico} onClick={() => (console.log(2))}>Log in</button>
          <button className={styles.ico} onClick={() => (console.log(2))}>Sign up</button>
        </div>
      </div>
    </header>
  )
}

export default Header;