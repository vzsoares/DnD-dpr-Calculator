import { CalculatorContextProvider } from "../packages/features/calculatorContext.tsx";
import { ChakraProvider, Box } from "@chakra-ui/react";

import "../styles/globals.css";
import NavBar from "../packages/components/NavBar.js";
import { useEffect, useRef, useState } from "react";

function MyApp({ Component, pageProps }) {
  const navbar = useRef();
  const [navbarHeight, setNavbarHeight] = useState(58);
  useEffect(() => {
    setNavbarHeight(navbar.current.clientHeight);
  }, []);
  return (
    <ChakraProvider>
      {/* @ts-ignore */}
      <CalculatorContextProvider>
        <Box minH='100vh'>
          <Box ref={navbar}>
            <NavBar />
          </Box>
          <Box
            padding='0.5rem'
            minH={`calc(100vh - ${navbarHeight + 1}px)`}
            bgImg="url('/img/background_texture.png')"
          >
            <Component {...pageProps} />
          </Box>
        </Box>
      </CalculatorContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
