import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Card, List, ListItem, Typography } from "@material-ui/core";

import Layout from "../../components/layouts/Layout";
import { updateUserInfoHandler } from "../../redux/actions/user";
import ProfileLayout from "../../components/layouts/ProfileLayout";
import TemplateForm from "../../components/common/form/TemplateForm";
import {
  formData,
  formSchema,
} from "../../components/profile/personal-info/formData";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const { userInfo, loadingUpdate } = useSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    if (!userInfo) return router.push("/login");
  }, [router, userInfo]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Layout title="Profile">
      <ProfileLayout>
        <Card>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                اطلاعات حساب کاربری
              </Typography>
            </ListItem>
            <ListItem>
              <TemplateForm
                fields={formData().fields}
                submitButton={formData().submitButton}
                schema={formSchema}
                onSubmit={(values) =>
                  updateUserInfoHandler(
                    values,
                    dispatch,
                    closeSnackbar,
                    enqueueSnackbar
                  )
                }
                defaultValues={userInfo}
                loading={loadingUpdate}
              />
            </ListItem>
          </List>
        </Card>
      </ProfileLayout>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(PersonalInfo), { ssr: false });
