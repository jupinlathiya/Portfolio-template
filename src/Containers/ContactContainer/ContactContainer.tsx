import { useEffect } from "react";
import ContactHeader from "../../components/Contact-Section/ContactHeader/ContactHeader";
import ContactForm from "../../components/Contact-Section/Form/ContactForm";
import ContactTitle from "../../components/Contact-Section/Section-Title/ContactTitle";
import style from "../ContactContainer/style.module.css";
import { useAppDispatch } from "../../Hooks/Hooks";
import { fetchContactData } from "../../slices/contactSlice";
function ContactContainer() {
  const dispatch = useAppDispatch();

  return (
    <div className={style.contactContainer}>
      <ContactHeader />
      <ContactTitle />
      <ContactForm />
    </div>
  );
}

export default ContactContainer;
