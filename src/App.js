import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./app/layout/web";
import AdminLayout from "./app/layout/admin";
import "@fontsource/poppins";
import Colors from "./app/styles/colors";
import Webroutes from "./app/routes/web.routes";
import Adminroutes from "./app/routes/admin.routes";
import Login from "./app/views/auth/signup";

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.darkblue,
    },
    text: {
      primary: Colors.white
    }
  },
  typography: {
    fontFamily: "Poppins",
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
  const token = localStorage.getItem("token")

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {Webroutes.map((item, i) => (
              <Route key={i} path={item.path} element={item.component} />
            ))}
          </Route>
          <Route path="/admin" element={token ? <AdminLayout /> : <Navigate to="/login" />}>
            {Adminroutes.map((item, i) => (
              <Route key={i} path={item.path} element={item.component} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
