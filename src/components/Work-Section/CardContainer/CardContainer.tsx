import style from "../CardContainer/style.module.css";
import Carousell from "../Carousel/Carousell";

function CardContainer() {
  return (
    <div className={style.cardContainer}>
      <Carousell />
    </div>
  );
}

export default CardContainer;
