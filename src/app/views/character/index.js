import { Box, Button, CardMedia, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Colors from '../../styles/colors'
import Fonts from '../../styles/fonts'
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images'

function Character() {

  const characterData = [
    {
      name: "Tara",
      detail: "Tara is 9 years old. She is a shy Muslim girl. Her imaginary best friend is Shine. She is very kind, helpful, and loving. Her special skill is drawing. She gets nervous around a lot of people, but Shine overcomes her weakness.",
      image: Images.tara,
      logo: Images.logoTara
    },
    {
      name: "Shine",
      detail: "Tara's best imaginary friend is named Shine. She always lends a hand to Tara. She has a lot of energy. She has a bold personality and inspires confidence",
      image: Images.shine,
      logo: Images.logoShine
    },
    {
      name: "Ahmed",
      detail: "Ahmed is Tara’s younger brother; he is 8 years old. Ahmed is very kind and helpful boy. He loves to play video games.",
      image: Images.ahmed,
      logo: Images.logoAhmed
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.laila,
      logo: Images.logoLaila
    },
  ];

  const teamData = [
    {
      name: "Sohaib Ali Khan",
      email: "sohaibalikhann@gmail.com",
      profession: "Social Media Content Writer",
      image: Images.contentWriter
    },
    {
      name: "Onam",
      email: "archiotshimo@gmail.com",
      profession: "Animator, Storyboard, Illustrator, Character",
      image: Images.storyBoard
    },
    {
      name: "Hussnain Shafay",
      email: "hhussnain542@gmail.com",
      profession: "Web Developer And Graphic Design",
      image: Images.webDeveloper
    },
    {
      name: "Sana Kazmi",
      email: "shineswithtara@gmail.com",
      profession: "Script, Story, Animator, Illustrator",
      image: Images.illustrator
    },
  ]

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
              backgroundImage: { md: `url(${Images.characterBg})`, sm: `url(${Images.backgroundSm})`, xs: `url(${Images.backgroundSm})` },
              width: "100%",
              height: { md: "624px", xs: "490px" },
              backgroundSize: "cover",
              backgroundPosition: "center center",
              borderRadius: "20px"
            }}
          >
            <Grid container>
              <Grid item md={11} sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    pt: "50px",
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
                    }}
                  >
                    Unveil The Stories Behind Our <span style={{ color: Colors.primary }}>Main Characters</span>
                  </Typography>
                  <Typography
                    variant='h3'
                    sx={{
                      fontSize: { md: "40px", sm: "36px", xs: "32px" }
                    }}
                  >
                    Click To See Latest Adventures!
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
                      >
                        Start Adventure
                      </Button>
                    </Grid>
                    <Grid item md={8} sm={7} xs={12}>
                      <Grid container spacing={2} sx={{ justifyContent: { md: "flex-start", sm: "flex-start", xs: "center" } }} gap={"10px"}>
                        <Grid item md={1}>
                          <Button>
                            <FacebookRounded />
                          </Button>
                        </Grid>
                        <Grid item md={1}>
                          <Button>
                            <InstagramRounded />
                          </Button>
                        </Grid>
                        <Grid item md={1}>
                          <Button>
                            <YoutubeRounded />
                          </Button>
                        </Grid>
                        <Grid item md={1}>
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
          width: "100%",
          p: "40px 20px"
        }}
      >
        <Grid container gap={"40px"}>
          <Grid item md={12} sm={12} xs={12}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { md: "38px", sm: "30px", xs: "22px" },
                textAlign: "center"
              }}
            >
              Let's Learn More About The Enchanted World Of Shine With Tara
            </Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
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
                src={Images.flower}
                sx={{
                  width: { md: "70px", sm: "65px", xs: "60px" },
                  height: { md: "70px", sm: "65px", xs: "60px" },
                  objectFit: "contain"
                }}
              />
              <Typography
                variant='h3'
                sx={{
                  fontSize: { md: "48px", sm: "42px", xs: "28px" },
                  fontWeight: 600,
                  color: Colors.darkblue
                }}
              >
                Main Characters
              </Typography>
              <CardMedia
                component={"img"}
                src={Images.flower}
                sx={{
                  width: { md: "70px", sm: "65px", xs: "60px" },
                  height: { md: "70px", sm: "65px", xs: "60px" },
                  objectFit: "contain"
                }}
              />
            </Box>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Grid container rowSpacing={4} justifyContent={"center"}>
              {characterData.map((item, i) => (
                <Grid key={i} item md={8} sm={12} xs={12}>
                  <Grid
                    container
                    sx={{
                      border: `8px solid ${item.name == "Tara" ? "#0C789D" : item.name == "Shine" ? "#C40A66" : item.name == "Ahmed" ? "#A36506" : "#5B0276"}`,
                      borderRadius: "20px"
                    }}
                  >
                    <Grid item md={8} sm={12} xs={12}>
                      <Box
                        sx={{
                          backgroundColor: item.name == "Tara"
                            ? "#75B2C7" : item.name == "Shine"
                              ? "#E58998" : item.name == "Ahmed"
                                ? "#E8B542" : "#8F52A1",
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                          height: "100%",
                          p: 4,
                          borderRadius: { md: "12px 0px 0px 12px", sm: "12px 12px 0px 0px", xs: "12px 12px 0px 0px" }
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          <CardMedia
                            component={"img"}
                            src={item.logo}
                            sx={{
                              width: "60px",
                              height: "60px",
                              objectFit: "contain"
                            }}
                          />
                          <Typography
                            variant="h5"
                          >
                            {item.name}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: "20px" }}>
                            {item.detail}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12} sx={{ borderLeft: { md: `8px solid ${item.name == "Tara" ? "#0C789D" : item.name == "Shine" ? "#C40A66" : item.name == "Ahmed" ? "#A36506" : "#5B0276"}`, sm: "none", xs: "none" } }}>
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
                            borderRadius: { md: "0px 12px 12px 0px", sm: "0px 0px 12px 12px", xs: "0px 0px 12px 12px" },
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        component={"section"}
        sx={{
          background: Colors.lightPurple,
          width: "100%",
          p: "20px"
        }}
      >
        <Grid container justifyContent={"center"} gap={"40px"}>
          <Grid item md={12} sm={12} xs={12}>
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
                src={Images.flower}
                sx={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain"
                }}
              />
              <Typography
                variant='h3'
                sx={{
                  fontWeight: 600,
                  color: Colors.darkblue
                }}
              >
                Team
              </Typography>
              <CardMedia
                component={"img"}
                src={Images.flower}
                sx={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain"
                }}
              />
            </Box>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            <Grid container spacing={4} justifyContent={"space-between"}>
              {teamData.map((item, i) => (
                <Grid key={i} item md={6} sm={12} xs={12}>
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
                        height: "350px",
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
                        backgroundColor: Colors.yellow,
                        p: 2
                      }}
                    >
                      <Typography
                        variant='caption'
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant='caption'
                      >
                        {item.profession}
                      </Typography>
                      <Typography
                        variant='caption'
                      >
                        {item.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Character