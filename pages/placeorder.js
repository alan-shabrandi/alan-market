import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import NextLink from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Button,
  Card,
  List,
  ListItem,
  Divider,
} from "@material-ui/core";
import { useRouter } from "next/router";
import useStyles from "../styles/styles";
import CheckoutWizard from "../components/CheckoutWizard";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/spinners/LoadingSpinner";
import { placeOrderHandler } from "../redux/actions/order";

const PlaceOrder = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.order);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  // --- Calculate Prices --- //
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.07);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    } else if (!paymentMethod) {
      router.push("/payment");
    }
  }, [cartItems.length, paymentMethod, router]);

  const orderDetails = {
    orderItems: cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  const myLoader = ({ src, width, quality }) => {
    return `https://shop.jsworld.ir${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <Layout title="ثبت نهایی محصول">
      <CheckoutWizard activeStep={3} />
      <Typography component="h1" variant="h1">
        ثبت نهایی محصول
      </Typography>
      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  آدرس
                </Typography>
              </ListItem>
              <ListItem>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city},{shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  شیوه پرداخت
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  محصولات سفارش داده شده
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>تصویر</TableCell>
                        <TableCell>نام</TableCell>
                        <TableCell align="right">تعداد</TableCell>
                        <TableCell align="right">قیمت</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  loader={myLoader}
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                />
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell>
                            <NextLink
                              href={`/product/${item.id}/${item.slug}`}
                              passHref
                            >
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>
                              {parseInt(item.price).toLocaleString()} تومان
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">هزینه ها</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>قیمت محصولات:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      {parseInt(itemsPrice).toLocaleString()}تومان
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>مالیات:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      {parseInt(taxPrice).toLocaleString()}تومان
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>هزینه پست:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      {parseInt(shippingPrice).toLocaleString()}تومان
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>قیمت نهایی:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>
                        {parseInt(totalPrice).toLocaleString()}تومان
                      </strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() =>
                      placeOrderHandler(
                        orderDetails,
                        dispatch,
                        router,
                        setLoading,
                        closeSnackbar,
                        enqueueSnackbar
                      )
                    }
                  >
                    نهایی کردن سفارش
                  </Button>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
