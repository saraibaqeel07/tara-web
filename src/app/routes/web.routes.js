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
import Shop from "../views/shop";
import Watch from "../views/watch";
import EventShow from "../views/event";
import FAQ from "../views/Faq";
import Cart from "../views/cart";
import Blog from "../views/blog";
import BlogDescription from "../views/blogDescription";



const Webroutes = [
  {
    path: "/",
    component: <About />
  },
  {
    path: "/products",
    component: <Shop />
  },
  {
    path: "/watch",
    component: <Watch />
  },
  {
    path: "/event-show",
    component: <EventShow />
  },
  {
    path: "/home",
    component: <Home />
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
    path: "/faq",
    component: <FAQ />
  },
  {
    path: "/cart",
    component: <Cart />
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
  {
    path: "/blog",
    component: <Blog />
  },
  {
    path: "/blog-detail",
    component: <BlogDescription />
  },
];

export default Webroutes;