import React from 'react'
import { Box, Button, Container, Divider, Grid, IconButton, Typography } from '@mui/material'
import Images, { CreditCard, Facebook, Instagram, PayPal, Tiktok, Youtube } from '../../../assets/images'
import Colors from '../../../styles/colors'
import navigation from '../../../../Navigation'
import { useNavigate, useLocation } from 'react-router-dom'
import footerImg from "../../../assets/images/footer-img.png"
import Fonts from '../../../styles/fonts'
import getFontSizes from 'antd/es/theme/themes/shared/genFontSizes'
import footerBackground from "../../../assets/images/footer-background.png"

function Footer() {
  const navigate = useNavigate();
  const handleEmailClick = (emailAddress) => {
    window.location.href = `mailto:${emailAddress}`;
  };
  const location = useLocation();
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <Box
    component={'div'}
    className='footer-img'
    sx={{
      backgroundImage: `url(${Images.footerBg})`, // Use backticks to interpolate the variable
      height: "100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      p: 4,
      zIndex:5
      
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
          <Box sx={{ display: "flex", gap: "10px" }}>
  <IconButton sx={{ p: 0, color: "#6791DE !important" }}>
    <Facebook href='https://www.facebook.com/profile.php?id=61554711500749' />
  </IconButton>
  <IconButton sx={{ p: 0, color: "#6791DE" }}>
    <Instagram href='https://www.instagram.com/shinewith.tara/' />
  </IconButton>
  <IconButton sx={{ p: 0, color: "#6791DE" }}>
    <Tiktok href='https://www.tiktok.com/@shinewithtara' />
  </IconButton>
  <IconButton sx={{ p: 0, color: "#6791DE" }}>
    <Youtube href='https://www.youtube.com/@Shinewithtara' />
  </IconButton>
</Box>

          <Box
            component={'div'}
            sx={{ cursor: 'pointer', color: 'blue' }}
            onClick={() => handleEmailClick('shineswithtara@gmail.com')}
          >
            <Typography className='para-text' sx={{ color: Colors.white }}>
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
        <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "grid", // Use grid layout
              gridTemplateColumns: { sm: "1fr 1fr 1fr", xs: "1fr" }, // 3 columns for sm and above, 1 column for xs
              gridTemplateRows: { sm: "repeat(2, auto)" }, // 2 rows
              flexDirection: "column",
              height: { md: "160px", sm: "100%", xs: "100%" },
              justifyContent: "flex-start",
              width: { md: "360px", sm: "100%", xs: "100%" },
              flexWrap: "wrap",
              rowGap: "20px",
              columnGap:"5px"
            }}
          >
            {navigation.map((item, i) => (
              <Button
              className='para-text'
                key={i}
                sx={{
                  backgroundColor: "transparent",
                  color: location.pathname === item.path ? "#FF9D04" : Colors.white, // Active page color change
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
        className='para-text'
          sx={{
            textAlign: "center",
            px: { md: "35px", xs: 0 }
          }}
        >
          Content, including images, displayed on this website is protected by copyright laws. Downloading, republication, retransmission or reproduction of content on this website is strictly prohibited.<span className='heading-font' style={{ fontSize: "1rem", textDecoration: "underline" }}>Terms of Use </span>
             <span style={{ fontSize: "1.5rem",}}>|</span> <span className='heading-font' style={{ fontSize: "1rem", textDecoration: "underline" }}>Privacy Policy</span>  
            <span className='heading-font' style={{ fontSize: "1.2rem" }}> .shine with tara @{currentYear} </span></Typography>
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