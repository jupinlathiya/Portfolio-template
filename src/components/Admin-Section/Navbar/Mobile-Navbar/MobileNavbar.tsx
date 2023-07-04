import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../Mobile-Navbar/style.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../../../Hooks/Hooks";

import { logoutUser } from "../../../../slices/authSlice";
type Propstype = {
  event: () => void;
};
//Mobile Screen Side navbar
function MobileNavbar(props: Propstype) {
  const closeSideBar = props.event;
  const isAuthentucated = useAppSelector((state) => state.auth.isAuthenticated);
  const data = useAppSelector((state) => state.contact.contactDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logoutUser());
        navigate("/admin/login");
      })
      .catch((err) => {
        toast(err.message);
      });
  };
  return (
    <div id="" className={style.mobilenavbarContainer}>
      <div className={style.mobileNavbar}>
        <div className={style.logo_title}>
          {data?.["Portfolio Name"] && (
            <span className={style.title}>
              {data?.["Portfolio Name"].slice(0, 3).toUpperCase()}
              {}
              <span className={style.secondary_text}>
                {data?.["Portfolio Name"].slice(3, 4).toUpperCase()}
              </span>
              {data?.["Portfolio Name"].slice(4).toUpperCase()}
              -ADMIN
            </span>
          )}
        </div>
        <div>
          <ul className={style.navoptions}>
            <li className={style.navoption}>
              <NavLink
                to="/admin/home"
                className={({ isActive }) =>
                  isActive ? `${style.activeLink}` : ""
                }
                onClick={closeSideBar}
              >
                HOME
              </NavLink>
              <div className={style.navoption_hover}></div>
            </li>
            <li className={style.navoption}>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  isActive ? `${style.activeLink}` : ""
                }
                onClick={closeSideBar}
              >
                PRODUCTS
              </NavLink>
              <div className={style.navoption_hover}></div>
            </li>
            <li className={style.navoption}>
              <NavLink
                to="/admin/works"
                className={({ isActive }) =>
                  isActive ? `${style.activeLink}` : ""
                }
                onClick={closeSideBar}
              >
                MY WORK
              </NavLink>
              <div className={style.navoption_hover}></div>
            </li>
            <li className={style.navoption}>
              <NavLink
                to="/admin/contact"
                className={({ isActive }) =>
                  isActive ? `${style.activeLink}` : ""
                }
                onClick={closeSideBar}
              >
                CONTACT US
              </NavLink>
              <div className={style.navoption_hover}></div>
            </li>
            {isAuthentucated && (
              <button
                className={style.navBtn}
                onClick={() => {
                  confirmAlert({
                    title: "Logging Out User",
                    message: "Are you sure to do this.",
                    buttons: [
                      {
                        label: "Yes",
                        onClick: () => logOut(),
                      },
                      {
                        label: "No",
                        onClick: () => {},
                      },
                    ],
                  });
                }}
              >
                LOGOUT
              </button>
            )}
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
