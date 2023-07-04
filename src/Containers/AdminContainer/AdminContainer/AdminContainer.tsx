import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import style from "../AdminContainer/style.module.css";
import ThemeSideBar from "../../../components/Comman/Theme-Sidebar/ThemeSideBar";
import { useAppSelector } from "../../../Hooks/Hooks";
import Loader from "../../../components/Comman/Loader/Loader";
function AdminContainer() {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      document.documentElement.setAttribute("data-theme", "Pure Pitch");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);
  function handleSideBar() {
    setShowThemeMenu(!showThemeMenu);
  }

  return (
    <div
      style={{ overflow: "hidden", minHeight: "100vh", position: "relative" }}
    >
      <AdminNavbarContainer />
      <div className={style.settings} onClick={handleSideBar}>
        <FontAwesomeIcon
          icon={faCog}
          size="xl"
          className={style.settingsIcon}
        />
      </div>
      <Outlet />
      <div className={`${style.sideBar} ${showThemeMenu ? style.open : ""}`}>
        <ThemeSideBar toggleSlide={setShowThemeMenu} />
      </div>
    </div>
  );
}

export default AdminContainer;
