import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Hooks/Hooks";
import style from "../Desktop-Navbar/style.module.css";
//Desktop Navbar
function DesktopNavbar() {
  const data = useAppSelector((state) => state.contact.contactDetails);
  const showProductSection = useAppSelector(
    (state) => state.product.showProductSection
  );
  const showWorkSection = useAppSelector((state) => state.work.showWorkSection);

  const navigate = useNavigate();
  const logIn = () => {
    navigate("/admin/login");
  };
  const [activeSection, setActiveSection] = useState<string>("homeSection");

  const handleSetActiveSection = (sectionId: string) => {
    setActiveSection(sectionId);
  };
  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.navbar}>
          <span className={style.title}>
            {data?.["Portfolio Name"].slice(0, 3).toUpperCase()}
            {}
            <span className={style.secondary_text}>
              {data?.["Portfolio Name"].slice(3, 4).toUpperCase()}
            </span>
            {data?.["Portfolio Name"].slice(4).toUpperCase()}
          </span>
          <ul className={style.navoptions}>
            <li
              className={`${style.navoption} ${
                activeSection === "homeSection" ? style.activeLink : ""
              }`}
            >
              <a
                href="#homeSection"
                onClick={() => handleSetActiveSection("homeSection")}
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
                  onClick={() => handleSetActiveSection("productSection")}
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
                  onClick={() => handleSetActiveSection("workSection")}
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
                onClick={() => handleSetActiveSection("contactSection")}
              >
                CONTACT US
              </a>
            </li>
            <button className={style.navBtn} onClick={() => logIn()}>
              LOG IN
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}

export default DesktopNavbar;
