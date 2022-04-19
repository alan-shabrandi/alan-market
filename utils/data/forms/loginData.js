import { Lock, Mail } from "@material-ui/icons";
import * as yup from "yup";

export const loginData = () => {
  return {
    submitButton: {
      label: "ورود",
      className: "submit-button",
    },
    fields: [
      {
        label: "ایمیل",
        type: "text",
        name: "email",
        icon: <Mail fontSize="small" />,
      },
      {
        label: "رمز عبور",
        type: "password",
        name: "password",
        icon: <Lock fontSize="small" />,
      },
    ],
  };
};

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("لطفا ایمیل را درست وارد کنید")
    .required("وارد کردن فیلد ایمیل الزامی است"),
  password: yup
    .string()
    .required("وارد کردن فیلد رمز عبور الزامی است")
    .min(5, "کلمه عبور نباید کمتر از 5 کاراکتر باشد")
    .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد"),
});
