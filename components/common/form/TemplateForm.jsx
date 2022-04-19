import { useForm } from "react-hook-form";
import Field from "./fields/Field";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-ui/core";
import LoadingSpinner from "../spinners/LoadingSpinner";
const TemplateForm = ({
  fields,
  schema,
  onSubmit,
  submitButton,
  defaultValues,
  uploadHandler,
  loading = false,
  checked,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          register={register}
          errors={errors}
          uploadHandler={uploadHandler}
          checked={checked}
        />
      ))}
      <div className="submit-login">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={submitButton.className}
            fullWidth
            type="submit"
          >
            {submitButton.label}
          </Button>
        )}
      </div>
    </form>
  );
};

export default TemplateForm;
