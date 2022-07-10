import { CalculatorContextProvider } from "../packages/features/calculatorContext.tsx";
import { ChakraProvider, Box } from "@chakra-ui/react";

import "../styles/globals.css";
import NavBar from "../packages/components/NavBar.js";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      {/* @ts-ignore */}
      <CalculatorContextProvider>
        <Box>
          <NavBar />
        </Box>
        <Box
          padding='0.5rem'
          minH='100vh'
          bgImg="url('/img/background_texture.png')"
        >
          <Component {...pageProps} />
        </Box>
      </CalculatorContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
