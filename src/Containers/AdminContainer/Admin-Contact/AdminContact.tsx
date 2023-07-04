import ContactForm from "../../../components/Admin-Section/Contact-Section/Contact-Form/ContactForm";
import style from "../Admin-Contact/style.module.css";
import ContactTitle from "../../../components/Admin-Section/Contact-Section/Contact-Title/Contact Title";
import AdminNavbarContainer from "../Admin-Navbar/AdminNavbarContainer";
import { useAppSelector } from "../../../Hooks/Hooks";
import Loader from "../../../components/Comman/Loader/Loader";
import ModalLoader from "../../../components/Comman/Modal-Loader/ModalLoader";

export default function AdminContact() {
  const pending = useAppSelector((state) => state.contact.pending);

  if (pending) {
    return (
      <>
        <ModalLoader />
      </>
    );
  } else {
    return (
      <>
        <AdminNavbarContainer />
        <div className={style.Container}>
          <div className={style.formContainer}>
            <ContactTitle />
            <ContactForm />
          </div>
        </div>
      </>
    );
  }
}
