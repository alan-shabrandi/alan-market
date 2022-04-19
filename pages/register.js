import NextLink from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useSnackbar } from "notistack";
import { Link, ListItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/layouts/Layout";
import { registerHandler } from "../redux/actions/user";
import TemplateForm from "../components/common/form/TemplateForm";
import { RegisterWrapper } from "../styles/components/register/register";
import { registerData, registerSchema } from "../utils/data/forms/registerData";

const Register = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const { userInfo, loadingAuth } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Layout title="ثبت نام">
      <RegisterWrapper>
        <TemplateForm
          fields={registerData().fields}
          submitButton={registerData().submitButton}
          schema={registerSchema}
          loading={loadingAuth}
          onSubmit={(values) =>
            registerHandler(
              values,
              dispatch,
              redirect,
              closeSnackbar,
              enqueueSnackbar,
              router
            )
          }
        />
        <ListItem>
          حساب کاربری دارید؟ &nbsp;
          <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
            <Link>ورود به حساب کاربری</Link>
          </NextLink>
        </ListItem>
      </RegisterWrapper>
    </Layout>
  );
};

export default Register;
