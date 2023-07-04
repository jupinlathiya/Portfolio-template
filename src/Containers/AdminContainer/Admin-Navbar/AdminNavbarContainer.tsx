import { faBars, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DesktopNavbar from "../../../components/Admin-Section/Navbar/Desktop-Navbar/Navbar";
import MobileNavbar from "../../../components/Admin-Section/Navbar/Mobile-Navbar/MobileNavbar";
import ThemeSideBar from "../../../components/Comman/Theme-Sidebar/ThemeSideBar";
import { useAppSelector } from "../../../Hooks/Hooks";

import style from "../Admin-Navbar/style.module.css";

//Navbar Container
function AdminNavbarContainer() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const data = useAppSelector((state) => state.contact.contactDetails);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      document.documentElement.setAttribute("data-theme", "Pure Pitch");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);
  function handleThemeSideBar() {
    setShowThemeMenu(!showThemeMenu);
  }
  function handleSidebar() {
    const classes = document.getElementById("mobileNavbar")?.classList;
    if (classes?.contains(style.hide)) {
      document.getElementById("mobileNavbar")?.classList.remove(style.hide);
      document.getElementById("mobileNavbar")?.classList.add(style.show);
    } else {
      document.getElementById("mobileNavbar")?.classList.add(style.hide);
      document.getElementById("mobileNavbar")?.classList.remove(style.show);
    }
  }
  const updateWidth = () => {
    let widthinner = window.innerWidth;
    setWidth(widthinner);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
  }, []);

  return (
    <div>
      <div className={style.navbarContainer}>
        <DesktopNavbar />
        {width! < 1024 && (
          <>
            <div className={style.hamburger_logo}>
              <h1 className={style.brand}>
                {data?.["Portfolio Name"].slice(0, 3).toUpperCase()}
                {}
                <span className={style.secondary_text}>
                  {data?.["Portfolio Name"].slice(3, 4).toUpperCase()}
                </span>
                {data?.["Portfolio Name"].slice(4).toUpperCase()}
                -ADMIN
              </h1>
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
      <div className={style.themeContainer}>
        <div className={style.settings} onClick={handleThemeSideBar}>
          <FontAwesomeIcon
            icon={faCog}
            size="xl"
            className={style.settingsIcon}
          />
        </div>
        <div
          className={`${style.sideBar} ${
            showThemeMenu ? style.open : style.hide
          }`}
        >
          <ThemeSideBar toggleSlide={setShowThemeMenu} />
        </div>
      </div>
    </div>
  );
}

export default AdminNavbarContainer;
