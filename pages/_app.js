import GlobalStyles from "../src/styles/GlobalStyles";
// import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
