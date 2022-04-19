import { Link, ListItem } from "@material-ui/core";
import Layout from "../components/layouts/Layout";
import NextLink from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { LoginWrapper } from "../styles/components/login/login";
import TemplateForm from "../components/common/form/TemplateForm";
import { loginData, loginSchema } from "../utils/data/forms/loginData";
import { loginHandler } from "../redux/actions/user";
const Login = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const dispatch = useDispatch();

  const { userInfo, loadingAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);

  return (
    <Layout title="ورود">
      <LoginWrapper>
        <TemplateForm
          fields={loginData().fields}
          submitButton={loginData().submitButton}
          schema={loginSchema}
          loading={loadingAuth}
          onSubmit={(values) =>
            loginHandler(
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
          حساب کاربری ندارید؟ &nbsp;
          <NextLink href={`/register?redirect=${redirect || "/"}`} passHref>
            <Link>ثبت نام در سایت</Link>
          </NextLink>
        </ListItem>
      </LoginWrapper>
    </Layout>
  );
};

export default Login;
