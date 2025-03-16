

import React, { useContext, useEffect, useState, useRef } from "react"
import { Box, Button, CardMedia, Grid, Typography, TextField, Drawer, Rating, useMediaQuery, IconButton } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import TwitterIcon from "@mui/icons-material/Twitter"


import { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from "../../assets/images"
import Images from "../../assets/images"
import Colors from "../../styles/colors"
import "slick-carousel/slick/slick.css"
import "../../../App.css"
import Fonts from "../../styles/fonts"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, getDocs, query } from "firebase/firestore"
import { isIOS, isMobile } from "react-device-detect"
import { useLocation, useNavigate } from "react-router-dom"
import { Avatar, Divider } from "antd"
import CloseIcon from "@mui/icons-material/Close"
import { SwiperSlide, Swiper } from "swiper/react"
import "swiper/css"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import { CartContext } from "../../Context/CartContext"
import { CartCounter } from "../../Context/CartCounter"
import introImage from "../../assets/images/intro-pic.webp"
import taraImage from "../../assets/images/tara-pic.webp"
import starImg from "../../assets/images/star.webp"
import rainbowImg from "../../assets/images/rainbow.webp"
import haveforyou from "../../assets/images/haveforyou.webp"
import Aos from "aos"
import "aos/dist/aos.css"

// Preload critical images
const preloadImages = () => {
  const criticalImages = [
    Images.bannerBg,
    Images.aboutImg1,
    Images.mainTara,
    Images.sliderFamily1,
    Images.sliderFamily2,
    Images.vector,
    Images.vectorStarFrame,
    Images.pagesNavBg,
    Images.reviewBg,
    Images.mainBGPink,
  ]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

function Home() {
  const isSmallScreen = useMediaQuery("(max-width:900px)")
  const [highLighted, setHighlighted] = useState("I")
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    about: false,
    intro: false,
    navigation: false,
    reviews: false,
    subscribe: false,
  })

  const { state } = useLocation()
  const { cartVisible, toggleCartVisibility } = useContext(CartContext)
  const { setCount } = useContext(CartCounter)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoSlideInterval, setAutoSlideInterval] = useState(null)
  const CarouselItems = [
    { title: "Review 1", text: "Lorem ipsum dolor sit amet.", img: Images.aboutImg1 },
    { title: "Review 2", text: "Consectetur adipiscing elit.", img: Images.Character1 },
    { title: "Review 3", text: "Sed do eiusmod tempor incididunt." },
  ]

  const sliderImages1 = [
    Images.sliderCharacter1,
    Images.sliderCharacter2,
    Images.sliderCharacter3,
    Images.sliderCharacter4,
    Images.sliderCharacter5,
    Images.sliderCharacter6,
    Images.sliderCharacter7,
  ]

  const sliderImages2 = [
    Images.sliderCharacter8,
    Images.sliderCharacter9,
    Images.sliderCharacter10,
    Images.sliderCharacter11,
    Images.sliderCharacter12,
    Images.sliderCharacter13,
    Images.sliderCharacter14,
  ]

  // Firebase setup
  const firebaseConfig = {
    apiKey: "AIzaSyCn_Ph5AlAi_wuxR0D7CBIY8_vBCNgD5r8",
    authDomain: "shinetara-86ec0.firebaseapp.com",
    projectId: "shinetara-86ec0",
    storageBucket: "shinetara-86ec0.appspot.com",
    messagingSenderId: "182521981077",
    appId: "1:182521981077:web:3cadc9d70d7fc25fab939c",
    measurementId: "G-BHYZDHJCK9",
  }

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const [selected, setSelected] = useState("episode")
  const [products, setProducts] = useState([])
  const [textColor, setTextColor] = useState(Colors.orange)

  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardProduct, setCardProduct] = useState({})
  const [coloringSheets, setColoringSheets] = useState([])
  const [activitySheets, setActivitySheets] = useState([])
  const [extraSheets, setExtraSheets] = useState([])

  const [open, setOpen] = useState(false)
  const [cartArray, setCartArray] = useState([])
  const [cartItems, setCartItems] = useState(products)
  const [faqData, setFaqData] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [reviewBoxes, setReviewBoxes] = useState([])
  const [activeCard, setActiveCard] = useState(0)
  const swiperRef = useRef(null)

  // Optimize carousel auto-sliding
  useEffect(() => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval)
    }

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % CarouselItems.length)
    }, 3000)

    setAutoSlideInterval(interval)

    return () => {
      clearInterval(interval)
    }
  }, [CarouselItems.length])

  // Optimize text color changing
  useEffect(() => {
    const intervalId = setInterval(() => {
      setHighlighted((prev) => {
        if (prev === "I") return "am"
        if (prev === "am") return "shine"
        return "I"
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  // Preload images when component mounts
  useEffect(() => {
    preloadImages()

    // Set a timeout to mark images as loaded even if they're not all loaded
    // This prevents infinite loading screens
    const timeout = setTimeout(() => {
      setImagesLoaded(true)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  // Implement intersection observer for lazy loading sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          setVisibleSections((prev) => ({
            ...prev,
            [sectionId]: true,
          }))
        }
      })
    }, observerOptions)

    // Observe sections
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      sectionObserver.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        sectionObserver.unobserve(section)
      })
    }
  }, [imagesLoaded])

  // Initialize AOS with optimized settings
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
      once: true, // Changed to true to prevent re-animation on scroll
      mirror: false,
      disable: "mobile", // Disable on mobile for better performance
    })
  }, [])

  // Optimize Firebase data fetching
  const getFaqs = async () => {
    try {
      const q = query(collection(db, "Faq"))
      const querySnapshot = await getDocs(q)
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setFaqData(dataArray)
    } catch (error) {
      console.error("Error fetching FAQs:", error)
    }
  }

  const getReviews = async () => {
    try {
      const q = query(collection(db, "reviews"))
      const querySnapshot = await getDocs(q)
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setReviewBoxes(dataArray)
    } catch (error) {
      console.error("Error fetching reviews:", error)
    }
  }

  const getProducts = async () => {
    try {
      const q = query(collection(db, "products"))
      const querySnapshot = await getDocs(q)
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      const sortedData = dataArray.sort((a, b) => {
        return a.price === "0" ? 1 : b.price === "0" ? -1 : 0
      })

      setProducts(sortedData)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  // Combine data fetching into a single useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getProducts(), getReviews(), getFaqs()])

        // Handle scrolling to section if needed
        if (state?.colorful) {
          setSelected("merchandise")

          setTimeout(() => {
            const element = document.getElementById(state?.section)
            if (element) {
              element.scrollIntoView({ behavior: "smooth" })
            }
          }, 2000)
        }

        // Load cart data from localStorage
        const cart = localStorage.getItem("cartData")
        if (cart) {
          const parsedCart = JSON.parse(cart)
          if (parsedCart?.length > 0) {
            setCartItems(parsedCart)
            setCount(parsedCart.length)
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  // Update drawer state when cart visibility changes
  useEffect(() => {
    setOpen(cartVisible)
  }, [cartVisible])

  // Cart functions
  const handleIncrement = (id) => {
    const updatedData = cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    const totalPrice = updatedData.reduce((total, item) => {
      return total + Number.parseFloat(item.price) * item.quantity
    }, 0)
    setTotalAmount(totalPrice)
    setCartItems(updatedData)
    setCount(updatedData?.length)
    localStorage.setItem("cartData", JSON.stringify(updatedData))
  }

  const handleDecrement = (id) => {
    const updatedData = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 1 } : item,
    )
    const totalPrice = updatedData.reduce((total, item) => {
      return total + Number.parseFloat(item.price) * item.quantity
    }, 0)
    setTotalAmount(totalPrice)
    setCartItems(updatedData)
    setCount(updatedData?.length)
    localStorage.setItem("cartData", JSON.stringify(updatedData))
  }

  const toggleDrawer = () => {
    setOpen(!open)
    toggleCartVisibility()
  }

  const updateActiveCard = () => {
    if (swiperRef.current?.swiper) {
      const swiperInstance = swiperRef.current.swiper
      setActiveCard(swiperInstance.realIndex)
    }
  }

  // Loading indicator
  if (!imagesLoaded) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" className="heading-font" sx={{ color: Colors.primary }}>
          Loading...
        </Typography>
      </Box>
    )
  }

  const routingData = [
    {
      name: "Tara",
      detail:
        "Tara is 9 years old. She is a shy Muslim girl. Her imaginary best friend is Shine. She is very kind, helpful, and loving. Her special skill is drawing. She gets nervous around a lot of people, but Shine overcomes her weakness.",
      image: Images.Shop,
      logo: Images.logoTara,
      title: "Shop",
      path: "/products",
    },
    {
      name: "Shine",
      detail:
        "Tara's best imaginary friend is named Shine. She always lends a hand to Tara. She has a lot of energy. She has a bold personality and inspires confidence",
      image: Images.watch,
      logo: Images.logoShine,
      title: "Watch",
      path: "/watch",
    },
    {
      name: "Ahmed",
      detail:
        "Ahmed is Tara's younger brother; he is 8 years old. Ahmed is very kind and helpful boy. He loves to play video games.",
      image: Images.portfolio,
      title: "Portfolio",
      logo: Images.logoAhmed,
    },
    {
      name: "Laila",
      detail: "Laila is Tara's eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.character,
      logo: Images.logoLaila,
      title: "Character",
      path: "/main-character",
    },
    {
      name: "Laila",
      detail: "Laila is Tara's eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.faq,
      logo: Images.logoLaila,
      title: "FAQ",
      path: "/faq",
    },
    {
      name: "Laila",
      detail: "Laila is Tara's eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.ContactUs,
      logo: Images.logoLaila,
      title: "Contact",
      path: "/contact-us",
    },
    {
      name: "Laila",
      detail: "Laila is Tara's eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.EventShow,
      logo: Images.logoLaila,
      title: "Event Show",
      path: "/event-show",
    },
    {
      name: "Laila",
      detail: "Laila is Tara's eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.blog,
      logo: Images.logoLaila,
      title: "Blog",
      path: "/blog",
    },
  ]

  return (
    <>
      {/* Cart Drawer */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 400, padding: 2 }} role="presentation">
          <Box display="flex" flexWrap="wrap">
            {cartItems?.length > 0 ? (
              cartItems?.map((product, index) => (
                <React.Fragment key={index}>
                  <Box
                    onClick={() => {
                      const updatedData = cartItems.filter((item) => product.id != item.id)
                      const totalPrice = updatedData.reduce((total, item) => {
                        return total + Number.parseFloat(item.price) * item.quantity
                      }, 0)
                      setTotalAmount(totalPrice)
                      setCartItems(updatedData)
                      setCount(updatedData?.length)
                      localStorage.setItem("cartData", JSON.stringify(updatedData))
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
                      src={product.imgUrl || "/placeholder.svg"}
                      alt={product.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      loading="lazy"
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
                    <Typography sx={{ fontSize: "12px", color: "black" }} variant="body1">
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
                      ${product.quantity ? product.quantity * product.price : 1 * product.price}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ width: "10px" }}
                      marginTop={1}
                    >
                      <Button variant="contained" color="secondary" onClick={() => handleDecrement(product.id)}>
                        -
                      </Button>
                      <Typography sx={{ fontSize: "12px", color: "black" }} variant="body1" marginX={2}>
                        {product.quantity ? product.quantity : 1}
                      </Typography>
                      <Button variant="contained" color="secondary" onClick={() => handleIncrement(product.id)}>
                        +
                      </Button>
                    </Box>
                  </Box>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Box sx={{ color: "black", fontWeight: "bold", margin: "0 auto" }}>No Items in Cart</Box>
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

      {/* Main Content */}
      <Box
        component={"main"}
        sx={{
          width: "100%",
        }}
      >
        {/* Hero Section */}
        <Box
          component={"section"}
          id="hero"
          sx={{
            background: Colors.primaryGradient,
            width: "100%",
            marginTop: "20px",
            height: { xs: "220px", md: "0", sm: "700px", xl: "600px", lg: "500px" },
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
            <Box
              className="section-content"
              sx={{
                height: { xl: "600px", md: "550px", sm: "700px", xs: "220px", lg: "500px" },
              }}
            >
              <div className="slider">
                <Carousel
                  indicators={false}
                  controls={false}
                  interval={3000}
                  activeStep={currentSlide}
                  sx={{
                    "& .MuiIconButton-root": { display: "none" },
                  }}
                >
                  {/* First Slide */}
                  <Grid
                    container
                    sx={{
                      height: "100%",
                      margin: "0 auto",
                      px: 0,
                      "@media (min-width: 2550px)": {
                        width: "80%",
                      },
                      flexDirection: { sm: "column", xs: "column", md: "row" },
                    }}
                  >
                    <Grid
                      item
                      xl={7}
                      md={6}
                      sm={12}
                      xs={12}
                      order={{ sm: 1, xs: 1, md: 0 }}
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
                          width: { xl: "60%", lg: "90%", md: "100%", sm: "100%", xs: "100%" },
                          margin: "0 auto",
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

                    <Grid
                      item
                      xl={5}
                      md={6}
                      sm={12}
                      xs={12}
                      order={{ sm: 2, xs: 2, md: 1 }}
                      sx={{
                        display: "flex",
                        justifyItems: "center",
                        alignItems: "center",
                        paddingTop: { sm: 2, xs: 2, md: 0 },
                      }}
                    >
                      <Box
                        sx={(theme) => ({
                          width: { md: "600px", lg: "800px", sm: "100%", xs: "100%" },
                          height: { md: "auto", sm: "700px", xs: "220px" },
                          backgroundImage: `url(${Images.aboutImg1})`,
                          backgroundSize: { md: "cover", xl: "contain", lg: "contain", xs: "contain", sm: "contain" },
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center bottom",
                          py: { md: "300px", lg: "270px", sm: "0", xl: "320px" },
                          px: { md: 2, xs: 0, sm: 0 },
                          display: "block",
                        })}
                      />
                    </Grid>
                  </Grid>

                  {/* Second Slide */}
                  <Grid
                    container
                    sx={{
                      flexDirection: { sm: "column", xs: "column", md: "row" },
                      height: "100%",
                      width: { xl: "60%", lg: "90%", md: "100%", sm: "100%", xs: "100%" },
                      margin: "0 auto",
                      "@media (min-width: 1787px) and (max-width:2400px)": {
                        width: "80% !important",
                      },
                      "@media (min-width: 1536px) and (max-width:1787px)": {
                        width: "100% !important",
                      },
                    }}
                  >
                    <Grid
                      item
                      md={6}
                      sm={12}
                      xs={12}
                      sx={{
                        display: { md: "block", sm: "none", xs: "none" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: { sm: "24px", xs: "12px" },
                          pt: { md: "90px", sm: "120px", xs: "97px", xl: "140px" },
                          px: { md: "48px", sm: "12px", xs: "12px" },
                          position: "relative",
                          width: { xl: "50%", lg: "90%", md: "100%", sm: "80%", xs: "90%" },
                          margin: "0 auto",
                        }}
                      >
                        <Typography
                          variant="h1"
                          className="heading-font"
                          sx={{
                            fontFamily: Fonts.righteous,
                            fontSize: { lg: "90px", md: "100px", sm: "70px", xs: "60px" },
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
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
                        <Typography
                          variant="h3"
                          className="para-text"
                          sx={{ fontSize: { md: "38px", sm: "28px", xs: "20px", color: "#fff" } }}
                        >
                          Click To See Latest Adventures!
                        </Typography>
                        <Button
                          variant="contained"
                          className="para-text"
                          sx={{
                            py: 1.2,
                            px: 2,
                            backgroundColor: "#f49604",
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            fontSize: "18px",
                            alignSelf: "flex-start",
                          }}
                          href="https://www.youtube.com/@Shinewithtara"
                        >
                          START ADVENTURE
                        </Button>
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            gap: 0.5,
                            flexDirection: "row",
                            position: "relative",
                            zIndex: 1,
                            pb: "60px",
                          }}
                        >
                          <Button href="https://www.facebook.com/profile.php?id=61554711500749">
                            <FacebookRounded />
                          </Button>
                          <Button href="https://www.instagram.com/shinewith.tara/">
                            <InstagramRounded />
                          </Button>
                          <Button href="https://www.youtube.com/@Shinewithtara">
                            <YoutubeRounded />
                          </Button>
                          <Button href="https://www.tiktok.com/@shinewithtara">
                            <TiktokRounded />
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <Box
                        sx={{
                          width: "100%",
                          backgroundImage: `url(${Images.mainTara})`,
                          backgroundSize: { xs: "contain", sm: "cover", md: "cover", lg: "contain", xl: "contain" },
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center bottom",
                          display: "block",
                          height: { md: "100%", sm: "700px", xs: "250px", xl: "600px", lg: "550px" },
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* Family Slides */}
                  <Grid
                    container
                    spacing={0}
                    sx={(theme) => ({
                      height: { md: "700px", lg: "550px", sm: "1120px", xs: "310px", xl: "610px" },
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
                      [theme.breakpoints.between(1200, 1300)]: {
                        height: "580px",
                      },
                      [theme.breakpoints.between(400, 600)]: {
                        height: "270px",
                      },
                    })}
                  >
                    <Box
                      sx={{
                        margin: "0 auto",
                        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "66%" },
                        height: "100%",
                        backgroundImage: `url(${Images.sliderFamily1})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        display: { xs: "block", sm: "block", md: "block", lg: "block", xl: "block" },
                      }}
                    />
                  </Grid>

                  <Grid
                    container
                    spacing={0}
                    sx={(theme) => ({
                      height: { md: "700px", lg: "580px", sm: "1120px", xs: "310px", xl: "610px" },
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
                      [theme.breakpoints.between(400, 600)]: {
                        height: "270px",
                      },
                    })}
                  >
                    <Box
                      sx={{
                        margin: "0 auto",
                        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "66%" },
                        height: "100%",
                        backgroundImage: `url(${Images.sliderFamily2})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        display: { xs: "block", sm: "block", md: "block", lg: "block", xl: "block" },
                      }}
                    />
                  </Grid>
                </Carousel>
              </div>
            </Box>
          </Box>
        </Box>



        {/* Introduction Section */}
        <Grid
          container
          id="intro"
          sx={{
            backgroundImage: `url(${Images.mainBGPink})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: 0,
            margin: 0,
            position: "relative",
            overflow: "hidden", // Add overflow hidden to prevent layout shifts
          }}
        >
          <Grid
            container
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Box
              sx={{
                mt: 4,
                position: "relative",
                textAlign: "center",
                width: "100%",
              }}
            >
              {/* Preload the image to prevent flashing */}
              {!isSmallScreen && (
                <Box
                  component="img"
                  src={taraImage}
                  alt="Tara"
                  sx={{
                    position: "absolute",
                    top: {
                      xl: "50%",
                      lg: "50%",
                      md: "50%",
                      sm: "40%",
                      xs: "30%",
                    },
                    left: {
                      xl: "50%",
                      lg: "50%",
                      md: "50%",
                      sm: "40%",
                      xs: "30%",
                    },
                    transform: {
                      xl: "translate(-550%, -90%)",
                      lg: "translate(-450%, -90%)",
                      md: "translate(-400%, -70%)",
                      sm: "translate(-290%, -50%)",
                      xs: "translate(-220%, -40%)",
                    },
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
                    objectFit: "cover",
                    display: { xs: "none", sm: "block" },
                    zIndex: 2,
                  }}
                  loading="eager" // Load this image eagerly
                />
              )}

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
                  },
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textTransform: "uppercase",
                  paddingBottom: { xl: 6, lg: 5, md: 4, sm: 3, xs: 2 },
                  position: "relative",
                  zIndex: 1,
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
            <Grid
              item
              md={4}
              xs={12}
              sx={{
                textAlign: "left",
                paddingLeft: { lg: 6, md: 4, sm: 2, xs: 2 },
              }}
            >
              <Box
                className="para-text"
                sx={{
                  textAlign: "left",
                  padding: { lg: 6, md: 4, sm: 3, xs: 2 },
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
                  "Shine with Tara" is an enchanting Islamic cartoon series designed especially for Muslim children
                  worldwide. At the heart of our stories is Tara, a delightful, adventurous character, and her imaginary
                  friend Shine, a radiant companion who brings joy, curiosity, and wonder to every journey.
                </Typography>
                <Typography
                  className="para-text"
                  sx={{
                    paddingBottom: 2,
                    fontSize: { sm: "18px", xs: "16px", xl: "35px" },
                  }}
                >
                  Through each adventure, Tara and Shine explore timeless stories from the Qur'an, dive into the
                  beautiful recitation of verses, and share the moral lessons of the Hadith. They weave essential values
                  like kindness, courage, and the importance of family into every episode.
                </Typography>
                <Typography
                  className="para-text"
                  sx={{
                    paddingBottom: 5,
                    fontSize: { sm: "18px", xs: "16px", xl: "40px" },
                  }}
                >
                  Join us as Tara and Shine illuminate the wonders of Islamic teachings, taking young viewers on a path
                  filled with thrilling discoveries, heartfelt moments, and lessons that will stay with them for life.
                  🌙
                </Typography>
              </Box>
            </Grid>

            {isSmallScreen ? (
              <Grid
                item
                xs={12}
                sx={{
                  textAlign: "left",
                  position: "relative",
                  width: "100%",
                  height: { xs: "600px", sm: "900px" },
                }}
              >
                {/* Use img element instead of background for better loading control */}
                <Box
                  component="img"
                  src={introImage}
                  alt="Introduction"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
              </Grid>
            ) : (
              <Grid
                item
                md={7}
                xs={12}
                sx={{
                  textAlign: "left",
                  position: "relative",
                  width: "100%",
                  height: { md: "800px", lg: "900px", xl: "1200px" },
                  "@media (min-width: 1536px) and (max-width:2150px)": {
                    height: "1200px",
                  },
                  "@media (min-width: 1300px) and (max-width:1535px)": {
                    height: "900px",
                  },
                }}
              >
                {/* Use img elements instead of background images for better loading control */}
                <Box
                  component="img"
                  src={Images.vector}
                  alt="Vector Background"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />

                <Box
                  component="img"
                  src={Images.vectorStarFrame}
                  alt="Star Frame"
                  sx={(theme) => ({
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    zIndex: 11,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "bottom right",
                    [theme.breakpoints.between(900, 1200)]: {
                      width: "678px",
                      height: "800px",
                    },
                    [theme.breakpoints.between(1200, 1300)]: {
                      width: "679px",
                      height: "667px",
                    },
                    [theme.breakpoints.between(1300, 1536)]: {
                      width: "900px",
                      height: "910px",
                    },
                    [theme.breakpoints.between(1536, 2200)]: {
                      width: "1205px",
                      height: "1200px",
                    },
                    [theme.breakpoints.between(2200, 3000)]: {
                      width: "1548px",
                      height: "1200px",
                    },
                  })}
                  loading="lazy"
                />
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Navigation Section */}
        <Grid
          container
          id="navigation"
          sx={{
            backgroundImage: `url(${Images.pagesNavBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "80vh",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5rem 0",
          }}
        >
          <Grid>
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: {
                    xl: "50%",
                    lg: "50%",
                    md: "50%",
                    sm: "40%",
                    xs: "30%",
                  },
                  left: {
                    xl: "50%",
                    lg: "50%",
                    md: "50%",
                    sm: "40%",
                    xs: "30%",
                  },
                  transform: {
                    xl: "translate(-450%, -110%)",
                    lg: "translate(-450%, -110%)",
                    md: "translate(-400%, -110%)",
                    sm: "translate(-290%, -90%)",
                    xs: "translate(-220%, -70%)",
                  },
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
            {routingData?.map((item, i) => (
              <Grid key={i} component={"div"} sx={{ cursor: "pointer", mt: 4 }} item md={4} sm={4} xs={12}>
                <Grid
                  container
                  sx={{
                    borderRadius: "20px",
                    justifyContent: "center",
                  }}
                >
                  <Grid item md={12} sm={12} xs={12}>
                    <Box
                      sx={{
                        position: "relative",
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
                        loading="lazy"
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          width: "90%",
                          bottom: "-2%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 2,
                        }}
                      >
                        <Button
                          className="heading-font"
                          variant="contained"
                          fullWidth
                          color="primary"
                          sx={{
                            backgroundColor: "#FF9D04",
                            WebkitTextStroke: "1px white",
                            WebkitTextFillColor: "#57ABF1",
                            fontSize: "35px",
                            px: "35px",
                            border: "3px solid white",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                          }}
                          onClick={() =>
                            item.name === "Ahmed"
                              ? window.open("https://www.instagram.com/shinewith.tara/", "_blank")
                              : navigate(item?.path)
                          }
                        >
                          {item.title === "Portfolio" ? (
                            <Box sx={{ display: "flex", gap: 2, py: "0px" }}>
                              <IconButton onClick={()=> window.open("https://www.facebook.com/profile.php?id=61554711500749", "_blank")}>  <FacebookRounded /></IconButton>
                              <IconButton onClick={()=> window.open("https://www.instagram.com/shinewith.tara/", "_blank")} ><InstagramRounded /></IconButton>
                              <IconButton onClick={()=> window.open("https://www.youtube.com/@Shinewithtara", "_blank")}>  <YoutubeRounded /> </IconButton>
                              <IconButton onClick={()=> window.open("https://www.tiktok.com/@shinewithtara", "_blank")}>   <TiktokRounded /> </IconButton>
                            </Box>
                          ) : (
                            item.title
                          )}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Grid
          container
          id="reviews"
          sx={{
            backgroundImage: `url(${Images.reviewBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            maxHeight: "1500vh",
            paddingTop: "20rem",
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            gap: 0,
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
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Box
                component="img"
                src={Images.cloud}
                alt="Left Decorative Image"
                sx={{
                  width: { xs: "40px", sm: "60px", md: "80px" },
                  height: "auto",
                  padding: 0,
                }}
                loading="lazy"
              />
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
                  margin: 0,
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
                onSlideChange={updateActiveCard}
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
                        backgroundColor: activeCard === ind ? "#FF9D04" : "#CA6680",
                        height: "120px",
                        paddingBottom: 8,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setActiveCard(ind)
                        swiperRef.current.swiper.slideToLoop(ind)
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Rating name="read-only" value={item?.rating} sx={{ borderColor: "white" }} readOnly />
                      </Box>

                      <Typography variant={"body2"} sx={{ color: "white" }}>
                        {item.comment}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                        }}
                      >
                        <Avatar sx={{ width: 64, height: 64 }} src={item.profile} alt={item.name} />
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
                            <Typography variant="body2" sx={{ fontWeight: 400 }}>
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
                  swiperRef.current.swiper.slidePrev()
                  updateActiveCard()
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
                loading="lazy"
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
                  swiperRef.current.swiper.slideNext()
                  updateActiveCard()
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
                loading="lazy"
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
                xs: "300px",
                sm: "430px",
                md: "530px",
                lg: "700px",
                xl: "1600px",
              },
              mt: "40px",
              "@media (min-width: 2300px) and (max-width: 2700px)": {
                height: "1400px",
              },
              "@media (min-width: 1536px) and (max-width: 2299px)": {
                height: "1050px",
              },
            }}
          ></Grid>
        </Grid>

        {/* Subscribe Section */}
        <Box
          component={"section"}
          id="subscribe"
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
          <CardMedia
            component={"img"}
            src={Images.cloud}
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
                left: 90,
              },
            }}
            loading="lazy"
          />
          <Grid container justifyContent={"center"}>
            <Grid item xs={4}></Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  zIndex: 1,
                  padding: { sm: "20px 0" },
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
                  Subscribe to get information, latest news, and other interesting offers about{" "}
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
                    width: { sm: "100%", xs: "100%" },
                    "& fieldset": {
                      border: "none",
                    },
                    "& .MuiOutlinedInput-root": {
                      paddingRight: 0.8,
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
              left: isIOS && isMobile ? -110 : { xl: 280, lg: 0, md: 0, xs: 0, sm: 0 },
              zIndex: 0,
              display: "block",
              "@media (min-width: 1536px) and (max-width: 2200px)": {
                left: 90,
              },
            }}
          >
            <CardMedia
              component={"img"}
              src={Images.Character1}
              sx={{
                width: isIOS && isMobile ? "80%" : "100%",
                height: isIOS && isMobile ? "160px" : { xs: "180px", sm: "180px", md: "500px" },
                objectFit: isIOS && isMobile ? "contain" : "cover",
              }}
              loading="lazy"
            />
          </Box>

          {/* Right Background Image */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: isIOS && isMobile ? -180 : { xs: "0", xl: 260 },
              zIndex: 0,
              display: "block",
              "@media (min-width: 1536px) and (max-width: 2200px)": {
                right: 60,
              },
            }}
          >
            <CardMedia
              component={"img"}
              src={Images.Character2}
              sx={{
                width: "100%",
                height: isIOS && isMobile ? "160px" : { xs: "180px", sm: "180px", md: "500px" },
                objectFit: isIOS && isMobile ? "contain" : "cover",
              }}
              loading="lazy"
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Home

