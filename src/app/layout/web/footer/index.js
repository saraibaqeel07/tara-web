import React from 'react'
import { Box, Button, Container, Divider, Grid, IconButton, Typography } from '@mui/material'
import Images, { CreditCard, Facebook, Instagram, PayPal, Tiktok, Youtube } from '../../../assets/images'
import Colors from '../../../styles/colors'
import navigation from '../../../../Navigation'
import { useNavigate, useLocation } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate();
  const handleEmailClick = (emailAddress) => {
    window.location.href = `mailto:${emailAddress}`;
  };
  const location = useLocation();
  return (
    <Box
    component={'div'}
    className='footer-img'
      sx={{
        
        backgroundImage: { md: `url(${Images.footerBg})`, sm: "none", xs: "none" },
        backgroundColor: { md: "none", sm: Colors.darkblue, xs: Colors.darkblue },
        height: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        p: 4
      }}
    >
      <Grid
        container
        flexDirection={{ md: "row", sm: "column", xs: "column" }}
        alignItems={{ md: "flex-start", sm: "center", xs: "center" }}
      >
        <Grid item md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { md: "flex-start", sm: "center", xs: "center" },
              gap: "10px",
            }}
          >
            <Typography
              variant='h5'
              sx={{
                fontWeight: 900,
                color: Colors.white,
              }}
            >
              Shine With Tara
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px"
              }}
            >
              <IconButton
                sx={{
                  p: 0
                }}
              >
                <Facebook href='https://www.facebook.com/profile.php?id=61554711500749' />
              </IconButton>
              <IconButton
                sx={{
                  p: 0
                }}
              >
                <Instagram href='https://www.instagram.com/shineswithtara/ ' />
              </IconButton>
              <IconButton
                sx={{
                  p: 0
                }}
              >
                <Tiktok href='https://www.tiktok.com/@shinewithtara' />
              </IconButton>
              <IconButton
                sx={{
                  p: 0
                }}
              >
                <Youtube href='https://www.youtube.com/@Shinewithtara' />
              </IconButton>
            </Box>
            <Box component={'div'} sx={{cursor:'pointer',color:'blue'}} onClick={()=> handleEmailClick('shineswithtara@gmail.com')} >
            <Typography
              sx={{
                color: Colors.white
              }}
            >
              shineswithtara@gmail.com
            </Typography>
            </Box>
            <Box>
              <CreditCard />
              <PayPal />
            </Box>
          </Box>
        </Grid>
        <Grid item md={8}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: { md: "160px", sm: "100%", xs: "100%" },
                justifyContent: "flex-start",
                width: { md: "360px", sm: "100%", xs: "100%" },
                flexWrap: "wrap",
                rowGap: "20px",
              }}
            >
              {navigation.map((item, i) => (
                <Button
                  key={i}
                  sx={{
                    backgroundColor: "transparent",
                    color: location.pathname == item.path ? Colors.purple : Colors.white,
                    width: "180px",
                    justifyContent: { md: "flex-start", sm: "center", xs: "center" }
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: Colors.white, width: "80%", margin: "0 auto" }} />
      <Container sx={{ display: { md: "block", xs: "none" } }}>
        <Box
          sx={{
            width: "100%",
            py: 2,
            px: { md: 4, xs: 0 }
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              px: { md: "35px", xs: 0 }
            }}
          >
            Content, including images, displayed on this website is protected by copyright laws. Downloading, republication, retransmission or reproduction of content on this website is strictly prohibited. Terms of Use | Privacy Policy
          </Typography>
        </Box>
      </Container>
      <Box
        sx={{
          display: { md: "none", xs: "block" },
          width: "100%",
          py: 3,
          px: { md: 4, xs: 0 }
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            px: { md: "35px", xs: 0 }
          }}
        >
          Content, including images, displayed on this website is protected by copyright laws. Downloading, republication, retransmission or reproduction of content on this website is strictly prohibited. Terms of Use | Privacy Policy
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer