import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Card, List, ListItem, Typography } from "@material-ui/core";

import db from "../../../backend/db";
import useStyles from "../../../styles/styles";
import User from "../../../backend/models/User";
import Layout from "../../../components/layouts/Layout";
import { updateUserHandler } from "../../../redux/actions/user";
import AdminLayout from "../../../components/layouts/AdminLayout";
import TemplateForm from "../../../components/common/form/TemplateForm";
import { formData, formSchema } from "../../../components/admin/user/formData";

const UserEdit = ({ user, userId }) => {
  const classes = useStyles();

  const { userInfo } = useSelector((state) => state.user);

  const router = useRouter();

  const dispatch = useDispatch();

  const { error, loadingUpdate } = useSelector((state) => state.user);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
  }, [router, userInfo]);

  return (
    <Layout title={`ویرایش کاربر ${userId}`}>
      <AdminLayout>
        <Card className={classes.section}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                ویرایش کاربر {userId}
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
                  updateUserHandler(
                    dispatch,
                    userId,
                    values,
                    closeSnackbar,
                    enqueueSnackbar,
                    router
                  )
                }
                defaultValues={JSON.parse(user)}
                loading={loadingUpdate}
                checked={{ isAdmin: JSON.parse(user).isAdmin }}
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
  const user = await User.findById(params.id);
  await db.disconnect();
  return {
    props: { user: JSON.stringify(user), userId: params.id },
  };
}

export default dynamic(() => Promise.resolve(UserEdit), { ssr: false });
