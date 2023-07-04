import { useAppSelector } from "../../../Hooks/Hooks";
import style from "../Footer-Text/style.module.css";
function FooterText() {
  const data = useAppSelector((state) => state.contact.contactDetails);
  return (
    <div className={style.footerContainer}>
      <span className={style.title}>
        {data?.["Portfolio Name"] && (
          <>
            {data?.["Portfolio Name"].slice(0, 3).toUpperCase()}
            {}
            <span className={style.ternary_text}>
              {data?.["Portfolio Name"].slice(3, 4).toUpperCase()}
            </span>
            {data?.["Portfolio Name"].slice(4).toUpperCase()}
          </>
        )}
      </span>
      <div className={style.subHead}>CopyRight | All Right Reserved</div>
    </div>
  );
}

export default FooterText;
