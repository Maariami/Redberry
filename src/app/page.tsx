import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import Lines from "@/components/Lines/Lines";
import Selects from "@/components/Selects/Selects";
import Priority from "@/components/priorityselector/Priority";
import Statuses from "@/components/Statuses/Statuses";
import DatePicker from "@/components/Calendar/DataPicker";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className={styles.head}>დავალებების გვერდი</div>
      <Selects></Selects>
      <Lines></Lines>
      <Priority></Priority>
      <Statuses></Statuses>
      <DatePicker></DatePicker>
    </>
  );
}
