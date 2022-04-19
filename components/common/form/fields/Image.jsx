import { FormControl, TextField, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../spinners/LoadingSpinner";
const Image1 = ({ info, errors, register, uploadHandler }) => {
  const { uploadLoading } = useSelector((state) => state.product);
  return (
    <>
      <FormControl fullWidth margin="normal">
        <TextField
          error={!!errors[`${info.name}`]}
          fullWidth
          name={info.name}
          label={info.label}
          variant="outlined"
          helperText={errors[`${info.name}`] && errors[`${info.name}`].message}
          {...register(info.name)}
          value={info.defaultValue === false ? null : info.defaultValue}
        />
      </FormControl>
      {uploadLoading ? (
        <LoadingSpinner />
      ) : (
        <Button variant="contained" component="label">
          <span>آپلود تصویر</span>
          <input type="file" onChange={uploadHandler} hidden />
        </Button>
      )}
    </>
  );
};

export default Image1;
