import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import DesktopNavbar from "../../components/Navbar/Desktop-Navbar/Navbar";
import MobileNavbar from "../../components/Navbar/Mobile-Navbar/MobileNavbar";
import { useAppSelector } from "../../Hooks/Hooks";
import style from "../navbarContainer/style.module.css";

//Navbar Container
function navbarContainer() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const data = useAppSelector((state) => state.contact.contactDetails);
  function handleSidebar() {
    const classes = document.getElementById("mobileNavbar")?.classList;
    if (classes?.contains(style.hide)) {
      document.getElementById("mobileNavbar")?.classList.add(style.show);
      document.getElementById("mobileNavbar")?.classList.remove(style.hide);
    } else {
      document.getElementById("mobileNavbar")?.classList.add(style.hide);
      document.getElementById("mobileNavbar")?.classList.remove(style.show);
    }
  }
  //calculating the inner width
  const updateWidth = () => {
    let widthinner = window.innerWidth;
    setWidth(widthinner);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
  }, []);

  return (
    <div className={style.navbarContainer}>
      <DesktopNavbar />
      {width < 1024 && (
        <>
          <div className={style.hamburger_logo}>
            <span className={style.brand}>
              {data?.["Portfolio Name"].slice(0, 3).toUpperCase()}
              {}
              <span className={style.secondary_text}>
                {data?.["Portfolio Name"].slice(3, 4).toUpperCase()}
              </span>
              {data?.["Portfolio Name"].slice(4).toUpperCase()}
            </span>
            <div className={style.hamburger}>
              <FontAwesomeIcon
                icon={faBars}
                size="2xl"
                className={style.hamburgerIcon}
                onClick={handleSidebar}
              />
            </div>
          </div>
          <div id="mobileNavbar" className={style.hide}>
            <MobileNavbar event={handleSidebar} />
          </div>
        </>
      )}
    </div>
  );
}

export default navbarContainer;
