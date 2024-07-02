import Home from "../views/home";
import About from "../views/about";
import Character from "../views/character";
import Colorfull from "../views/colorfull";
import Contact from "../views/contact";
import Login from "../views/auth/signup";
import ProductModal from "../views/modal/ProductModal";
import Order from "../views/order";
import MyOrders from "../views/myOrders";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";


const Webroutes = [
  {
    path: "/",
    component: <Home />
  },
  {
    path: "/about",
    component: <About />
  },
  {
    path: "/main-character",
    component: <Character />
  },
  {
    path: "/colorfull-club",
    component: <Colorfull />
  },
  {
    path: "/contact-us",
    component: <Contact />
  },
  {
    path: "/order",
    component: <Order />
  },
  {
    path: "/myorders",
    component: <MyOrders />
  },
  {
    path: "/checkout",
    component: <ProductModal />
  },
  {
    path: "/login",
    component: <Login />
  },
];

export default Webroutes;