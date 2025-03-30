import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import Lines from "@/components/Lines/Lines";
import Selects from "@/components/Selects/Selects";
import Departments from "@/components/Departments/Departments";
import Coworkers from "@/components/Coworkers/Coworkers";
import Description from "@/components/Description/Description";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className={styles.head}>დავალებების გვერდი</div>
      <Selects></Selects>
      <Lines></Lines>
      <Departments></Departments>
      <Description text="agwera" length="long"></Description>
      <Description text="satauri" length="short"></Description>
    </>
  );
}
