"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./Selects.module.css";
import Button3 from "../Buttons/Button3/Button3";
import CustomCheckbox from "../customCheckbox/CustomCheckbox";

const Selects = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[][]>(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(false))
  );

  const options = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

  const content = [
    [
      "მარკეტინგის დეპარტამენტი",
      "დიზაინის დეპარტამენტი",
      "ლოგისტიკის დეპარტამენტი",
    ],
    ["მაღალი პრიორიტეტი", "საშუალო პრიორიტეტი", "დაბალი პრიორიტეტი"],
    ["გიორგი", "ნინო", "ლაშა"],
  ];

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    if (visibleIndex === index) {
      setVisibleIndex(null);
      setCheckedItems(
        Array(3)
          .fill(null)
          .map(() => Array(3).fill(false))
      ); // Reset checkboxes
    } else {
      setVisibleIndex(index);
    }
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const toggleCheckbox = (categoryIndex: number, itemIndex: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[categoryIndex][itemIndex] =
      !updatedCheckedItems[categoryIndex][itemIndex];
    setCheckedItems(updatedCheckedItems);
  };

  // Close dropdown and reset checkboxes when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setVisibleIndex(null);
        setCheckedItems(
          Array(3)
            .fill(null)
            .map(() => Array(3).fill(false))
        ); // Reset checkboxes
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.selects} ref={dropdownRef}>
      {options.map((text, index) => (
        <div key={index}>
          <div
            className={clsx(styles.select, {
              [styles.selected]: selectedIndex === index,
            })}
            onClick={() => handleClick(index)}
          >
            <p>{text}</p>
            <img src="/images/down.png" alt="Dropdown arrow" />
          </div>
        </div>
      ))}

      {visibleIndex !== null && (
        <div className={styles.dropdown}>
          {content[visibleIndex].map((item, idx) => (
            <CustomCheckbox
              key={idx}
              checked={checkedItems[visibleIndex][idx]}
              onClick={() => toggleCheckbox(visibleIndex, idx)}
              label={item}
            />
          ))}
          <Button3 text="არჩევა" />
        </div>
      )}
    </div>
  );
};

export default Selects;
