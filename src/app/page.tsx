import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import Lines from "@/components/Lines/Lines";
import Selects from "@/components/Selects/Selects";
import Selected from "@/components/Selected/Selected";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className={styles.head}>დავალებების გვერდი</div>
      <Selects></Selects>
      <Lines></Lines>
    </>
  );
}
