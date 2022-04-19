import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSnackbar } from "notistack";
import { Delete, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
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
import Layout from "../../components/layouts/Layout";
import LoadingSpinner from "../../components/common/spinners/LoadingSpinner";
import AdminLayout from "../../components/layouts/AdminLayout";
import {
  createProductHandler,
  deleteProductHandler,
  fetchProducts,
} from "../../redux/actions/product";

const Products = () => {
  const classes = useStyles();

  const { userInfo } = useSelector((state) => state.user);

  const { loading, products, error, loadingCreate, loadingDelete } =
    useSelector((state) => state.product);

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) return router.push("/login");

    fetchProducts(dispatch, userInfo.token);
  }, [router, userInfo, dispatch]);

  return (
    <Layout title="لیست محصولات">
      <AdminLayout>
        <Card className={classes.section}>
          <List>
            <ListItem>
              <Grid container alignItems="center">
                <Grid item md={9} xs={6}>
                  <Typography component="h1" variant="h1">
                    محصولات
                  </Typography>
                </Grid>
                <Grid item md={3} xs={6} align="left">
                  {loadingCreate ? (
                    <LoadingSpinner />
                  ) : (
                    <Button
                      onClick={() =>
                        createProductHandler(
                          dispatch,
                          userInfo.token,
                          enqueueSnackbar,
                          router
                        )
                      }
                      color="primary"
                      variant="contained"
                      fullWidth
                    >
                      ساخت محصول جدید
                    </Button>
                  )}
                </Grid>
              </Grid>
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
                        <TableCell>نام</TableCell>
                        <TableCell>قیمت</TableCell>
                        <TableCell>دسته بندی</TableCell>
                        <TableCell>تعداد</TableCell>
                        <TableCell>امتیاز</TableCell>
                        <TableCell>جزئیات</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>{product._id.substring(20, 24)}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>
                            {parseInt(product.price).toLocaleString()}
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.countInStock}</TableCell>
                          <TableCell>{product.rating}</TableCell>
                          <TableCell style={{ display: "flex" }}>
                            <NextLink
                              href={`/admin/product/${product._id}`}
                              passHref
                            >
                              <Link>
                                <Tooltip title="ویرایش" arrow>
                                  <IconButton
                                    aria-label="edit"
                                    style={{ color: "green" }}
                                  >
                                    <Edit />
                                  </IconButton>
                                </Tooltip>
                              </Link>
                            </NextLink>
                            <Tooltip title="حذف" arrow>
                              <IconButton
                                aria-label="delete"
                                style={{ color: "red" }}
                                disabled={loadingDelete ? true : false}
                                onClick={() =>
                                  deleteProductHandler(
                                    product._id,
                                    dispatch,
                                    userInfo.token,
                                    enqueueSnackbar
                                  )
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
              )}
            </ListItem>
          </List>
        </Card>
      </AdminLayout>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Products), { ssr: false });
