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

import { ToasterContainer } from "./app/components/Toaster";


import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AuthContext } from "./app/Context/AuthContext";
import { CartContext } from "./app/Context/CartContext";
import { CartCounter } from "./app/Context/CartCounter";


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
const initialOptions = {
  "client-id": "AREP4G_VceJonpjvYxcCFWeA8LM95EUrya0fRgRTaqzAlvfhSK4A7_4Evw31YmMcfslQA0UZ6VNJNSqD",
  currency: "USD",
  intent: "capture",
};

function App() {
  let token = localStorage.getItem("token")
  console.log(Adminroutes);
  const [tokenState, setTokenState] = useState(null)
  const [user, setUser] = useState("");
  const [cart, setCart] = useState("");
  const [count, setCount] = useState(0)

  const [cartVisible, setCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };
  useEffect(() => {
    token = localStorage.getItem("token")
    console.log(localStorage.getItem("token"), 'asasasas');
    if (window.location.pathname.includes("admin")){

      if (localStorage.getItem("token")) {
  
        setTokenState(localStorage.getItem("token"))
      }
      else {
        window.location.href='/login'
      }
    }
  }, [])
  useEffect(() => {
    token = localStorage.getItem("token")
    console.log(localStorage.getItem("token"), 'asasasas');
    if (window.location.pathname.includes("admin")){

      if (localStorage.getItem("token")) {
  
        setTokenState(localStorage.getItem("token"))
      }
      else {
        window.location.href='/login'
      }
    }
  }, [tokenState])
  // useEffect(() => {

  //   setTokenState(localStorage.getItem("token"))

  // }, [tokenState])

  return (
    <PayPalScriptProvider options={initialOptions}>
    <ThemeProvider theme={theme}>
    <AuthContext.Provider value={{ user, setUser }}>
    <CartContext.Provider value={{ cart, setCart, cartVisible, toggleCartVisibility }}>
    <CartCounter.Provider value={{ count, setCount }}>
      <ToasterContainer/>
      <BrowserRouter>
    
        <Routes>
          <Route path="/" element={<Layout />}>
            {Webroutes.map((item, i) => (
              <Route key={i} path={item.path} element={item.component} />
            ))}
          </Route>
          {<Route path="/admin" element={ <AdminLayout />}>
            {Adminroutes.map((item, i) => (
              <Route key={i} path={item.path} element={item.component} />
            ))}
          </Route>}
        </Routes>
      </BrowserRouter>
      </CartCounter.Provider>
      </CartContext.Provider>
      </AuthContext.Provider>
      
    </ThemeProvider>
    </PayPalScriptProvider>
  );
}

export default App;
