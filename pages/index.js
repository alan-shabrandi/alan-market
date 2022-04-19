import { Grid } from "@material-ui/core";
import Layout from "../components/layouts/Layout";
import db from "../backend/db";
import Product from "../backend/models/Product";
import { HomeStyles } from "../styles/components/home";
import ProductCard from "../components/home/ProductCard";

export default function Home(props) {
  const { products } = props;
  return (
    <Layout>
      <HomeStyles>
        <h1>محصولات</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={3} key={product.name}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </HomeStyles>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}, "-comments").lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
