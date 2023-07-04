import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../Error_Page/style.module.css";
interface Propstype {
  errorCode: string;
  errorMessage: string;
}
function ErrorPage(props: Propstype) {
  let { errorCode, errorMessage } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      document.documentElement.setAttribute("data-theme", "Pure Pitch");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);
  return (
    <div className={style.container}>
      <div className={style.subContainer}>
        <div className={style.errorDetails}>
          <h1 className={style.errorCode}>{errorCode}</h1>

          <h6 className={style.messageContainer}>
            <span className={style.message}>Oops!</span> {errorMessage}
          </h6>

          <p className={style.subTitle}>
            The page you’re looking for doesn’t exist.
          </p>

          <a href="/" className={style.link}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
