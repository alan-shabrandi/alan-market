import * as yup from "yup";

export const formData = () => {
  return {
    submitButton: {
      label: "بروزرسانی اطلاعات",
      className: "submit-button",
    },
    fields: [
      {
        label: "نام کاربر",
        type: "text",
        name: "name",
      },
      {
        label: "آیا این کاربر مدیر است؟",
        type: "checkbox",
        name: "isAdmin",
      },
    ],
  };
};

export const formSchema = yup.object().shape({
  name: yup.string().required("وارد کردن فیلد نام الزامی است"),
});
