import styles from "../../assets/loading.module.css"

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.line}>
        <div className={styles.inner}></div>
        <p className={styles.text}>Loading</p>
      </div>
    </div>
  );
};

export default Loading;