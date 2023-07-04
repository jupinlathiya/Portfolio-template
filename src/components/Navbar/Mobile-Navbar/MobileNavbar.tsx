import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../Mobile-Navbar/style.module.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Hooks/Hooks";
import { useState } from "react";
type Propstype = {
  event: () => void;
};
//Mobile Screen Side navbar
function MobileNavbar(props: Propstype) {
  const closeSideBar = props.event;
  const data = useAppSelector((state) => state.contact.contactDetails);
  const showProductSection = useAppSelector(
    (state) => state.product.showProductSection
  );
  const showWorkSection = useAppSelector((state) => state.work.showWorkSection);
  const navigate = useNavigate();
  const logIn = () => {
    navigate("/admin/login");
  };
  const [activeSection, setActiveSection] = useState<string>();

  const handleSetActiveSection = (sectionId: string) => {
    setActiveSection(sectionId);
  };
  return (
    <div className={style.mobilenavbarContainer}>
      <div className={style.mobileNavbar}>
        <div className={style.logo_title}>
          <span className={style.title}>
            {data?.["Portfolio Name"].slice(0, 3).toUpperCase()}
            {}
            <span className={style.secondary_text}>
              {data?.["Portfolio Name"].slice(3, 4).toUpperCase()}
            </span>
            {data?.["Portfolio Name"].slice(4).toUpperCase()}
          </span>
        </div>
        <div>
          <ul className={style.navoptions}>
            <li
              className={`${style.navoption} ${
                activeSection === "homeSection" ? style.activeLink : ""
              }`}
            >
              <a
                href="#homeSection"
                onClick={() => {
                  handleSetActiveSection("homeSection");
                  closeSideBar();
                }}
              >
                HOME
              </a>
            </li>
            {showProductSection && (
              <li
                className={`${style.navoption} ${
                  activeSection === "productSection" ? style.activeLink : ""
                }`}
              >
                <a
                  href="#productSection"
                  onClick={() => {
                    handleSetActiveSection("productSection");
                    closeSideBar();
                  }}
                >
                  PRODUCTS
                </a>
              </li>
            )}
            {showWorkSection && (
              <li
                className={`${style.navoption} ${
                  activeSection === "workSection" ? style.activeLink : ""
                }`}
              >
                <a
                  href="#workSection"
                  onClick={() => {
                    handleSetActiveSection("workSection");
                    closeSideBar();
                  }}
                >
                  MY WORK
                </a>
              </li>
            )}
            <li
              className={`${style.navoption} ${
                activeSection === "contactSection" ? style.activeLink : ""
              }`}
            >
              <a
                href="#contactSection"
                onClick={() => {
                  handleSetActiveSection("contactSection");
                  closeSideBar();
                }}
              >
                CONTACT US
              </a>
            </li>
            <button className={style.navBtn} onClick={() => logIn()}>
              LOG IN
            </button>
          </ul>
        </div>
        <div className={style.iconContainer}>
          <FontAwesomeIcon
            className={style.closeSliderIcon}
            icon={faAngleLeft}
            onClick={closeSideBar}
          />
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
