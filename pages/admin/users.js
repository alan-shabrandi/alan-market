import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, Delete, Edit, HighlightOff } from "@material-ui/icons";
import {
  Card,
  CircularProgress,
  IconButton,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";

import useStyles from "../../styles/styles";
import Layout from "../../components/layouts/Layout";
import AdminLayout from "../../components/layouts/AdminLayout";
import { deleteUserHandler, fetchUsers } from "../../redux/actions/user";

const Users = () => {
  const classes = useStyles();

  const { userInfo } = useSelector((state) => state.user);

  const { loading, users, error, loadingDelete } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!userInfo) return router.push("/login");

    fetchUsers(dispatch, userInfo.token);
  }, [router, userInfo, dispatch]);

  return (
    <Layout title="لیست کاربران">
      <AdminLayout>
        <Card className={classes.section}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                کاربران
              </Typography>
            </ListItem>
            <ListItem>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography className={classes.error}>{error}</Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>شناسه</TableCell>
                        <TableCell>نام</TableCell>
                        <TableCell>ایمیل</TableCell>
                        <TableCell>مدیر</TableCell>
                        <TableCell>جزئیات</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>{user._id.substring(20, 24)}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {user.isAdmin ? (
                              <Tooltip title="مدیر است">
                                <CheckCircle style={{ color: "green" }} />
                              </Tooltip>
                            ) : (
                              <Tooltip title="مدیر نیست">
                                <HighlightOff style={{ color: "red" }} />
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell style={{ display: "flex" }}>
                            <NextLink href={`/admin/user/${user._id}`} passHref>
                              <Link>
                                <Tooltip title="ویرایش" arrow>
                                  <IconButton
                                    aria-label="edit"
                                    style={{ color: "green" }}
                                  >
                                    <Edit />
                                  </IconButton>
                                </Tooltip>
                              </Link>
                            </NextLink>
                            <Tooltip title="حذف" arrow>
                              <IconButton
                                aria-label="delete"
                                style={{ color: "red" }}
                                disabled={loadingDelete ? true : false}
                                onClick={() => {
                                  deleteUserHandler(
                                    dispatch,
                                    user._id,
                                    userInfo.token,
                                    enqueueSnackbar,
                                    fetchUsers
                                  );
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </ListItem>
          </List>
        </Card>
      </AdminLayout>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Users), { ssr: false });
