"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./Selects.module.css";
import Button3 from "../Buttons/Button3/Button3";
import CustomCheckbox from "../customCheckbox/CustomCheckbox";
import Filtered from "../Filtered/Filtered";

interface SelectsProps {
  setSelectedItems: (items: { name: string; category: string }[]) => void;
}

const Selects = ({ setSelectedItems }: SelectsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[][]>([[], [], []]);
  const [departments, setDepartments] = useState<[]>([]);
  const [priorities, setPriorities] = useState<[]>([]);
  const [employees, setEmployees] = useState<[]>([]);
  const [selectedItems, setLocalSelectedItems] = useState<
    { name: string; category: string }[]
  >([]);

  const options = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "9e8fae87-b024-4cd6-ad8f-dffb3840af32";
        const [departmentsRes, prioritiesRes, employeesRes] = await Promise.all(
          [
            fetch("https://momentum.redberryinternship.ge/api/departments", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("https://momentum.redberryinternship.ge/api/priorities", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("https://momentum.redberryinternship.ge/api/employees", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]
        );

        const [departmentsData, prioritiesData, employeesData] =
          await Promise.all([
            departmentsRes.json(),
            prioritiesRes.json(),
            employeesRes.json(),
          ]);

        setDepartments(departmentsData);
        setPriorities(prioritiesData);
        setEmployees(employeesData);
        setCheckedItems([
          new Array(departmentsData.length).fill(false),
          new Array(prioritiesData.length).fill(false),
          new Array(employeesData.length).fill(false),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    setVisibleIndex(visibleIndex === index ? null : index);
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const toggleCheckbox = (categoryIndex: number, itemIndex: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[categoryIndex][itemIndex] =
      !updatedCheckedItems[categoryIndex][itemIndex];
    setCheckedItems(updatedCheckedItems);

    const selected = updatedCheckedItems
      .flatMap((category, catIdx) =>
        category.map((isChecked, idx) =>
          isChecked
            ? {
                name:
                  catIdx === 0
                    ? departments[idx]?.name
                    : catIdx === 1
                    ? priorities[idx]?.name
                    : `${employees[idx]?.name} ${employees[idx]?.surname}`,
                category:
                  catIdx === 0
                    ? "department"
                    : catIdx === 1
                    ? "priority"
                    : "employee",
              }
            : null
        )
      )
      .filter(
        (item): item is { name: string; category: string } => item !== null
      );

    setLocalSelectedItems(selected);
    setSelectedItems(selected);
  };

  const removeItem = (itemToRemove: string) => {
    const updatedSelectedItems = selectedItems.filter(
      (item) => item.name !== itemToRemove
    );
    setLocalSelectedItems(updatedSelectedItems);
    setSelectedItems(updatedSelectedItems);

    const updatedCheckedItems = [...checkedItems];

    const deptIndex = departments.findIndex(
      (dept) => dept.name === itemToRemove
    );
    if (deptIndex !== -1) updatedCheckedItems[0][deptIndex] = false;

    const priorityIndex = priorities.findIndex(
      (prio) => prio.name === itemToRemove
    );
    if (priorityIndex !== -1) updatedCheckedItems[1][priorityIndex] = false;

    const employeeIndex = employees.findIndex(
      (emp) => `${emp.name} ${emp.surname}` === itemToRemove
    );
    if (employeeIndex !== -1) updatedCheckedItems[2][employeeIndex] = false;

    setCheckedItems(updatedCheckedItems);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setVisibleIndex(null);
        setSelectedIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelection = (event: React.MouseEvent) => {
    event.stopPropagation();
    setVisibleIndex(null);
    setSelectedIndex(null);
  };

  return (
    <div>
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
            {(visibleIndex === 0
              ? departments
              : visibleIndex === 1
              ? priorities
              : employees
            ).map((item, idx) => (
              <CustomCheckbox
                key={idx}
                checked={checkedItems[visibleIndex][idx]}
                onClick={() => toggleCheckbox(visibleIndex, idx)}
                label={
                  visibleIndex === 2 ? (
                    <div className={styles.employeeItem}>
                      <img
                        src={item.avatar || "/images/default-avatar.png"}
                        alt={item.name}
                        className={styles.avatar}
                      />
                      <span>{`${item.name} ${item.surname}`}</span>
                    </div>
                  ) : (
                    item.name
                  )
                }
              />
            ))}
            <Button3 text="არჩევა" onClick={handleSelection} />
          </div>
        )}
      </div>

      <Filtered
        selectedItems={selectedItems.map((item) => item.name)}
        removeItem={removeItem}
      />
    </div>
  );
};

export default Selects;
