import FooterText from "../../components/Footer-Section/Footer-Text/FooterText";
import SocialIcons from "../../components/Footer-Section/Social Icons/SocialIcons";
import style from "../FooterContainer/style.module.css";
function FooterContainer() {
  return (
    <div className={style.footerContainer}>
      <FooterText />
      <SocialIcons />
    </div>
  );
}

export default FooterContainer;
