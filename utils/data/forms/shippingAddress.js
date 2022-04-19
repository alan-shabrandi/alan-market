import * as yup from "yup";

export const shippingAddressData = () => {
  return {
    submitButton: {
      label: "ادامه",
      className: "submit-button",
    },
    fields: [
      {
        label: "نام گیرنده کالا",
        type: "text",
        name: "fullName",
      },
      {
        label: "آدرس دقیق",
        type: "text",
        name: "address",
      },
      {
        label: "شهر محل سکونت",
        type: "text",
        name: "city",
      },
      {
        label: "کد پستی",
        type: "number",
        name: "postalCode",
      },
      {
        label: "کشور",
        type: "text",
        name: "country",
      },
    ],
  };
};

export const shippingAddressSchema = yup.object().shape({
  fullName: yup.string().required("وارد کردن فیلد نام گیرنده الزامی است"),
  address: yup.string().required("وارد کردن فیلد آدرس الزامی است"),
  city: yup.string().required("وارد کردن فیلد شهر الزامی است"),
  postalCode: yup.number().typeError("وارد کردن فیلد کد پستی الزامی است"),
  country: yup.string().required("وارد کردن فیلد کشور الزامی است"),
});
