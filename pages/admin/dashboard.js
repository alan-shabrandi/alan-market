import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CircularProgress,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";

import useStyles from "../../styles/styles";
import Layout from "../../components/layouts/Layout";
import AdminLayout from "../../components/layouts/AdminLayout";
import Summary from "../../components/admin/dashboard/Summary";
import ChartData from "../../components/admin/dashboard/ChartData";
import { fetchSummary } from "../../redux/actions/product";

const AdminDashboard = () => {
  const classes = useStyles();

  const { userInfo } = useSelector((state) => state.user);

  const router = useRouter();

  const dispatch = useDispatch();

  const { loading, error, summary } = useSelector((state) => state.product);

  useEffect(() => {
    if (!userInfo) return router.push("/login");

    fetchSummary(dispatch, userInfo.token);
  }, [router, userInfo, dispatch]);

  return (
    <Layout title="پنل مدیریت">
      <AdminLayout>
        <Card className={classes.section}>
          <List>
            <ListItem>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography className={classes.error}>{error}</Typography>
              ) : (
                <Summary summary={summary} />
              )}
            </ListItem>
            <ChartData summary={summary} />
          </List>
        </Card>
      </AdminLayout>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
