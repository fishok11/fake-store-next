import styles from '@/app/index.module.scss'

const Loading = () => {
  return (
    <div className={styles.container}>
      <svg aria-hidden="true" className={styles.loader} />
    </div>
  )
};

export default Loading;