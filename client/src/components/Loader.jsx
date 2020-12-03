import React from "react";
import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loader}>
        <div className={styles.loaderBalls}>
            <div className={styles.loaderBallsItem}></div>
            <div className={styles.loaderBallsItem}></div>
            <div className={styles.loaderBallsItem}></div>
        </div>
    </div>
  );
}

export default Loader;