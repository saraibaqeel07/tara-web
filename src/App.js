import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/layout";
import "@fontsource/poppins";
import Colors from "./app/styles/colors";
import Webroutes from "./app/routes/web.routes";

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    // secondary: {
    //   main: Colors.secondary,
    // },
    text: {
      primary: Colors.black
    }
  },
  typography: {
    h1: {
      fontSize: "72px",
    },

    h2: {
      fontSize: "64px",
    },
    h3: {
      fontSize: "48px"
    },
    h4: {
      fontSize: "36px"
    },
    h5: {
      fontSize: "24px"
    },
    h6: {
      fontSize: "20px"
    },
    body1: {
      fontSize: "16px"
    },
    body2: {
      fontSize: "14px"
    },
    caption: {
      fontSize: "12px"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {Webroutes.map((item, i) => (
              <Route path={item.path} element={item.component} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
