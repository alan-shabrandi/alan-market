import { useState } from "react";

import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

const Input = ({ info, errors, register }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const InputProps = {
    endAdornment: null,
  };

  if (info.icon) {
    InputProps.startAdornment = (
      <InputAdornment position="start">{info.icon}</InputAdornment>
    );
  }

  if (info.type === "password") {
    InputProps.endAdornment = (
      <InputAdornment position="end">
        <IconButton
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          size="small"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    );
  }
  return (
    <FormControl fullWidth margin="normal">
      <TextField
        error={!!errors[`${info.name}`]}
        type={showPassword ? "text" : info.type}
        fullWidth
        name={info.name}
        label={info.label}
        variant="outlined"
        helperText={errors[`${info.name}`] && errors[`${info.name}`].message}
        {...register(info.name)}
        InputProps={InputProps}
        multiline={info.multiline ? info.multiline : false}
      />
    </FormControl>
  );
};

export default Input;
