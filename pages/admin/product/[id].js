import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { Card, List, ListItem, Typography } from "@material-ui/core";

import db from "../../../backend/db";
import useStyles from "../../../styles/styles";
import Product from "../../../backend/models/Product";
import Layout from "../../../components/layouts/Layout";
import AdminLayout from "../../../components/layouts/AdminLayout";
import TemplateForm from "../../../components/common/form/TemplateForm";
import {
  formData,
  formSchema,
} from "../../../components/admin/product/formData";
import {
  updateProductHandler,
  uploadImageHandler,
} from "../../../redux/actions/product";

const ProductEdit = ({ product, productId }) => {
  const classes = useStyles();

  const { loadingUpdate, error } = useSelector((state) => state.product);

  const router = useRouter();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const [imageValue, setImageValue] = useState("");

  return (
    <Layout title={`ویرایش محصول ${productId}`}>
      <AdminLayout>
        <Card className={classes.section}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                ویرایش محصول ${productId}
              </Typography>
            </ListItem>
            <ListItem>
              {error && (
                <Typography className={classes.error}>{error}</Typography>
              )}
            </ListItem>
            <ListItem>
              <TemplateForm
                fields={formData().fields}
                submitButton={formData().submitButton}
                schema={formSchema}
                onSubmit={(values) =>
                  updateProductHandler(
                    values,
                    imageValue,
                    closeSnackbar,
                    enqueueSnackbar,
                    dispatch,
                    router,
                    productId
                  )
                }
                defaultValues={JSON.parse(product)}
                uploadHandler={(e) =>
                  uploadImageHandler(
                    e,
                    dispatch,
                    setImageValue,
                    enqueueSnackbar
                  )
                }
                loading={loadingUpdate}
              />
            </ListItem>
          </List>
        </Card>
      </AdminLayout>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  await db.connect();
  const product = await Product.findById(params.id);
  await db.disconnect();
  return {
    props: {
      product: JSON.stringify(product),
      productId: params.id,
    },
  };
}

export default dynamic(() => Promise.resolve(ProductEdit), { ssr: false });
