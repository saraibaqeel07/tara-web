const navigation = [
  {
    path: "/",
    name: "Home"
  },
  {
    path: "/shop",
    name: "Shop"
  },
  {
    path: "/watch",
    name: "Watch"
  },
  {
    path: "/about",
    name: "About"
  },
  {
    path: "/main-character",
    name: "Main Character"
  },
  {
    path: "/contact-us",
    name: "Contact us"
  },
  {
    path: "/event-show",
    name: "Event Show"
  },
  
  {
    path: "/colorfull-club",
    name: "Colorful Club"
  },
 
  
]
export const navigationNested = [
  {
    path: "/",
    name: "Home"
  },
  {
    path: "/shop",
    name: "Shop"
  },
  {
    path: "/watch",
    name: "Watch"
  },
 
  {
    path: "/event-show",
    name: "Event Show"
  },
  {
    path: "/main-character",
    name: "Main Character"
  },
  
  

  {
    path: "",
    name: "More",
    children:[ 
    {
      path: "/contact-us",
      name: "Contact us"
    },
    {
      path: "/about",
      name: "About"
    },
   
    {
      path: "/colorfull-club",
      name: "Colorful Club"
    },{
      path: "/faq",
      name: "FAQ"
    },]
  },
  
]

export default navigation;