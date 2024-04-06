import React, { useState } from 'react';
import { Box, Button, CardMedia, Container, Grid, Typography, ButtonGroup, TextField } from '@mui/material';
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images';
import Colors from '../../styles/colors';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "../../../App.css"
// import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [selected, setSelected] = useState("episode");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: false, // Set to true if you want variable width slides
    centerMode: true, // Set to true if you want to center the slides
    centerPadding: '50px'
  };

  const buttons = [
    <Button
      key="episode"
      variant={selected == 'episode' ? "contained" : "outlined"}
      sx={{
        width: "180px",
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
        width: "180px",
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
              height: "624px",
              backgroundSize: "cover",
              backgroundPosition: "center center"
            }}
          >
            <Grid container>
              <Grid item md={7}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "40px",
                    pt: "60px",
                    pl: 6
                  }}
                >
                  <Typography
                    variant='h1'
                    sx={{
                      fontSize: "70px",
                      fontWeight: 700,
                      color: Colors.white
                    }}
                  >
                    <span style={{ color: Colors.orange }}>Follow</span>, Learn and Explore with Tara!
                  </Typography>
                  <Typography
                    variant='h3'
                    sx={{
                      fontSize: "38px"
                    }}
                  >
                    Click To See Latest Adventures!
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Button
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
                    <Button>
                      <FacebookRounded />
                    </Button>
                    <Button>
                      <InstagramRounded />
                    </Button>
                    <Button>
                      <YoutubeRounded />
                    </Button>
                    <Button>
                      <TiktokRounded />
                    </Button>
                  </Box>
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
          py: "80px"
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
                  fontWeight: 900
                }}
              >
                What <span style={{ color: Colors.purple }}>Shine And Tara</span> Have For You
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "10px"
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <ButtonGroup>
                  {buttons}
                </ButtonGroup>
              </Box>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
              }}
            >
              <Typography>
                Come along with Tara and Shine as they explore enchanting locations and go about their daily activities, discovering important lessons about Islam, being good people, and the importance of family.In their exciting adventures, Tara and Shine visit magical places and experience everyday situations that teach them valuable things. They learn about Islamic teachings, how to be kind and do the right things, and why family is so special.
              </Typography>
              <Typography>
                This amazing series is made to be fun and educational for kids. Tara and Shine's journeys will help children understand Islamic values, learn good morals, and appreciate the love within their familie.Get ready to join Tara and Shine on their wonderful journey, where they learn, grow, and have lots of fun!
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        component={"section"}
        sx={{
          background: "#3D5A98",
          height: "520px",
          width: "100%",
          py: "72px"
        }}
      >
        <Slider {...settings}>
          {sliderData.map((item, i) => (
            <Box
              key={i}
            >
              <CardMedia
                component={"img"}
                src={item.image}
                sx={{
                  width: "100%",
                  height: "300px",
                  objectFit: "contain",
                }}
              />
              <Box
                sx={{
                  background: Colors.yellow,
                  textAlign: "center",
                  p: 3,
                  mx: item.title == "Dealing With Sibling"
                    ? "32px" : item.title == "5 Pillars With The Neighbors"
                      ? "30px" : "31px"
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
      <Box
        component={"section"}
        sx={{
          background: Colors.lightPurple,
          py: "80px"
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "center"
                }}
              >
                <CardMedia
                  component={"img"}
                  src={Images.shineStar}
                  sx={{
                    width: "70px",
                    heigth: "70px",
                    objectFit: "contain"
                  }}
                />
                <Typography
                  variant='h3'
                  sx={{
                    fontWeight: 600
                  }}
                >
                  Collaborating With
                </Typography>
                <CardMedia
                  component={"img"}
                  src={Images.shineStar}
                  sx={{
                    width: "70px",
                    heigth: "70px",
                    objectFit: "contain"
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "58px",
                    fontWeight: 900,
                    color: Colors.primary
                  }}
                >
                  Islamic Relief Canada
                </Typography>
              </Box>
            </Box>
            <Box>
              <CardMedia
                component={"img"}
                src={Images.islamicRelief}
                sx={{
                  width: "100%",
                  height: "350px",
                  objectFit: "contain"
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        component={"section"}
        sx={{
          background: Colors.whiteblue,
          p: 8
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
                gap: "50px"
              }}
            >
              <Typography
                variant='h5'
                sx={{
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
                  width: "60%",
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