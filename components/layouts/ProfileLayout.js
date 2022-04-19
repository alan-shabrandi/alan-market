import { useRouter } from "next/router";

import { Grid } from "@material-ui/core";

import Sidebar from "../profile/Sidebar";
import { ProfileWrapper } from "../../styles/components/profile/Profile";

const ProfileLayout = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname.split("/")[2];

  return (
    <ProfileWrapper>
      <Grid container spacing={4} style={{ marginTop: "1em" }}>
        <Grid item md={3} xs={12}>
          <Sidebar activeItem={pathname} />
        </Grid>
        <Grid item md={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </ProfileWrapper>
  );
};

export default ProfileLayout;
