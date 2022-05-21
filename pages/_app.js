import { CalculatorContextProvider } from "../packages/features/calculatorContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    // @ts-ignore
    <CalculatorContextProvider>
      <Component {...pageProps} />
    </CalculatorContextProvider>
  );
}

export default MyApp;
