import Home from "../views/home";
import About from "../views/about";
import Character from "../views/character";
import Colorfull from "../views/colorfull";
import Contact from "../views/contact";
import Login from "../views/auth/signup";


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
    path: "/login",
    component: <Login />
  },
];

export default Webroutes;