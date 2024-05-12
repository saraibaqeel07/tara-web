import React, { useEffect, useState } from 'react'
import { Box, Button, ButtonGroup, CardMedia, Container, Grid, Typography } from '@mui/material'
import Colors from '../../styles/colors'
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images'
import Fonts from '../../styles/fonts'

function About() {
  const [selected, setSelected] = useState("mission");

  const buttons = [
    <Button
      key="mission"
      variant={selected == 'mission' ? "contained" : "outlined"}
      color="secondary"
      sx={{
        // width: { md: "180px", sm: "150px", xs: "100%" },
        // background: selected == "mission" ? Colors.darkblue : "transparent",
        // color: selected == "mission" ? Colors.white : Colors.darkblue,
        width: "100%",
        px: 4,
        py: 1.5
      }}
      onClick={() => setSelected("mission")}
    >
      Mission
    </Button>,
    <Button
      key="vision"
      variant={selected == 'vision' ? "contained" : "outlined"}
      color="secondary"
      sx={{
        // width: { md: "180px", sm: "150px", xs: "100%" },
        // background: selected == "vision" ? Colors.darkblue : "transparent",
        // color: selected == "vision" ? Colors.white : Colors.darkblue,
        width: "100%",
        px: 4,
        py: 1.5
      }}
      onClick={() => setSelected("vision")}
    >
      Vision
    </Button>,
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a random color
     
      let element = document.getElementById('muslim-text')
      let element2 = document.getElementById('islamic-text')
      let element3 = document.getElementById('cartoon-text')
      if(element){
        console.log(element.style.color)
        if(element.style.color =='rgb(254, 157, 4)'){
          element.style.color='white'
          element2.style.color=Colors.darkblue
          element3.style.color='white'
        }
        
        else if(element3.style.color == 'white'){
          element.style.color='white'
          element2.style.color='white'
          element3.style.color=Colors.pink
        }
        else{
          element.style.color='rgb(254, 157, 4)'
          element2.style.color='white'
          element3.style.color='white'
        }
      }
    }, 1000); // Change color every 1000ms (1 second)

    return () => clearInterval(intervalId);
  }, []);
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
              backgroundImage: { md: `url(${Images.aboutBg})`, sm: `url(${Images.backgroundSm})`, xs: `url(${Images.backgroundSm})` },
              width: "100%",
              height: { md: "624px", xs: "490px" },
              backgroundSize: "cover",
              backgroundPosition: "center center",
              borderRadius: "20px"
            }}
          >
            <Grid container>
              <Grid item md={10} sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    pt: "60px",
                    pl: { md: `60px !important`, sm: "12px", xs: "12px" },
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
                    <span id='muslim-text' style={{ color: Colors.orange }}>Muslim</span> <span id='islamic-text'> Islamic</span> <span id='cartoon-text'>Cartoon</span>
                  </Typography>
                  <Typography
                    variant='h3'
                    sx={{
                      color: Colors.primary,
                      fontWeight: 600,
                      fontSize: { md: "48px", sm: "36px", xs: "32px" }
                    }}
                  >
                    Shine With Tara
                  </Typography>
                  <Typography
                    variant='h3'
                    sx={{
                      fontSize: { md: "38px", sm: "28px", xs: "20px" }
                    }}
                  >
                    Halal Education Animation
                  </Typography>
                  <Grid container spacing={2} alignItems={"center"}>
                    <Grid item md={4} sm={5} xs={12}>
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
                    <Grid item md={8} sm={7} xs={12}>
                      <Grid container spacing={2} sx={{ justifyContent: { md: "flex-start", sm: "flex-start", xs: "center" } }} gap={"10px"}>
                        <Grid item md={1}>
                          <Button href='https://www.facebook.com/profile.php?id=61554711500749'>
                            <FacebookRounded />
                          </Button>
                        </Grid>
                        <Grid item md={1}>
                          <Button href='https://www.instagram.com/shineswithtara/ '>
                            <InstagramRounded />
                          </Button>
                        </Grid>
                        <Grid item md={1}>
                          <Button href='https://www.youtube.com/@Shinewithtara'>
                            <YoutubeRounded />
                          </Button>
                        </Grid>
                        <Grid item md={1}>
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
      </Box>
      <Box
        component={"section"}
        sx={{
          background: Colors.whiteblue,
          backgroundImage: selected == "mission" ? `url(${Images.forAbout})` : `url(${Images.forAbout2})`,
          pt: "80px",

          height: { md: "770px", sm: "100%", xs: "100%" },
          backgroundSize: "contain",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: selected == "mission" ? "bottom center" : "bottom right"
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
                About <span style={{ color: Colors.darkblue }}>Shine And Tara</span>
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
            </Box>
          </Box>
        </Container>
        <Grid container >
          <Grid item md={10} xs={12}>
            <Box
              sx={{ p: 5, mb: 20 }}
            >
              {selected == "mission" ? (
                <Typography>
                  To empower the kids with Islamic teachings through engaging and imaginative storytelling, fostering a
                  love for learning and inspiring positive values of Islam.
                </Typography>
              ) : (
                <Typography>
                  Our vision is to become a trusted source of Islamic education for children worldwide, promoting understanding, compassion, and cultural appreciation through captivating animation and meaningful narratives.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default About