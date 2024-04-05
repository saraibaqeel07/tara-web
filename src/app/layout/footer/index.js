import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Images from '../../assets/images'

function Footer() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${Images.footerBg})`,
        height: "300px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        p: 4
      }}
    >
      <Grid container>
        <Grid item md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItem: "flex-start",
              gap: "20px"
            }}
          >
            <Typography
              sx={{
                fontWeight: 900
              }}
            >
              Shine With Tara
            </Typography>
            <Box>

            </Box>
          </Box>
        </Grid>
        <Grid item md={8}></Grid>
      </Grid>
    </Box>
  )
}

export default Footer