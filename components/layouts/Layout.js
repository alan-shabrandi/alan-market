import Head from "next/head";

import PropTypes from "prop-types";
import useStyles from "../../styles/styles";

import { Container } from "@material-ui/core";
import Navbar from "../common/navbar/Navbar";

const Layout = ({ title, description, children }) => {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - فروشگاه آلان مارکت` : "فروشگاه آلان مارکت"}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <Navbar />
      <Container className={classes.main}>{children}</Container>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.object,
};

export default Layout;
