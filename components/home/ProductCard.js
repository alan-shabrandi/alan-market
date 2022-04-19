import NextLink from "next/link";
import { useRouter } from "next/router";

import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import Rating from "@material-ui/lab/Rating";
import ScaleLoader from "react-spinners/ScaleLoader";
import { AddShoppingCart, BookmarkBorder } from "@material-ui/icons";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";

import { addToCartHandler } from "../../redux/actions/order";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.order);

  return (
    <Card>
      <NextLink href={`/product/${product.id}/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <Typography>{product.name}</Typography>
            <Rating value={product.rating} readOnly />
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography className="home-product__price">
          {parseInt(product.price).toLocaleString()}تومان
        </Typography>
      </CardActions>
      <div className="product-actions">
        <Tooltip title="اضافه کردن به سبد خرید" placement="left" arrow>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={() =>
              addToCartHandler(
                product,
                dispatch,
                cart.cartItems,
                closeSnackbar,
                enqueueSnackbar,
                router,
                setLoading
              )
            }
          >
            <AddShoppingCart />
          </IconButton>
        </Tooltip>
        <Tooltip title="اضافه کردن به لیست علاقمندی ها" placement="left" arrow>
          <IconButton color="primary" aria-label="add to favorite">
            <BookmarkBorder />
          </IconButton>
        </Tooltip>
      </div>
      {loading && (
        <div className="loading-spinner">
          <ScaleLoader color="#fff" />
        </div>
      )}
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
