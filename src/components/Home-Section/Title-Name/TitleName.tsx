import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../Hooks/Hooks";
import style from "../Title-Name/style.module.css";
export default function TitleName() {
  const data = useAppSelector((state) => state.contact.contactDetails);
  return (
    <div className={style.title_and_button}>
      <h1 className={`${style.title}`}>
        <>
          PORTF
          <span className={style.secondary_text}>O</span>
          LIO
        </>
      </h1>
      <div>
        <button className={style.btn} onClick={() => {}}>
          <a href="#productSection">Start Here</a>
        </button>
      </div>
    </div>
  );
}
