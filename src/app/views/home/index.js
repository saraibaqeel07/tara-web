import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Box, Button, CardMedia, Container, Grid, Typography, ButtonGroup, TextField, Drawer, Accordion, AccordionSummary, AccordionDetails, Rating } from '@mui/material';
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images';
import Colors from '../../styles/colors';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "../../../App.css"
import Fonts from '../../styles/fonts';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, getDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import ProductModal from '../modal/ProductModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar, Divider } from 'antd';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Directions, Star } from '@mui/icons-material';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { CartContext } from '../../Context/CartContext';
import { CartCounter } from '../../Context/CartCounter';
import navigation from '../../../Navigation';
import introImage from "../../assets/images/intro-pic.png"
import taraImage from "../../assets/images/tara-pic.png"
import Aos from 'aos';
import 'aos/dist/aos.css';

// import "slick-carousel/slick/slick-theme.css";



function Home() {
  const { state } = useLocation()
  Aos.init();

  const { cartVisible, toggleCartVisibility } = useContext(CartContext);
  const { setCount } = useContext(CartCounter);

  console.log(cartVisible, 'cartVisible');

  const firebaseConfig = {
    apiKey: "AIzaSyCn_Ph5AlAi_wuxR0D7CBIY8_vBCNgD5r8",
    authDomain: "shinetara-86ec0.firebaseapp.com",
    projectId: "shinetara-86ec0",
    storageBucket: "shinetara-86ec0.appspot.com",
    messagingSenderId: "182521981077",
    appId: "1:182521981077:web:3cadc9d70d7fc25fab939c",
    measurementId: "G-BHYZDHJCK9"
  };
  let productId = ''
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [selected, setSelected] = useState("episode");
  const [products, setProducts] = useState([])
  const [textColor, setTextColor] = useState(Colors.orange)

  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardProduct, setCardProduct] = useState({})
  const [coloringSheets, setColoringSheets] = useState([])
  const [activitySheets, setActivitySheets] = useState([])
  const [extraSheets, setExtraSheets] = useState([])

  const [open, setOpen] = useState(false);
  const [cartArray, setCartArray] = useState([])
  const [cartItems, setCartItems] = useState(products);
  const [faqData, setFaqData] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [reviewBoxes, setReviewBoxes] = useState([])

  const handleIncrement = (id) => {
    const updatedData = cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    const totalPrice = updatedData.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0);
    setTotalAmount(totalPrice)
    setCartItems(updatedData);
    setCount(updatedData?.length)
    localStorage.setItem('cartData', JSON.stringify(updatedData))
  };

  const handleDecrement = (id) => {
    const updatedData = cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 1 } : item)
    const totalPrice = updatedData.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0);
    setTotalAmount(totalPrice)
    setCartItems(updatedData);
    setCount(updatedData?.length)
    localStorage.setItem('cartData', JSON.stringify(updatedData))
  };

  const toggleDrawer = (isOpen) => (event) => {
    console.log('dasdasas');
    setOpen(!open);
    toggleCartVisibility()
  };
  const getFaqs = async () => {
    const q = query(collection(db, "Faq"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFaqData(dataArray)


  }
  const getReviews = async () => {
    const q = query(collection(db, "reviews"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(dataArray);
    setReviewBoxes(dataArray)

  }
  const showModal = (item) => {
    setIsModalOpen(true);
    console.log(item);
    setCardProduct(item)

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
      variant={selected == 'episode' ? "contained" : "outlined"}
      sx={{
        // width: { md: "180px", sm: "150px", xs: "100%" },
        width: "100%",
        px: 4,
        py: 1.5
      }}
      onClick={() => setSelected("episode")}
    >
      Episodes
    </Button>,
    <Button
      variant={selected == 'merchandise' ? "contained" : "outlined"}
      key="merchandise"
      sx={{
        // width: { md: "180px", sm: "150px", xs: "100%" },
        width: "100%",
        px: 4,
        py: 1.5
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
      url: 'https://www.youtube.com/watch?v=JjEc2iIPaYE'
    },
    {
      image: Images.sliderImage2,
      title: "Bugs Adventure",
      url: 'https://www.youtube.com/watch?v=vbu-5oSw_zU'
    },
    {
      image: Images.sliderImage3,
      title: "Space Adventure",
      url: 'https://www.youtube.com/watch?v=SCyHeBrBgbI'
    },
    {
      image: Images.sliderImage4,
      title: "Heart Warming Sibling Race",
      url: 'https://www.youtube.com/watch?v=sG8hhCjMOXo'
    },
    {
      image: Images.sliderImage5,
      title: "Story Of Miraj",
      url: 'https://www.youtube.com/watch?v=6a_qlXUkI-Q'
    },
  ];

  const routingData = [
    {
      name: "Tara",
      detail: "Tara is 9 years old. She is a shy Muslim girl. Her imaginary best friend is Shine. She is very kind, helpful, and loving. Her special skill is drawing. She gets nervous around a lot of people, but Shine overcomes her weakness.",
      image: Images.Shop,
      logo: Images.logoTara,
      path: '/shop'
    },
    {
      name: "Shine",
      detail: "Tara's best imaginary friend is named Shine. She always lends a hand to Tara. She has a lot of energy. She has a bold personality and inspires confidence",
      image: Images.watch,
      logo: Images.logoShine,
      path: '/watch'
    },
    {
      name: "Ahmed",
      detail: "Ahmed is Tara’s younger brother; he is 8 years old. Ahmed is very kind and helpful boy. He loves to play video games.",
      image: Images.about,
      logo: Images.logoAhmed,
      path: '/about'
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.character,
      logo: Images.logoLaila,
      path: '/main-character'
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.faq,
      logo: Images.logoLaila,
      path: '/faq'
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.ContactUs,
      logo: Images.logoLaila,
      path: '/contact-us'
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.EventShow,
      logo: Images.logoLaila,
      path: '/event-show'
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.colorfull,
      logo: Images.logoLaila,
      path: '/colorfull-club'
    },


  ];

  const cardData = [
    {
      image: Images.cardImg1,
      title: "Dua Book",
      price: "$13"
    },
    {
      image: Images.cardImg2,
      title: "Calender",
      price: "$15"
    },
    {
      image: Images.cardImg3,
      title: "Bookmarks",
      price: "$9"
    },
    {
      image: Images.cardImg4,
      title: "Worksheet",
      price: "$30"
    },
    {
      image: Images.cardImg5,
      title: "Puzzle",
      price: "$1/card"
    },
    {
      image: Images.cardImg6,
      title: "Good Deeds",
      price: "$13"
    },
  ]



  const getProducts = async () => {
    const q = query(collection(db, "products"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


    const sortedData = dataArray.sort((a, b) => {
      return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
    });
    console.log('books', sortedData);
    // Update state with sorted data
    setProducts(sortedData);


  }

  const getActivitySheets = async () => {
    const q = query(collection(db, "activitysheets"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const sortedData = dataArray.sort((a, b) => {
      return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
    });

    setActivitySheets(sortedData)


  }

  const getColoringSheets = async () => {
    const q = query(collection(db, "coloringsheets"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const sortedData = dataArray.sort((a, b) => {
      return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
    });

    // Update state with sorted data
    setColoringSheets(sortedData);

  }

  const getExtrasheets = async () => {
    const q = query(collection(db, "extra"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const sortedData = dataArray.sort((a, b) => {
      return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
    });

    setExtraSheets(sortedData)

  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a random color

      let element = document.getElementById('follow-text')
      let element2 = document.getElementById('learn-text')
      let element3 = document.getElementById('explore-text')
      if (element) {

        if (element.style.color == 'rgb(254, 157, 4)') {
          element.style.color = 'white'
          element2.style.color = Colors.darkblue
          element3.style.color = 'white'
        }

        else if (element3.style.color == 'white') {
          element.style.color = 'white'
          element2.style.color = 'white'
          element3.style.color = Colors.pink
        }
        else {
          element.style.color = 'rgb(254, 157, 4)'
          element2.style.color = 'white'
          element3.style.color = 'white'
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
      setSelected('merchandise');

      // Delay execution by 2 seconds
      setTimeout(() => {

        let element = document.getElementById(state?.section);
        console.log(element, 'element');
        if (element) {
          console.log(element, 'eeee');
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 2000);
    }

    let cart = localStorage.getItem('cartData')
    if (cart) {

      cart = JSON.parse(cart)
      if (cart?.length > 0) {
        setCartItems(cart)
        setCount(cart.length)
      }
    }
  }, []);
  useEffect(() => {
    Aos.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing option
      once: false, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);


  useEffect(() => {

    setOpen(cartVisible)


  }, [cartVisible])


  return (
    <>  <div>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 400, padding: 2 }}
          role="presentation"

        >
          {console.log(cartItems)}
          <Box display="flex" flexWrap="wrap">

            {cartItems?.length > 0 ? cartItems?.map((product, index) => (
              <React.Fragment key={index}>
                <Box

                  onClick={() => {
                    const updatedData = cartItems.filter(item => product.id != item.id)
                    const totalPrice = updatedData.reduce((total, item) => {
                      return total + (parseFloat(item.price) * item.quantity);
                    }, 0);
                    setTotalAmount(totalPrice)
                    setCartItems(updatedData)
                    setCount(updatedData?.length)
                    localStorage.setItem('cartData', JSON.stringify(updatedData))
                  }}
                  sx={{ color: 'black', cursor: 'pointer' }}
                >
                  <CloseIcon />
                </Box>
                <Box
                  sx={{
                    height: 100,
                    display: 'flex',
                    padding: 2,
                    textAlign: 'center',
                  }}
                >

                  <img
                    src={product.imgUrl}
                    alt={product.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <Typography sx={{ fontSize: '12px', color: 'black', width: '100px' }} variant="h6">
                    {product.name}
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: 'black' }} variant="body1">
                    ${product.price}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '12px', color: 'black', width: '50px', fontWeight: 'bold' }}
                    variant="body1"
                  >
                    ${product.quantity ? product.quantity * product.price : 1 * product.price}
                  </Typography>
                  <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: '10px' }} marginTop={1}>
                    <Button variant="contained" color="secondary" onClick={() => handleDecrement(product.id)}>
                      -
                    </Button>
                    <Typography sx={{ fontSize: '12px', color: 'black' }} variant="body1" marginX={2}>
                      {product.quantity ? product.quantity : 1}
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={() => handleIncrement(product.id)}>
                      +
                    </Button>

                  </Box>
                </Box>
                <Divider />
              </React.Fragment>
            )) : <Box sx={{ color: 'black', fontWeight: 'bold', margin: '0 auto' }}>No Items in Cart</Box>}
          </Box>
          <Box sx={{ color: 'black', fontSize: '27px', textAlign: 'center', fontFamily: Fonts.righteous, }}>Sub Total :  $ {totalAmount}</Box>
        </Box>
        <Button sx={{ width: '90%', textAlign: 'center', margin: '0 auto' }} variant="contained" color="secondary" onClick={() => navigate(
          `/order`,
          { state: cartItems }
        )}>
          CheckOut
        </Button>
      </Drawer>
    </div>
      <Box
        component={"main"}
        sx={{
          width: "100%"
        }}
      >
        <Box
          component={"section"}
          sx={{
            background: Colors.primaryGradient,
            width: "100%",

          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${Images.bannerBg})`,

              backgroundSize: "cover",
              backgroundPosition: "center center",
              width: "100%",
              height: { md: "578px", xs: "490px" },
              position: "relative", // Ensure child content is positioned relative to this container
              overflow: "hidden", // Prevent content from going outside
            }}
          >
            {/* Right-side Image */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: { md: "50%", sm: "100%", xs: "100%" }, // Adjust width for each screen size
                height: "100%", // Full height of the parent container
                backgroundImage: `url(${Images.mainTara})`,
                backgroundSize: { md: "cover", xl: "contain", lg: "contain", },
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom", // Ensures the image is aligned at the bottom
                display: { md: "block", xl: "block", lg: "block", sm: "none", xs: "none" }, // Show image only for medium and larger screens
              }}
            />

            {/* Content Section */}
            <Grid container sx={{ height: "100%" }}>
              <Grid item md={7} sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "24px",
                    pt: "120px", // Vertical padding (top and bottom)
                    px: { md: "48px", sm: "12px", xs: "12px" }, // Horizontal padding
                    position: "relative", // Ensures icons stay within the content area
                  }}
                >
                  {/* Typography Section */}
                  <Typography
                    variant="h1"
                    className="heading-font"
                    sx={{
                      fontFamily: Fonts.righteous,
                      fontSize: { md: "100px", sm: "70px", xs: "60px" },
                      fontWeight: 700,
                      whiteSpace: "nowrap", // Prevents text wrapping
                      overflow: "hidden", // Ensures no unwanted overflow
                      textOverflow: "ellipsis", // Optional, adds ellipsis if content overflows
                    }}
                  >
                    <span
                      className="heading-font"
                      style={{
                        color: "#F9BF29",
                        WebkitTextStroke: "1px #f9bf29",
                        WebkitTextFillColor: "#f49604",
                      }}
                    >
                      I
                    </span>{" "}
                    <span
                      className="heading-font"
                      style={{
                        color: "white",
                        WebkitTextStroke: "1px #f9bf29",
                        WebkitTextFillColor: "white",
                      }}
                    >
                      AM TARA
                    </span>
                  </Typography>


                  {/* Subtitle */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { md: "38px", sm: "28px", xs: "20px" },
                    }}
                  >
                    Click To See Latest Adventures!
                  </Typography>

                  {/* Button */}
                  <Button
                    variant="contained"
                    sx={{
                      py: 1.2,
                      px: 2,
                      backgroundColor: "#f49604",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      fontSize: "18px",
                      alignSelf: "flex-start", // Align button with other content
                    }}
                    href="https://www.youtube.com/@Shinewithtara"
                  >
                    START ADVENTURE
                  </Button>

                  {/* Social Media Icons */}
                  <Box
                    sx={{
                      mt: 2, // Space above icons
                      display: "flex",
                      gap: 0.5,
                      flexDirection: "row",
                      position: "relative", // Ensures it stays within parent bounds
                      zIndex: 1, // Ensure icons are visible above background
                    }}
                  >
                    <Button href="https://www.facebook.com/profile.php?id=61554711500749">
                      <FacebookRounded />
                    </Button>
                    <Button href="https://www.instagram.com/shineswithtara/">
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
            </Grid>
          </Box>






        </Box>


        <Grid
          container
          sx={{
            backgroundColor: "#CA6680",
            minHeight: "80vh", // Ensures full height of the section
            padding: 0,
            margin: 0,
            position: "relative", // Needed for absolute positioning of child elements
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: "0 !important",
              margin: 0,
              padding: 0,
              right: 0,
              width: { md: "50%", sm: "100%", xs: "100%" }, // Adjust width for each screen size
              height: "60%", // Full height of the parent container
              backgroundImage: `url(${introImage})`,
              backgroundSize: { md: "contain", xl: "contain", lg: "contain", },
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center bottom", // Ensures the image is aligned at the bottom
              display: { md: "block", xl: "block", lg: "block", sm: "none", xs: "none" }, // Show image only for medium and larger screens
            }}
          />
          {/* Flex container for image and heading */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
              display: "flex",
              justifyContent: "center", // Centers the heading horizontally
              flexWrap: "nowrap", // Prevent wrapping
              padding: "80px 0 50px 0", // Top and bottom padding
            }}
          >
            {/* Left Side: Image */}
            <Grid item sx={{ flexShrink: 0, ml: 6 }}>
              <Box
                sx={{
                  width: "143.56px",
                  height: "139px",
                  backgroundImage: `url(${taraImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Grid>

            {/* Right Side: Heading */}
            <Grid item sx={{ textAlign: "center", flexGrow: 1 }}>
              <Box>
                <Typography
                  variant="h1"
                  className="heading-font"  
                  sx={{
                    fontSize: { md: "100px", sm: "70px", xs: "60px" },
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingBottom: 6,
                    textTransform: "uppercase",
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
          </Grid>

          {/* Paragraph and Image Section */}
          <Grid
            container
            className='para-text'
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "20px",
              width: "100%",
            }}
          >
            {/* Left Side: Paragraph */}
            <Grid item md={5} xs={12}>
              <Box   className='para-text' sx={{ textAlign: "left", paddingLeft: 6 }}>
                <Typography   className='para-text' sx={{ paddingBottom: 3 }}>Welcome to "Shine with Tara"! ✨</Typography>
                <Typography   className='para-text' sx={{ paddingBottom: 2 }}>
                  "Shine with Tara" is an enchanting Islamic cartoon series designed especially for Muslim children worldwide. At the heart of our stories is Tara, a delightful, adventurous character, and her imaginary friend Shine, a radiant companion who brings joy, curiosity, and wonder to every journey. Together, Tara and Shine travel through magical realms, bringing Islamic teachings to life in a way that captivates and inspires.        </Typography>
                <Typography   className='para-text' sx={{ paddingBottom: 2 }}>
                  Through each adventure, Tara and Shine explore timeless stories from the Qur'an, dive into the beautiful recitation of verses, and share the moral lessons of the Hadith. They weave essential values like kindness, courage, and the importance of family into every episode, making spiritual growth and character building both enjoyable and relatable for young minds.        </Typography>
                <Typography   className='para-text' sx={{ paddingBottom: 5 }}>
                  Join us as Tara and Shine illuminate the wonders of Islamic teachings, taking young viewers on a path filled with thrilling discoveries, heartfelt moments, and lessons that will stay with them for life. Perfect for nurturing your child’s faith, values, and character! 🌙        </Typography>
              </Box>
            </Grid>

            {/* Right Side: Image */}

          </Grid>
        </Grid>











        <Typography
          variant='h3'
          sx={{
            fontSize: { md: "48px", xs: "40px" },
            fontWeight: 900,
            textAlign: 'center',
            mt: 15
          }}
        >
          What <span style={{ color: Colors.darkblue }}>Shine And Tara Have For You</span>
        </Typography>
        <Grid container mt={5} mb={10} spacing={2}>
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
          {routingData.map((item, i) => (
            <Grid key={i} component={'div'} sx={{ cursor: 'pointer', mt: 4 }} onClick={() => navigate(item?.path)} item md={4} sm={4} xs={12}>
              <Grid
                container
                sx={{
                  // border: `8px solid ${item.name == "Tara" ? "#0C789D" : item.name == "Shine" ? "#C40A66" : item.name == "Ahmed" ? "#A36506" : "#5B0276"}`,
                  borderRadius: "20px"
                }}
              >

                <Grid data-aos="flip-left" item md={12} sm={12} xs={12}
                // sx={{ borderLeft: { md: `8px solid ${item.name == "Tara" ? "#0C789D" : item.name == "Shine" ? "#C40A66" : item.name == "Ahmed" ? "#A36506" : "#5B0276"}`, sm: "none", xs: "none" } }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%"
                    }}

                  >
                    <CardMedia
                      component={"img"}
                      src={item.image}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: '12px',
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>


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
        </Box>
        {selected == "episode" ? (
          <Box
            component={"section"}
            sx={{
              background: "#3D5A98",
              height: "100%",
              width: "100%",
              py: "72px"
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
                  }
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
                    adaptiveHeight: true
                  }
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
                    adaptiveHeight: true
                  }
                }
              ]}
            >
              {sliderData.map((item, i) => (
                <Box
                  key={i}
                  sx={{ p: 3, borderRadius: '20px', cursor: 'pointer' }}
                  component={'div'}
                  onClick={() => window.open(item?.url, '_blank')}
                >
                  <CardMedia
                    component={"img"}
                    src={item.image}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderTopLeftRadius: '20px',
                      borderTopRightRadius: '20px'
                    }}
                  />
                  <Box
                    sx={{
                      background: Colors.yellow,
                      textAlign: "center",
                      borderBottomLeftRadius: '20px',
                      borderBottomRightRadius: '20px',
                      p: 3,
                      // mx: item.title == "Dealing With Sibling"
                      //   ? "32px" : item.title == "5 Pillars With The Neighbors"
                      //     ? "30px" : "31px"
                    }}
                  >
                    <Typography>
                      {item.title}
                    </Typography>
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
                background: Colors.whiteblue,
                height: "100%",
                width: "100%",
                py: "72px"
              }}
            >
              <Box
                component={'div'}
                className='product-heading-img'
                sx={{
                  backgroundImage: `url(${Images.books})`,
                  width: "100%",
                  height: '200px',
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  borderRadius: "20px",
                  mb: "100px"
                }}
              >
              </Box>
              <Container>
                <Grid container spacing={2} justifyContent={"center"}>
                  {Array.isArray(products) && products?.map((card, i) => (
                    <React.Fragment key={i}>

                      <Grid className='product-card' md={5} sm={8} xs={12} item >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "20px",
                            position: 'relative'
                          }}
                        >
                         

                          <CardMedia
                            className='product-image'
                            component={"img"}
                            src={card?.imgUrl}
                            sx={{
                              width: "100%",
                              height: card?.price != 0 ? "400px" : '455px',
                              borderRadius: card?.price != 0 ? "20px 20px 0px 0px" : "20px",
                              objectFit: 'cover'
                            }}
                          />
                          {card?.price != 0 && <Box
                            sx={{
                              backgroundColor: "#C77805",
                              p: 2,
                              display: "flex",
                              justifyContent: "space-between",
                              borderRadius: "0px 0px 20px 20px"
                            }}
                          >
                            <Typography>
                              {card?.name}
                            </Typography>
                            <Typography>
                              $ {card?.price}
                            </Typography>
                          </Box>}
                        </Box>
                        {card?.price != 0 && <div className="add-to-cart" style={{ display: 'flex', alignItems: 'center' }} onClick={() => {

                          if (cartItems.find(item => item.id === card.id)) {
                            setOpen(true)
                          }
                          else {
                            cartItems.push({ ...card, quantity: 1 })
                            const totalPrice = cartItems.reduce((total, item) => {
                              return total + (parseFloat(item.price) * item.quantity);
                            }, 0);
                            setCount(cartItems.length)
                            localStorage.setItem('cartData', JSON.stringify(cartItems))
                            setTotalAmount(totalPrice)
                            console.log(totalPrice);
                            setOpen(true)
                          }

                        }}>
                          Add To Cart &nbsp; <ShoppingCartIcon sx={{ cursor: 'pointer', color: 'white' }} />
                        </div>}
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
               
              </Container>
            </Box>
            <Box
              component={"section"}
              id='activity-section'
              sx={{
                background: Colors.whiteblue,
                height: "100%",
                width: "100%",
                py: "72px"
              }}
            >
              <Box
                component={'div'}
                className='product-heading-img'
                sx={{
                  backgroundImage: `url(${Images.activity})`,
                  width: "100%",
                  height: '200px',
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  borderRadius: "20px",
                  mb: "100px"
                }}
              >
              </Box>
              <Container>
                <Grid container spacing={2} justifyContent={"center"}>
                  {Array.isArray(activitySheets) && activitySheets?.map((card, i) => (
                    <React.Fragment key={i}>

                      <Grid className='product-card' md={5} item >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "20px",
                            position: 'relative'
                          }}
                        >
                          
                          <CardMedia
                            className='product-image'
                            component={"img"}
                            src={card?.imgUrl}
                            sx={{
                              height: card?.price != 0 ? "400px" : '455px',
                              borderRadius: card?.price != 0 ? "20px 20px 0px 0px" : "20px",
                              objectFit: 'cover'
                            }}
                          />
                          {card?.price != 0 && <Box
                            sx={{
                              backgroundColor: "#C77805",
                              p: 2,
                              display: "flex",
                              justifyContent: "space-between",
                              borderRadius: "0px 0px 20px 20px"
                            }}
                          >
                            <Typography>
                              {card?.name}
                            </Typography>
                            <Typography>
                              $ {card?.price}
                            </Typography>
                          </Box>}
                        </Box>
                        {card?.price != 0 && <div className="add-to-cart" style={{ display: 'flex', alignItems: 'center' }}
                          onClick={() => {

                            if (cartItems.find(item => item.id === card.id)) {
                              setOpen(true)
                            }
                            else {
                              cartItems.push({ ...card, quantity: 1 })


                              const totalPrice = cartItems.reduce((total, item) => {
                                return total + (parseFloat(item.price) * item.quantity);
                              }, 0);
                              setCount(cartItems.length)
                              localStorage.setItem('cartData', JSON.stringify(cartItems))
                              setTotalAmount(totalPrice)
                              console.log(totalPrice);
                              setOpen(true)

                            }

                          }} >
                          Add To Cart &nbsp; <ShoppingCartIcon sx={{ cursor: 'pointer', color: 'white' }} />
                        </div>}
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
             
              </Container>
            </Box>
            <Box
              component={"section"}
              id='coloring-section'
              sx={{
                background: Colors.whiteblue,
                height: "100%",
                width: "100%",
                py: "72px"
              }}
            >
              <Box
                component={'div'}
                className='product-heading-img'
                sx={{
                  backgroundImage: `url(${Images.coloring})`,
                  width: "100%",
                  height: '200px',
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  borderRadius: "20px",
                  mb: "100px"
                }}
              >
              </Box>
              <Container  >
                <Grid container spacing={2} justifyContent={"center"}>
                  {Array.isArray(coloringSheets) && coloringSheets?.map((card, i) => (
                    <React.Fragment key={i}>

                      <Grid className='product-card' md={5} item >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "20px",
                            position: 'relative'
                          }}
                        >
                      
                          <CardMedia
                            className='product-image'
                            component={"img"}
                            src={card?.imgUrl}
                            sx={{
                              height: card?.price != 0 ? "400px" : '455px',
                              borderRadius: card?.price != 0 ? "20px 20px 0px 0px" : "20px"
                            }}
                          />
                          {card?.price != 0 && <Box
                            sx={{
                              backgroundColor: "#C77805",
                              p: 2,
                              display: "flex",
                              justifyContent: "space-between",
                              borderRadius: "0px 0px 20px 20px"
                            }}
                          >
                            <Typography>
                              {card?.name}
                            </Typography>
                            <Typography>
                              $ {card?.price}
                            </Typography>
                          </Box>}
                        </Box>
                        {card?.price != 0 && <div className="add-to-cart" style={{ display: 'flex', alignItems: 'center' }}
                          onClick={() => {

                            if (cartItems.find(item => item.id === card.id)) {
                              setOpen(true)
                            }
                            else {
                              cartItems.push({ ...card, quantity: 1 })

                              const totalPrice = cartItems.reduce((total, item) => {
                                return total + (parseFloat(item.price) * item.quantity);
                              }, 0);
                              setCount(cartItems.length)
                              localStorage.setItem('cartData', JSON.stringify(cartItems))
                              setTotalAmount(totalPrice)
                              console.log(totalPrice);

                              setOpen(true)
                            }

                          }}>
                          Add To Cart &nbsp; <ShoppingCartIcon sx={{ cursor: 'pointer', color: 'white' }} />
                        </div>}
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
             
              </Container>
            </Box>
            <Box
              component={"section"}

              sx={{
                background: Colors.whiteblue,
                height: "100%",
                width: "100%",
                py: "72px"
              }}
            >
              <Box
                component={'div'}
                className='product-heading-img'
                sx={{
                  backgroundImage: `url(${Images.extra})`,
                  width: "100%",
                  height: '200px',
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  borderRadius: "20px",
                  mb: "100px"
                }}
              >
              </Box>
              <Container>
                <Grid container spacing={2} justifyContent={"center"}>
                  {Array.isArray(extraSheets) && extraSheets?.map((card, i) => (
                    <React.Fragment key={i}>

                      <Grid className='product-card' md={5} item >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "20px",
                            position: 'relative'
                          }}
                        >
                          
                          <CardMedia
                            className='product-image'
                            component={"img"}
                            src={card?.imgUrl}
                            sx={{
                              height: card?.price != 0 ? "400px" : '455px',
                              borderRadius: card?.price != 0 ? "20px 20px 0px 0px" : "20px"
                            }}
                          />
                          {card?.price != 0 && <Box
                            sx={{
                              backgroundColor: "#C77805",
                              p: 2,
                              display: "flex",
                              justifyContent: "space-between",
                              borderRadius: "0px 0px 20px 20px"
                            }}
                          >
                            <Typography>
                              {card?.name}
                            </Typography>
                            <Typography>
                              $ {card?.price}
                            </Typography>
                          </Box>}
                        </Box>
                        {card?.price != 0 && <div className="add-to-cart" style={{ display: 'flex', alignItems: 'center' }}
                          onClick={() => {

                            if (cartItems.find(item => item.id == card.id)) {
                              setOpen(true)
                            }
                            else {
                              cartItems.push({ ...card, quantity: 1 })
                              const totalPrice = cartItems.reduce((total, item) => {
                                return total + (parseFloat(item.price) * item.quantity);
                              }, 0);
                              setCount(cartItems.length)
                              localStorage.setItem('cartData', JSON.stringify(cartItems))
                              setTotalAmount(totalPrice)
                              console.log(totalPrice);
                              setOpen(true)
                            }

                          }}>
                          Add To Cart &nbsp; <ShoppingCartIcon sx={{ cursor: 'pointer', color: 'white' }} />
                        </div>}
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
             
              </Container>
            </Box>
          </>
        )} */}
        <Box
          component={"section"}
          sx={{
            background: Colors.lightPurple,
            py: "80px"
          }}
        >
          {/* <Container>
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
          </Container> */}
        </Box>
        <Box
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

      </Box >
    </>
  )
}

export default Home