import * as yup from "yup";

export const productCommentsData = () => {
  return {
    submitButton: {
      label: "ثبت دیدگاه",
      className: "submit-button",
    },
    fields: [
      {
        label: "دیدگاه شما",
        type: "text",
        name: "comment",
        multiline: true,
      },
      {
        label: "امتیازدهی",
        type: "rating",
        name: "rating",
      },
    ],
  };
};

export const productCommentsSchema = yup.object().shape({});
