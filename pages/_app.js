import { CalculatorContextProvider } from "../packages/features/calculatorContext.tsx";
import { ChakraProvider, Box } from "@chakra-ui/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      {/* @ts-ignore */}
      <CalculatorContextProvider>
        <Box padding='0.5rem'>
          <Component {...pageProps} />
        </Box>
      </CalculatorContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
