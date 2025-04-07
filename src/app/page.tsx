"use client";
import React, { useState } from "react";
import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import Lines from "@/components/Lines/Lines";
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
        <Lines></Lines>
      </div>
    </>
  );
}
