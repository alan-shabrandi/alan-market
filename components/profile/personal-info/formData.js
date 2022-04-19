import * as yup from "yup";

export const formData = () => {
  return {
    submitButton: {
      label: "بروزرسانی اطلاعات",
      className: "submit-button",
    },
    fields: [
      {
        label: "نام",
        type: "text",
        name: "name",
      },
      {
        label: "ایمیل",
        type: "text",
        name: "email",
      },
      {
        label: "شماره همراه",
        type: "number",
        name: "phone",
      },
      {
        label: "رمز عبور",
        type: "password",
        name: "password",
      },
      {
        label: "تکرار رمز عبور",
        type: "password",
        name: "confirmPassword",
      },
    ],
  };
};

export const formSchema = yup.object().shape({
  name: yup.string().required("وارد کردن فیلد نام الزامی است"),
  email: yup.string().required("وارد کردن فیلد اسلاگ الزامی است"),
});
