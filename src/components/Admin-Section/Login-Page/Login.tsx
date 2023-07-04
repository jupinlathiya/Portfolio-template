import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Hooks/Hooks";
import { loginUser } from "../../../slices/authSlice";
import { Input, Form } from "antd";

import style from "../Login-Page/style.module.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ModalLoader from "../../Comman/Modal-Loader/ModalLoader";
interface FormValue {
  email: string;
  password: string;
}
function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>();
  const [form] = Form.useForm();
  function onFinish(values: FormValue) {
    setLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredentials) => {
        setLoading(false);
        dispatch(loginUser());
        toast.success("Logged in Successfully");

        navigate("/admin/home");
      })
      .catch((error) => {
        setLoading(false);
        toast(error.message);
      });
  }
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      document.documentElement.setAttribute("data-theme", "Pure Pitch");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);
  const onFinishFailed = (errorInfo: any) => {
    toast("Failed:", errorInfo);
  };
  const validatePassword = (_: any, value: string) => {
    if (value && value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters long")
      );
    }
    return Promise.resolve();
  };

  const handleResetPassword = (value: string) => {
    let email = value;

    sendPasswordResetEmail(auth, email)
      .then(() => toast("Reset Password Link Sent Successfully"))
      .catch((err) => {
        toast(err.message);
      });
  };
  return (
    <>
      {loading && <ModalLoader />}
      <div className={`${style.formContainer} ${loading && style.blur}`}>
        <Form
          form={form}
          name="basic"
          layout={"vertical"}
          className={style.form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className={style.loginPhoto}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g id="style=bulk">
                  {" "}
                  <g id="profile">
                    {" "}
                    <path
                      id="vector (Stroke)"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z"
                      fill="#000000"
                    ></path>{" "}
                    <path
                      id="rec (Stroke)"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z"
                      fill="#BFBFBF"
                    ></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <div className={style.formTitle}>Welcome Back!</div>

          <Form.Item
            className={style.field}
            style={{ maxHeight: "60px" }}
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please Enter your Email!" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            className={style.field}
            style={{ maxHeight: "60px" }}
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please Enter your password!" },
              { validator: validatePassword },
            ]}
          >
            <Input.Password className={style.password} />
          </Form.Item>
          <div
            className={style.link}
            onClick={() => handleResetPassword(form.getFieldValue("email"))}
          >
            Forget password ?
          </div>
          <div className={style.btnContainer}>
            <button className={style.loginBtn} type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login;
