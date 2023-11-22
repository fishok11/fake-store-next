'use client'

import { FC, FormEventHandler, useState } from 'react';
import styles from './Header.module.scss'
import Link from 'next/link';
import { getProductsBySearch } from '@/services/requests';
import useSWR from 'swr';
import LogIn from '../LoginAndRegistration/LogIn';
import SignUp from '../LoginAndRegistration/SingUp';
import { getCookie } from 'cookies-next';

const Header: FC = () => {
  const { mutate } = useSWR("products");
  const [search, setSearch] = useState("");
  const [logInActive, setLogInActive] = useState(false);
  const [signUpActive, setSignUpActive] = useState(false);
  const userCookies = getCookie('user');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const products = await getProductsBySearch(search);

    mutate(products);
  };

  return (
    <>
      <LogIn logInActive={logInActive} closeLogInWindow={setLogInActive} />
      <SignUp signUpActive={signUpActive} closeSignUpWindow={setSignUpActive} />
      <header className={styles.container}>
        <div className={styles.items}>
          <Link href={'/'} className={styles.logo}> Fake</Link>
          <form className={styles.serch} onSubmit={handleSubmit}>
            <input 
              className={styles.input} 
              placeholder={'Serch...'} 
              name='serch' 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className={styles.button} type="submit">ok</button>
          </form>
          <div className={styles.actionContainer}>
            {userCookies && (
              <>
                <Link className={styles.ico} href={`/profile`}>Profile</Link>
                <Link className={styles.ico} href={`/cart`}>Cart</Link>
              </>
             )}
            {!userCookies && (
              <>
                <button className={styles.ico} onClick={() => setLogInActive(true)}>Log in</button>
                <button className={styles.ico} onClick={() => setSignUpActive(true)}>Sign up</button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;