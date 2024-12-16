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
import React, { useContext, useEffect, useState } from "react";
import Colors from "../../styles/colors";
import Fonts from "../../styles/fonts";
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

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { cartVisible, toggleCartVisibility } = useContext(CartContext);
  const { setCount } = useContext(CartCounter);
  const [open, setOpen] = useState(false);
  // const [reviewBoxes, setReviewBoxes] = useState([]);

  console.log(cartVisible, "cartVisible");

  // const getReviews = async () => {
  //   try {
  //     const q = query(collection(db, "reviews"));
  //     const querySnapshot = await getDocs(q);
  //     const dataArray = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     console.log(dataArray);
  //     setReviewBoxes(dataArray);
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //   }
  // };

  // useEffect(() => {
  //   getReviews();
  // }, []);


  const scrollCharacter = [
    { name: "Ahmed", comment: "loves to solve puzzles, creative mind." },
    { name: "Tara", comment: "Adventurous and have imaginary best friend shine." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "Tara", comment: "Adventurous and have imaginary best friend shine." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },
    { name: "SHINE", comment: "Guides Tara towards good deed." },



  ]

  const images = [Images.character14, Images.blog4, Images.character16];
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

  const getVisibleImages = () => {
    const result = [];
    for (let i = 0; i < visibleImages; i++) {
      result.push(images[(currentIndex + i) % images.length]);
    }
    return result;
  };

  const currentImages = getVisibleImages();

  const handleAddClick = (index) => {
    setMessageIndex(index);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // Auto-hide message after 3 seconds
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
      email: "archiotshimo@gmail.com",
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
      image: Images.character17,
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
        sx={{
          backgroundImage: `url(${Images.bannerBg})`,

          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          width: "100%",
          height: { md: "500px", xs: "300px", xl: "800px", sm: "350px" },
          position: "relative", // Ensure child content is positioned relative to this container
          overflow: "hidden", // Prevent content from going outside
        }}
      >
        {/* Right-side Image */}
        <Box
          sx={{
            margin: { sm: "20px auto 0 auto", xs: "50px auto 0 auto" },
            width: { md: "100%", sm: "100%", xs: "100%" }, // Adjust width for each screen size
            height: "100%", // Full height of the parent container
            backgroundImage: `url(${Images.mainCharacter})`,
            backgroundSize: { md: "contain", xl: "contain", lg: "contain", xs: "contain", sm: "contain" },
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center", // Ensures the image is aligned at the bottom

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
            charcter's
          </span>
        </Typography>

        <Box pb={10}>
          <Box sx={{ width: "100%", margin: "0 auto", overflowX: "visible" }}>
            <Grid item md={11} sm={11} xs={11} >
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
                  300: {
                    slidesPerView: 1,
                    alignItems: "center"

                  },
                  460: {
                    slidesPerView: 2,
                    alignItems: "center"

                  },
                  786: {
                    slidesPerView: 3, // Keep two cards for this range too

                  },
                  1080: {
                    slidesPerView: 4, // For large screens
                  },
                  1700: {
                    slidesPerView: 6, // For large screens
                  },
                }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {scrollCharacter?.map((item, ind) => (
                  <SwiperSlide key={ind}>
                    {/* Outer Box */}
                    <Box
                      sx={{
                        position: "relative", // Ensures the image and borders stack properly
                        padding: "7px", // Gap for the outer border
                        backgroundColor: "orange", // Outer yellow background
                        borderRadius: "50px 40px 40px 40px", // Outer border radius
                        border: "4px solid black", // Outer solid border
                        overflow: "visible", // Ensure image is not clipped
                        display: "flex", // Use flexbox to center the content
                        justifyContent: "center", // Center the image horizontally
                        alignItems: "center", // Center the image vertically
                        height: "auto", // Let the height adjust based on content
                        maxWidth: "300px"
                      }}
                    >
                      {/* Image Positioned Outside of Box */}
                      <Box
                        component="img"
                        src={Images.character13} // Replace with your image path
                        alt="Corner Decoration"
                        sx={{
                          position: "absolute", // Absolute positioning for the image
                          top: "-36px", // Adjusted top to ensure image stays within bounds
                          left: "-50px", // Adjust as needed
                          width: "150px", // Adjust image size
                          height: "160px", // Adjust image size
                          zIndex: 10, // Ensure it's above all borders
                          objectFit: "cover", // Ensures the image covers the area and doesn't get clipped
                        }}
                      />
                      {/* Middle Dashed Border */}
                      <Box
                        sx={{
                          position: "relative",
                          padding: "7px", // Gap for the middle dashed border
                          backgroundColor: "orange", // Transparent background
                          borderRadius: "40px 40px 40px 40px", // Middle border radius
                          border: "4px dashed black", // Middle dashed border
                        }}
                      >
                        {/* Inner Card */}
                        <Box
                          sx={{
                            py: 1,
                            px: 4,
                            borderRadius: "30px 30px 30px 30px", // Inner card border radius
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            backgroundColor: "#6692DC", // Inner card background
                            height: "80px", // Fixed height for all cards
                            border: "2px solid #F9BF29", // Inner solid border
                            maxWidth: "400px",
                            // maxHeight:"400px"

                          }}
                        >
                          <Typography
                            className="heading-font"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5, // Adjust spacing between name and comment
                              textAlign: "center",
                              fontSize: "20px", // Adjust text size
                              color: "transparent", // Make text transparent initially
                              WebkitTextStroke: "1px white", // Outline color
                              WebkitTextFillColor: "#F9BF29", // Fill color
                            }}
                          >
                            {item?.name}
                          </Typography>
                          <Typography
                            className="heading-font"
                            variant={"body2"}
                            sx={{
                              color: "white",
                              fontSize: "12px", // Smaller text size
                              textAlign: "center", // Center-align text
                              width: "100%", // Ensure it takes full width
                              overflow: "hidden", // Remove text overflow
                              wordWrap: "break-word", // Break long words to fit within the box
                              whiteSpace: "normal", // Allow text to wrap onto the next line
                            }}
                          >
                            {item.comment}
                          </Typography>

                        </Box>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Box>
        </Box>




        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: "100%",
            height: "auto",
            overflow: "hidden",
          }}
        >
          {/* Left Arrow */}
          <Box
            component="button"
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            <img
              src={Images.backwardArrow}
              alt="Previous"
              style={{ width: "60px", height: "40px" }}
            />
          </Box>

          {/* Images */}
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: "10px",
            }}
          >
            {currentImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: { xs: "100px", sm: "150px", md: "300px",lg:"500px", xl: "800px" },
                  height: "auto",
                  flexShrink: 0,
                  "@media (min-width: 1536px) and (max-width: 2000px)": {
                    width:"500px"
                     },
                     "@media (min-width: 1750px) and (max-width: 2270px)": {
                       width:"600px"
                        },
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt={`Image ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
                {/* Add Icon */}
                <Box
                  component="img"
                  src={Images.msgPic} // Replace with your "Add" image path
                  alt="Add"
                  onClick={() => handleAddClick(index)}
                  sx={{
                    position: "absolute",
                    top: "45%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { md: "40px", xl: "75px" },
                    height: { md: "40px", xl: "75px" },
                    cursor: "pointer",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Right Arrow */}
          <Box
            component="button"
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            <img
              src={Images.forwardArrow}
              alt="Next"
              style={{ width: "60px", height: "40px" }}
            />
          </Box>

          {/* Message Display */}
          {showMessage && messageIndex !== null && (
            <Typography
              sx={{
                position: "absolute",
                top: "50%",
                left: {
                  md: messageIndex === 0 ? `${30 + (messageIndex * 10)}%` : messageIndex === 1 ? `${50 + (messageIndex * 10)}%` : `${50 + (messageIndex * 10)}%`,
                  xl: messageIndex === 0 ? `${26 + (messageIndex * 10)}%` : messageIndex === 1 ? `${44 + (messageIndex * 10)}%` : `${61 + (messageIndex * 10)}%`,
                  lg: messageIndex === 0 ? `${22 + (messageIndex * 10)}%` : messageIndex === 1 ? `${42 + (messageIndex * 10)}%` : `${61 + (messageIndex * 10)}%`,

                
                },
                // left: `${50 + (messageIndex * 10)}%`, 
                transform: "translate(-50%, -50%)",
                backgroundColor: "#5B73AD",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                fontSize:{xl:"30px"}
                
              }}
            >
              {`You clicked "Add" on Image ${messageIndex + 1}`}
            </Typography>
          )}
        </Box>

      </Box>

      <Box
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

          <Grid item md={8} sm={12} xs={12}>
            <Grid container spacing={4} justifyContent={"space-between"}>
              {teamData.map((item, i) => (
                <Grid key={i} item md={6} sm={12} xs={12}
                  sx={{
                    height: { xl: "100%" }
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component={"img"}
                      src={item.image}
                      sx={{
                        width: "100%",
                        height: { md: "350px", xl: "950px" },
                        objectFit: "cover",
                        objectPosition: "top",
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
                        borderRadius: "0 0 20px 20px"
                      }}
                    >
                      <Typography
                        variant="caption"
                        fontWeight="bold"
                        sx={{
                          fontSize: {
                            lg: "25px", // Large screens
                            md: "18px", // Medium screens
                            sm: "16px", // Small screens
                            xs: "16px", // Extra small screens
                          },
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="caption" sx={{
                        fontSize: {
                          lg: "16px", // Large screens
                          md: "12px", // Medium screens
                          sm: "10px", // Small screens
                          xs: "10px", // Extra small screens
                        },
                        textAlign: "center"
                      }}>
                        {item.profession}
                      </Typography>
                      <Box
                        component={"div"}
                        sx={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "#78C1FF",
                        }}
                        onClick={() => handleEmailClick(item.email)}
                      >
                        <Typography variant="caption" color="#78C1FF"
                          sx={{
                            fontSize: {
                              lg: "13px", // Large screens
                              md: "10px", // Medium screens
                              sm: "8px", // Small screens
                              xs: "8px", // Extra small screens
                            },
                          }}> {item.email}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Character;
