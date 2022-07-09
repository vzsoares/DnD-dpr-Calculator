import { CalculatorContextProvider } from "../packages/features/calculatorContext.tsx";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      {/* @ts-ignore */}
      <CalculatorContextProvider>
        <Component {...pageProps} />
      </CalculatorContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
