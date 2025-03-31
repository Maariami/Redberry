"use client";
import React, { useState } from "react";
import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import Line from "@/components/Line/Line";
import Selects from "@/components/Selects/Selects";

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<
    { name: string; category: string }[]
  >([]);

  return (
    <>
      <Header />
      <div className={styles.head}>
        <Selects setSelectedItems={setSelectedItems} />
      </div>
      <div className={styles.dash}>
        <Line color="red" status="დასაწყები" selectedItems={selectedItems} />
        <Line color="pink" status="პროგრესში" selectedItems={selectedItems} />
        <Line
          color="yellow"
          status="მზად ტესტირებისთვის"
          selectedItems={selectedItems}
        />
        <Line color="blue" status="დასრულებული" selectedItems={selectedItems} />
      </div>
    </>
  );
}
