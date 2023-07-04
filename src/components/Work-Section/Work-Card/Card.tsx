import style from "../Work-Card/style.module.css";
interface Propstype {
  image: string;
  workTitle: string;
  workDesc: string;
}
function Card(props: Propstype) {
  let { image, workTitle, workDesc } = props;
  return (
    <div>
      <div className={style.card}>
        <img src={image} alt="work-Image" className={style.workImg}></img>
        <div className={style.title}>{workTitle}</div>
        <div className={style.desc}>
          <p>{workDesc}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
