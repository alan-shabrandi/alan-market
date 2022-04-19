import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, HighlightOff } from "@material-ui/icons";
import {
  Button,
  Card,
  CircularProgress,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";

import useStyles from "../../styles/styles";
import { jalaliDate } from "../../utils/jalaliDate";
import Layout from "../../components/layouts/Layout";
import { fetchOrders } from "../../redux/actions/order";
import AdminLayout from "../../components/layouts/AdminLayout";

const Orders = () => {
  const classes = useStyles();

  const { userInfo } = useSelector((state) => state.user);

  const router = useRouter();

  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (!userInfo) return router.push("/login");

    fetchOrders(dispatch, userInfo.token);
  }, [router, userInfo, dispatch]);

  return (
    <Layout title="لیست سفارشات">
      <AdminLayout>
        <Card className={classes.section}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                سفارشات
              </Typography>
            </ListItem>
            <ListItem>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography className={classes.error}>{error}</Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>شناسه</TableCell>
                        <TableCell>کاربر</TableCell>
                        <TableCell>تاریخ</TableCell>
                        <TableCell>هزینه</TableCell>
                        <TableCell>پرداخت</TableCell>
                        <TableCell>ارسال</TableCell>
                        <TableCell>جزئیات</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order._id.substring(20, 24)}</TableCell>
                          <TableCell>
                            {order.user ? order.user.name : "کاربر پاک شده"}
                          </TableCell>
                          <TableCell>{jalaliDate(order.createdAt)}</TableCell>
                          <TableCell>
                            {parseInt(order.totalPrice).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {order.isPaid ? (
                              <Tooltip
                                title={`پرداخت شده در تاریخ ${jalaliDate(
                                  order.paidAt
                                )}`}
                              >
                                <CheckCircle style={{ color: "green" }} />
                              </Tooltip>
                            ) : (
                              <HighlightOff style={{ color: "red" }} />
                            )}
                          </TableCell>
                          <TableCell>
                            {order.isDelivered ? (
                              <Tooltip
                                title={`ارسال شده در تاریخ ${jalaliDate(
                                  order.deliveredAt
                                )}`}
                              >
                                <CheckCircle style={{ color: "green" }} />
                              </Tooltip>
                            ) : (
                              <HighlightOff style={{ color: "red" }} />
                            )}
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/order/${order._id}`} passHref>
                              <Link>
                                <Button variant="contained">جزئیات</Button>
                              </Link>
                            </NextLink>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </ListItem>
          </List>
        </Card>
      </AdminLayout>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Orders), { ssr: false });
