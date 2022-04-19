import { Checkbox, FormControlLabel } from "@material-ui/core";

const CheckBox = ({ info, register, checked }) => {
  const checkedResult = checked[info.name] ? checked[info.name] : false;
  return (
    <FormControlLabel
      control={<Checkbox />}
      label={info.label}
      name={info.name}
      {...register(info.name)}
      checked={checkedResult}
    />
  );
};

export default CheckBox;
