import { Grid } from "@material-ui/core";
import Sidebar from "../admin/Sidebar";
import { useRouter } from "next/router";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname.split("/")[2];

  return (
    <Grid container spacing={4} style={{ marginTop: "1em" }}>
      <Grid item md={3} xs={12}>
        <Sidebar activeItem={pathname} />
      </Grid>
      <Grid item md={9} xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
