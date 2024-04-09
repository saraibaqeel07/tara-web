import React, { useState } from 'react';
import { Box, Button, CardMedia, Container, Grid, Typography, ButtonGroup, TextField } from '@mui/material';
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images';
import Colors from '../../styles/colors';
import Slider from 'react-slick';

function Colorfull() {
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
          pt: "80px",

        }}
      >
        <Container>
          <Box
            sx={{
              backgroundImage: `url(${Images.mainBackground})`,
              width: "100%",
              height: { md: '700px', xs: '320px' },
              borderRadius: '20px',
              backgroundSize: "cover",
              backgroundPosition: "center center"
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    pt: "60px",

                  }}
                >
                  <Typography
                    variant='h1'
                    sx={{
                      fontSize: { md: '50px', xs: '30px', lg: '70px' },
                      fontWeight: 700,
                      color: Colors.white,
                      textAlign: 'center'
                    }}
                  >
                    Come And  <span style={{ color: Colors.primary }}>Color</span>  <span style={{ color: "#F9BF29 " }}>with</span> <span style={{ color: "#021B51" }}> Tara</span>
                  </Typography>

                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box

                  sx={{
                    backgroundImage: `url(${Images.colorfullBack})`,
                    width: '100%',
                    height: { md: '500px', xs: '200px' },
                    backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: "center center",
                    gap: "40px",


                  }}
                >


                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Box
          component={"section"}
          sx={{
            background: Colors.whiteblue,
            pt: "80px",
            mt: 20
          }}
        >
          <Container>
            <Grid
              container

            >
              <Grid item md={12}>
                <Box
                  sx={{
                    mb: "40px",
                  }}
                >
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 900,
                      color: '#021B51'
                    }}
                  >
                    Come And Color With Tara
                  </Typography>
                  <Box sx={{
                    mt: 5,
                    mb: 5
                  }}>
                    <Typography
                      variant='p'

                    >
                      If your little ones love Tara, then why not download these activities to help learn with their favorite characters off-screen.
                    </Typography>
                  </Box>
                </Box>
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
                      heigth: "70px",
                      objectFit: "contain"
                    }}
                  />
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 600,
                      color: "#021B51"
                    }}
                  >
                    Sheets
                  </Typography>
                  <CardMedia
                    component={"img"}
                    src={Images.flower}
                    sx={{
                      width: "70px",
                      heigth: "70px",
                      objectFit: "contain"
                    }}
                  />
                </Box>
              </Grid>
              <Grid container >
                <Grid item xs={12} md={6}>
                  <Box sx={{ mt: 20 }}>
                    <Typography
                      variant='p'
                      sx={{
                        fontSize: { md: '18px', xs: '18px', lg: '18px' },

                        color: Colors.white,
                        textAlign: 'center'
                      }}
                    >
                      We Offer The Following Worksheets!
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }} >
                    <Box sx={{ display: 'flex', alignItems: 'center' }} >
                      <CardMedia
                        component={"img"}
                        src={Images.flower}
                        sx={{
                          width: "30px",
                          heigth: "30px",
                          objectFit: "contain"
                        }}
                      />
                      <Typography
                        variant='p'
                        sx={{
                          fontSize: { md: '18px', xs: '18px', lg: '18px' },

                          color: Colors.white,
                          textAlign: 'left'
                        }}
                      >
                        Coloring Sheets
                      </Typography>
                      <CardMedia
                        component={"img"}
                        src={Images.flower}
                        sx={{
                          width: "30px",
                          heigth: "30px",
                          objectFit: "contain"
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CardMedia
                        component={"img"}
                        src={Images.flower}
                        sx={{
                          width: "30px",
                          heigth: "30px",
                          objectFit: "contain"
                        }}
                      />
                      <Typography
                        variant='p'
                        sx={{
                          fontSize: { md: '18px', xs: '18px', lg: '18px' },

                          color: Colors.white,
                          textAlign: 'left'
                        }}
                      >
                        Activity Sheets
                      </Typography>
                      <CardMedia
                        component={"img"}
                        src={Images.flower}
                        sx={{
                          width: "30px",
                          heigth: "30px",
                          objectFit: "contain"
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CardMedia
                        component={"img"}
                        src={Images.flower}
                        sx={{
                          width: "30px",
                          heigth: "30px",
                          objectFit: "contain"
                        }}
                      />
                      <Typography
                        variant='p'
                        sx={{
                          fontSize: { md: '18px', xs: '18px', lg: '18px' },

                          color: Colors.white,
                          textAlign: 'left'
                        }}
                      >
                        Learning Sheets
                      </Typography>
                      <CardMedia
                        component={"img"}
                        src={Images.flower}
                        sx={{
                          width: "30px",
                          heigth: "30px",
                          objectFit: "contain"
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box

                    sx={{
                      backgroundImage: `url(${Images.topper})`,
                      width: '100%',
                      height: '300px',
                      backgroundSize: "contain",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: { md: "center right", xs: 'center center' },
                      gap: "40px",
                      mt: 5


                    }}
                  >
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Colorfull