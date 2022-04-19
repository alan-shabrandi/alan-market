import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography } from "@material-ui/core";

import Layout from "../components/layouts/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { submitShippingHandler } from "../redux/actions/order";
import TemplateForm from "../components/common/form/TemplateForm";
import { ShippingWrapper } from "../styles/components/shipping/shipping";
import {
  shippingAddressSchema,
  shippingAddressData,
} from "../utils/data/forms/shippingAddress";

const Shipping = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.order);
  const { cartItems, shippingAddress } = cart;

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    } else if (cartItems.length === 0) {
      router.push("/cart");
    }
  });

  return (
    <Layout title="ثبت آدرس">
      <ShippingWrapper>
        <CheckoutWizard activeStep={1} />
        <Typography component="h1" variant="h1">
          ثبت آدرس
        </Typography>
        <TemplateForm
          fields={shippingAddressData().fields}
          submitButton={shippingAddressData().submitButton}
          schema={shippingAddressSchema}
          onSubmit={(values) =>
            submitShippingHandler(values, dispatch, router, setLoading)
          }
          loading={loading}
          defaultValues={shippingAddress}
        />
      </ShippingWrapper>
    </Layout>
  );
};

export default Shipping;
