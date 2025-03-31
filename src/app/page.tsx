import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import Line from "@/components/Line/Line";
import Selects from "@/components/Selects/Selects";
import Filter from "@/components/filter/filter";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className={styles.head}>დავალებების გვერდი</div>
      <Selects></Selects>
      <Filter></Filter>
      <div className={styles.dash}>
        <Line color="red" status="დასაწყები" />
        <Line color="pink" status="დასრულებული" />
        <Line color="yellow" status="პროგრესში" />
        <Line color="blue" status="მზად ტესტირებისთვის" />
      </div>
    </>
  );
}
