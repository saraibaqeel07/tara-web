import React, { Fragment, useEffect, useState } from 'react';
import { Box, Button, CardMedia, Container, Grid, Typography, ButtonGroup, TextField } from '@mui/material';
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images';
import Colors from '../../styles/colors';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "../../../App.css"
import Fonts from '../../styles/fonts';
// import "slick-carousel/slick/slick-theme.css";

function Home() {

  const firebaseConfig = {
    apiKey: "AIzaSyCn_Ph5AlAi_wuxR0D7CBIY8_vBCNgD5r8",
    authDomain: "shinetara-86ec0.firebaseapp.com",
    projectId: "shinetara-86ec0",
    storageBucket: "shinetara-86ec0.appspot.com",
    messagingSenderId: "182521981077",
    appId: "1:182521981077:web:3cadc9d70d7fc25fab939c",
    measurementId: "G-BHYZDHJCK9"
  };
  let productId=''
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [selected, setSelected] = useState("episode");

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
      title: "5 Pillars With The Neighbors"
    },
    {
      image: Images.sliderImage2,
      title: "Rome, Italy"
    },
    {
      image: Images.sliderImage3,
      title: "Rome, Italy"
    },
    {
      image: Images.sliderImage4,
      title: "Tag Game"
    },
    {
      image: Images.sliderImage5,
      title: "Dealing With Sibling"
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
  useEffect(() => {
    getProducts()
  }, [])
  

  return (
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
                    <span style={{ color: Colors.orange }}>Follow</span>, Learn and Explore with Tara!
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
                      >
                        Start Adventure
                      </Button>
                    </Grid>
                    <Grid item md={7} sm={7} xs={12}>
                      <Grid container spacing={2} sx={{ justifyContent: { md: "flex-start", sm: "flex-start", xs: "center" } }}>
                        <Grid item md={2}>
                          <Button>
                            <FacebookRounded />
                          </Button>
                        </Grid>
                        <Grid item md={2}>
                          <Button>
                            <InstagramRounded />
                          </Button>
                        </Grid>
                        <Grid item md={2}>
                          <Button>
                            <YoutubeRounded />
                          </Button>
                        </Grid>
                        <Grid item md={2}>
                          <Button>
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
      </Box>
      <Box
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
      </Box>
      <Box
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
                sx={{ p: 3 }}
              >
                <CardMedia
                  component={"img"}
                  src={item.image}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <Box
                  sx={{
                    background: Colors.yellow,
                    textAlign: "center",
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
        <Box
          component={"section"}
          sx={{
            background: Colors.whiteblue,
            height: "100%",
            width: "100%",
            py: "72px"
          }}
        >
          <Container>
            <Grid container spacing={2} justifyContent={"center"}>
              {cardData.map((card, i) => (
                <Grid key={i} item md={5}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "20px"
                    }}
                  >
                    <CardMedia
                      component={"img"}
                      src={card?.imgUrl}
                      sx={{
                        height: "400px",
                        borderRadius: "20px 20px 0px 0px"
                      }}
                    />
                    <Box
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
                        {card?.price}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </React.Fragment>
              ))}
            </Grid>
              <ProductModal pData={cardProduct} isModalOpens={isModalOpen} UpdateCount={setCount} valueCount={count} handleOks={handleOk} handleCancels={handleCancel} />
          </Container>
        </Box>
      )}
      <Box
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
        </Container>
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
    </Box>
  )
}

export default Home