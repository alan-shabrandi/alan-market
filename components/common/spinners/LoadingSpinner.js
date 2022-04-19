import { Button } from "@material-ui/core";
import PulseLoader from "react-spinners/PulseLoader";

const LoadingSpinner = () => {
  return (
    <Button fullWidth variant="contained" disabled>
      لطفا صبر کنید
      <PulseLoader size={8} color="#fff" />
    </Button>
  );
};

export default LoadingSpinner;
