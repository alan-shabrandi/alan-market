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
        label: "اسلاگ",
        type: "text",
        name: "slug",
      },
      {
        label: "قیمت",
        type: "number",
        name: "price",
      },
      {
        label: "تصویر",
        type: "image",
        name: "image",
      },
      {
        label: "دسته بندی",
        type: "text",
        name: "category",
      },
      {
        label: "کمپانی سازنده",
        type: "text",
        name: "brand",
      },
      {
        label: "تعداد در انبار",
        type: "number",
        name: "countInStock",
      },
    ],
  };
};

export const formSchema = yup.object().shape({
  name: yup.string().required("وارد کردن فیلد نام الزامی است"),
  slug: yup.string().required("وارد کردن فیلد اسلاگ الزامی است"),
});
