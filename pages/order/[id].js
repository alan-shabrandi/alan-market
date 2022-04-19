import Image from "next/image";
import NextLink from "next/link";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

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
  CircularProgress,
  Divider,
} from "@material-ui/core";

import useStyles from "../../styles/styles";
import { jalaliDate } from "../../utils/jalaliDate";
import Layout from "../../components/layouts/Layout";
import { orderActions } from "../../redux/reducers/order";
import LoadingSpinner from "../../components/common/spinners/LoadingSpinner";
import {
  deliverOrderHandler,
  fetchOrder,
  payOrderHandler,
} from "../../redux/actions/order";

const Order = ({ params }) => {
  const orderId = params.id;

  const classes = useStyles();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const {
    loading,
    loadingPay,
    error,
    order,
    successPay,
    loadingDeliver,
    successDeliver,
  } = useSelector((state) => state.order);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  useEffect(() => {
    if (!userInfo) return router.push("/login");
    fetchOrder(dispatch, orderId);
    if (
      !orderId ||
      successPay ||
      successDeliver ||
      (orderId && orderId !== orderId)
    ) {
      fetchOrder(dispatch, orderId);
      if (successPay) {
        dispatch(orderActions.payReset());
      }
      if (successDeliver) {
        dispatch(orderActions.deliverReset());
      }
    }
  }, [dispatch, orderId, router, successDeliver, successPay, userInfo]);

  const myLoader = ({ src, width, quality }) => {
    return `https://shop.jsworld.ir${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <Layout title={`وضعیت سفارش ${orderId}`}>
      <Typography component="h1" variant="h1">
        وضعیت سفارش {orderId}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography className={classes.error}>{error}</Typography>
      ) : (
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
                <ListItem>
                  وضعیت تحویل کالا:
                  {isDelivered
                    ? `در تاریخ ${jalaliDate(deliveredAt)} تحویل داده شده است`
                    : "ارسال نشده است"}
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
                <ListItem>
                  وضعیت پرداخت:
                  {isPaid
                    ? `در تاریخ ${jalaliDate(paidAt)} پرداخت شده است`
                    : "هنوز پرداخت نشده است"}
                </ListItem>
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
                        {orderItems.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink
                                href={`/product/${item.id}/${item.slug}`}
                                passHref
                              >
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
                                {parseInt(item.price).toLocaleString()}تومان
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
                {loadingPay ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {!isPaid && (
                      <ListItem>
                        <Button
                          color="primary"
                          variant="contained"
                          fullWidth
                          onClick={() =>
                            payOrderHandler(dispatch, orderId, enqueueSnackbar)
                          }
                        >
                          پرداخت
                        </Button>
                      </ListItem>
                    )}
                  </>
                )}
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListItem>
                    {loadingDeliver ? (
                      <LoadingSpinner />
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          deliverOrderHandler(
                            orderId,
                            dispatch,
                            enqueueSnackbar
                          )
                        }
                      >
                        ارسال سفارش
                      </Button>
                    )}
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
