import React from "react";
import styles from "./Statement.module.css";

type Props = {};

const Statement = (props: Props) => {
  return (
    <div className={styles.comment}>
      <img className={styles.image} src="/images/Ellipse 3892.png" alt="" />
      <div className={styles.info}>
        <h2>ემილია მორგანი</h2>
        <p>
          დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება, რომ
          ელემენტებს ჰქონდეს შესაბამისი რეზოლუცია.
        </p>
      </div>
    </div>
  );
};

export default Statement;
