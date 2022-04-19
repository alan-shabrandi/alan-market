import Image from "next/image";
import { useState } from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useSnackbar } from "notistack";
import { Delete } from "@material-ui/icons";
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
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import Layout from "../components/layouts/Layout";
import LoadingSpinner from "../components/common/spinners/LoadingSpinner";
import { removeItemHandler, updateCartHandler } from "../redux/actions/order";

const myLoader = ({ src, width, quality }) => {
  return `https://shop.jsworld.ir${src}?w=${width}&q=${quality || 75}`;
};

function CartScreen() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.order);
  const { cartItems } = cart;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const checkoutHandler = () => {
    setLoading(true);
    router.push("/shipping");
  };

  return (
    <Layout title="سبد خرید">
      <Typography component="h1" variant="h1">
        سبد خرید
      </Typography>
      {cartItems.length === 0 ? (
        <div>
          سبد خرید خالی است.{" "}
          <NextLink href="/" passHref>
            <Link>ورود به صفحه محصولات</Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>تصویر</TableCell>
                    <TableCell>نام</TableCell>
                    <TableCell align="right">تعداد</TableCell>
                    <TableCell align="right">قیمت</TableCell>
                    <TableCell align="right">حذف</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
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
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(
                              item,
                              e.target.value,
                              cartItems,
                              dispatch,
                              closeSnackbar,
                              enqueueSnackbar
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">
                        {parseInt(item.price).toLocaleString()} تومان
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="حذف" arrow>
                          <IconButton
                            aria-label="delete"
                            variant="contained"
                            style={{ color: "rgb(239, 64, 86)" }}
                            onClick={() =>
                              removeItemHandler(item, cartItems, dispatch)
                            }
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography>
                    <p>
                      تعداد محصولات: &nbsp;
                      {cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </p>
                    <p>
                      قیمت کل: &nbsp;
                      {parseInt(
                        cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
                      ).toLocaleString()}
                      تومان
                    </p>
                  </Typography>
                </ListItem>
                <ListItem>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={checkoutHandler}
                    >
                      بررسی سفارش ها
                    </Button>
                  )}
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
