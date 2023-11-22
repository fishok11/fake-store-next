'use client'

import { FC } from 'react';
import { useState } from 'react';
import styles from './LoginAndRegistration.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type LogInProps = {
  logInActive: boolean;
  closeLogInWindow: Function;
}

const LogIn: FC<LogInProps> = ({ logInActive, closeLogInWindow }) => {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleChange = () => {
  //   const user = stateUser.users.find((user) => user.username === username && user.password === password);
  //   if (user) {
  //     setError(false);
  //     dispatch(hideLogInPage());
  //     if (cookies.user === undefined) {
  //       setCookie('user', user, { expires: cookiesLifetime })
  //     }
  //     toast.success('Success!');
  //   } else {
  //     setError(true);
  //   }
  // };

  if (logInActive === false) return null;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.close} onClick={() => closeLogInWindow(false)}><FontAwesomeIcon icon={faXmark} /></div>
        <p className={styles.title}>Log in</p>
        <input type="text" placeholder='Username' name='username' className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder='Password' name='password' className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className={styles.button} onClick={() => console.log('handleChange')}>OK</button>
        {error && (<p className={styles.error}>Fill in all the fields!</p>)}
      </div>
    </div>
  )
}

export default LogIn;