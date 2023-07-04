import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { toast } from "react-toastify";
import style from "../Theme-Sidebar/style.module.css";
import ThemeCard from "./Theme-Card/ThemeCard";
interface PropsType {
  toggleSlide: (value: boolean) => void;
}
function ThemeSideBar(props: PropsType) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  function closeSideBar() {
    props.toggleSlide(false);
  }
  const themeArray = [
    {
      name: "Glamorous Green",
      secondary: "#006565",
      primary: "#F0f7f7",
      ternary: "#000000DE",
    },
    {
      name: "Bright Brown",
      secondary: "#80485B",
      primary: "#FFF0DF",
      ternary: "#000000DE",
    },
    {
      name: "Wonderful Violet",
      secondary: "#5854B1",
      primary: "#f6f7fb",
      ternary: "#000000DE",
    },
    {
      name: "Sweet Sky",
      secondary: "#68c8d5",
      primary: "#f7faff",
      ternary: "#000000DE",
    },
    {
      name: "Pure Pitch",
      secondary: "#e66060",
      primary: "#f7e6e6",
      ternary: "#000000DE",
    },
  ];
  function handleTheme(name: string) {
    localStorage.setItem("theme", name);
    toast(`${name} : Theme Applied`, {
      style: {
        backgroundColor: "var(--color-secondary)",
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
      },
      progressStyle: { backgroundColor: "white" },
    });

    document.documentElement.setAttribute("data-theme", name);
    closeSideBar();
  }
  const themes = themeArray.map((theme) => {
    return (
      <ThemeCard
        name={theme.name}
        clickEvent={handleTheme}
        primary={theme.primary}
        secondary={theme.secondary}
        ternary={theme.ternary}
      />
    );
  });
  return (
    <div className={style.themenavbarContainer}>
      <div ref={sidebarRef} className={style.themeNavbar}>
        <div className={style.title}>Theme Selector</div>
        <div>
          <ul className={style.navoptions}>{themes}</ul>
        </div>
        <div className={style.iconContainer}>
          <FontAwesomeIcon
            className={style.closeSliderIcon}
            icon={faAngleRight}
            onClick={closeSideBar}
          />
        </div>
      </div>
    </div>
  );
}

export default ThemeSideBar;
