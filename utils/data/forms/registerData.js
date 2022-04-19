import { AccountCircle, Lock, Mail } from "@material-ui/icons";
import * as yup from "yup";

export const registerData = () => {
  return {
    submitButton: {
      label: "ثبت نام",
      className: "submit-button",
    },
    fields: [
      {
        label: "نام کاربری",
        type: "text",
        name: "name",
        icon: <AccountCircle fontSize="small" />,
      },
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
      {
        label: "تکرار رمز عبور",
        type: "password",
        name: "passwordConfirm",
        icon: <Lock fontSize="small" />,
      },
    ],
  };
};

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("وارد کردن فیلد نام کاربری الزامی است")
    .min(3, "کلمه عبور نباید کمتر از 3 کاراکتر باشد")
    .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد"),
  email: yup
    .string()
    .email("لطفا ایمیل را درست وارد کنید")
    .required("وارد کردن فیلد ایمیل الزامی است"),
  password: yup
    .string()
    .required("وارد کردن فیلد رمز عبور الزامی است")
    .min(5, "کلمه عبور نباید کمتر از 5 کاراکتر باشد")
    .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد"),
  passwordConfirm: yup
    .string()
    .required("وارد کردن فیلد تکرار رمز عبور الزامی است")
    .oneOf(
      [yup.ref("password"), null],
      "تکرار رمز عبور باید با رمز عبور یکسان باشد"
    ),
});
