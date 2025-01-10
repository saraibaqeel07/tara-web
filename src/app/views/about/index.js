import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Typography,
  ButtonGroup,
  TextField,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  useMediaQuery 
} from "@mui/material";
import Carousel from 'react-material-ui-carousel';

import {
  FacebookRounded,
  InstagramRounded,
  TiktokRounded,
  YoutubeRounded,
} from "../../assets/images";
import Images from "../../assets/images";
import Colors from "../../styles/colors";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "../../../App.css";
import Fonts from "../../styles/fonts";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import ProductModal from "../modal/ProductModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar, Divider } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Directions, Star } from "@mui/icons-material";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { CartContext } from "../../Context/CartContext";
import { CartCounter } from "../../Context/CartCounter";
import navigation from "../../../Navigation";
import introImage from "../../assets/images/intro-pic.png";
import taraImage from "../../assets/images/tara-pic.png";
import starImg from "../../assets/images/star.png";
import rainbowImg from "../../assets/images/rainbow.png";
import haveforyou from "../../assets/images/haveforyou.png";
import shopFrame from "../../assets/images/Shop-Frame.png";
import Aos from "aos";
import "aos/dist/aos.css";

// import "slick-carousel/slick/slick-theme.css";

function About() {
  const isSmallScreen = useMediaQuery('(max-width:900px)');

  const [highLighted, setHighlighted] = useState("I");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlighted((prev) => {
        if (prev === "I") return "am";
        if (prev === "am") return "shine";
        return "I";
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { state } = useLocation();
  Aos.init();

  const { cartVisible, toggleCartVisibility } = useContext(CartContext);
  const { setCount } = useContext(CartCounter);

  console.log(cartVisible, "cartVisible");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlideInterval, setAutoSlideInterval] = useState(null);
  const CarouselItems = [
    { title: 'Review 1', text: 'Lorem ipsum dolor sit amet.', img: Images.aboutImg1 },
    { title: 'Review 2', text: 'Consectetur adipiscing elit.', img: Images.Character1 },
    { title: 'Review 3', text: 'Sed do eiusmod tempor incididunt.' },
  ];


  const sliderImages1 = [
    Images.sliderCharacter1,
    Images.sliderCharacter2,
    Images.sliderCharacter3,
    Images.sliderCharacter4,
    Images.sliderCharacter5,
    Images.sliderCharacter6,
    Images.sliderCharacter7,
  ];

  const sliderImages2 = [
    Images.sliderCharacter8,
    Images.sliderCharacter9,
    Images.sliderCharacter10,
    Images.sliderCharacter11,
    Images.sliderCharacter12,
    Images.sliderCharacter13,
    Images.sliderCharacter14,
  ];

  useEffect(() => {
    // Clear the previous interval if it exists
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }

    // Set up a new interval for auto-sliding
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % CarouselItems.length); // Loop back to the first slide after the last one
    }, 3000); // Interval duration in milliseconds (3000ms = 3 seconds)

    setAutoSlideInterval(interval);

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, [CarouselItems.length]); // Depend on the length of CarouselItems to reset the interval

  const firebaseConfig = {
    apiKey: "AIzaSyCn_Ph5AlAi_wuxR0D7CBIY8_vBCNgD5r8",
    authDomain: "shinetara-86ec0.firebaseapp.com",
    projectId: "shinetara-86ec0",
    storageBucket: "shinetara-86ec0.appspot.com",
    messagingSenderId: "182521981077",
    appId: "1:182521981077:web:3cadc9d70d7fc25fab939c",
    measurementId: "G-BHYZDHJCK9",
  };
  let productId = "";
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [selected, setSelected] = useState("episode");
  const [products, setProducts] = useState([]);
  const [textColor, setTextColor] = useState(Colors.orange);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardProduct, setCardProduct] = useState({});
  const [coloringSheets, setColoringSheets] = useState([]);
  const [activitySheets, setActivitySheets] = useState([]);
  const [extraSheets, setExtraSheets] = useState([]);

  const [open, setOpen] = useState(false);
  const [cartArray, setCartArray] = useState([]);
  const [cartItems, setCartItems] = useState(products);
  const [faqData, setFaqData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [reviewBoxes, setReviewBoxes] = useState([]);
  const [activeCard, setActiveCard] = useState(0); // Start with the first card
  const swiperRef = useRef(null);

  const updateActiveCard = () => {
    if (swiperRef.current?.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      setActiveCard(swiperInstance.realIndex); // Update active card index based on Swiper's real index
    }
  };
  const handleIncrement = (id) => {
    const updatedData = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    const totalPrice = updatedData.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);
    setTotalAmount(totalPrice);
    setCartItems(updatedData);
    setCount(updatedData?.length);
    localStorage.setItem("cartData", JSON.stringify(updatedData));
  };

  const handleDecrement = (id) => {
    const updatedData = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 1 }
        : item
    );
    const totalPrice = updatedData.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);
    setTotalAmount(totalPrice);
    setCartItems(updatedData);
    setCount(updatedData?.length);
    localStorage.setItem("cartData", JSON.stringify(updatedData));
  };

  const toggleDrawer = (isOpen) => (event) => {
    console.log("dasdasas");
    setOpen(!open);
    toggleCartVisibility();
  };
  const getFaqs = async () => {
    const q = query(collection(db, "Faq"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFaqData(dataArray);
  };
  const getReviews = async () => {
    const q = query(collection(db, "reviews"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(dataArray);
    setReviewBoxes(dataArray);
  };
  const showModal = (item) => {
    setIsModalOpen(true);
    console.log(item);
    setCardProduct(item);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const buttons = [
    <Button
      key="episode"
      variant={selected == "episode" ? "contained" : "outlined"}
      sx={{
        // width: { md: "180px", sm: "150px", xs: "100%" },
        width: "100%",
        px: 4,
        py: 1.5,
      }}
      onClick={() => setSelected("episode")}
    >
      Episodes
    </Button>,
    <Button
      variant={selected == "merchandise" ? "contained" : "outlined"}
      key="merchandise"
      sx={{
        // width: { md: "180px", sm: "150px", xs: "100%" },
        width: "100%",
        px: 4,
        py: 1.5,
      }}
      onClick={() => setSelected("merchandise")}
    >
      Merchandise
    </Button>,
  ];

  const sliderData = [
    {
      image: Images.sliderImage1,
      title: "Jungle Adventure",
      url: "https://www.youtube.com/watch?v=JjEc2iIPaYE",
    },
    {
      image: Images.sliderImage2,
      title: "Bugs Adventure",
      url: "https://www.youtube.com/watch?v=vbu-5oSw_zU",
    },
    {
      image: Images.sliderImage3,
      title: "Space Adventure",
      url: "https://www.youtube.com/watch?v=SCyHeBrBgbI",
    },
    {
      image: Images.sliderImage4,
      title: "Heart Warming Sibling Race",
      url: "https://www.youtube.com/watch?v=sG8hhCjMOXo",
    },
    {
      image: Images.sliderImage5,
      title: "Story Of Miraj",
      url: "https://www.youtube.com/watch?v=6a_qlXUkI-Q",
    },
  ];

  const routingData = [
    {
      name: "Tara",
      detail:
        "Tara is 9 years old. She is a shy Muslim girl. Her imaginary best friend is Shine. She is very kind, helpful, and loving. Her special skill is drawing. She gets nervous around a lot of people, but Shine overcomes her weakness.",
      image: Images.Shop,
      logo: Images.logoTara,
      path: "/products",
    },
    {
      name: "Shine",
      detail:
        "Tara's best imaginary friend is named Shine. She always lends a hand to Tara. She has a lot of energy. She has a bold personality and inspires confidence",
      image: Images.watch,
      logo: Images.logoShine,
      path: "/watch",
    },
    {
      name: "Ahmed",
      detail:
        "Ahmed is Tara’s younger brother; he is 8 years old. Ahmed is very kind and helpful boy. He loves to play video games.",
      image: Images.portfolio,
      logo: Images.logoAhmed,

    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.character,
      logo: Images.logoLaila,
      path: "/main-character",
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.faq,
      logo: Images.logoLaila,
      path: "/faq",
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.ContactUs,
      logo: Images.logoLaila,
      path: "/contact-us",
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.EventShow,
      logo: Images.logoLaila,
      path: "/event-show",
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.blog,
      logo: Images.logoLaila,
      path: "/blog",
    },
  ];

  const cardData = [
    {
      image: Images.cardImg1,
      title: "Dua Book",
      price: "$13",
    },
    {
      image: Images.cardImg2,
      title: "Calender",
      price: "$15",
    },
    {
      image: Images.cardImg3,
      title: "Bookmarks",
      price: "$9",
    },
    {
      image: Images.cardImg4,
      title: "Worksheet",
      price: "$30",
    },
    {
      image: Images.cardImg5,
      title: "Puzzle",
      price: "$1/card",
    },
    {
      image: Images.cardImg6,
      title: "Good Deeds",
      price: "$13",
    },
  ];

  const getProducts = async () => {
    const q = query(collection(db, "products"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const sortedData = dataArray.sort((a, b) => {
      return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
    });
    console.log("books", sortedData);
    // Update state with sorted data
    setProducts(sortedData);
  };

  const getActivitySheets = async () => {
    const q = query(collection(db, "activitysheets"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const sortedData = dataArray.sort((a, b) => {
      return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
    });

    setActivitySheets(sortedData);
  };

  const getColoringSheets = async () => {
    const q = query(collection(db, "coloringsheets"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const sortedData = dataArray.sort((a, b) => {
      return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
    });

    // Update state with sorted data
    setColoringSheets(sortedData);
  };

  const getExtrasheets = async () => {
    const q = query(collection(db, "extra"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const sortedData = dataArray.sort((a, b) => {
      return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
    });

    setExtraSheets(sortedData);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a random color

      let element = document.getElementById("follow-text");
      let element2 = document.getElementById("learn-text");
      let element3 = document.getElementById("explore-text");
      if (element) {
        if (element.style.color == "rgb(254, 157, 4)") {
          element.style.color = "white";
          element2.style.color = Colors.darkblue;
          element3.style.color = "white";
        } else if (element3.style.color == "white") {
          element.style.color = "white";
          element2.style.color = "white";
          element3.style.color = Colors.pink;
        } else {
          element.style.color = "rgb(254, 157, 4)";
          element2.style.color = "white";
          element3.style.color = "white";
        }
      }
    }, 1000); // Change color every 1000ms (1 second)

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getProducts();
    getColoringSheets();
    getActivitySheets();
    getExtrasheets();
    getReviews();
    getFaqs();

    if (state?.colorful) {
      setSelected("merchandise");

      // Delay execution by 2 seconds
      setTimeout(() => {
        let element = document.getElementById(state?.section);
        console.log(element, "element");
        if (element) {
          console.log(element, "eeee");
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 2000);
    }

    let cart = localStorage.getItem("cartData");
    if (cart) {
      cart = JSON.parse(cart);
      if (cart?.length > 0) {
        setCartItems(cart);
        setCount(cart.length);
      }
    }
  }, []);
  useEffect(() => {
    Aos.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing option
      once: false, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  useEffect(() => {
    setOpen(cartVisible);
  }, [cartVisible]);

  return (
    <>
      {" "}
      <div>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 400, padding: 2 }} role="presentation">
            {console.log(cartItems)}
            <Box display="flex" flexWrap="wrap">
              {cartItems?.length > 0 ? (
                cartItems?.map((product, index) => (
                  <React.Fragment key={index}>
                    <Box
                      onClick={() => {
                        const updatedData = cartItems.filter(
                          (item) => product.id != item.id
                        );
                        const totalPrice = updatedData.reduce((total, item) => {
                          return total + parseFloat(item.price) * item.quantity;
                        }, 0);
                        setTotalAmount(totalPrice);
                        setCartItems(updatedData);
                        setCount(updatedData?.length);
                        localStorage.setItem(
                          "cartData",
                          JSON.stringify(updatedData)
                        );
                      }}
                      sx={{ color: "black", cursor: "pointer" }}
                    >
                      <CloseIcon />
                    </Box>
                    <Box
                      sx={{
                        height: 100,
                        display: "flex",
                        padding: 2,
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={product.imgUrl}
                        alt={product.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "black",
                          width: "100px",
                        }}
                        variant="h6"
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "12px", color: "black" }}
                        variant="body1"
                      >
                        ${product.price}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "black",
                          width: "50px",
                          fontWeight: "bold",
                        }}
                        variant="body1"
                      >
                        $
                        {product.quantity
                          ? product.quantity * product.price
                          : 1 * product.price}
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width: "10px" }}
                        marginTop={1}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDecrement(product.id)}
                        >
                          -
                        </Button>
                        <Typography
                          sx={{ fontSize: "12px", color: "black" }}
                          variant="body1"
                          marginX={2}
                        >
                          {product.quantity ? product.quantity : 1}
                        </Typography>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleIncrement(product.id)}
                        >
                          +
                        </Button>
                      </Box>
                    </Box>
                    <Divider />
                  </React.Fragment>
                ))
              ) : (
                <Box
                  sx={{ color: "black", fontWeight: "bold", margin: "0 auto" }}
                >
                  No Items in Cart
                </Box>
              )}
            </Box>
            <Box
              sx={{
                color: "black",
                fontSize: "27px",
                textAlign: "center",
                fontFamily: Fonts.righteous,
              }}
            >
              Sub Total : $ {totalAmount}
            </Box>
          </Box>
          <Button
            sx={{ width: "90%", textAlign: "center", margin: "0 auto" }}
            variant="contained"
            color="secondary"
            onClick={() => navigate(`/order`, { state: cartItems })}
          >
            CheckOut
          </Button>
        </Drawer>
      </div>
      <Box
        component={"main"}
        sx={{
          width: "100%",
        }}
      >



        <Box
          component={"section"}
          sx={{
            background: Colors.primaryGradient,
            width: "100%",
            marginTop: "20px",
            height: { xs: "400px", md: "0", sm: "700px", xl: "600px", lg: "500px" },
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${Images.bannerBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              width: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box className="section-content" sx={{
              // width: { xl: '60%', lg: '90%', md: '100%', sm: '100%', xs: '100%' }, margin: '0 auto',
              height: { xl: "600px", md: '550px', sm: '700px', xs: '400px', lg: "500px" },
            }}>
              <div className="slider">
                <Carousel

                  indicators={false}
                  controls={false}
                  interval={3000}
                  activeStep={currentSlide}
                  sx={{
                    '& .MuiIconButton-root': { display: 'none' },
                  }}
                >


                  <Grid
                    container
                    sx={{
                      height: "100%",
                      margin: "0 auto",
                      px: 0,
                      "@media (min-width: 2550px)": {
                        width: "80%",
                      },
                      flexDirection: { sm: 'column', xs: 'column', md: 'row' }, // Stack items in column on small screens
                    }}
                  >
                    {/* First Row (Text Content) */}
                    <Grid
                      item
                      xl={7}
                      md={6}
                      sm={12}
                      xs={12}
                      order={{ sm: 1, xs: 1, md: 0 }} // Ensures text is first on small screens
                      sx={{
                        display: { md: "block", sm: "none", xs: "none" },


                      }}
                    >

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: { md: "14px" },
                          pt: { md: "300px", lg: "220px", sm: "240px", xs: "200px", xl: "280px" },
                          px: { md: "48px", sm: "12px", xs: "12px" },
                          position: "relative",
                          width: { xl: '60%', lg: '90%', md: '100%', sm: '100%', xs: '100%' },
                          margin: '0 auto',
                        }}
                      >
                        <Typography
                          variant="h1"
                          className="heading-font"
                          sx={{
                            fontFamily: Fonts.righteous,
                            fontSize: { lg: "100px", md: "80px", sm: "70px", xs: "60px" },
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          <span
                            className="heading-font"
                            style={{
                              color: highLighted === "I" ? "#F9BF29" : "white",
                              WebkitTextStroke: highLighted === "I" ? "1px #f9bf29" : "1px #f9bf29",
                              WebkitTextFillColor: highLighted === "I" ? "#f49604" : "white",
                            }}
                          >
                            I
                          </span>{" "}
                          <span
                            className="heading-font"
                            style={{
                              color: highLighted === "am" ? "#ca6680" : "white",
                              WebkitTextStroke: highLighted === "am" ? "1px #ca6680" : "1px #f9bf29",
                              WebkitTextFillColor: highLighted === "am" ? "#ca6680" : "white",
                            }}
                          >
                            AM
                          </span>{" "}
                          <span
                            className="heading-font"
                            style={{
                              color: highLighted === "shine" ? "#5b73ad" : "white",
                              WebkitTextStroke: highLighted === "shine" ? "1px #5b73ad" : "1px #f9bf29",
                              WebkitTextFillColor: highLighted === "shine" ? "#5b73ad" : "white",
                            }}
                          >
                            Shine
                          </span>
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Second Row (Image) */}
                    <Grid
                      item
                      xl={5}
                      md={6}
                      sm={12}
                      xs={12}
                      order={{ sm: 2, xs: 2, md: 1 }} // Ensures image is second on small screens
                      sx={{
                        display: 'flex',
                        justifyItems: 'center',
                        alignItems: "center",
                        paddingTop: { sm: 2, xs: 2, md: 0 }, // Adjust padding for small screens
                      }}
                    >
                      <Box
                        sx={(theme) => ({
                          width: { md: "600px", lg: "800px", sm: "100%", xs: "100%" },
                          height: { md: "auto", sm: "700px", xs: "350px" },
                          backgroundImage: `url(${Images.aboutImg1})`,
                          backgroundSize: { md: "cover", xl: "contain", lg: "contain", xs: "contain", sm: "contain" },
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center bottom",
                          py: { md: "300px", lg: "270px", sm: "0", xl: "320px" },
                          px: { md: 2, xs: 0, sm: 0 },
                          display: "block",
                          // [theme.breakpoints.between(1536, 1700)]: {
                          //   py: "320px !important",
                          // },
                        })}
                      />

                    </Grid>
                  </Grid>



                  <Grid container sx={{
                    flexDirection: { sm: "column", xs: "column", md: "row" },
                    height: "100%",
                    width: { xl: '60%', lg: '90%', md: '100%', sm: '100%', xs: '100%' }, margin: '0 auto',
                    "@media (min-width: 1787px) and (max-width:2400px)": {

                      width: "80% !important",
                    },
                    "@media (min-width: 1536px) and (max-width:1787px)": {

                      width: "100% !important",
                    }

                  }}>
                    <Grid item md={6} sm={12} xs={12} sx={{
                      display: { md: "block", sm: "none", xs: "none" },

                    }}>
                      <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: { sm: "24px", xs: "12px" },
                        pt: { md: "90px", sm: "120px", xs: "97px", xl: "140px" },
                        px: { md: "48px", sm: "12px", xs: "12px" },
                        position: "relative",
                        width: { xl: '50%', lg: '90%', md: '100%', sm: '80%', xs: '90%' },
                        margin: '0 auto',
                      }}>
                        <Typography variant="h1" className="heading-font" sx={{
                          fontFamily: Fonts.righteous,
                          fontSize: { lg: "90px", md: "100px", sm: "70px", xs: "60px" },
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          <span
                            className="heading-font"
                            style={{
                              color: highLighted === "I" ? "#F9BF29" : "white",
                              WebkitTextStroke: highLighted === "I" ? "1px #f9bf29" : "1px #f9bf29",
                              WebkitTextFillColor: highLighted === "I" ? "#f49604" : "white",
                            }}
                          >
                            I
                          </span>{" "}
                          <span
                            className="heading-font"
                            style={{
                              color: highLighted === "am" ? "#ca6680" : "white",
                              WebkitTextStroke: highLighted === "am" ? "1px #ca6680" : "1px #f9bf29 ",
                              WebkitTextFillColor: highLighted === "am" ? "#ca6680" : "white",
                            }}
                          >
                            AM
                          </span>{" "}
                          <span
                            className="heading-font"
                            style={{
                              color: highLighted === "shine" ? "#5b73ad" : "white",
                              WebkitTextStroke: highLighted === "shine" ? "1px #5b73ad" : "1px #f9bf29",
                              WebkitTextFillColor: highLighted === "shine" ? "#5b73ad" : "white",
                            }}
                          >
                            Tara
                          </span>
                        </Typography>
                        <Typography variant="h3" className="para-text" sx={{ fontSize: { md: "38px", sm: "28px", xs: "20px", color: "#fff" } }}>
                          Click To See Latest Adventures!
                        </Typography>
                        <Button variant="contained" className="para-text" sx={{
                          py: 1.2,
                          px: 2,
                          backgroundColor: "#f49604",
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          fontSize: "18px",
                          alignSelf: "flex-start",
                        }} href="https://www.youtube.com/@Shinewithtara">
                          START ADVENTURE
                        </Button>
                        <Box sx={{
                          mt: 2,
                          display: "flex",
                          gap: 0.5,
                          flexDirection: "row",
                          position: "relative",
                          zIndex: 1,
                          pb: "60px",
                        }}>
                          <Button href="https://www.facebook.com/profile.php?id=61554711500749"><FacebookRounded /></Button>
                          <Button href="https://www.instagram.com/shineswithtara/"><InstagramRounded /></Button>
                          <Button href="https://www.youtube.com/@Shinewithtara"><YoutubeRounded /></Button>
                          <Button href="https://www.tiktok.com/@shinewithtara"><TiktokRounded /></Button>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <Box sx={{
                        width: "100%", // Ensure image fills the available width
                        backgroundImage: `url(${Images.mainTara})`,
                        backgroundSize: { xs: "contain", sm: "cover", md: "cover", lg: "contain", xl: "contain" },
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center bottom",
                        display: "block",
                        height: { md: "100%", sm: '700px', xs: '400px', xl: "600px", lg: "550px" },
                      }} />
                    </Grid>
                  </Grid>




                  <Grid
                    container
                    spacing={0}
                    sx={(theme) => ({
                      height: { md: "700px", lg: "550px", sm: "1120px", xs: "640px", xl: "610px" },
                      overflow: "hidden",
                      flexWrap: "nowrap",
                      margin: "0 auto",
                      top: { md: "70px", lg: "30px", xl: "40px" },
                      justifyContent: "center",
                      alignItems: "center",
                      [theme.breakpoints.between(1536, 1770)]: {
                        height: "765px",

                      },

                      [theme.breakpoints.between(1770, 2084)]: {
                        height: "700px",

                      },
                      // [theme.breakpoints.between(1700, 1999)]: {
                      //   height: "970px",

                      // },
                      [theme.breakpoints.between(1200, 1300)]: {
                        height: "580px",

                      },


                    })}
                  >

                    <Box
                      sx={{
                        margin: '0 auto',
                        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "66%" },
                        height: "100%",
                        backgroundImage: `url(${Images.sliderFamily1})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        display: { xs: "block", sm: "block", md: "block", lg: "block", xl: "block" }, // Always visible, you can remove this line unless there’s a specific visibility control needed
                      }}


                    />

                  </Grid>


                  <Grid
                    container
                    spacing={0}
                    sx={(theme) => ({
                      height: { md: "700px", lg: "580px", sm: "1120px", xs: "640px", xl: "610px" },
                      overflow: "hidden",
                      flexWrap: "nowrap",
                      margin: "0 auto",
                      top: { md: "70px", lg: "30px", xl: "40px" },
                      justifyContent: "center",
                      alignItems: "center",
                      [theme.breakpoints.between(1536, 1770)]: {
                        height: "750px",

                      },

                      [theme.breakpoints.between(1770, 2084)]: {
                        height: "700px",

                      },
                      // [theme.breakpoints.between(1700, 1999)]: {
                      //   height: "970px",

                      // },

                    })}

                  >
                    <Box
                      sx={{
                        margin: '0 auto',
                        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "66%" },
                        height: "100%",
                        backgroundImage: `url(${Images.sliderFamily2})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        display: { xs: "block", sm: "block", md: "block", lg: "block", xl: "block" }, // Always visible, you can remove this line unless there’s a specific visibility control needed
                      }}


                    />

                  </Grid>


                  {/* <Grid
                    container
                    spacing={0}
                    sx={{
                      height: { md: "550px", lg: "500px", sm: "1000px", xs: "500px", xl: "500px" },
                      overflow: "hidden",
                      flexWrap: "nowrap",
                      margin: "0 auto",
                      top: { md: "70px", lg: "30px", xl: "40px" },
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    {sliderImages1.map((image, index) => (
                      <Grid
                        md={2}
                        item
                        key={index}
                        sx={{
                          width: {
                            xs: "calc(150% / 7)",
                            sm: "calc(140% / 7)",
                            md: "calc(100% / 7)",
                            lg: "calc(100% / 7)",
                          },
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: "150%", sm: "140%", md: "140%" },
                            height: { xl: "90%", lg: "95%", md: "95%", sm: "120%", xs: "120%" },
                            backgroundImage: `url(${image})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            borderRadius: "8px",
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid> */}



                  {/* <Grid
                    container
                    spacing={0}
                    sx={{
                      height: {
                        md: "550px",
                        lg: "500px",
                        sm: "1000px",
                        xs: "500px",
                        xl: "500px"
                      },
                      overflow: "hidden",
                      flexWrap: "nowrap",
                      margin: "0 auto",
                      top: {
                        md: "70px",
                        lg: "30px",
                        xl: "40px"
                      },
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      left: "48%",
                      transform: "translateX(-50%)",
                      width: "105%",
                    }}
                  >
                    {sliderImages2.map((image, index) => (
                      <Grid
                        lg={4}
                        md={4}
                        sm={4}
                        xs={4}
                        item
                        key={index}
                        sx={{
                          width: '100%',
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${image})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid> */}


                </Carousel>
              </div>
            </Box>
          </Box>


        </Box>


        <Grid
          container
          sx={{
            backgroundImage: `url(${Images.introBg})`, // Replace with the actual image path or import
            backgroundSize: "cover", // Ensures the image covers the entire container
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents tiling
            padding: 0,
            margin: 0,
            position: "relative", // Keeps it ready for absolute positioning of child elements
          }}
        >
          {/* Flex container for image and heading */}
          <Grid
            container
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center", // Centers content horizontally
              alignItems: "center", // Centers content vertically
              padding: { xs: 2, sm: 3, md: 4 }, // Adjusts padding for smaller screens
            }}
          >
            {/* Container for Image and Heading */}
            <Box
              sx={{
                mt: 4,
                position: "relative", // Allows absolute positioning for the image
                textAlign: "center", // Centers the heading text
                width: "100%", // Ensures proper alignment
              }}
            >
              {/* Tara Image */}
              <Box
                sx={{
                  position: "absolute", // Positioned relative to the container
                  top: {
                    xl: "50%",
                    lg: "50%",
                    md: "50%",
                    sm: "40%",
                    xs: "30%",
                  }, // Adjusts vertical positioning
                  left: {
                    xl: "50%",
                    lg: "50%",
                    md: "50%",
                    sm: "40%",
                    xs: "30%",
                  }, // Adjusts horizontal positioning
                  transform: {
                    xl: "translate(-550%, -90%)",
                    lg: "translate(-450%, -90%)",
                    md: "translate(-400%, -70%)",
                    sm: "translate(-290%, -50%)",
                    xs: "translate(-220%, -40%)",
                  }, // Dynamically adjusts based on screen size
                  width: {
                    xl: "143.56px",
                    lg: "130px",
                    md: "110px",
                    sm: "90px",
                    xs: "70px",
                  },
                  height: {
                    xl: "139px",
                    lg: "120px",
                    md: "100px",
                    sm: "80px",
                    xs: "60px",
                  },
                  backgroundImage: `url(${taraImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Heading */}
              <Typography
                variant="h1"
                className="heading-font"
                sx={{
                  fontSize: {
                    xl: "140px",
                    lg: "90px",
                    md: "70px",
                    sm: "45px",
                    xs: "35px",
                  }, // Adjusts font size for different screens
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textTransform: "uppercase",
                  paddingBottom: { xl: 6, lg: 5, md: 4, sm: 3, xs: 2 },
                  position: "relative", // Ensures alignment with image
                  zIndex: 1, // Keeps heading above the image
                }}
                style={{
                  WebkitTextStroke: "1px white",
                  WebkitTextFillColor: "#F9BF29",
                }}
              >
                <span>Introducing</span>
                <span
                  style={{
                    display: "block",
                    WebkitTextStroke: "1px white",
                    WebkitTextFillColor: "#4FAAFB",
                  }}
                >
                  Tara and Shine
                </span>
              </Typography>
            </Box>
          </Grid>

          {/* Paragraph and Image Section */}
          <Grid
            container
            className="para-text"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "20px",
              width: "100%",
            }}
          >
            {/* Left Side: Paragraph */}
            <Grid
              item
              md={5}
              xs={12}
              sx={{
                textAlign: "left",
                paddingLeft: { lg: 6, md: 4, sm: 2, xs: 2 }, // Adjust padding based on screen size
              }}
            >
              <Box
                className="para-text"
                sx={{
                  textAlign: "left",
                  padding: { lg: 6, md: 4, sm: 3, xs: 2 }, // Adjust padding
                  width: "100%",
                }}
              >
                <Typography
                  className="para-text"
                  sx={{
                    paddingBottom: 3,
                    fontSize: { sm: "18px", xs: "16px", xl: "35px" },
                  }}
                >
                  Welcome to "Shine with Tara"! ✨
                </Typography>
                <Typography
                  className="para-text"
                  sx={{
                    paddingBottom: 2,
                    fontSize: { sm: "18px", xs: "16px", xl: "35px" },
                  }}
                >
                  "Shine with Tara" is an enchanting Islamic cartoon series
                  designed especially for Muslim children worldwide. At the
                  heart of our stories is Tara, a delightful, adventurous
                  character, and her imaginary friend Shine, a radiant companion
                  who brings joy, curiosity, and wonder to every journey.
                  Together, Tara and Shine travel through magical realms,
                  bringing Islamic teachings to life in a way that captivates
                  and inspires.
                </Typography>
                <Typography
                  className="para-text"
                  sx={{
                    paddingBottom: 2,
                    fontSize: { sm: "18px", xs: "16px", xl: "35px" },
                  }}
                >
                  Through each adventure, Tara and Shine explore timeless
                  stories from the Qur'an, dive into the beautiful recitation of
                  verses, and share the moral lessons of the Hadith. They weave
                  essential values like kindness, courage, and the importance of
                  family into every episode, making spiritual growth and
                  character building both enjoyable and relatable for young
                  minds.
                </Typography>
                <Typography
                  className="para-text"
                  sx={{
                    paddingBottom: 5,
                    fontSize: { sm: "18px", xs: "16px", xl: "40px" },
                  }}
                >
                  Join us as Tara and Shine illuminate the wonders of Islamic
                  teachings, taking young viewers on a path filled with
                  thrilling discoveries, heartfelt moments, and lessons that
                  will stay with them for life. Perfect for nurturing your
                  child’s faith, values, and character! 🌙
                </Typography>
              </Box>
            </Grid>
           
      {isSmallScreen ? (
        // This grid will be shown for screens below 900px
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "left",
            backgroundImage: `url(${introImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: { xs: "800px", sm: "900px", md: "100%", lg: "100%", xl: '1700px' },
            '@media (min-width: 1536px)and (max-width:2150px)': {
              height: "1350px"
            },
            '@media (min-width: 1300px)and (max-width:1535px)': {
              height: "980px"
            },
          }}
        />
      ) : (
        // This grid will be shown for screens above 900px
        <Grid
        item
        md={6}
        xs={12}
        sx={{
          textAlign: "left",
          backgroundImage: `url(${Images.vector})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: { xs: "800px", sm: "900px", md: "100%", lg: "100%", xl: "1700px" },
          "@media (min-width: 1536px) and (max-width:2150px)": {
            height: "1840px",
          },
          "@media (min-width: 1300px) and (max-width:1535px)": {
            height: "980px",
          },
          position: "relative",
        }}
      >
        {/* Second Image Box Inside Grid */}
        <Box
          sx={(theme) => ({
            backgroundImage: `url(${Images.vectorStarFrame})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%", // Increase width to extend towards the right
            height: "100%", // Make it full height
            position: "absolute", // Allow free positioning
            bottom: 0, // Align to the bottom
            right: 0, // Align to the right
            zIndex: 11, // Ensure it stays behind text
            [theme.breakpoints.between(900, 1200)]: {
              height: "800px",
              width: "678px",
              bottom: "-54px",
            },
            [theme.breakpoints.between(1200, 1300)]: {
              height: "667px",
              width: "679px",
              bottom: "0",
              right:"4px"
            },
            [theme.breakpoints.between(1300, 1536)]: {
              height: "910px",
              width: "900px",
              bottom: "0",
            },   [theme.breakpoints.between(1536, 2200)]: {
              height: "1873px",
              width: "1205px",
              bottom: "-135px",
            },

            [theme.breakpoints.between(2200, 3000)]: {
              height: "1872px",
              width: "1548px",
              bottom: "-135px",
            },
          })}
        ></Box>


      </Grid>
      )}
         



          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            backgroundImage: `url(${Images.ceoBg})`, // Replace with the actual image path or import
            backgroundSize: "cover", // Ensures the image covers the entire container
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents tilin
            minHeight: "40vh", // Full height for the section
            padding: "30px 0",
            margin: 0,
            display: "flex",
            alignItems: "center", // Vertically centers the content
            justifyContent: "center", // Horizontally centers the content
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
              position: "relative",
            }}
          >
            {/* Centered Heading with Images */}
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Center heading with images
                gap: 2, // Space between images and heading
                marginBottom: 0, // Space below heading
              }}
            >
              {/* Left Image */}
              <Box
                component="img"
                src={starImg} // Replace with actual left image URL
                alt="Left Decorative Image"
                sx={{
                  width: { xs: "40px", sm: "60px", md: "80px" },
                  height: "auto",
                  paddingRight: 3,
                }}
              />
              {/* Heading */}
              <Typography
                variant="h1"
                className="heading-font"
                sx={{
                  fontSize: {
                    xl: "80px",
                    lg: "70px",
                    md: "60px",
                    sm: "35px",
                    xs: "28px",
                  }, // Responsive font size
                  fontWeight: 600,
                  color: "#F9BF29",
                  textTransform: "uppercase",
                }}
                style={{
                  WebkitTextStroke: "1px white",
                  WebkitTextFillColor: "#F9BF29",
                }}
              >
                About{" "}
                <span
                  style={{
                    WebkitTextStroke: "1px white",
                    WebkitTextFillColor: "#4FAAFB",
                  }}
                >
                  Ceo
                </span>
              </Typography>
              {/* Right Image */}
              <Box
                component="img"
                src={rainbowImg} // Replace with actual right image URL
                alt="Right Decorative Image"
                sx={{
                  width: { xs: "40px", sm: "60px", md: "80px" },
                  height: "auto",
                  paddingLeft: 2,
                }}
              />
            </Box>
          </Grid>

          {/* Left-Aligned Text */}
          <Box
            sx={{
              textAlign: "left",
              margin: 0,
              padding: "0 5rem ",
              width: "100%",
            }}
          >
            <Typography
              className="para-text"
              sx={{
                fontSize: { xl: "30px", sm: "18px", xs: "16px" },
                color: "white",
                lineHeight: 1.6,
                marginBottom: 3,
              }}
            >
              🌟 Assalam u Alaikum! I’m Sana Kazmi, and I’m excited to introduce
              “Shine with Tara,” a YouTube channel crafted for young Muslim
              children! 🌟
            </Typography>
            <Typography
              className="para-text"
              sx={{
                fontSize: { xl: "30px", sm: "18px", xs: "16px" },
                color: "white",
                lineHeight: 1.6,
                marginBottom: 3,
              }}
            >
              As a mother of four, I wanted to create something meaningful,
              educational, and fun for our little ones. "Shine with Tara"
              follows Tara and her playful friend, Shine, as they embark on
              magical adventures exploring Qur’anic stories, prophet tales, and
              essential values like kindness and gratitude.
            </Typography>
            <Typography
              className="para-text"
              sx={{
                fontSize: { xl: "30px", sm: "18px", xs: "16px" },
                color: "white",
                lineHeight: 1.6,
                marginBottom: 5,
              }}
            >
              This channel is all about bringing Islamic teachings to life in a
              joyful and memorable way. I can’t wait for you and your children
              to join us on this journey of faith, values, and heartwarming
              adventures! 🌙
            </Typography>
          </Box>
        </Grid>

        <Grid
          container
          sx={{
            backgroundImage: `url(${Images.pagesNavBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "80vh",
            position: "relative",
            display: "flex",
            justifyContent: "center", // Centers content horizontally
            alignItems: "center", // Centers content vertically
            padding: "5rem 0",
          }}
        >
          <Grid>
            {/* Container for Image and Heading */}
            <Box
              sx={{
                position: "relative", // Allows absolute positioning for the image
                textAlign: "center", // Centers the heading text
                width: "100%", // Ensures proper alignment
              }}
            >
              {/* Tara Image */}
              <Box
                sx={{
                  position: "absolute", // Positioned relative to the container
                  top: {
                    xl: "50%",
                    lg: "50%",
                    md: "50%",
                    sm: "40%",
                    xs: "30%",
                  }, // Adjusts vertical positioning
                  left: {
                    xl: "50%",
                    lg: "50%",
                    md: "50%",
                    sm: "40%",
                    xs: "30%",
                  }, // Adjusts horizontal positioning
                  transform: {
                    xl: "translate(-450%, -110%)",
                    lg: "translate(-450%, -110%)",
                    md: "translate(-400%, -110%)",
                    sm: "translate(-290%, -90%)",
                    xs: "translate(-220%, -70%)",
                  }, // Dynamically adjusts based on screen size
                  width: {
                    xl: "143.56px",
                    lg: "130px",
                    md: "110px",
                    sm: "90px",
                    xs: "70px",
                  },
                  height: {
                    xl: "139px",
                    lg: "120px",
                    md: "100px",
                    sm: "80px",
                    xs: "60px",
                  },
                  backgroundImage: `url(${haveforyou})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Heading */}
              <Typography
                variant="h1"
                className="heading-font"
                sx={{
                  fontSize: {
                    xl: "100px",
                    lg: "90px",
                    md: "70px",
                    sm: "45px",
                    xs: "35px",
                  }, // Adjusts font size for different screens
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textTransform: "uppercase",
                  paddingBottom: { xl: 6, lg: 5, md: 4, sm: 3, xs: 2 },
                  position: "relative", // Ensures alignment with image
                  zIndex: 1, // Keeps heading above the image
                }}
                style={{
                  WebkitTextStroke: "1px white",
                  WebkitTextFillColor: "#4FAAFB",
                }}
              >
                <span> Tara and Shine </span>
                <span
                  style={{
                    display: "block",
                    WebkitTextStroke: "1px white",
                    WebkitTextFillColor: "#F9BF29",
                  }}
                >
                  hAVE For you
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid container mt={5} mb={10} spacing={2} xs={11}>
            {/* {navigation.map((item, index) => {
                return (
                  <Grid item lg={4} md={6} xs={12} display={'flex'} justifyContent={'center'} mt={5}>
                    <Button
                      fullWidth
                      variant='contained'
                      sx={{
                        py: 1,
                        px: 4,
                        textTransform: "capitalize",
                        fontSize: "18px"
                      }}
                      onClick={() => navigate(item?.path)}
                    >
                      {item?.name}
                    </Button>
                  </Grid>
                )
              })} */}
            {routingData?.map((item, i) => (
              <Grid
                key={i}
                component={"div"}
                sx={{ cursor: "pointer", mt: 4 }}
                onClick={() =>
                  item.name === "Ahmed"
                    ? window.open("https://www.instagram.com/shineswithtara/", "_blank")
                    : navigate(item?.path)
                }
                item
                md={4}
                sm={4}
                xs={12}
              >
                <Grid
                  container
                  sx={{
                    // border: `8px solid ${item.name == "Tara" ? "#0C789D" : item.name == "Shine" ? "#C40A66" : item.name == "Ahmed" ? "#A36506" : "#5B0276"}`,
                    borderRadius: "20px",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                  // sx={{ borderLeft: { md: `8px solid ${item.name == "Tara" ? "#0C789D" : item.name == "Shine" ? "#C40A66" : item.name == "Ahmed" ? "#A36506" : "#5B0276"}`, sm: "none", xs: "none" } }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <CardMedia
                        component={"img"}
                        src={item.image}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            backgroundImage: `url(${Images.reviewBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            maxHeight: "1500vh", // Adjusted height
            paddingTop: "20rem",
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            gap: 0, // Prevent gaps between children
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              padding: "5rem 0",
              position: "relative",
              marginTop: "-22rem",
            }}
          >
            {/* Centered Heading with Images */}
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              {/* Left Image */}
              <Box
                component="img"
                src={Images.cloud}
                alt="Left Decorative Image"
                sx={{
                  width: { xs: "40px", sm: "60px", md: "80px" },
                  height: "auto",
                  padding: 0,
                }}
              />
              {/* Heading */}
              <Typography
                variant="h1"
                className="heading-font"
                sx={{
                  fontSize: {
                    xl: "80px",
                    lg: "70px",
                    md: "60px",
                    sm: "35px",
                    xs: "28px",
                  },
                  fontWeight: 600,
                  color: "#F9BF29",
                  textTransform: "uppercase",
                  margin: 0, // Ensure no top or bottom margin
                }}
                style={{
                  WebkitTextStroke: "1px white",
                  WebkitTextFillColor: "#F9BF29",
                }}
              >
                Reviews
              </Typography>
            </Box>
          </Grid>
          <Box
            sx={{
              width: "95%",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Grid item md={11} sm={11} xs={11}>
              <Swiper
                ref={swiperRef}
                loop={true}
                spaceBetween={10}
                slidesPerView={3}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  786: { slidesPerView: 2 },
                  1080: { slidesPerView: 3 },
                  1550: { slidesPerView: 4 },
                  2000: { slidesPerView: 5 },
                  2550: { slidesPerView: 6 },
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                  bulletClass: "swiper-pagination-bullet",
                  bulletActiveClass: "swiper-pagination-bullet-active",
                }}
                onSlideChange={updateActiveCard} // Update active card on slide change
                speed={1000}
              >
                {reviewBoxes?.map((item, ind) => (
                  <SwiperSlide key={ind}>
                    <Box
                      sx={{
                        p: 4,
                        borderRadius: "15px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        backgroundColor:
                          activeCard === ind ? "#FF9D04" : "#CA6680",
                        height: "120px",
                        paddingBottom: 8,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setActiveCard(ind); // Set active card manually on click
                        swiperRef.current.swiper.slideToLoop(ind); // Navigate to clicked card
                      }}
                    >
                      {/* Rating */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Rating
                          name="read-only"
                          value={item?.rating}
                          sx={{ borderColor: "white" }}
                          readOnly
                        />
                      </Box>

                      {/* Comment */}
                      <Typography variant={"body2"} sx={{ color: "white" }}>
                        {item.comment}
                      </Typography>

                      {/* Name, Designation */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                        }}
                      >
                        <Avatar
                          sx={{ width: 64, height: 64 }}
                          src={item.profile}
                          alt={item.name}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontWeight: 600,
                              color: "white",
                            }}
                          >
                            {item?.name}
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 400 }}
                            >
                              {item.designation}
                            </Typography>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>

            {/* Navigation Buttons */}
            <Box
              sx={{
                position: "absolute",
                top: "35%",
                left: 0,
                zIndex: 10,
                cursor: "pointer",
              }}
              onClick={() => {
                if (swiperRef.current?.swiper) {
                  swiperRef.current.swiper.slidePrev();
                  updateActiveCard(); // Sync active card with previous slide
                }
              }}
            >
              <Box
                component="img"
                src={Images.backwardArrow}
                alt="Previous Slide"
                sx={{
                  width: "80px",
                  height: "60px",
                  padding: "6px",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: "35%",
                right: 0,
                zIndex: 10,
                cursor: "pointer",
              }}
              onClick={() => {
                if (swiperRef.current?.swiper) {
                  swiperRef.current.swiper.slideNext();
                  updateActiveCard(); // Sync active card with next slide
                }
              }}
            >
              <Box
                component="img"
                src={Images.forwardArrow}
                alt="Next Slide"
                sx={{
                  width: "80px",
                  height: "60px",
                  padding: "6px",
                }}
              />
            </Box>
          </Box>

          <Grid
            container
            sx={{
              backgroundImage: `url(${Images.reviewSection})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: {
                xs: "300px", // Smallest screens
                sm: "430px", // Small screens
                md: "530px", // Medium screens
                lg: "700px", // Large screens
                xl: "1600px"
              },
              mt: "40px",
              "@media (min-width: 2300px) and (max-width: 2700px)": {
                height: "1400px"
              },
              "@media (min-width: 1536px) and (max-width: 2299px)": {
                height: "1050px"
              },
            }}
          ></Grid>

          {/* <Box
            component="img"
            src={reviewSection}
            alt="Review Section Image"
            sx={{
              position: "absolute", // Relative to the parent container
              bottom: 0, // Align to the bottom
              left: "50%", // Center horizontally
              transform: "translateX(-50%)", // Center correctly
              width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "90%" }, // Adjust width for responsiveness
              height: "auto", // Maintain aspect ratio
              maxHeight: "600px",
            }}
          /> */}
        </Grid>

        <Box
          component={"section"}
          sx={{
            position: "relative",
            backgroundColor: "#FF9D04",
            width: "100%",
            height: { xs: "260px", sm: "250px", md: "500px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: { xs: "10px", sm: "10px", md: "10px" },

          }}
        >
          {/* <Box
            sx={{
              position: "absolute",
              top: 40,
              left: 20,
              zIndex: 0,
              display: "block",
              width: "60px",
            }}
            component={"img"}
            src={Images.hand}
          ></Box> */}
          {/* <Box
            sx={{
              position: "absolute",
              top: 20,
              right: 50,
              zIndex: 0,
              display: "block",
              width:"60px"
            }}
            component={'img'}
            src={Images.rainbow}
          ></Box> */}

          <CardMedia
            component={"img"}
            src={Images.cloud} // Replace with your small image source
            alt="Small Image"
            sx={{
              display: { sm: "none", xs: "none", md: "block" },
              width: { md: "40px", lg: "60px" },
              top: "50px !important",
              height: "auto",
              objectFit: "contain",
              left: { xl: 230, lg: 0, md: 0 },
              position: "absolute",
              "@media (min-width: 1536px) and (max-width: 2200px)": {
                left: 90
              },
            }}
          />
          <Grid container justifyContent={"center"}>
            <Grid item xs={4}></Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              {/* Center Content */}
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  zIndex: 1,
                  padding: { sm: "20px 0" }
                }}
              >
                <Typography
                  variant="h5"
                  className="para-text"
                  sx={{
                    fontSize: {
                      xs: "18px",
                      sm: "22px",
                      md: "32px",
                      lg: "42px",
                    },
                    fontWeight: 600,
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  Subscribe to get information, latest news, and other
                  interesting offers about{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      display: "block",
                      WebkitTextStroke: "0.5px white ",
                      WebkitTextFillColor: "#FF9D04",
                    }}
                  >
                    Shine With Tara
                  </span>
                </Typography>
                <TextField
                  className="para-text"
                  placeholder={"Your email"}
                  sx={{
                    background: Colors.white,
                    borderRadius: "4px",
                    width: { sm: "100%", xs: "120%" },
                    "& fieldset": {
                      border: "none",
                    },
                    "& .MuiOutlinedInput-root": {
                      paddingRight: 0.5,
                    },
                    "& .MuiOutlinedInput-input": {
                      color: `${Colors.primary} !important`,
                      fontSize: { xs: "8px", sm: "16px", md: "18px" },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        className="para-text"
                        sx={{
                          color: `${Colors.white} !important`,
                          backgroundColor: `#5B73AD`,
                          px: { xs: 0.5, sm: 4 },
                          py: { sm: 1.5, xs: 1 },
                          textTransform: "uppercase",
                          fontSize: { xs: "8px", sm: "14px", md: "16px" },
                          "&:hover": {
                            backgroundColor: `#5B73AD`,
                            color: `${Colors.white}`,
                          },
                        }}
                      >
                        Subscribe
                      </Button>
                    ),
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          {/* Left Background Image */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: { xl: 280, lg: 0, md: 0, xs: 0, sm: 0 },
              zIndex: 0,
              display: "block",
              "@media (min-width: 1536px) and (max-width: 2200px)": {
                left: 90
              },

            }}
          >
            <CardMedia
              component={"img"}
              src={Images.Character1}
              sx={{
                width: "100%", // Adjust width for smaller screens
                height: { xs: "180px", sm: "180px", md: "500px" }, // Adjust height for smaller screens
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Right Background Image */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: { xs: "0", xl: 260 },
              zIndex: 0,
              display: "block",
              "@media (min-width: 1536px) and (max-width: 2200px)": {
                right: 60
              },
            }}
          >
            <CardMedia
              component={"img"}
              src={Images.Character2}
              sx={{
                width: "100%", // Adjust width for smaller screens
                height: { xs: "180px", sm: "180px", md: "500px" }, // Adjust height for smaller screens
                objectFit: "cover",

              }}
            />
          </Box>
        </Box>

        {/* <Box sx={{ backgroundColor: '#ABCAFF' }} pb={10}>
          <Grid container justifyContent={"center"} alignItems={"center"} mb={5}>
            <Grid item md={1} display={{ xs: "none", sm: "none", md: "block" }}>
              <CardMedia
                component={"img"}
                src={Images.shineStar}
                sx={{
                  width: "70px",
                  heigth: "70px",
                  objectFit: "contain"
                }}
              />
            </Grid>
            <Grid item md={5.5}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  fontSize: { md: "58px", xs: "40px" },
                  fontWeight: 900,
                  color: Colors.primary
                }}
              >
                What People Are Saying
              </Typography>
            </Grid>
            <Grid item md={1} display={{ xs: "none", sm: "none", md: "block" }}>
              <CardMedia
                component={"img"}
                src={Images.shineStar}
                sx={{
                  width: "70px",
                  heigth: "70px",
                  objectFit: "contain"
                }}
              />
            </Grid>

          </Grid>
          <Box sx={{ width: '95%', margin: '0 auto' }}>
            <Grid item md={11} sm={11} xs={11}>
              <Swiper
                loop={true}
                spaceBetween={10}
                slidesPerView={3}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                  320: {
                    slidesPerView: 1
                  },
                  786: {
                    slidesPerView: 2
                  },
                  1080: {
                    slidesPerView: 3
                  }
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {reviewBoxes?.map((item, ind) => (
                  <SwiperSlide key={ind}>
                    <Box
                      sx={{
                        p: 4,
                        borderRadius: "15px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        backgroundColor: '#021b51',
                        height: '180px'
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px"
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 64,
                            height: 64
                          }}
                          src={item.profile}
                          alt={item.name}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column"
                          }}
                        >
                          <Typography
                            sx={{

                              display: 'flex',
                              alignItems: "center",
                              gap: "8px",
                              fontWeight: 600,
                              color: 'white'
                            }}
                          >
                            {item?.name}
                            <Typography
                              variant='body2'
                              sx={{ fontWeight: 400 }}
                            >
                              {item.designation}
                            </Typography>
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >

                          </Box>
                          <Rating name="read-only" value={item?.rating} sx={{ borderColor: 'white' }} readOnly />
                        </Box>
                      </Box>
                      <Typography
                        variant={"body2"}
                        sx={{

                          color: 'white'
                        }}
                      >
                        {item.comment}
                      </Typography>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Box>
        </Box> */}
        {/* <Box sx={{ backgroundColor: '#ABCAFF' }} pb={10}>
          <Grid container justifyContent={"center"} alignItems={"center"} mb={5}>
            <Grid item md={1} display={{ xs: "none", sm: "none", md: "block" }}>
              <CardMedia
                component={"img"}
                src={Images.shineStar}
                sx={{
                  width: "70px",
                  heigth: "70px",
                  objectFit: "contain"
                }}
              />
            </Grid>
            <Grid item md={5.5}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  fontSize: { md: "58px", xs: "40px" },
                  fontWeight: 900,
                  color: Colors.primary
                }}
              >
                FAQS
              </Typography>
            </Grid>
            <Grid item md={1} display={{ xs: "none", sm: "none", md: "block" }}>
              <CardMedia
                component={"img"}
                src={Images.shineStar}
                sx={{
                  width: "70px",
                  heigth: "70px",
                  objectFit: "contain"
                }}
              />
            </Grid>

          </Grid>
          <Grid container spacing={2} sx={{ padding: '20px' }}>
            {faqData.map((faq, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Accordion sx={{ backgroundColor: 'transparent' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography sx={{ color: 'black', fontSize: '12px' }}>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: 'black', fontSize: '12px' }}>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Box> */}
      </Box>
    </>
  );
}

export default About;
