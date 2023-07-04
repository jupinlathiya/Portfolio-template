import style from "../Section-Title/style.module.css";
export default function ProductTitle() {
  return (
    <div className={style.section_title}>
      OUR <span className={style.secondary_text}>P</span>RODUCTS
    </div>
  );
}
