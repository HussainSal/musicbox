import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core";
import theme from "../theme";
import Layout from "../components/partials/Layout";
import { Appwrapper } from "../store/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <Appwrapper>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Appwrapper>
  );
}

export default MyApp;
