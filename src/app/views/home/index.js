import React, { useState } from 'react'
import { Box, Button, CardMedia, Container, Grid, Typography, ButtonGroup } from '@mui/material'
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images'
import Colors from '../../styles/colors'

function Home() {
  const [selected, setSelected] = useState();
  const buttons = [
    <Button
      key="episode"
      variant={selected == 'episode' ? "contained" : "outlined"}
      sx={{
        width: "180px",
        px: 4,
        // background: selected == "episode" ? Colors.primary : "transparent",
        // color: selected == "episode" ? Colors.white : Colors.primary,
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
        // background: selected == "merchandise" ? Colors.primary : "transparent",
        // color: selected == "merchandise" ? Colors.white : Colors.primary,
      }}
      onClick={() => setSelected("merchandise")}
    >
      Merchandise
    </Button>,
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
              backgroundImage: `url(${Images.bannerBg})`,
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
                    <span style={{ color: Colors.orange }}>Follow</span>,Learn and Explore with Tara!
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
                  width: "70px",
                  heigth: "70px",
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
                  width: "70px",
                  heigth: "70px",
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
      {/* <Box
        component={"section"}
        sx={{
          background: Colors.darkblue,
          height: "400px",
          width: "100%"
        }}
      >
      </Box> */}
    </Box>
  )
}

export default Home