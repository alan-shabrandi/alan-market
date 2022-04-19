import {
  CssBaseline,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import "../styles/globals.css";
import { create } from "jss";
import rtl from "jss-rtl";
import { Provider } from "react-redux";
import store from "../redux/store";
import { theme } from "../styles/theme/theme";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  return (
    <StylesProvider jss={jss}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            style={{ fontFamily: "iranyekan" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </StylesProvider>
  );
}

export default MyApp;
