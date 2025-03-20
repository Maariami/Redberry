import React from "react";
import styles from "./Selects.module.css";

type Props = {};

const Selects = (props: Props) => {
  return (
    <div className={styles.selects}>
      <select className={styles.select} name="department">
        <option value="">დეპარტამენტი</option>
        <option value="design">დიზაინი</option>
        <option value="marketiong">მარკეტინგი</option>
        <option value="logistics">ლოჯისტიკა</option>
        <option value="info tech">ინფ. ტექ.</option>
      </select>

      <select className={styles.select} name="department">
        <option value="">პრიორიტეტი</option>
        <option value="high">მაღალი</option>
        <option value="middle">საშუალო</option>
        <option value="low">დაბალი</option>
      </select>

      <select className={styles.select} name="department">
        <option value="">თანამშრომელი</option>
        <option value="">მარიამი</option>
        <option value="">ნატა</option>
        <option value="">ნატალი</option>
        <option value="">გიოლა</option>
        <option value="">ნიკა</option>
        <option value="">გიგი</option>
        <option value="">ნინი</option>
        <option value="">მარი</option>
      </select>
    </div>
  );
};

export default Selects;
