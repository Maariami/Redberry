"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./Selects.module.css";
import Button3 from "../Buttons/Button3/Button3";
import CustomCheckbox from "../customCheckbox/CustomCheckbox";

const Selects = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[][]>([]);
  const [departments, setDepartments] = useState<any[]>([]); // To store department data
  const [priorities, setPriorities] = useState<any[]>([]); // To store priority data

  const options = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

  async function fetchData() {
    try {
      const [departmentsRes, prioritiesRes] = await Promise.all([
        fetch("https://momentum.redberryinternship.ge/api/departments"),
        fetch("https://momentum.redberryinternship.ge/api/priorities"),
      ]);

      if (!departmentsRes.ok) {
        throw new Error("Failed to fetch departments");
      }
      if (!prioritiesRes.ok) {
        throw new Error("Failed to fetch priorities");
      }

      const departmentsData = await departmentsRes.json();
      const prioritiesData = await prioritiesRes.json();

      setDepartments(departmentsData);
      setPriorities(prioritiesData);

      setCheckedItems([
        new Array(departmentsData.length).fill(false),
        new Array(prioritiesData.length).fill(false),
        [],
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    if (visibleIndex === index) {
      setVisibleIndex(null);
      setCheckedItems(
        Array(3)
          .fill(null)
          .map(() => Array(3).fill(false))
      );
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
        );
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
          {visibleIndex === 0 && departments.length > 0 ? (
            departments.map((department, idx) => (
              <CustomCheckbox
                key={idx}
                checked={checkedItems[0][idx]}
                onClick={() => toggleCheckbox(0, idx)}
                label={department.name}
              />
            ))
          ) : visibleIndex === 1 && priorities.length > 0 ? (
            priorities.map((priority, idx) => (
              <CustomCheckbox
                key={idx}
                checked={checkedItems[1][idx]}
                onClick={() => toggleCheckbox(1, idx)}
                label={priority.name}
              />
            ))
          ) : (
            <p className={styles.noData}>მონაცემები არ არის</p>
          )}
          <Button3 text="არჩევა" />
        </div>
      )}
    </div>
  );
};

export default Selects;
