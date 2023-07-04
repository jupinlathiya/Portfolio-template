import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import style from "../Form/style.module.css";
import { useAppSelector } from "../../../Hooks/Hooks";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email"),
  number: Yup.string(),
  message: Yup.string().required("Message is required"),
});
interface FormDataType {
  name: string;
  email?: string;
  number?: string;
  message: string;
}
const initialValues: FormDataType = {
  name: "",
  email: "",
  number: "",
  message: "",
};
const ContactForm = () => {
  const data = useAppSelector((state) => state.contact.contactDetails);

  const handleSubmit = (
    values: FormDataType,
    { resetForm }: FormikHelpers<FormDataType>
  ) => {
    if (data?.["Recieve Mail"]) {
      const templateParams = {
        name: values.name,
        email: values.email,
        number: values.number,
        message: values.message,
      };

      emailjs
        .send(
          "service_p6f1p08",
          "template_bjg9g9j",
          templateParams,
          "LPQ_E_u9EI0W8gfEn"
        )
        .then((result) => {
          toast("Mail Sent Successfully");
        })
        .catch((error: any) => {
          toast(error.message);
        });
      resetForm();
    }
    if (data?.["Recieve Whatsapp"]) {
      const messageText = `Name: ${values.name}
      \nEmail: ${values.email}\nNumber: ${values.number}\nMessage: ${values.message}`;
      const whatsappURL = `https://wa.me/91${
        data?.["Whatsapp Number"]
      }?text=${encodeURIComponent(messageText)}`;

      window.open(whatsappURL);
    }

    resetForm();
  };

  return (
    <div className={style.form}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={style.name_email_number}>
              <div className={style.field}>
                <Field
                  className={style.input}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                {errors.name && touched.name && (
                  <div className={style.error}>{errors.name}</div>
                )}
              </div>
              <div className={style.field}>
                <Field
                  className={style.input}
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                {errors.email && touched.email && (
                  <div className={style.error}>{errors.email}</div>
                )}
              </div>
              <div className={style.field}>
                <Field
                  className={style.input}
                  type="text"
                  name="number"
                  placeholder="Number"
                />
                {errors.number && touched.number && (
                  <div className={style.error}>{errors.number}</div>
                )}
              </div>
            </div>
            <div className={style.area}>
              <Field
                className={style.input}
                component="textarea"
                name="message"
                placeholder="Message"
                rows={5}
              />
              {errors.message && touched.message && (
                <div className={style.error}>{errors.message}</div>
              )}
            </div>
            <div>
              <button className={style.submit_btn} type="submit">
                Send Message
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
