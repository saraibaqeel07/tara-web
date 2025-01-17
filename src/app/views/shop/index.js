import React, { Fragment, useContext, useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import Images, {
  FacebookRounded,
  InstagramRounded,
  TiktokRounded,
  YoutubeRounded,
} from "../../assets/images";
import Colors from "../../styles/colors";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "../../../App.css";
import Fonts from "../../styles/fonts";
import { initializeApp } from "firebase/app";
import { getFirestore, increment, updateDoc } from "firebase/firestore";
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
import { isIOS, isMobile } from 'react-device-detect';
import ProductModal from "../modal/ProductModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Avatar, Divider } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ArrowBack, Star } from "@mui/icons-material";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { setCart,CartContext } from "../../Context/CartContext";
import { CartCounter } from "../../Context/CartCounter";
import taraImage from "../../assets/images/tara-pic.png";
import shopImg1 from "../../assets/images/shop-intro.png";
import shopBackground from "../../assets/images/shop-background.png";
import forwardArrow from "../../assets/images/forward-arrow.png";
import backwardArrow from "../../assets/images/backward-arrow.png";
import PageNavigator from "../../components/pagination/index";
import Character1 from "../../assets/images/Character1.png";
import Character2 from "../../assets/images/Character2.png";
import { ErrorToaster, SuccessToaster } from "../../components/Toaster";
import moment from "moment";

// import "slick-carousel/slick/slick-theme.css";

function Shop() {
  const { state } = useLocation();
  const { cartVisible, toggleCartVisibility } = useContext(CartContext);
  const { setCount } = useContext(CartCounter);

  console.log(cartVisible, "cartVisible");

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
  const [selected, setSelected] = useState("merchandise");
  const [products, setProducts] = useState([]);
  const [textColor, setTextColor] = useState(Colors.orange);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardProduct, setCardProduct] = useState({});
  const [coloringSheets, setColoringSheets] = useState([]);
  const [activitySheets, setActivitySheets] = useState([]);
  const [extraSheets, setExtraSheets] = useState([]);
  let User = localStorage.getItem("user");

  User = JSON.parse(User);

  const [open, setOpen] = useState(false);
  const [cartArray, setCartArray] = useState([]);
  const [cartItems, setCartItems] = useState(products);
  const [faqData, setFaqData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [reviewBoxes, setReviewBoxes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [activityCurrentPage, setActivityCurrentPage] = useState(1);
  const [coloringCurrentPage, setColoringCurrentPage] = useState(1);
  const [activeButton, setActiveButton] = useState(4); // Default 'Show All Products' is active
  const [loading, setLoading] = useState(true); // Loader state
  const [delayPassed, setDelayPassed] = useState(false); // Delay state to control the visibility of loader
  const [cartData, setCartData] = useState(null);

  const buttonLabels = [
    "Books",
    "Activity Sheets",
    "Coloring Sheets",
    "Extra Sheets",
    "Show All Products",
  ];

  const handleButtonClick = (index) => {
    setActiveButton(index); // Update the active button
  };

  const [extraCurrentPage, setExtraCurrentPage] = useState(1); // Current page for pagination
  const extraProductsPerPage = 4; // Number of products per page
  const [extraLoading, setExtraLoading] = useState(true); // Loading state
  const [extraDelayPassed, setExtraDelayPassed] = useState(false); // Delay state

  // Calculate the total pages and current products for the current page
  const extraTotalPages = Math.ceil(extraSheets.length / extraProductsPerPage);
  const extraCurrentProducts = extraSheets.slice(
    (extraCurrentPage - 1) * extraProductsPerPage,
    extraCurrentPage * extraProductsPerPage
  );

  // Handle page change logic
  const handleExtraPrevPage = () => {
    if (extraCurrentPage > 1) {
      setExtraCurrentPage(extraCurrentPage - 1);
    }
  };

  const handleExtraNextPage = () => {
    if (extraCurrentPage < extraTotalPages) {
      setExtraCurrentPage(extraCurrentPage + 1);
    }
  };

  const handleExtraPageClick = (pageNumber) => {
    setExtraCurrentPage(pageNumber);
  };

  // Effect for handling loading and delay
  useEffect(() => {
    setExtraLoading(true);
    setExtraDelayPassed(false);

    const delayTimer = setTimeout(() => {
      setExtraDelayPassed(true);
    }, 800); // 800ms delay before showing content

    const dataTimer = setTimeout(() => {
      setExtraLoading(false); // Data is loaded after the delay
    }, 1000); // 1000ms for data load

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(dataTimer);
    };
  }, [extraCurrentPage, extraSheets]); // Re-run the effect when the page or data changes

  const itemsPerPage = 4; // Max items per page
  const coloringTotalPages = Math.ceil(coloringSheets.length / itemsPerPage);

  const displayedColoringSheets = coloringSheets.slice(
    (coloringCurrentPage - 1) * itemsPerPage,
    coloringCurrentPage * itemsPerPage
  );

  // State for loading and delay
  const [coloringLoading, setColoringLoading] = useState(true);
  const [coloringDelayPassed, setColoringDelayPassed] = useState(false);

  // Handle previous page
  const handleColoringPrevPage = () => {
    if (coloringCurrentPage > 1) {
      setColoringCurrentPage((prev) => prev - 1);
    }
  };

  // Handle next page
  const handleColoringNextPage = () => {
    if (coloringCurrentPage < coloringTotalPages) {
      setColoringCurrentPage((prev) => prev + 1);
    }
  };

  // Handle page number click
  const handleColoringPageClick = (page) => {
    setColoringCurrentPage(page);
  };

  // Effect for loading state
  useEffect(() => {
    setColoringLoading(true);
    setColoringDelayPassed(false);

    const delayTimer = setTimeout(() => {
      setColoringDelayPassed(true);
    }, 800); // Delay before loader appears

    const dataTimer = setTimeout(() => {
      setColoringLoading(false); // Stop loading once data is available
    }, 1000);

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(dataTimer);
    };
  }, [coloringCurrentPage, coloringSheets]);

  // Activity Pagination
  const activityProductsPerPage = 4; // Show 4 cards per page
  const activityTotalPages = Math.ceil(
    activitySheets.length / activityProductsPerPage
  );
  const activityCurrentProducts = activitySheets.slice(
    (activityCurrentPage - 1) * activityProductsPerPage,
    activityCurrentPage * activityProductsPerPage
  );

  // State for loading and delay
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityDelayPassed, setActivityDelayPassed] = useState(false);

  // Handle previous page
  const handleActivityPrevPage = () => {
    if (activityCurrentPage > 1) {
      setActivityCurrentPage(activityCurrentPage - 1);
    }
  };

  // Handle next page
  const handleActivityNextPage = () => {
    if (activityCurrentPage < activityTotalPages) {
      setActivityCurrentPage(activityCurrentPage + 1);
    }
  };

  // Handle page number click
  const handleActivityPageClick = (pageNumber) => {
    setActivityCurrentPage(pageNumber);
  };

  // Effect for loading state
  useEffect(() => {
    setActivityLoading(true);
    setActivityDelayPassed(false);

    const delayTimer = setTimeout(() => {
      setActivityDelayPassed(true);
    }, 800); // Delay before loader appears

    const dataTimer = setTimeout(() => {
      setActivityLoading(false); // Stop loading once data is available
    }, 1000);

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(dataTimer);
    };
  }, [activityCurrentPage, activitySheets]);

  // Shop pagination
  const cardsPerPage = 4; // Number of cards to show per page
  // Calculate total pages dynamically
  const totalItems = products.length; // Total number of items from the products array
  const totalPages = Math.ceil(totalItems / cardsPerPage); // Calculate total pages

  // Calculate the indexes for the current page's items
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Handle page number click
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setLoading(true);
    setDelayPassed(false);

    const delayTimer = setTimeout(() => {
      setDelayPassed(true);
    }, 800); // Delay before loader appears

    // Simulate data load delay
    const dataTimer = setTimeout(() => {
      setLoading(false); // Stop loading once data is available
    }, 1000);

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(dataTimer);
    };
  }, [currentPage, products]);

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
    const delayTimer = setTimeout(() => {
      setDelayPassed(true); // Allow showing of loader after a delay
    }, 500); // 500ms delay before the loader shows

    // Check if data is available
    if (currentCards && currentCards.length > 0) {
      setLoading(false); // Turn off loader once data is available
    }

    return () => clearTimeout(delayTimer); // Cleanup on unmount
  }, [currentCards]);

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
        // setCount(cart.length);
      }
    }
  }, []);

  const addToCart = async (data) => {
    console.log("submit");

    try {
      const cartRef = collection(db, "cartData");

      const querySnapshot = await getDocs(
        query(cartRef, where("userId", "==", User.uid))
      );

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const cartDoc = querySnapshot.docs[0].data();

        const existingItemIndex = cartDoc.data.findIndex(
          (item) => item.id === data.id
        );

        if (existingItemIndex !== -1) {
          const updatedData = [...cartDoc.data];
          updatedData[existingItemIndex].qty += 1;

          await updateDoc(docRef, { data: updatedData });
          getCartData()
          SuccessToaster("Quantity Increased");
        } else {
          // Item doesn't exist: Append new item with qty = 1
          const newItem = { ...data, qty: 1 };
          await updateDoc(docRef, { data: [...cartDoc.data, newItem] });
          SuccessToaster("Added To Cart");
          getCartData()
        }
      } else {
        // No cart document for the user: Create a new cart document
        const newCart = {
          userId: User.uid,
          data: [{ ...data, qty: 1 }], // Initialize with the first item
          created_at: moment().format("MMMM Do YYYY, h:mm a"),
        };

        const docRef = await addDoc(cartRef, newCart);
        console.log("Document written with ID: ", docRef.id);
        
        SuccessToaster("Added To Cart");
        getCartData()
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      ErrorToaster("Something Went Wrong");
    }
  };
  const buyNow = async (data) => {
    console.log("submit");

    try {
      const cartRef = collection(db, "cartData");

      const querySnapshot = await getDocs(
        query(cartRef, where("userId", "==", User.uid))
      );

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const cartDoc = querySnapshot.docs[0].data();

        const existingItemIndex = cartDoc.data.findIndex(
          (item) => item.id === data.id
        );

        if (existingItemIndex !== -1) {
          const updatedData = [...cartDoc.data];
          updatedData[existingItemIndex].qty += 1;

          await updateDoc(docRef, { data: updatedData });
          getCartData()
          navigate('/cart')
        } else {
          // Item doesn't exist: Append new item with qty = 1
          const newItem = { ...data, qty: 1 };
          await updateDoc(docRef, { data: [...cartDoc.data, newItem] });
          navigate('/cart')
          getCartData()
        }
      } else {
        // No cart document for the user: Create a new cart document
        const newCart = {
          userId: User.uid,
          data: [{ ...data, qty: 1 }], // Initialize with the first item
          created_at: moment().format("MMMM Do YYYY, h:mm a"),
        };

        const docRef = await addDoc(cartRef, newCart);
        console.log("Document written with ID: ", docRef.id);
        
        navigate('/cart')
        getCartData()
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      ErrorToaster("Something Went Wrong");
    }
  };
  const getCartData = async () => {
    try {
      
        const userId = User.uid;

        
        const q = query(collection(db, "cartData"), where("userId", "==", userId));

        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(dataArray[0]?.data, 'dataArray');



       
        setCartItems(dataArray[0]?.data);
        console.log(dataArray[0]?.data?.length);
        
        setCount(dataArray[0]?.data?.length)
    } catch (error) {
        console.error("Error fetching cart data:", error);
    }
};


  useEffect(() => {
    setOpen(cartVisible);
  }, [cartVisible]);
  useEffect(() => {
    getCartData()
  }, [])
  

  return (
    <>
      {" "}

      <Box
        component={"main"}
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${Images.bannerBg})`,

            backgroundSize: "cover",
            backgroundPosition: "bottom center",
            width: "100%",
            height: { md: "578px", xs: "490px", xl: "730px" },
            position: "relative", // Ensure child content is positioned relative to this container
            overflow: "hidden", // Prevent content from going outside
          }}
        >
          {/* Right-side Image */}
          <Box
            sx={{
              margin: "0 auto",
              width: { md: "100%", sm: "100%", xs: "100%" }, // Adjust width for each screen size
              height: "100%", // Full height of the parent container
              backgroundImage: `url(${shopImg1})`,
              backgroundSize: {
                md: "contain",
                xl: "contain",
                lg: "contain",
                xs: "cover",
                sm: "contain",
              },
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center", // Ensures the image is aligned at the bottom
            }}
          />
        </Box>

        {/* <Box
          component={"section"}
          sx={{
            background: Colors.primaryGradient,
            width: "100%",
            py: "80px"
          }}
        >
          <Container>
            <Box
              sx={{
                backgroundImage: { md: `url(${Images.bannerBg})`, sm: `url(${Images.backgroundSm})`, xs: `url(${Images.backgroundSm})` },
                width: "100%",
                height: { md: "624px", xs: "490px" },
                backgroundSize: "cover",
                backgroundPosition: "center center",
                borderRadius: "20px"
              }}
            >
              <Grid container>
                <Grid item md={7} sm={12} xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "40px",
                      pt: "60px",
                      pl: { md: `48px !important`, sm: "12px", xs: "12px" },
                      pr: { md: 0, sm: "12px", xs: "12px" }
                    }}
                  >
                    <Typography
                      variant='h1'
                      sx={{
                        fontFamily: Fonts.righteous,
                        fontSize: { md: "70px", sm: "50px", xs: "40px" },
                        fontWeight: 700,
                        color: Colors.white,
                      }}
                    >
                      <span id='follow-text' style={{ color: Colors.orange }}  >Follow</span>, <span id='learn-text'>Learn</span> and <span id='explore-text'>Explore</span> with Tara!
                    </Typography>
                    <Typography
                      variant='h3'
                      sx={{
                        fontSize: { md: "38px", sm: "28px", xs: "20px" }
                      }}
                    >
                      Click To See Latest Adventures!
                    </Typography>
                    <Grid container spacing={2} alignItems={"center"}>
                      <Grid item md={5} sm={5} xs={12}>
                        <Button
                          fullWidth
                          variant='contained'
                          sx={{
                            py: 1,
                            px: 4,
                            textTransform: "capitalize",
                            fontSize: "18px"
                          }}
                          href='https://www.youtube.com/@Shinewithtara'
                        >
                          Start Adventure
                        </Button>
                      </Grid>
                      <Grid item md={7} sm={7} xs={12}>
                        <Grid container spacing={2} sx={{ justifyContent: { md: "flex-start", sm: "flex-start", xs: "center" } }}>
                          <Grid item md={2}>
                            <Button href='https://www.facebook.com/profile.php?id=61554711500749'>
                              <FacebookRounded />
                            </Button>
                          </Grid>
                          <Grid item md={2}>
                            <Button href='https://www.instagram.com/shinewith.tara/ '>
                              <InstagramRounded />
                            </Button>
                          </Grid>
                          <Grid item md={2}>
                            <Button href='https://www.youtube.com/@Shinewithtara'>
                              <YoutubeRounded />
                            </Button>
                          </Grid>
                          <Grid item md={2}>
                            <Button href='https://www.tiktok.com/@shinewithtara'>
                              <TiktokRounded />
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box> */}
        {/* <Box
          component={"section"}
          sx={{
            background: Colors.whiteblue,
            py: "80px"
          }}
        >
          <Container>
            <Grid
              container
              sx={{
                background: `url(${Images.aboutImage})`,
                backgroundSize: "cover",
                backgroundPositionY: "center"
              }}
            >
              <Grid item md={8}>
                <Box
                  sx={{
                    mb: "40px"
                  }}
                >
                  <Typography
                    variant='h3'
                    sx={{
                      fontSize: { md: "48px", xs: "40px" },
                      fontWeight: 900
                    }}
                  >
                    Introducing <span style={{ color: Colors.darkblue }}>Tara and Shine</span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px"
                  }}
                >
                  <Typography>
                    At the heart of this initiative is Tara, a nine years old, a delightful character,
                    and her imaginary companion, Shine. Together, they embody the essence
                    of Islamic teachings and virtues.
                  </Typography>
                  <Typography>
                    He delightful best friends who radiate joy, curiosity, and affection. Together, they embark on extraordinary journeys, captivating friends from all corners
                    of the world and whisking them away into a realm of enchantment.
                  </Typography>
                  <Typography>
                    Tara and Shine explore magical escapades that effortlessly impart Islamic teachings, moral values, and the importance of family bonds. The crux of our efforts revolves around delving into the profound teachings of Hadith from the Quran, the enchanting recitation of the Quran, and a fundamental introduction to Arabic. We aim to elucidate the Arabic alphabet, numbers, months, and more, ensuring a holistic understanding.
                  </Typography>
                  <Typography>
                    This captivating series is specifically tailored for Muslim kids worldwide, aiming to foster spiritual and character development in their young children. Join Tara and Shine as they weave a tapestry of thrilling adventures, educational experiences, and heartwarming moments that will leave a lasting impact on young minds.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box> */}
        {/* <Box
          component={"section"}
          sx={{
            background: Colors.lightPurple,
            backgroundImage: { md: selected == "merchandise" ? `url(${Images.merchBg})` : "none", sm: "none", xs: "none" },
            py: "80px",
            height: { md: selected == "merchandise" ? "770px" : "100%", sm: "100%", xs: "100%" },
            backgroundSize: "cover",
          }}
        >
          <Container>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "40px"
              }}
            >
              <Box
                sx={{
                  textAlign: "center"
                }}
              >
                <Typography
                  variant='h3'
                  sx={{
                    fontSize: { md: "44px", xs: "32px" },
                    fontWeight: 900
                  }}
                >
                  What <span style={{ color: Colors.purple }}>Shine And Tara</span> Have For You
                </Typography>
                <Typography
                  variant='h3'
                  sx={{
                    mt: '20px',
                    fontSize: { md: "44px", xs: "32px" },
                    fontWeight: 900
                  }}
                >
                  <span style={{ color: Colors.purple }}>Shop</span>
                </Typography>
              </Box>
              <Grid container columnSpacing={2} justifyContent={"center"} alignItems={"center"}>
                <Grid item md={1} display={{ xs: "none", sm: "none", md: "block" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <CardMedia
                      component={"img"}
                      src={Images.shineStar}
                      sx={{

                        width: "80px",
                        heigth: "80px",
                        objectFit: "contain"
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ButtonGroup sx={{ width: "100%" }}>
                      {buttons}
                    </ButtonGroup>
                  </Box>
                </Grid>
                <Grid item md={1} display={{ xs: "none", sm: "none", md: "block" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <CardMedia
                      component={"img"}
                      src={Images.shineStar}
                      sx={{
                        width: "80px",
                        heigth: "80px",
                        objectFit: "contain"
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px"
                }}
              >
                {selected == "episode" ? (
                  <Fragment>
                    <Typography>
                      Come along with Tara and Shine as they explore enchanting locations and go about their daily activities, discovering important lessons about Islam, being good people, and the importance of family.In their exciting adventures, Tara and Shine visit magical places and experience everyday situations that teach them valuable things. They learn about Islamic teachings, how to be kind and do the right things, and why family is so special.
                    </Typography>
                    <Typography>
                      This amazing series is made to be fun and educational for kids. Tara and Shine's journeys will help children understand Islamic values, learn good morals, and appreciate the love within their familie.Get ready to join Tara and Shine on their wonderful journey, where they learn, grow, and have lots of fun!
                    </Typography>
                  </Fragment>
                ) : (
                  <Grid container>
                    <Grid item md={7}>
                      <Typography>
                        Each episode will provide day-to-day life coloring sheets.
                        Worksheets - will have all different types of activities, coloring,
                      </Typography>
                      <Typography>
                        Copyright 2024 © All rights Reserved By Shine With Tara Design by Sana Kazmi
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Box>
          </Container>
        </Box> */}
        {selected == "episode" ? (
          <Box
            component={"section"}
            sx={{
              background: "#3D5A98",
              height: "100%",
              width: "100%",
              py: "72px",
            }}
          >
            <Slider
              dots={false}
              infinite={true}
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              adaptiveHeight={true}
              variableWidth={false}
              centerMode={true}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    adaptiveHeight: true,
                    variableWidth: false,
                    centerMode: true,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: true,
                    variableWidth: false,
                    adaptiveHeight: true,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: true,
                    variableWidth: false,
                    adaptiveHeight: true,
                  },
                },
              ]}
            >
              {sliderData.map((item, i) => (
                <Box
                  key={i}
                  sx={{ p: 3, borderRadius: "20px", cursor: "pointer" }}
                  component={"div"}
                  onClick={() => window.open(item?.url, "_blank")}
                >
                  <CardMedia
                    component={"img"}
                    src={item.image}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  />
                  <Box
                    sx={{
                      background: Colors.yellow,
                      textAlign: "center",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                      p: 3,
                      // mx: item.title == "Dealing With Sibling"
                      //   ? "32px" : item.title == "5 Pillars With The Neighbors"
                      //     ? "30px" : "31px"
                    }}
                  >
                    <Typography>{item.title}</Typography>
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        ) : (
          <>
            <Box
              component={"section"}
              sx={{
                backgroundImage: `url(${Images.introBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

                position: "relative",
                height: "100%",
                width: "100%",
                py: "72px",
              }}
            >
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
                  textTransform: "uppercase",
                  paddingBottom: { xl: 6, lg: 5, md: 4, sm: 3, xs: 2 },
                  position: "relative", // Ensures alignment with image
                  zIndex: 1, // Keeps heading above the image
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                }}
                style={{
                  WebkitTextStroke: "1px white",
                  WebkitTextFillColor: "#F9BF29",
                }}
              >
                shop
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "3rem 0 5rem 0",
                }}
              >
                <Box
                  sx={{
                    width: "800px",
                    height: { sm: "200px", xs: "320px" },
                    display: "grid",
                    gridTemplateColumns: {
                      md: "repeat(3, 1fr)",
                      sm: "repeat(2, 1fr)",
                      xs: "repeat(1, 1fr)",
                    },
                    gap: "16px",
                    overflow: "hidden",
                    padding: "0 16px", // Adds spacing on left and right sides for xs

                  }}
                >
                  {buttonLabels.map((label, index) => (
                    <Button
                      key={index}
                      onClick={() => handleButtonClick(index)} // Set the clicked button as active
                      sx={{
                        backgroundColor:
                          activeButton === index ? "#F9BF29" : "#5B73AD", // Highlight the active button
                        borderRadius: "8px",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 0,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor:
                            activeButton === index ? "#F9BF29" : "#5B73AD", // Keep the hover effect consistent
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        className="heading-font"
                        sx={{
                          color: "white",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {label}
                      </Typography>
                    </Button>
                  ))}
                </Box>
              </Box>
              {(activeButton === 0 || activeButton === 4) && (
                <Container sx={{ px: { sm: '0px !important', xs: '0px !important' }, }}>
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"center"}
                    sx={{
                      minHeight: "1000px",
                      display: "flex",
                      alignItems:
                        loading || !delayPassed
                          ? "center"
                          : currentCards.length <= 2
                            ? "center"
                            : "flex-start",



                    }}
                  >
                    <Box
                      component={"img"}
                      src={Images.pencil}
                      alt="Decorative"
                      sx={{
                        position: "absolute",
                        top: "450px",
                        right: { md: 10, lg: 200 },
                        width: { lg: "80px", md: "70px" },
                        zIndex: 2,
                        display: { xs: "none", sm: "none", md: "block" },
                      }}
                    />
                    <Box
                      component={"img"}
                      src={Images.cuttingPapers}
                      alt="Decorative"
                      sx={{
                        position: "absolute",
                        bottom: "400px",
                        right: { xl: 200, md: 10, lg: 20 },
                        width: { lg: "100px", md: "70px" },
                        zIndex: 2,
                        display: { xs: "none", sm: "none", md: "block" },
                      }}
                    />
                    <Box
                      component={"img"}
                      src={Images.reading}
                      alt="Decorative"
                      sx={{
                        position: "absolute",
                        top: "100px",
                        left: { md: 10, lg: 200 },
                        width: { lg: "100px", md: "70px" },
                        zIndex: 2,
                        display: { xs: "none", sm: "none", md: "block" },
                        transform: "rotate(-25deg)",
                      }}
                    />

                    {loading || !delayPassed ? (
                      // Show Loader
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "455px",
                        }}
                      >
                        <CircularProgress size={50} sx={{ color: "#ff9d04" }} />
                      </Grid>
                    ) : currentCards.length === 0 ? (
                      // Show "No Data Available" Message
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "455px",
                        }}
                      >
                        <Typography className="para-text" variant="h6" color="textSecondary" sx={{ fontSize: "25px", color: "white" }}>
                          No Data Available
                        </Typography>
                      </Grid>
                    ) : (
                      // Show Cards
                      currentCards.map((card, i) => (
                        <React.Fragment key={i}>
                          <Grid className="product-card" lg={5} md={5} sm={11} xs={11} item>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "20px",
                                position: "relative",
                              }}
                            >
                              <CardMedia
                                className="product-image"
                                component={"img"}
                                src={card?.imgUrl}
                                sx={{
                                  width: "100%",
                                  height: card?.price !== 0 ? "455px" : "455px",
                                  borderRadius: card?.price !== 0 ? "20px 20px 0px 0px" : "20px 20px 0px 0px",

                                }}
                              />
                              {card?.price !== 0 && (
                                <Box
                                  sx={{
                                    backgroundColor: "#FF9D04",
                                    p: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderRadius: "0px 0px 20px 20px",
                                  }}
                                >
                                  <Typography className="heading-font" sx={{ textTransform: "uppercase", fontSize: "20px" }}>
                                    {card?.name}ss
                                  </Typography>
                                  <Typography className="heading-font" sx={{ textTransform: "uppercase", fontSize: "20px" }}>
                                    $ {card?.price}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                            {card?.price !== 0 && (
                              <div
                                className="add-to-cart"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onClick={() => {
                                  addToCart(card);
                                }}
                              >
                                Add To Cart &nbsp;
                                <ShoppingCartIcon sx={{ cursor: "pointer", color: "white" }} />
                              </div>
                            )}
                             {card?.price !== 0 && (
                              <div
                                className="buy-now"
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  paddingLeft:'10px',
                                   paddingRight:'10px'
                                }}
                                onClick={() => {
                                  buyNow(card);
                                }}
                              >
                                Buy Now &nbsp;
                                <LocalMallIcon sx={{ cursor: "pointer", color: "white" }} />
                              </div>
                            )}
                          </Grid>
                        </React.Fragment>
                      ))
                    )}
                  </Grid>

                  {/* Pagination Controls (Only Show if Data is Available) */}
                  {!loading && delayPassed && currentCards.length > 0 && (
                    <>
                      <Box sx={{ width: '90%', margin: '0  auto' }}>
                        <PageNavigator
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPrevPage={handlePrevPage}
                          onNextPage={handleNextPage}
                          onPageClick={handlePageClick}
                          backwardArrow={backwardArrow}
                          forwardArrow={forwardArrow}
                        />
                      </Box>
                    </>
                  )}
                </Container>
              )}

            </Box>
            {activeButton === 4 && (
              <Box
                component={"section"}
                id="activity-section"
                sx={{
                  height: "100%",
                  backgroundImage: `url(${Images.reviewBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  pt: "40px",
                }}
              >
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
                    },
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textTransform: "uppercase",
                    paddingBottom: { xl: 6, lg: 5, md: 4, sm: 3, xs: 2 },
                    position: "relative",
                    zIndex: 1,
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  style={{
                    WebkitTextStroke: "1px white",
                    WebkitTextFillColor: "#F9BF29",
                  }}
                >
                  Activity Sheets
                </Typography>
              </Box>
            )}
            {(activeButton === 1 || activeButton === 4) && (
              <Box
                sx={{
                  position: "relative",
                  "@media (min-width: 1200px)": {
                    maxWidth: "100%", // Set maxWidth to 100% for screens above 1200px
                  },
                  backgroundImage: activeButton === 4 ? `url(${Images.reviewBg})` : `url(${Images.introBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Box
                  component={"img"}
                  src={Images.yellowFlower} // Replace with your image source
                  alt="Decorative"
                  sx={{
                    position: "absolute",
                    top: "1000px", // Adjusted to move the image slightly higher
                    right: { xl: 200, md: 10, lg: 20 },
                    width: { lg: "100px", md: "70px" },
                    zIndex: 2,
                    display: { xs: "none", sm: "none", md: "block" }, // Hide for xs and sm screens
                  }}
                />

                <Container
                  sx={{
                    backgroundImage: activeButton === 4 ? `url(${Images.reviewBg})` : `url(${Images.introBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100%", // Full height
                    padding: "60px 0", // Padding adjustment
                    width: "100%", // Full width
                  }}
                >
                  {/* Grid for activity cards */}
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"center"}
                    sx={{
                      minHeight: "1000px", // Adjust this value based on your card size and rows
                      display: "flex",
                      alignItems:
                        loading ||
                          !delayPassed ||
                          activityLoading ||
                          !activityDelayPassed
                          ? "center" // Center align if loading or delay not passed
                          : currentCards.length <= 2
                            ? "center" // Center align when only 1 or 2 items
                            : "flex-start", // Default alignment
                    }}
                  >
                    {(loading || !delayPassed || activityLoading || !activityDelayPassed) ? (
                      // Loader view with delay
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "455px",
                        }}
                      >
                        <CircularProgress size={50} sx={{ color: "#F9BF29" }} /> {/* Updated loader color */}
                      </Grid>
                    ) : currentCards.length === 0 ? (
                      // Show "No Data Available" Message
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "455px",
                        }}
                      >
                        <Typography
                          className="para-text"
                          variant="h6"
                          color="textSecondary"
                          sx={{ fontSize: "25px", color: "white" }}
                        >
                          No Data Available
                        </Typography>
                      </Grid>
                    ) : (
                      // Display activity cards
                      Array.isArray(activityCurrentProducts) &&
                      activityCurrentProducts.map((card, i) => (
                        <React.Fragment key={i}>
                          <Grid className="product-card" lg={5} md={5} sm={11} xs={11} item>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "20px",
                                position: "relative",
                              }}
                            >
                              <CardMedia
                                className="product-image"
                                component={"img"}
                                src={card?.imgUrl}
                                sx={{
                                  width: "100%",
                                  height: card?.price !== 0 ? "455px" : "455px",
                                  borderRadius: card?.price !== 0 ? "20px 20px 0px 0px" : "20px 20px 0px 0px",

                                }}
                              />
                              {card?.price !== 0 && (
                                <Box
                                  sx={{
                                    backgroundColor: "#FF9D04",
                                    p: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderRadius: "0px 0px 20px 20px",
                                  }}
                                >
                                  <Typography className="heading-font" sx={{ textTransform: "uppercase", fontSize: "20px" }}>
                                    {card?.name}
                                  </Typography>
                                  <Typography className="heading-font" sx={{ textTransform: "uppercase", fontSize: "20px" }}>
                                    $ {card?.price}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                            {card?.price !== 0 && (
                              <div
                                className="add-to-cart"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onClick={() => {
                                  addToCart(card);
                                }}
                              >
                                Add To Cart &nbsp;
                                <ShoppingCartIcon sx={{ cursor: "pointer", color: "white" }} />
                              </div>
                            )}
                              {card?.price !== 0 && (
                              <div
                                className="buy-now"
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  paddingLeft:'10px',
                                   paddingRight:'10px'
                                }}
                                onClick={() => {
                                  buyNow(card);
                                }}
                              >
                                Buy Now &nbsp;
                                <LocalMallIcon sx={{ cursor: "pointer", color: "white" }} />
                              </div>
                            )}
                          </Grid>
                        </React.Fragment>
                      ))
                    )}
                  </Grid>

                  {/* Pagination */}
                  {!loading && delayPassed && currentCards.length > 0 && (
                    <Box sx={{ width: '90%', margin: '0  auto' }}>
                      <PageNavigator
                        currentPage={activityCurrentPage}
                        totalPages={activityTotalPages}
                        onPrevPage={handleActivityPrevPage}
                        onNextPage={handleActivityNextPage}
                        onPageClick={handleActivityPageClick}
                        backwardArrow={backwardArrow}
                        forwardArrow={forwardArrow}
                      />
                    </Box>

                  )}
                </Container>
              </Box>
            )}


            {activeButton === 4 && (
              <Box
                component={"section"}
                id="coloring-section"
                sx={{
                  backgroundImage: `url(${Images.coloringBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "100%",
                  width: "100%",
                  pt: "40px",
                }}
              >
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
                    },
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textTransform: "uppercase",
                    paddingBottom: { xl: 6, lg: 5, md: 4, sm: 3, xs: 2 },
                    position: "relative",
                    zIndex: 1,
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  style={{
                    WebkitTextStroke: "1px white",
                    WebkitTextFillColor: "#F9BF29",
                  }}
                >
                  Coloring Sheets
                </Typography>
              </Box>
            )}
            {(activeButton === 2 || activeButton === 4) && (
              <Box
                sx={{
                  position: "relative",
                  "@media (min-width: 1200px)": {
                    maxWidth: "100%", // Set maxWidth to 100% for screens above 1200px
                  },
                  backgroundImage: activeButton === 4 ? `url(${Images.coloringBg})` : `url(${Images.introBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Container
                  sx={{
                    backgroundImage: activeButton === 4 ? `url(${Images.coloringBg})` : `url(${Images.introBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100%", // Full height
                    padding: "60px 0", // Padding adjustment
                    width: "100%", // Full width
                  }}
                >
                  {/* Absolute positioned image */}
                  <Box
                    component={"img"}
                    src={Images.cuttingPapers} // Replace with your image source
                    alt="Decorative"
                    sx={{
                      position: "absolute",
                      top: "400px", // Adjusted to move the image slightly higher
                      left: { xs: "1px", xl: 200 },
                      width: "100px",
                      zIndex: 2,
                      display: { xs: "none", sm: "none", md: "block" }, // Hide for xs and sm screens
                    }}
                  />
                  <Box
                    component={"img"}
                    src={Images.pencil} // Replace with your image source
                    alt="Decorative"
                    sx={{
                      position: "absolute",
                      top: "800px", // Adjusted to move the image slightly higher
                      right: { xl: 200, md: 10 },
                      width: { lg: "100px", md: "70px" },
                      zIndex: 2,
                      display: { xs: "none", sm: "none", md: "block" }, // Hide for xs and sm screens
                    }}
                  />

                  {/* Grid for activity cards */}
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"center"}
                    sx={{
                      minHeight: "1000px", // Adjust this value based on your card size and rows
                      display: "flex",
                      alignItems:
                        coloringLoading || !coloringDelayPassed
                          ? "center" // Center align if loading or delay not passed
                          : displayedColoringSheets.length <= 2
                            ? "center" // Center align when only 1 or 2 items
                            : "flex-start", // Default alignment
                    }}
                  >
                    {coloringLoading || !coloringDelayPassed ? (
                      // Loader view with delay
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "455px",
                        }}
                      >
                        <CircularProgress size={50} sx={{ color: "#5B73AD" }} />{" "}
                        {/* Updated loader color */}
                      </Grid>
                    ) : currentCards.length === 0 ? (
                      // Show "No Data Available" Message
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "455px",
                        }}
                      >
                        <Typography className="para-text" variant="h6" color="textSecondary" sx={{ fontSize: "25px", color: "white" }}>
                          No Data Available
                        </Typography>
                      </Grid>
                    ) : (
                      // Display coloring cards
                      Array.isArray(displayedColoringSheets) &&
                      displayedColoringSheets.map((card, i) => (
                        <React.Fragment key={i}>
                          <Grid className="product-card" lg={5} md={5} sm={11} xs={11} item>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "20px",
                                position: "relative",
                              }}
                            >
                              <CardMedia
                                className="product-image"
                                component={"img"}
                                src={card?.imgUrl}
                                sx={{
                                  width: "100%",
                                  height: card?.price !== 0 ? "455px" : "455px",
                                  borderRadius: card?.price !== 0 ? "20px 20px 0px 0px" : "20px 20px 0px 0px",

                                }}
                              />
                              {card?.price !== 0 && (
                                <Box
                                  sx={{
                                    backgroundColor: "#FF9D04",
                                    p: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderRadius: "0px 0px 20px 20px",
                                  }}
                                >
                                  <Typography className="heading-font" sx={{ textTransform: "uppercase", fontSize: "20px" }}>
                                    {card?.name}
                                  </Typography>
                                  <Typography className="heading-font" sx={{ textTransform: "uppercase", fontSize: "20px" }}>
                                    $ {card?.price}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                            {card?.price !== 0 && (
                              <div
                                className="add-to-cart"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onClick={() => {
                                  addToCart(card);
                                }}
                              >
                                Add To Cart &nbsp;
                                <ShoppingCartIcon sx={{ cursor: "pointer", color: "white" }} />
                              </div>
                            )}
                              {card?.price !== 0 && (
                              <div
                                className="buy-now"
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  paddingLeft:'10px',
                                   paddingRight:'10px'
                                }}
                                onClick={() => {
                                  buyNow(card);
                                }}
                              >
                                Buy Now &nbsp;
                                <LocalMallIcon sx={{ cursor: "pointer", color: "white" }} />
                              </div>
                            )}
                          </Grid>
                        </React.Fragment>
                      ))
                    )}
                  </Grid>

                  {/* Pagination */}
                  {!loading && delayPassed && currentCards.length > 0 && (
                    <Box sx={{ width: '90%', margin: '0  auto' }}>
                      <PageNavigator
                        currentPage={coloringCurrentPage}
                        totalPages={coloringTotalPages}
                        onPrevPage={handleColoringPrevPage}
                        onNextPage={handleColoringNextPage}
                        onPageClick={handleColoringPageClick}
                        backwardArrow={backwardArrow}
                        forwardArrow={forwardArrow}
                      />
                    </Box>

                  )}
                </Container>
              </Box>
            )}

            {activeButton === 4 && (
              <Box
                component={"section"}
                id="extra-section"
                sx={{
                  height: "100%",
                  backgroundImage: `url(${Images.reviewBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  pt: "40px",
                }}
              >
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
                    },
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textTransform: "uppercase",
                    paddingBottom: { xl: 6, lg: 5, md: 4, sm: 3, xs: 2 },
                    position: "relative",
                    zIndex: 1,
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  style={{
                    WebkitTextStroke: "1px white",
                    WebkitTextFillColor: "#F9BF29",
                  }}
                >
                  Extra Sheets
                </Typography>
              </Box>
            )}

            {(activeButton === 3 || activeButton === 4) && (
              <Box
                sx={{
                  position: "relative",
                  "@media (min-width: 1200px)": {
                    maxWidth: "100%", // Set maxWidth to 100% for screens above 1200px
                  },
                  backgroundImage: activeButton === 4 ? `url(${Images.reviewBg})` : `url(${Images.introBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Container
                  sx={{
                    backgroundImage: activeButton === 4 ? `url(${Images.reviewBg})` : `url(${Images.introBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100%", // Full height
                    padding: "60px 0", // Padding adjustment
                    width: "100%", // Full width
                  }}
                >
                  <Box
                    component={"img"}
                    src={Images.cloud} // Replace with your image source
                    alt="Decorative"
                    sx={{
                      position: "absolute",
                      top: "10px", // Adjusted to move the image slightly higher
                      left: { xl: 200, md: "30px", lg: "60px" },
                      width: { md: "60px", lg: "100px" },
                      zIndex: 2,
                      display: { xs: "none", sm: "none", md: "block" }, // Hide for xs and sm screens
                    }}
                  />
                  <Box
                    component={"img"}
                    src={Images.pinkArrow} // Replace with your image source
                    alt="Decorative"
                    sx={{
                      position: "absolute",
                      top: "1000px", // Adjusted to move the image slightly higher
                      right: { xl: 200, md: 10, lg: 20 },
                      width: { lg: "100px", md: "70px" },
                      zIndex: 2,
                      display: { xs: "none", sm: "none", md: "block" }, // Hide for xs and sm screens
                    }}
                  />

                  {/* Grid for extra sheets */}
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"center"}
                    sx={{
                      minHeight: "1000px", // Adjust this value based on your card size and rows
                      display: "flex",
                      alignItems:
                        extraLoading || !extraDelayPassed
                          ? "center" // Center align if loading or delay not passed
                          : extraCurrentProducts.length <= 2
                            ? "center" // Center align when only 1 or 2 items
                            : "flex-start", // Default alignment
                    }}
                  >
                    {extraLoading || !extraDelayPassed ? (
                      // Loader view with delay
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "455px",
                        }}
                      >
                        <CircularProgress size={50} sx={{ color: "#F9BF29" }} />{" "}
                        {/* Updated loader color */}
                      </Grid>
                    ) : currentCards.length === 0 ? (
                      // Show "No Data Available" Message
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "455px",
                        }}
                      >
                        <Typography className="para-text" variant="h6" color="textSecondary" sx={{ fontSize: "25px", color: "white" }}>
                          No Data Available
                        </Typography>
                      </Grid>
                    ) : (
                      // Display extra sheets cards
                      Array.isArray(extraCurrentProducts) &&
                      extraCurrentProducts.map((card, i) => (
                        <React.Fragment key={i}>
                          <Grid className="product-card" lg={5} md={5} sm={11} xs={11} item>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "20px",
                                position: "relative",
                              }}
                            >
                              <CardMedia
                                className="product-image"
                                component={"img"}
                                src={card?.imgUrl}
                                sx={{
                                  width: "100%",
                                  height: card?.price !== 0 ? "455px" : "455px",
                                  borderRadius: card?.price !== 0 ? "20px 20px 0px 0px" : "20px 20px 0px 0px",

                                }}
                              />
                              {card?.price !== 0 && (
                                <Box
                                  sx={{
                                    backgroundColor: "#FF9D04",
                                    p: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderRadius: "0px 0px 20px 20px",
                                  }}
                                >
                                  <Typography className="heading-font" sx={{ textTransform: "uppercase", fontSize: "20px" }}>
                                    {card?.name}
                                  </Typography>
                                  <Typography className="heading-font" sx={{ textTransform: "uppercase", fontSize: "20px" }}>
                                    $ {card?.price}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                            {card?.price !== 0 && (
                              <div
                                className="add-to-cart"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onClick={() => {
                                  addToCart(card);
                                }}
                              >
                                Add To Cart &nbsp;
                                <ShoppingCartIcon sx={{ cursor: "pointer", color: "white" }} />
                              </div>
                            )}
                              {card?.price !== 0 && (
                              <div
                                className="buy-now"
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  paddingLeft:'10px',
                                   paddingRight:'10px'
                                }}
                                onClick={() => {
                                  buyNow(card);
                                }}
                              >
                                Buy Now &nbsp;
                                <LocalMallIcon sx={{ cursor: "pointer", color: "white" }} />
                              </div>
                            )}
                          </Grid>
                        </React.Fragment>
                      ))
                    )}
                  </Grid>

                  {/* Pagination */}
                  {!loading && delayPassed && currentCards.length > 0 && (
                    <Box sx={{ width: '90%', margin: '0  auto' }}>
                      <PageNavigator
                        currentPage={extraCurrentPage}
                        totalPages={extraTotalPages}
                        onPrevPage={handleExtraPrevPage}
                        onNextPage={handleExtraNextPage}
                        onPageClick={handleExtraPageClick}
                        backwardArrow={backwardArrow}
                        forwardArrow={forwardArrow}
                      />
                    </Box>

                  )}
                </Container>
              </Box>
            )}



            <Box
              component={"section"}
              sx={{
                position: "relative",
                backgroundColor: activeButton === 4 ? "#FF9D04" : "#5B73AD",
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
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  right: { xl: 280, lg: 50, md: 50 },
                  zIndex: 0,
                  display: "block",
                  width: "60px",
                  display: { sm: "none", xs: "none", md: "block" },

                }}
                component={"img"}
                src={Images.rainbow}
              ></Box>
              <CardMedia
                component={"img"}
                src={Images.handImg} // Replace with your small image source
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

                          WebkitTextStroke: "1px white",
                          WebkitTextFillColor: "#F9BF29",

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
                        width: { sm: "100%", xs: "100%" },
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
                  left: isIOS && isMobile ? -110 : { xl: 230, lg: 0, md: 0, xs: 0, sm: 0 },
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
                    width: isIOS && isMobile ? "80%" : "100%", // Adjust width for smaller screens
                    height: isIOS && isMobile ? "160px" : { xs: "180px", sm: "180px", md: "500px" }, // Adjust height for smaller screens
                    objectFit: isIOS && isMobile ? "contain" : "cover",
                  }}
                />
              </Box>

              {/* Right Background Image */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: isIOS && isMobile ? -180 : { xs: "0", xl: 280 },
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
                    height: isIOS && isMobile ? "160px" : { xs: "180px", sm: "180px", md: "500px" }, // Adjust height for smaller screens
                    objectFit: isIOS && isMobile ? "contain" : "cover",

                  }}
                />
              </Box>
            </Box>
          </>
        )}

        {/* <Box
          component={"section"}
          sx={{
            background: Colors.lightPurple,
            py: "80px"
          }}
        >
          <Container>
            <Grid container justifyContent={"center"} alignItems={"center"}>
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
                  variant='h3'
                  sx={{
                    fontSize: { md: "48px", sm: "40px", xs: "32px" },
                    fontWeight: 600,
                    textAlign: "center"
                  }}
                >
                  Collaborating With
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
              <Grid item md={12}>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontSize: { md: "58px", xs: "40px" },
                    fontWeight: 900,
                    color: Colors.primary
                  }}
                >
                  Islamic Relief Canada
                </Typography>
              </Grid>
            </Grid>
            <Box>
            </Box>
            <Box>
              <CardMedia
                component={"img"}
                src={Images.islamicRelief}
                sx={{
                  width: "100%",
                  height: { md: "350px", xs: "150px" },
                  objectFit: "contain"
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid container justifyContent={"center"} lg={6} md={6} sm={12}>
                <Button
                  fullWidth
                  variant='contained'
                  sx={{
                    mt: 2,
                    py: 2,
                    px: 1,
                    textTransform: "capitalize",
                    fontSize: "18px",
                    textAlign: 'center'
                  }}
                  target='blank'
                  href='https://www.youtube.com/playlist?list=PLDQNq7EHiGH9lHkx1jYLhwwv4AtCXesaK'
                >
                  See More
                </Button>
              </Grid>
            </Box>
          </Container>
        </Box> */}
        {/* <Box
          component={"section"}
          sx={{
            background: Colors.whiteblue,
            p: { md: "64px", sm: "40px", xs: "20px" }
          }}
        >
          <Grid
            container
            sx={{
              background: Colors.secondaryGradient,
              borderRadius: "25px",
              height: { md: "320px", sm: "100%", xs: "100%" },
              justifyContent: "space-between",
              alignItems: "center",
              p: 2
            }}
          >
            <Grid item md={2} display={{ md: "block", sm: "none", xs: "none" }}>
              <CardMedia
                component={"img"}
                src={Images.girl1}
                sx={{
                  width: "170px",
                  height: "250px",
                  objectFit: "contain"
                }}
              />
            </Grid>
            <Grid item md={8}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: { md: "50px", xs: "25px" }
                }}
              >
                <Typography
                  variant='h5'
                  sx={{
                    fontSize: { md: "24px", xs: "16px" },
                    fontWeight: 600,
                    textAlign: "center"
                  }}
                >
                  Subscribe to get information, latest news and other
                  interesting offers about Shine With Tara
                </Typography>
                <TextField
                  placeholder={"Your email"}
                  sx={{
                    background: Colors.white,
                    borderRadius: "4px",
                    width: { md: "60%", xs: "100%" },
                    "& fieldset": {
                      border: "none",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: `${Colors.primary} !important`
                    }
                  }}
                  InputProps={{
                    endAdornment:
                      <Button
                        sx={{
                          color: `${Colors.white} !important`,
                          background: `${Colors.primary} !important`,
                          px: 4,
                          textTransform: "capitalize"
                        }}
                      >
                        Subscribe
                      </Button>
                  }}
                />
              </Box>
            </Grid>
            <Grid item md={2} display={{ md: "block", sm: "none", xs: "none" }}>
              <CardMedia
                component={"img"}
                src={Images.finalPose}
                sx={{
                  width: "200px",
                  height: "280px",
                  objectFit: "contain"
                }}
              />
            </Grid>
          </Grid>
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

export default Shop;