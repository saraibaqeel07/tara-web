import {
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  Drawer,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState, useRef } from "react";
import Colors from "../../styles/colors";
import Fonts from "../../styles/fonts";
import EmailIcon from '@mui/icons-material/Email';
import Images, {
  FacebookRounded,
  InstagramRounded,
  TiktokRounded,
  YoutubeRounded,
} from "../../assets/images";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import {
//   collection,
//   addDoc,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   where,
//   deleteDoc,
// } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";

// import { initializeApp } from "firebase/app";

import { CartCounter } from "../../Context/CartCounter";
function Character() {
  // Firebase configuration
  // const firebaseConfig = {
  //   apiKey: "AIzaSyCn_Ph5AlAi_wuxR0D7CBIY8_vBCNgD5r8",
  //   authDomain: "shinetara-86ec0.firebaseapp.com",
  //   projectId: "shinetara-86ec0",
  //   storageBucket: "shinetara-86ec0.appspot.com",
  //   messagingSenderId: "182521981077",
  //   appId: "1:182521981077:web:3cadc9d70d7fc25fab939c",
  //   measurementId: "G-BHYZDHJCK9",
  // };

  // // Initialize Firebase app
  // const app = initializeApp(firebaseConfig);

  // // Firestore reference
  // const db = getFirestore(app);
  const swiperRef = useRef(null);

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { cartVisible, toggleCartVisibility } = useContext(CartContext);
  const { setCount } = useContext(CartCounter);
  const [open, setOpen] = useState(false);
  // const [reviewBoxes, setReviewBoxes] = useState([]);



  // const getReviews = async () => {
  //   try {
  //     const q = query(collection(db, "reviews"));
  //     const querySnapshot = await getDocs(q);
  //     const dataArray = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     
  //     setReviewBoxes(dataArray);
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //   }
  // };

  // useEffect(() => {
  //   getReviews();
  // }, []);


  const scrollCharacter = [
    { name: "Fatima", comment: "loves nature, her pet is her bird." },
    { name: "Ali", comment: "book worm, loves to read books." },
    { name: "Laila", comment: "loves to eat  and cooks." },
    { name: "Ahmed", comment: "loves to solve puzzles, creative mind." },
    { name: "Tara", comment: "Adventurous and have imaginary best friend shine." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "Sara", comment: "She is very shy, and best friends with Tara." },
    { name: "Maya", comment: "4 years old, adventurous and has a kitten name fluffy." },
    { name: "Taha", comment: "  Loves Science, Scientist." },

  ]


  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState(null);

  // Number of images to display at a time
  const visibleImages = 3;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const images = [
    { id: 0, name: "Fatima", comment: "loves nature, her pet is her bird." },
    { id: 1, name: "Ali", comment: "book worm, loves to read books." },
    { id: 2, name: "Laila", comment: "loves to eat  and cooks." },
    { id: 3, name: "Ahmed", comment: "loves to solve puzzles, creative mind." },
    { id: 4, name: "Tara", comment: "Adventurous and have imaginary best friend shine." },
    { id: 5, name: "SHINE", comment: "Guides Tara towards good deed." },
    { id: 6, name: "Sara", comment: "She is very shy, and best friends with Tara." },
    { id: 7, name: "Maya", comment: "4 years old, adventurous and has a kitten name fluffy." },
    { id: 8, name: "Taha", comment: "  Loves Science, Scientist." },


  ];


  const currentImages = [{
    id: 0,
    src: Images.character11
    , name: "Fatima", comment: "loves nature, her pet is her bird."

  },
  {
    id: 1,
    src: Images.character12
    , name: "Ali", comment: "book worm, loves to read books."
  },
  {
    id: 2,
    src: Images.character13
    , name: "Laila", comment: "loves to eat  and cooks."
  },
  {
    id: 3,
    src: Images.character14, name: "Ahmed", comment: "loves to solve puzzles, creative mindss."
  },
  {
    id: 4,
    src: Images.character15
    , name: "Tara", comment: "Adventurous and have imaginary best friend shine."
  },
  {
    id: 5,
    src: Images.character16
    , name: "SHINE", comment: "Guides Tara towards good deed."
  },
  {
    id: 6,
    src: Images.character17
    , name: "Sara", comment: "She is very shy, and best friends with Tara."
  },
  {
    id: 7,
    src: Images.character18
    , name: "Maya", comment: "4 years old, adventurous and has a kitten name fluffy."

  },
  {
    id: 8,
    src: Images.character19
    , name: "Taha", comment: "  Loves Science, Scientist."
  }]

  const handleAddClick = (id) => {
    setMessageIndex(id);
    setShowMessage(true);
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
        ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
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
  const handleEmailClick = (emailAddress) => {
    window.location.href = `mailto:${emailAddress}`;
  };
  const characterData = [
    {
      name: "Tara",
      detail:
        "Tara is 9 years old. She is a shy Muslim girl. Her imaginary best friend is Shine. She is very kind, helpful, and loving. Her special skill is drawing. She gets nervous around a lot of people, but Shine overcomes her weakness.",
      image: Images.Tara,
      logo: Images.logoTara,
    },
    {
      name: "Shine",
      detail:
        "Tara's best imaginary friend is named Shine. She always lends a hand to Tara. She has a lot of energy. She has a bold personality and inspires confidence",
      image: Images.shine,
      logo: Images.logoShine,
    },
    {
      name: "Ahmed",
      detail:
        "Ahmed is Tara’s younger brother; he is 8 years old. Ahmed is very kind and helpful boy. He loves to play video games.",
      image: Images.ahmed,
      logo: Images.logoAhmed,
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.laila,
      logo: Images.logoLaila,
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Sara,
      logo: Images.logoLaila,
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Fatima,
      logo: Images.logoLaila,
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Taha,
      logo: Images.logoLaila,
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.ali,
      logo: Images.logoLaila,
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Maya,
      logo: Images.logoLaila,
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Mom,
      logo: Images.logoLaila,
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Dad,
      logo: Images.logoLaila,
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.annie,
      logo: Images.logoLaila,
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Omar,
      logo: Images.logoLaila,
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.grandma,
      logo: Images.logoLaila,
    },
    {
      name: "Laila",
      detail:
        "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Faiz,
      logo: Images.logoLaila,
    },
  ];

  const teamData = [
    {
      name: "Sohaib Ali Khan",
      email: "sohaibalikhann@gmail.com",
      profession: "Social Media Content Writer",
      image: Images.contentWriter,
    },
    {
      name: "Onam",
      email: "onamdoesart@gmail.com ",
      profession: "Animator, Storyboard, Illustrator, Character",
      image: Images.storyBoard,
    },
    {
      name: "Hussnain Shafay",
      email: "hhussnain542@gmail.com",
      profession: "Web Developer And Graphic Design",
      image: Images.webDeveloper,
    },
    {
      name: "Amna Farooq",
      email: "amna.publications@gmail.com",
      profession: "Illustrator,  2D Animator",
      image: Images.team4,
    },
  ];
  useEffect(() => {
    let cart = localStorage.getItem("cartData");
    if (cart) {
      cart = JSON.parse(cart);
      if (cart?.length > 0) {
        setCartItems(cart);
        setCount(cart.length);
        const totalPrice = cart.reduce((total, item) => {
          return total + parseFloat(item.price) * item.quantity;
        }, 0);
        setTotalAmount(totalPrice);
      }
    }
    const intervalId = setInterval(() => {
      // Generate a random color

      let element = document.getElementById("main-text");
      let element2 = document.getElementById("character-text");

      if (element) {
        console.log(element.style.color);
        if (element.style.color == "rgb(2, 27, 81)") {
          element.style.color = "white";
          element2.style.color = Colors.pink;
        } else {
          element.style.color = Colors.darkblue;
          element2.style.color = "white";
        }
      }
    }, 1000); // Change color every 1000ms (1 second)

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    setOpen(cartVisible);
  }, [cartVisible]);
  return (
    <Box
      component={"main"}
      sx={{
        width: "100%",
      }}
    >
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 400, padding: 2 }} role="presentation">
          <Box display="flex" flexWrap="wrap">
            {cartItems?.length > 0 ? (
              cartItems?.map((product, index) => (
                <React.Fragment key={index}>
                  <Box
                    component={"div"}
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
                    sx={{ color: "black", cursor: "pointer", width: "100%" }}
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
                      sx={{ fontSize: "12px", color: "black", width: "100px" }}
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

      <Box
        sx={(theme) => ({
          backgroundImage: `url(${Images.bannerBg})`,

          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          width: "100%",
          height: { md: "450px", xs: "300px", xl: "730px", sm: "350px" },
          position: "relative",
          overflow: "hidden",
          [theme.breakpoints.between(200, 450)]: {
            height: "250px"
          },
        })}
      >
        {/* Right-side Image */}
        <Box
          sx={{
            margin: { sm: "20px auto 0 auto", xs: "50px auto 0 auto" },
            width: { md: "100%", sm: "100%", xs: "100%" },
            height: "100%",
            backgroundImage: `url(${Images.sliderFamily2})`,
            backgroundSize: { md: "contain", xl: "contain", lg: "contain", xs: "contain", sm: "contain" },
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",


          }}
        />
      </Box>


      <Box sx={{ backgroundImage: `url(${Images.mainBGPink})`, backgroundSize: 'cover', position: "relative" }}>
        <Box
          component="img"
          src={Images.pencil} // Replace with actual right image URL
          alt="Right Decorative Image"
          sx={{
            width: { xs: "50px", sm: "60px", md: "80px" },
            height: "auto",
            position: "absolute",
            right: { md: 80, xs: 0, sm: 25 },
            top: "100px"
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
              xs: "30px",
            }, // Adjusts font size for different screens
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textTransform: "uppercase",
            py: "60px",
            position: "relative", // Ensures alignment with image
            zIndex: 1, // Keeps heading above the image
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <span
            style={{
              WebkitTextStroke: "1px white",
              WebkitTextFillColor: "#F9BF29",
            }}
          >
            main{" "}
          </span>
          <span
            style={{
              display: "block",
              WebkitTextStroke: "1px white",
              WebkitTextFillColor: "#4FAAFB",
            }}
          >
            {" "}
            character's
          </span>
        </Typography>

        <Box pb={10}>
          <Box sx={{ width: "100%", margin: "0 auto", overflowX: "visible" }}>
            <Grid item md={11} sm={11} xs={11} >
              <Swiper
                ref={swiperRef}
                style={{ display: "flex", alignItems: "flex-end" }}
                loop={true}
                spaceBetween={10}
                slidesPerView={3}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                  300: { slidesPerView: 1 },
                  460: { slidesPerView: 2 },
                  786: { slidesPerView: 4 },
                  1080: { slidesPerView: 4 },
                  1700: { slidesPerView: 6 },
                }}
                onSlideChange={() => {
                  if (swiperRef.current) {
                    swiperRef.current.swiper.autoplay.start();
                  }
                }}
              >
                {currentImages?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "auto",
                      }}
                    >
                      {/* Message Box */}
                      {showMessage && messageIndex === image.id && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            padding: "7px",
                            backgroundColor: "orange",
                            borderRadius: "50px 40px 40px 40px",
                            border: "4px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "auto",
                            width: "260px",
                            zIndex: 1,
                          }}
                        >
                          <Box
                            component="img"
                            src={Images.char13}
                            alt="Corner Decoration"
                            sx={{
                              position: "absolute",
                              top: "-36px",
                              left: "-50px",
                              width: "150px",
                              height: "160px",
                              zIndex: 2,
                              objectFit: "cover",
                            }}
                          />
                          <Box
                            sx={{
                              position: "relative",
                              padding: "7px",
                              backgroundColor: "orange",
                              borderRadius: "40px",
                              border: "4px dashed black",
                            }}
                          >
                            <Box
                              sx={{
                                py: 1,
                                px: 4,
                                borderRadius: "30px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                backgroundColor: "#6692DC",
                                height: "80px",
                                border: "2px solid #F9BF29",
                                maxWidth: "400px",
                              }}
                            >
                              <Typography
                                className="heading-font"
                                sx={{
                                  fontWeight: 600,
                                  mb: 0.5,
                                  textAlign: "center",
                                  fontSize: "20px",
                                  color: "transparent",
                                  WebkitTextStroke: "1px white",
                                  WebkitTextFillColor: "#F9BF29",
                                }}
                              >
                                {image?.name}
                              </Typography>
                              <Typography
                                className="heading-font"
                                variant={"body2"}
                                sx={{
                                  color: "white",
                                  fontSize: "12px",
                                  textAlign: "center",
                                  width: "100%",
                                  overflow: "hidden",
                                  wordWrap: "break-word",
                                  whiteSpace: "normal",
                                }}
                              >
                                {image.comment}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      )}

                      {/* Background Image */}
                      <Box
                        component="img"
                        src={image.src}
                        alt={`Image ${image.id}`}
                        sx={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />

                      {/* Message and Icon */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "45%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();

                          if (showMessage) {
                            setShowMessage(false);
                            setMessageIndex(null);

                            if (swiperRef.current) {
                              swiperRef.current.swiper.autoplay.start();
                            }
                          } else {
                            setShowMessage(true);
                            setMessageIndex(image.id);

                            if (swiperRef.current) {
                              swiperRef.current.swiper.autoplay.stop();
                            }
                          }
                        }}
                      >
                        <Box
                          component="img"
                          src={Images.msgPic}
                          alt="Add"
                          sx={{
                            width: { xs: "20px", md: "30px", xl: "55px" },
                            height: { xs: "20px", md: "30px", xl: "55px" },
                            borderRadius: "50%",
                            padding: "5px",
                            marginBottom: "10px",
                          }}
                        />
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Box>
        </Box>






      </Box>

      {/* <Box
        component={"section"}
        sx={{
          backgroundImage: `url(${Images.reviewBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          p: "60px",
          position: "relative"
        }}
      >
        <Box
          component="img"
          src={Images.star} // Replace with actual right image URL
          alt="Right Decorative Image"
          sx={{
            width: { xs: "50px", sm: "60px", md: "80px" },
            height: "auto",
            position: "absolute",
            right: { lg: 80, xs: 0, sm: 0, md: 40 },
            top: "180px",
            // display:{xs:"none", sm:"none",md:"block"}
          }}
        />
        <Box
          component="img"
          src={Images.pinkArrow} // Replace with actual right image URL
          alt="Right Decorative Image"
          sx={{
            width: { xs: "50px", sm: "60px", md: "80px" },
            height: "auto",
            position: "absolute",
            right: { lg: 80, xs: 0, sm: 0, md: 40 },
            bottom: "100px",
            // display:{xs:"none", sm:"none",md:"block"}
          }}
        />
        <Box
          component="img"
          src={Images.cloud} // Replace with actual right image URL
          alt="Right Decorative Image"
          sx={{
            width: { xs: "50px", sm: "60px", md: "80px" },
            height: "auto",
            position: "absolute",
            left: { md: 80, xs: 0, sm: 25 },
            top: "50px"
          }}
        />
        <Box
          component="img"
          src={Images.sun} // Replace with actual right image URL
          alt="Right Decorative Image"
          sx={{
            width: { xs: "50px", sm: "60px", md: "80px" },
            height: "auto",
            position: "absolute",
            left: { md: 80, xs: 0, sm: 0 },
            bottom: "500px",

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
            }, // Adjusts font size for different screens
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textTransform: "uppercase",
            paddingBottom: { xl: 12, lg: 5, md: 4, sm: 3, xs: 2 },
            position: "relative", // Ensures alignment with image
            zIndex: 1, // Keeps heading above the image
            margin: "0 auto",
            display: "flex",
            justifyContent: "center", pt: "50px"
          }}
          style={{
            WebkitTextStroke: "1px white",
            WebkitTextFillColor: "#F9BF29",
          }}
        >
          Team

        </Typography>
        <Grid container justifyContent={"center"} gap={"40px"}>

          <Grid item md={12} sm={12} xs={12}>
            <Grid container spacing={4} justifyContent={"space-between"}>
              {teamData.map((item, i) => (
                <Grid key={i} item md={3} sm={4} xs={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      height: "100%", // Ensure equal height
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={item.image}
                      sx={{
                        width: "100%",
                        height: "350px", // Fixed height for uniformity
                        objectFit: "cover", // Ensures proper scaling
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                        backgroundColor: "#CA6680",
                        p: 2,
                        flex: 1, // Ensures equal height
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="caption"
                        fontWeight="bold"
                        sx={{
                          fontSize: {
                            lg: "25px",
                            md: "18px",
                            sm: "16px",
                            xs: "16px",
                          },
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: {
                            lg: "16px",
                            md: "12px",
                            sm: "10px",
                            xs: "10px",
                          },
                          textAlign: "center",
                        }}
                      >
                        {item.profession}
                      </Typography>
                      <Box
                        component="div"
                        sx={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "#78C1FF",
                        }}
                        onClick={() => handleEmailClick(item.email)}
                      >
                        <Typography
                          variant="caption"
                          color="#78C1FF"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            fontSize: {
                              lg: "13px",
                              md: "10px",
                              sm: "8px",
                              xs: "8px",
                            },
                          }}
                        >
                          <EmailIcon />  {item.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

          </Grid>
        </Grid>
      </Box> */}
    </Box>
  );
}

export default Character;
