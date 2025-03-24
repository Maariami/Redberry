import React from "react";
import styles from "./Reply.module.css";
import Button4 from "@/components/Buttons/Button4/Button4";

type Props = {};

const Reply = (props: Props) => {
  return (
    <div className={styles.comment}>
      <img className={styles.image} src="/images/Ellipse 3892.png" alt="" />
      <div className={styles.info}>
        <h2>ემილია მორგანი</h2>
        <p>
          დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება, რომ
          ელემენტებს ჰქონდეს შესაბამისი რეზოლუცია.
        </p>
        <Button4></Button4>
      </div>
    </div>
  );
};

export default Reply;
