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
import { Star } from '@mui/icons-material';
import { CartContext } from '../../Context/CartContext';
import { CartCounter } from '../../Context/CartCounter';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// import "slick-carousel/slick/slick-theme.css";



function FAQ() {
  const { state } = useLocation()
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
  const [activeCard, setActiveCard] = useState(0); // Start with the first card
  const swiperRef = useRef(null);

  const updateActiveCard = () => {
    if (swiperRef.current?.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      setActiveCard(swiperInstance.realIndex); // Update active card index based on Swiper's real index
    }
  };

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
        <Box
          sx={{
            backgroundImage: `url(${Images.bannerBg})`,

            backgroundSize: "cover",
            backgroundPosition: "bottom center",
            width: "100%",
            height: { md: "578px", xs: "490px" },
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
              backgroundImage: `url(${Images.mainFaq})`,
              backgroundSize: { md: "contain", xl: "contain", lg: "contain", xs: "cover", sm: "contain" },
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center", // Ensures the image is aligned at the bottom

            }}
          />
        </Box>



        <Grid
          container
          sx={{
            backgroundImage:`url(${Images.mainBGPink})`,
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat',
        
            padding: "5rem 0  ",
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              padding: { xs: 2, sm: 3, md: 4 },
              position: "relative",
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
                marginBottom: 2, // Add some space below heading
              }}
            >
              {/* Left Image */}
              <Box
                component="img"
                src={Images.character16} // Replace with actual left image URL
                alt="Left Decorative Image"
                sx={{
                  width: { xs: "60px", sm: "75px", md: "90px" }, // Adjust image width for different screen sizes
                  height: "auto",
                  paddingRight: 2,
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
                    md: "80px",
                    sm: "70px",
                    xs: "60px", // Adjust text size for different screen sizes
                  },
                  fontWeight: 600,
                  color: "#F9BF29",
                  textTransform: "uppercase",
                }}
                style={{
                  WebkitTextStroke: "1px white",
                  WebkitTextFillColor: "#F9BF29",
                }}
              >
                Faq’s
              </Typography>
              {/* Right Image */}
              <Box
                component="img"
                src={Images.character16} // Replace with actual right image URL
                alt="Right Decorative Image"
                sx={{
                  width: { xs: "60px", sm: "75px", md: "90px" }, // Adjust image width for different screen sizes
                  height: "auto",
                  paddingLeft: 2,
                }}
              />
            </Box>

            {/* FAQ Image Below Heading */}
            <Box
              component="img"
              src={Images.faq1} // Replace with actual image URL
              alt="FAQ Decorative Image"
              sx={{
                width: { xs: "40px", sm: "60px", md: "120px" }, // Smaller size
                height: "auto",
                marginTop: 2, // Space between heading and image
                paddingRight: { xs: 1, sm: 2, md: 10 }, // Left padding for alignment
                display: "block", // Ensures the image aligns left
              }}
            />
          </Grid>



          <Grid container justifyContent="center" alignItems="center">
            <Grid item md={9} sm={11} xs={11}>
              <Grid
                container
                rowGap="40px"
                justifyContent={{ md: "space-between", sm: "center", xs: "center" }}
                sx={{
                  backgroundColor: "#6791DE", // Entire box background color
                  opacity: 0.8,
                  borderRadius: "20px",
                  p: "40px",
                }}
              >
                {/* FAQ Section */}
                <Box
                  sx={{
                    width: "100%",
                    padding: "50px 30px 20px 30px",
                    border: "1px solid #FFFFFF",
                  }}
                >
                  <Grid container spacing={2} direction="column">
                    {faqData.map((faq, index) => (
                      <Grid
                        item
                        xs={12}
                        key={index}
                        sx={{
                          border: "none",
                        }}
                      >
                        <Accordion
                          sx={{
                            backgroundColor: "transparent",
                            border: "none",
                            boxShadow: "none", // Removes all box shadows
                            "&:before": {
                              display: "none", // Removes the default Mui divider
                            },
                            "& .MuiAccordionSummary-expandIconWrapper": {
                              color: "#FFFFFF", // Icon color set to white
                            },
                            borderBottom: "1px solid #FFFFFF", // White line at the bottom
                            borderRadius: "0 !important"
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                          >
                            <Typography
                              className="para-text"
                              sx={{
                                color: "#FFFFFF",
                                fontSize: "16px",
                                maxWidth: "400px", // Restrict the width of the text
                                whiteSpace: "normal", // Allow text to wrap
                              }}
                            >
                              {faq.question}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography
                              className="para-text"
                              sx={{
                                color: "#FFFFFF9E",
                                fontSize: "12px",
                                maxWidth: "400px", // Restrict the width of the text
                                whiteSpace: "normal", // Allow text to wrap
                              }}
                            >
                              {faq.answer}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Additional Content */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "30px", // Space between FAQ and additional content
                      gap: "20px", // Space between elements
                    }}
                  >
                    <Typography variant="h2" className='heading-font' sx={{ color: "white", fontSize: "24px" }}>
                      Still Have Questions?
                    </Typography>
                    <Typography
                      variant="body1"
                      className='para-text'
                      sx={{ color: "white", fontSize: "16px", maxWidth: "600px" }}
                    >
                      Contact our customer services for more assistance.
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    className="para-text"
                    onClick={()=> navigate('/contact-us')}
                    sx={{
                      backgroundColor: "#FF9D04",
                      color: "white",
                      fontWeight: "bold",
                      padding: "4px 35px",
                      marginTop: "30px",
                      border: "none", // Remove any default border
                      textTransform: "none", // Prevent text from transforming to uppercase (optional)
                      fontSize: "18px"
                    }}

                  >
                    Contact
                  </Button>

                </Box>


              </Grid>
            </Grid>
          </Grid>

          <Box
            component="img"
            src={Images.reading} // Replace with actual image URL
            alt="FAQ Decorative Image"
            sx={{
              width: { xs: "40px", sm: "60px", md: "140px" }, // Smaller size
              height: "auto",
              marginTop: 6, // Space between heading and image
              paddingRight: { xs: 1, sm: 2, md: 10 }, // Right padding for alignment
              display: "block", // Ensures the image aligns properly
              marginLeft: "auto", // Pushes the image to the right
              marginRight: 0, // Ensures no extra space on the right
            }}
          />

        </Grid>




        <Grid
          container
          sx={{
            backgroundImage: `url(${Images.reviewBg})`, 
            backgroundSize: "cover", 
            backgroundPosition: "center", 
            backgroundRepeat: "no-repeat", 
            maxHeight: "1500vh", // Adjusted height
            paddingTop: "80px",
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
            md={12}
            sx={{
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Center heading with images
                gap: 2, // Space between images and heading
                marginBottom: 0, // Space below heading
              }}
            >
              <Box
                component="img"
                src={Images.cloud} // Replace with actual right image URL
                alt="Right Decorative Image"
                sx={{
                  width: { xs: "50px", sm: "60px", md: "80px" },
                  height: "auto",
                  position: "absolute",
                  left: { md: 80, xs: 0, sm: 25 },

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
                    sm: "50px",
                    xs: "40px",
                  }, // Responsive font size
                  fontWeight: 600,
                  color: "#F9BF29",
                  textTransform: "uppercase",
                  position: "relative",

                }}
                style={{
                  WebkitTextStroke: "1px white",
                  WebkitTextFillColor: "#F9BF29",
                }}
              >
                REviews

              </Typography>
              {/* Right Image */}
              <Box
                component="img"
                src={Images.star} // Replace with actual right image URL
                alt="Right Decorative Image"
                sx={{
                  width: { xs: "50px", sm: "60px", md: "80px" },
                  height: "auto",
                  position: "absolute",
                  right: { md: 80, xs: 0, sm: 25 },
                  transform: "rotate(55deg)", // Rotate image 45 degrees for northeast orientation
                  transformOrigin: "center", // Set rotation origin to the center of the image

                }}
              />
            </Box>
          </Grid>
          <Box sx={{ width: "95%", margin: "0 auto", paddingTop: "80px", display: "flex", justifyContent: "center", position: "relative" }}>
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
                  backgroundColor: activeCard === ind ? "#FF9D04" : "#CA6680",
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
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Rating name="read-only" value={item?.rating} sx={{ borderColor: "white" }} readOnly />
                </Box>

                {/* Comment */}
                <Typography variant={"body2"} sx={{ color: "white" }}>
                  {item.comment}
                </Typography>

                {/* Name, Designation */}
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <Avatar sx={{ width: 64, height: 64 }} src={item.profile} alt={item.name} />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600, color: "white" }}>
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

      {/* Navigation Buttons */}
      <Box
        sx={{
          position: "absolute",
          top: "53%",
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
          top: "53%",
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
                height:"1400px"
              },
              "@media (min-width: 1536px) and (max-width: 2299px)": {
                height:"1050px"
              },
            }}
          ></Grid>

   

        </Grid>

   














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

      </Box>
    </>
  )
}

export default FAQ