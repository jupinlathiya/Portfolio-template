import style from "../HomeContainer/style.module.css";
import Carousell from "../../components/Home-Section/Carousel/Carousel";
import TitleName from "../../components/Home-Section/Title-Name/TitleName";
import { useAppDispatch } from "../../Hooks/Hooks";
export default function HomeContainer() {
  return (
    <div className={style.homeContainer}>
      <Carousell />
      <div className={style.overlay}></div>
      <div className={style.Title}>
        <TitleName />
      </div>
    </div>
  );
}
