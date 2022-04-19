import Input from "./Input";
import CheckBox from "./CheckBox";
import SelectBox from "./Select";
import Image1 from "./Image";

const Field = ({ field, register, errors, uploadHandler, checked }) => {
  return (
    <>
      {field.type === "text" ||
      field.type === "number" ||
      field.type === "password" ? (
        <Input info={field} errors={errors} register={register} />
      ) : null}

      {field.type === "checkbox" && (
        <CheckBox info={field} register={register} checked={checked} />
      )}

      {field.type === "select" && (
        <SelectBox info={field} errors={errors} register={register} />
      )}

      {field.type === "image" && (
        <Image1
          info={field}
          errors={errors}
          register={register}
          uploadHandler={uploadHandler}
        />
      )}
    </>
  );
};

export default Field;
