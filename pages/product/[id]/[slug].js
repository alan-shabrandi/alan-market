import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useSnackbar } from "notistack";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from "@material-ui/core";

import db from "../../../backend/db";
import Product from "../../../backend/models/Product";
import Layout from "../../../components/layouts/Layout";
import Comments from "../../../components/product/Comments";
import { fetchComments } from "../../../redux/actions/product";
import { addToCartHandler } from "../../../redux/actions/order";
import { ProductWrapper } from "../../../styles/components/product/product";
import LoadingSpinner from "../../../components/common/spinners/LoadingSpinner";

export default function ProductScreen({ product }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.order);
  const { cartItems } = cart;

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const myLoader = ({ src, width, quality }) => {
    return `https://shop.jsworld.ir${src}?w=${width}&q=${quality || 75}`;
  };

  useEffect(() => {
    fetchComments(product, dispatch, enqueueSnackbar);
  }, [product, dispatch, enqueueSnackbar]);

  return (
    <Layout title={product.name}>
      <ProductWrapper>
        {Object.keys(product).length > 0 ? (
          <>
            <Grid container spacing={1} className="product-grid__container">
              <Grid item md={4} xs={12}>
                <Image
                  loader={myLoader}
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={350}
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <List>
                  <ListItem>
                    <Typography
                      component="h1"
                      variant="h1"
                      className="product-name"
                    >
                      {product.name}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography className="product-feature">
                      دسته بندی: {product.category}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography className="product-feature">
                      کمپانی سازنده: {product.brand}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Rating value={product.rating} readOnly />
                    <Link href="#comments">
                      <Typography className="product-feature">
                        ({product.numComments} بازدید)
                      </Typography>
                    </Link>
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={3} xs={12}>
                <Card>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>قیمت</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {parseInt(product.price).toLocaleString()}تومان
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>وضعیت</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {product.countInStock > 0 ? (
                              <span>موجود</span>
                            ) : (
                              <span style={{ color: "red" }}>ناموجود</span>
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      {loading ? (
                        <LoadingSpinner />
                      ) : (
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            addToCartHandler(
                              product,
                              dispatch,
                              cartItems,
                              closeSnackbar,
                              enqueueSnackbar,
                              router,
                              setLoading
                            )
                          }
                          disabled={product.countInStock <= 0 ? true : false}
                        >
                          سفارش محصول
                        </Button>
                      )}
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
            <Comments product={product} />
          </>
        ) : (
          <div style={{ textAlign: "center", paddingTop: "200px" }}>
            <p>محصولی مورد نظر یافت نشد!!!</p>
            <NextLink href="/" passHref>
              <Link>برگشت به صفحه اصلی</Link>
            </NextLink>
          </div>
        )}
      </ProductWrapper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  let product = await Product.findOne({ slug }, "-comments").lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
