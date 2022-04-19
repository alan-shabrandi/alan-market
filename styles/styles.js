import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    width: "100%",
    maxWidth: 800,
    margin: "0 auto",
  },
  navbarButton: {
    color: "#fff",
    textTransform: "initial",
  },
  transparentBackground: {
    backgroundColor: "transparent",
  },
  error: {
    color: "#f04040",
  },
  reviewForm: {
    maxWidth: 800,
    width: "100%",
  },
  reviewItems: {
    marginLeft: "1rem",
    borderLeft: "1px #808080 solid",
    paddingLeft: "1rem",
  },
  selected: {
    backgroundColor: "transparent !important",
    borderLeft: "3px solid #0059B2",
    color: "#0059B2",
  },
  menu: {
    // "& div": {
    //   width: "300px",
    // },
  },
});
export default useStyles;
