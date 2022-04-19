import { TextField } from "@material-ui/core";

const TextArea = () => {
  return (
    <TextField
      id="filled-multiline-static"
      label="Multiline"
      multiline
      rows={4}
      defaultValue="Default Value"
      variant="filled"
    />
  );
};

export default TextArea;
