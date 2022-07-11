import { CalculatorContextProvider } from "../packages/features/calculatorContext.tsx";
import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";

import "../styles/globals.css";
import NavBar from "../packages/components/NavBar.js";
import { useEffect, useRef, useState } from "react";
import { Global } from "@emotion/react";

function MyApp({ Component, pageProps }) {
  const colors = { darkRed: "#58180D" };

  const Fonts = () => (
    <Global
      styles={`
        /* latin */
        @font-face {
          font-family: 'TexgyrebonumBold';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url('./fonts/TexgyrebonumBold-1oE4.otf') format('woff2'), url('./fonts/TexgyrebonumBold-1oE4.otf') format('woff');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin */
        @font-face {
          font-family: 'Bookinsanity';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('./fonts/Bookinsanity.otf') format('otf'), url('./fonts/Bookinsanity.otf') format('otf');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        `}
    />
  );

  const theme = extendTheme({
    fonts: {
      heading: `'TexgyrebonumBold'`,
      body: `'Bookinsanity'`,
    },
    components: {
      Heading: {
        baseStyle: { color: colors.darkRed },
      },
    },
  });

  const navbar = useRef();
  const [navbarHeight, setNavbarHeight] = useState(58);
  useEffect(() => {
    setNavbarHeight(navbar.current.clientHeight);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {/* @ts-ignore */}
      <CalculatorContextProvider>
        <Fonts />
        <Box minH='100vh'>
          <Box ref={navbar}>
            <NavBar />
          </Box>
          <Box
            padding='0.5rem'
            minH={`calc(100vh - ${navbarHeight + 1}px)`}
            bgImg="url('/img/178168542-844e5ddd-6182-45c1-aa31-96de2f072e40.png')"
          >
            <Component {...pageProps} />
          </Box>
        </Box>
      </CalculatorContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
