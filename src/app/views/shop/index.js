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
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
import { setCart, CartContext } from "../../Context/CartContext";
import { CartCounter } from "../../Context/CartCounter";
import taraImage from "../../assets/images/tara-pic.webp";
import shopImg1 from "../../assets/images/shop-intro.webp";
import shopBackground from "../../assets/images/shop-background.webp";
import forwardArrow from "../../assets/images/forward-arrow.webp";
import backwardArrow from "../../assets/images/backward-arrow.webp";
import PageNavigator from "../../components/pagination/index";
import Character1 from "../../assets/images/Character1.webp";
import Character2 from "../../assets/images/Character2.webp";
import { ErrorToaster, SuccessToaster } from "../../components/Toaster";
import moment from "moment";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase.config";
import { AuthContext } from "../../Context/AuthContext";

// import "slick-carousel/slick/slick-theme.css";

function Shop() {
  const { state } = useLocation();
  const { cartVisible, toggleCartVisibility } = useContext(CartContext);
  const { setCount } = useContext(CartCounter);

  

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
  const [toys, setToys] = useState([])
  const [generalToys, setGeneralToys] = useState([])
  const [extraSheets, setExtraSheets] = useState([]);
  const { user, setUser } = useContext(AuthContext);
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
  const [toysCurrentPage, setToysCurrentPage] = useState(1);
  const [generaloysCurrentPage, setGeneralToysCurrentPage] = useState(1);
  const [coloringCurrentPage, setColoringCurrentPage] = useState(1);
  const [activeButton, setActiveButton] = useState(0); // Default 'Show All Products' is active
  const [loading, setLoading] = useState(true); // Loader state
  const [delayPassed, setDelayPassed] = useState(false); // Delay state to control the visibility of loader
  const [cartData, setCartData] = useState(null);

  const buttonLabels = [
    "Books",
    "Activity Sheets",
    "Coloring Sheets",
    "Extra",
    "Toys",
    "General Toys",
    "Show All Products",
  ];

  const handleGoogleLogin = async () => {

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info: ", user);
      if (user) {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "users"), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          lastLogin: moment().format('DD/MM/YYYY')
        });
        console.log("Document written with ID: ", docRef.id);
      }
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      // Handle user info here (e.g., save to state, context, or redirect)
    } catch (error) {
      console.error("Error during Google login: ", error);
    }
  };
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

  // Handle previous page
  const handleToyPrevPage = () => {
    if (toysCurrentPage > 1) {
      setToysCurrentPage((prev) => prev - 1);
    }
  };

  // Handle next page
  const handleToyNextPage = () => {
    if (toysCurrentPage < ToysTotalPages) {
      setToysCurrentPage((prev) => prev + 1);
    }
  };

  // Handle page number click
  const handleToyPageClick = (page) => {
    setToysCurrentPage(page);
  };

  // Handle previous page
  const handleGeneralToyPrevPage = () => {
    if (toysCurrentPage > 1) {
      setGeneralToysCurrentPage((prev) => prev - 1);
    }
  };

  // Handle next page
  const handleGeneralToyNextPage = () => {
    if (toysCurrentPage < ToysTotalPages) {
      setGeneralToysCurrentPage((prev) => prev + 1);
    }
  };

  // Handle page number click
  const handleGeneralToyPageClick = (page) => {
    setGeneralToysCurrentPage(page);
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

  // Activity Pagination
  const ToysPerPage = 4; // Show 4 cards per page
  const ToysTotalPages = Math.ceil(
    toys.length / ToysPerPage
  );
  const toysCurrentProducts = toys.slice(
    (toysCurrentPage - 1) * ToysPerPage,
    toysCurrentPage * ToysPerPage
  );
  const GeneralToysPerPage = 4; // Show 4 cards per page
  const GeneralToysTotalPages = Math.ceil(
    toys.length / GeneralToysPerPage
  );
  const generalToysCurrentProducts = generalToys.slice(
    (generaloysCurrentPage - 1) * ToysPerPage,
    generaloysCurrentPage * ToysPerPage
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
  const getToys = async () => {
    const q = query(collection(db, "Toys"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const sortedData = dataArray.sort((a, b) => {
      return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
    });
    console.log(sortedData);

    setToys(sortedData);
  };
  const getGeneralToys = async () => {
    const q = query(collection(db, "GeneralToys"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const sortedData = dataArray.sort((a, b) => {
      return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
    });
    console.log(sortedData);

    setGeneralToys(sortedData);
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
    getGeneralToys()
    getReviews();
    getToys()
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
        console.log(cartDoc.data);
        console.log(data?.id);
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
      // ErrorToaster("Something Went Wrong");
      handleGoogleLogin()
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
      // ErrorToaster("Something Went Wrong");
      handleGoogleLogin()
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
        {/* <Box
          sx={{
            backgroundImage: `url(${Images.bannerBg})`,

            backgroundSize: "cover",
            backgroundPosition: "bottom center",
            width: "100%",
            height: { md: "578px", xs: "490px", xl: "730px" },
            position: "relative", 
            overflow: "hidden", 
          }}
        >
          
          <Box
            sx={{
              margin: "0 auto",
              width: { md: "100%", sm: "100%", xs: "100%" }, 
              height: "100%", 
              backgroundImage: `url(${shopImg1})`,
              backgroundSize: {
                md: "contain",
                xl: "contain",
                lg: "contain",
                xs: "cover",
                sm: "contain",
              },
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
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
                backgroundImage: `url(${Images.mainBGPink})`,
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
              {(activeButton === 0 || activeButton === 6) && (
                <Container sx={{ px: { sm: '0px !important', xs: '0px !important' }, }}>
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"center"}
                    sx={{

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
                          <Grid component={'div'}
                            className="product-card" lg={5} md={5} sm={11} xs={11} item>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "20px",
                                position: "relative",
                              }}
                            >

                              <Box sx={{ position: 'absolute', bottom: 100, width: "100%", right: 15 }}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    width: '100%',
                                  }}
                                >
                                  {[
                                    { icon: <ShoppingCartIcon />, action: () => addToCart(card), text: 'Add to Cart' },
                                    { icon: <LocalMallIcon />, action: () => buyNow(card), text: 'Buy Now' },
                                    { 
                                      icon: <OpenInNewIcon />, 
                                      action: () => navigate(`/${card?.type === 'bundle' ? 'bundle-detail' : 'products-detail'}/${card?.id}`, { state: { card } }), 
                                      text: 'View Details'  
                                    }
                                  ].map((item, index) => (
                                    <Box
                                      key={index}
                                      mt={2}
                                      sx={{
                                        backgroundColor: '#FF9D04',
                                        width: '40px',
                                        height: '40px',
                                        color: 'white',
                                        borderRadius: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        transition: 'width 0.3s ease-in-out',
                                        '&:hover': {
                                          width: '150px', // Adjust width to fit text
                                          justifyContent: 'flex-start',
                                          paddingLeft: '10px',
                                        },
                                        cursor: 'pointer',
                                      }}
                                      onClick={item.action}
                                    >
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 1, // Provides space between icon and text
                                          width: '100%',
                                          ml:'15px'
                                        }}
                                      >
                                        {item.icon}
                                        <Box
                                          component="span"
                                          sx={{
                                            color: 'white !important',
                                            fontSize: '14px',
                                            whiteSpace: 'nowrap',
                                           
                                            transition: 'opacity 0.2s ease-in-out',
                                            '&:hover': {
                                             
                                              color: 'white',
                                            },
                                          }}
                                        >
                                          {item.text}
                                        </Box>
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>


                              </Box>
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

                                    borderRadius: "0px 0px 20px 20px",
                                  }}
                                >

                                  <Box
                                    sx={{
                                      backgroundColor: "#FF9D04",
                                      mt: 1,
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

                                </Box>
                              )}
                            </Box>

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
            {activeButton === 6 && (
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

            {(activeButton === 1 || activeButton === 6) && (
              <Box
                sx={{
                  position: "relative",
                  "@media (min-width: 1200px)": {
                    maxWidth: "100%", // Set maxWidth to 100% for screens above 1200px
                  },
                  backgroundImage: activeButton === 6 ? `url(${Images.reviewBg})` : `url(${Images.mainBGPink})`,
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
                    backgroundImage: activeButton === 6 ? `url(${Images.reviewBg})` : `url(${Images.mainBGPink})`,
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
                      // Adjust this value based on your card size and rows
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
                          <Grid className="product-card" component={'div'} lg={5} md={5} sm={11} xs={11} item>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "20px",
                                position: "relative",
                              }}
                            >
                              <Box sx={{ position: 'absolute', bottom: 100, width: "100%", right: 15 }}>
                              <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    width: '100%',
                                  }}
                                >
                                  {[
                                    { icon: <ShoppingCartIcon />, action: () => addToCart(card), text: 'Add to Cart' },
                                    { icon: <LocalMallIcon />, action: () => buyNow(card), text: 'Buy Now' },
                                    { 
                                      icon: <OpenInNewIcon />, 
                                      action: () => navigate(`/${card?.type === 'bundle' ? 'bundle-detail' : 'products-detail'}/${card?.id}`, { state: { card } }), 
                                      text: 'View Details'  
                                    }
                                  ].map((item, index) => (
                                    <Box
                                      key={index}
                                      mt={2}
                                      sx={{
                                        backgroundColor: '#FF9D04',
                                        width: '40px',
                                        height: '40px',
                                        color: 'white',
                                        borderRadius: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        transition: 'width 0.3s ease-in-out',
                                        '&:hover': {
                                          width: '150px', // Adjust width to fit text
                                          justifyContent: 'flex-start',
                                          paddingLeft: '10px',
                                        },
                                        cursor: 'pointer',
                                      }}
                                      onClick={item.action}
                                    >
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 1, // Provides space between icon and text
                                          width: '100%',
                                          ml:'15px'
                                        }}
                                      >
                                        {item.icon}
                                        <Box
                                          component="span"
                                          sx={{
                                            color: 'white !important',
                                            fontSize: '14px',
                                            whiteSpace: 'nowrap',
                                           
                                            transition: 'opacity 0.2s ease-in-out',
                                            '&:hover': {
                                             
                                              color: 'white',
                                            },
                                          }}
                                        >
                                          {item.text}
                                        </Box>
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
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


            {activeButton === 6 && (
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
            {(activeButton === 2 || activeButton === 6) && (
              <Box
                sx={{
                  position: "relative",
                  "@media (min-width: 1200px)": {
                    maxWidth: "100%", // Set maxWidth to 100% for screens above 1200px
                  },
                  backgroundImage: activeButton === 6 ? `url(${Images.coloringBg})` : `url(${Images.mainBGPink})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Container
                  sx={{
                    backgroundImage: activeButton === 6 ? `url(${Images.coloringBg})` : `url(${Images.mainBGPink})`,
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
                      // Adjust this value based on your card size and rows
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
                          <Grid className="product-card" component={'div'} lg={5} md={5} sm={11} xs={11} item>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "20px",
                                position: "relative",
                              }}
                            >
                              <Box sx={{ position: 'absolute', bottom: 100, width: "100%", right: 15 }}>
                              <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    width: '100%',
                                  }}
                                >
                                  {[
                                    { icon: <ShoppingCartIcon />, action: () => addToCart(card), text: 'Add to Cart' },
                                    { icon: <LocalMallIcon />, action: () => buyNow(card), text: 'Buy Now' },
                                    { 
                                      icon: <OpenInNewIcon />, 
                                      action: () => navigate(`/${card?.type === 'bundle' ? 'bundle-detail' : 'products-detail'}/${card?.id}`, { state: { card } }), 
                                      text: 'View Details'  
                                    }
                                  ].map((item, index) => (
                                    <Box
                                      key={index}
                                      mt={2}
                                      sx={{
                                        backgroundColor: '#FF9D04',
                                        width: '40px',
                                        height: '40px',
                                        color: 'white',
                                        borderRadius: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        transition: 'width 0.3s ease-in-out',
                                        '&:hover': {
                                          width: '150px', // Adjust width to fit text
                                          justifyContent: 'flex-start',
                                          paddingLeft: '10px',
                                        },
                                        cursor: 'pointer',
                                      }}
                                      onClick={item.action}
                                    >
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 1, // Provides space between icon and text
                                          width: '100%',
                                          ml:'15px'
                                        }}
                                      >
                                        {item.icon}
                                        <Box
                                          component="span"
                                          sx={{
                                            color: 'white !important',
                                            fontSize: '14px',
                                            whiteSpace: 'nowrap',
                                           
                                            transition: 'opacity 0.2s ease-in-out',
                                            '&:hover': {
                                             
                                              color: 'white',
                                            },
                                          }}
                                        >
                                          {item.text}
                                        </Box>
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
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
          
            {activeButton === 6 && (
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
                  Extra
                </Typography>
              </Box>
            )}

            {(activeButton === 3 || activeButton === 6) && (
              <Box
                sx={{
                  position: "relative",
                  "@media (min-width: 1200px)": {
                    maxWidth: "100%", // Set maxWidth to 100% for screens above 1200px
                  },
                  backgroundImage: activeButton === 6 ? `url(${Images.reviewBg})` : `url(${Images.mainBGPink})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Container
                  sx={{
                    backgroundImage: activeButton === 6 ? `url(${Images.reviewBg})` : `url(${Images.mainBGPink})`,
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

                  {/* Grid for Extra */}
                  <Grid
                    container
                    spacing={2}
                    justifyContent={"center"}
                    sx={{
                      // Adjust this value based on your card size and rows
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
                      // Display Extra cards
                      Array.isArray(extraCurrentProducts) &&
                      extraCurrentProducts.map((card, i) => (
                        <React.Fragment key={i}>
                          <Grid className="product-card" component={'div'} lg={5} md={5} sm={11} xs={11} item>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "20px",
                                position: "relative",
                              }}
                            >
                              <Box sx={{ position: 'absolute', bottom: 100, width: "100%", right: 15 }}>
                              <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    width: '100%',
                                  }}
                                >
                                  {[
                                    { icon: <ShoppingCartIcon />, action: () => addToCart(card), text: 'Add to Cart' },
                                    { icon: <LocalMallIcon />, action: () => buyNow(card), text: 'Buy Now' },
                                    { 
                                      icon: <OpenInNewIcon />, 
                                      action: () => navigate(`/${card?.type === 'bundle' ? 'bundle-detail' : 'products-detail'}/${card?.id}`, { state: { card } }), 
                                      text: 'View Details'  
                                    }
                                  ].map((item, index) => (
                                    <Box
                                      key={index}
                                      mt={2}
                                      sx={{
                                        backgroundColor: '#FF9D04',
                                        width: '40px',
                                        height: '40px',
                                        color: 'white',
                                        borderRadius: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        transition: 'width 0.3s ease-in-out',
                                        '&:hover': {
                                          width: '150px', // Adjust width to fit text
                                          justifyContent: 'flex-start',
                                          paddingLeft: '10px',
                                        },
                                        cursor: 'pointer',
                                      }}
                                      onClick={item.action}
                                    >
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 1, // Provides space between icon and text
                                          width: '100%',
                                          ml:'15px'
                                        }}
                                      >
                                        {item.icon}
                                        <Box
                                          component="span"
                                          sx={{
                                            color: 'white !important',
                                            fontSize: '14px',
                                            whiteSpace: 'nowrap',
                                           
                                            transition: 'opacity 0.2s ease-in-out',
                                            '&:hover': {
                                             
                                              color: 'white',
                                            },
                                          }}
                                        >
                                          {item.text}
                                        </Box>
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
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

{activeButton === 4 || activeButton === 6 && (
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
                  Toys
                </Typography>
              </Box>
            )}
            {(activeButton === 6 || activeButton === 4) && (
              <Box
                sx={{
                  position: "relative",
                  "@media (min-width: 1200px)": {
                    maxWidth: "100%", // Set maxWidth to 100% for screens above 1200px
                  },
                  backgroundImage: activeButton === 4 ? `url(${Images.coloringBg})` : `url(${Images.mainBGPink})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Container
                  sx={{
                    backgroundImage: activeButton === 4 ? `url(${Images.coloringBg})` : `url(${Images.mainBGPink})`,
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
                      // Adjust this value based on your card size and rows
                      display: "flex",
                      alignItems:
                        coloringLoading || !coloringDelayPassed
                          ? "center" // Center align if loading or delay not passed
                          : toysCurrentProducts.length <= 2
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
                    ) : toysCurrentProducts.length === 0 ? (
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
                      Array.isArray(toysCurrentProducts) &&
                      toysCurrentProducts.map((card, i) => (
                        <React.Fragment key={i}>
                          <Grid className="product-card" component={'div'} lg={5} md={5} sm={11} xs={11} item>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "20px",
                                position: "relative",
                              }}
                            >
                              <Box sx={{ position: 'absolute', bottom: 100, width: "100%", right: 15 }}>
                              <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    width: '100%',
                                  }}
                                >
                                  {[
                                    { icon: <ShoppingCartIcon />, action: () => addToCart(card), text: 'Add to Cart' },
                                    { icon: <LocalMallIcon />, action: () => buyNow(card), text: 'Buy Now' },
                                    { 
                                      icon: <OpenInNewIcon />, 
                                      action: () => navigate(`/${card?.type === 'bundle' ? 'bundle-detail' : 'products-detail'}/${card?.id}`, { state: { card } }), 
                                      text: 'View Details'  
                                    }
                                  ].map((item, index) => (
                                    <Box
                                      key={index}
                                      mt={2}
                                      sx={{
                                        backgroundColor: '#FF9D04',
                                        width: '40px',
                                        height: '40px',
                                        color: 'white',
                                        borderRadius: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        transition: 'width 0.3s ease-in-out',
                                        '&:hover': {
                                          width: '150px', // Adjust width to fit text
                                          justifyContent: 'flex-start',
                                          paddingLeft: '10px',
                                        },
                                        cursor: 'pointer',
                                      }}
                                      onClick={item.action}
                                    >
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 1, // Provides space between icon and text
                                          width: '100%',
                                          ml:'15px'
                                        }}
                                      >
                                        {item.icon}
                                        <Box
                                          component="span"
                                          sx={{
                                            color: 'white !important',
                                            fontSize: '14px',
                                            whiteSpace: 'nowrap',
                                           
                                            transition: 'opacity 0.2s ease-in-out',
                                            '&:hover': {
                                             
                                              color: 'white',
                                            },
                                          }}
                                        >
                                          {item.text}
                                        </Box>
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
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

                          </Grid>
                        </React.Fragment>
                      ))
                    )}
                  </Grid>

                  {/* Pagination */}
                  {!loading && delayPassed && toysCurrentProducts.length > 0 && (
                    <Box sx={{ width: '90%', margin: '0  auto' }}>
                      <PageNavigator
                        currentPage={toysCurrentPage}
                        totalPages={ToysTotalPages}
                        onPrevPage={handleToyPrevPage}
                        onNextPage={handleToyNextPage}
                        onPageClick={handleToyPageClick}
                        backwardArrow={backwardArrow}
                        forwardArrow={forwardArrow}
                      />
                    </Box>

                  )}
                </Container>
              </Box>
            )}
            {activeButton === 5 || activeButton === 6  && (
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
                  General Toys
                </Typography>
              </Box>
            )}
            {(activeButton === 6 || activeButton === 5) && (
              <Box
                sx={{
                  position: "relative",
                  "@media (min-width: 1200px)": {
                    maxWidth: "100%", // Set maxWidth to 100% for screens above 1200px
                  },
                  backgroundImage: activeButton === 5 ? `url(${Images.coloringBg})` : `url(${Images.mainBGPink})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Container
                  sx={{
                    backgroundImage: activeButton === 5 ? `url(${Images.coloringBg})` : `url(${Images.mainBGPink})`,
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
                      // Adjust this value based on your card size and rows
                      display: "flex",
                      alignItems:
                        coloringLoading || !coloringDelayPassed
                          ? "center" // Center align if loading or delay not passed
                          : generalToysCurrentProducts.length <= 2
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
                    ) : generalToysCurrentProducts.length === 0 ? (
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
                      Array.isArray(generalToysCurrentProducts) &&
                      generalToysCurrentProducts.map((card, i) => (
                        <React.Fragment key={i}>
                          <Grid className="product-card" component={'div'} lg={5} md={5} sm={11} xs={11} item>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "20px",
                                position: "relative",
                              }}
                            >
                              <Box sx={{ position: 'absolute', bottom: 100, width: "100%", right: 15 }}>
                              <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    width: '100%',
                                  }}
                                >
                                  {[
                                    { icon: <ShoppingCartIcon />, action: () => addToCart(card), text: 'Add to Cart' },
                                    { icon: <LocalMallIcon />, action: () => buyNow(card), text: 'Buy Now' },
                                    { 
                                      icon: <OpenInNewIcon />, 
                                      action: () => navigate(`/${card?.type === 'bundle' ? 'bundle-detail' : 'products-detail'}/${card?.id}`, { state: { card } }), 
                                      text: 'View Details'  
                                    }
                                  ].map((item, index) => (
                                    <Box
                                      key={index}
                                      mt={2}
                                      sx={{
                                        backgroundColor: '#FF9D04',
                                        width: '40px',
                                        height: '40px',
                                        color: 'white',
                                        borderRadius: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        transition: 'width 0.3s ease-in-out',
                                        '&:hover': {
                                          width: '150px', // Adjust width to fit text
                                          justifyContent: 'flex-start',
                                          paddingLeft: '10px',
                                        },
                                        cursor: 'pointer',
                                      }}
                                      onClick={item.action}
                                    >
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 1, // Provides space between icon and text
                                          width: '100%',
                                          ml:'15px'
                                        }}
                                      >
                                        {item.icon}
                                        <Box
                                          component="span"
                                          sx={{
                                            color: 'white !important',
                                            fontSize: '14px',
                                            whiteSpace: 'nowrap',
                                           
                                            transition: 'opacity 0.2s ease-in-out',
                                            '&:hover': {
                                             
                                              color: 'white',
                                            },
                                          }}
                                        >
                                          {item.text}
                                        </Box>
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
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

                          </Grid>
                        </React.Fragment>
                      ))
                    )}
                  </Grid>

                  {/* Pagination */}
                  {!loading && delayPassed && generalToysCurrentProducts.length > 0 && (
                    <Box sx={{ width: '90%', margin: '0  auto' }}>
                      <PageNavigator
                        currentPage={generaloysCurrentPage}
                        totalPages={GeneralToysTotalPages}
                        onPrevPage={handleGeneralToyPrevPage}
                        onNextPage={handleGeneralToyNextPage}
                        onPageClick={handleToyPageClick}
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
                backgroundImage: `url(${Images.reviewBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: { xs: "260px", sm: "250px", md: "500px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: { xs: "10px", sm: "10px", md: "10px" },

              }}
            >
        
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


      </Box>
    </>
  );
}

export default Shop;