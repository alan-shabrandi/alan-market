import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const SelectBox = ({ info, errors, register }) => {
  return (
    <FormControl
      variant="outlined"
      fullWidth
      className="form-item"
      error={!!errors[`${info.name}`]}
      margin="normal"
    >
      <InputLabel id="demo-simple-select-outlined-label">
        {info.label}
      </InputLabel>
      <Select
        {...register(info.name)}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        label="Course"
        defaultValue={info.defaultValue === false ? null : info.defaultValue}
      >
        {info.data.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {errors[`${info.name}`] ? (
        <FormHelperText>{errors[`${info.name}`].message}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default SelectBox;
