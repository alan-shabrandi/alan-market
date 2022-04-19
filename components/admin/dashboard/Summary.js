import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import NextLink from "next/link";

const Summary = ({ summary }) => {
  return (
    <Grid container spacing={5}>
      <Grid item md={3}>
        <Card raised>
          <CardContent>
            <Typography variant="h2">
              {parseInt(summary.ordersPrice).toLocaleString()} تومان
            </Typography>
            <Typography>میزان فروش</Typography>
          </CardContent>
          <CardActions>
            <NextLink href="/admin/orders" passHref>
              <Button size="small" color="primary">
                مشاهده لیست فروش
              </Button>
            </NextLink>
          </CardActions>
        </Card>
      </Grid>
      <Grid item md={3}>
        <Card raised>
          <CardContent>
            <Typography variant="h2">{summary.ordersCount}</Typography>
            <Typography>سفارشات</Typography>
          </CardContent>
          <CardActions>
            <NextLink href="/admin/orders" passHref>
              <Button size="small" color="primary">
                مشاهده لیست سفارشات
              </Button>
            </NextLink>
          </CardActions>
        </Card>
      </Grid>
      <Grid item md={3}>
        <Card raised>
          <CardContent>
            <Typography variant="h2">{summary.productsCount}</Typography>
            <Typography>محصولات</Typography>
          </CardContent>
          <CardActions>
            <NextLink href="/admin/products" passHref>
              <Button size="small" color="primary">
                مشاهده لیست محصولات
              </Button>
            </NextLink>
          </CardActions>
        </Card>
      </Grid>
      <Grid item md={3}>
        <Card raised>
          <CardContent>
            <Typography variant="h2">{summary.usersCount}</Typography>
            <Typography>کاربران</Typography>
          </CardContent>
          <CardActions>
            <NextLink href="/admin/users" passHref>
              <Button size="small" color="primary">
                مشاهده لیست کاربران
              </Button>
            </NextLink>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Summary;
