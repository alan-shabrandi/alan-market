import PropTypes from "prop-types";
import { Step, StepLabel, Stepper } from "@material-ui/core";

import useStyles from "../styles/styles";

const CheckoutWizard = ({ activeStep = 0 }) => {
  const classes = useStyles();
  return (
    <Stepper
      className={classes.transparentBackground}
      activeStep={activeStep}
      alternativeLabel
    >
      {["ورود", "ثبت آدرس", "شیوه پرداخت", "ثبت نهایی"].map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

CheckoutWizard.propTypes = {
  activeStep: PropTypes.number,
};

export default CheckoutWizard;
