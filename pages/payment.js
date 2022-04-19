import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";

import useStyles from "../styles/styles";
import Layout from "../components/layouts/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { submitPaymentMethodHandler } from "../redux/actions/order";
import LoadingSpinner from "../components/common/spinners/LoadingSpinner";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const classes = useStyles();

  const router = useRouter();

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.order);
  const { cartItems, shippingAddress } = cart;

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    } else if (!shippingAddress.address) {
      router.push("/shipping");
    } else {
      setPaymentMethod(Cookies.get("paymentMethod") || "");
    }
  }, [cartItems.length, router, shippingAddress.address]);

  return (
    <Layout title="شیوه پرداخت">
      <CheckoutWizard activeStep={2} />
      <form
        className={classes.form}
        onSubmit={(event) =>
          submitPaymentMethodHandler(
            event,
            paymentMethod,
            dispatch,
            setLoading,
            router,
            closeSnackbar,
            enqueueSnackbar
          )
        }
      >
        <Typography component="h1" variant="h1">
          شیوه پرداخت
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="اینترنتی"
                  value="اینترنتی"
                  control={<Radio />}
                />
                <FormControlLabel
                  label="کارت به کارت"
                  value="کارت به کارت"
                  control={<Radio />}
                />
                <FormControlLabel
                  label="پرداخت در محل"
                  value="پرداخت در محل"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                ادامه
              </Button>
            )}
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={() => router.push("/shipping")}
            >
              مرحله قبل
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Payment;
