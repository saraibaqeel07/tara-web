import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Images from "../../assets/images";

const Blog = () => {
  return (
    <Grid
      container
      sx={{
        backgroundImage: `url(${Images.watchBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "40vh",
        padding: { md: "5rem 0", sm: "1rem 0" },
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundAttachment: "fixed", // Fix background during scroll
      }}
    >
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Center heading with images
            gap: 2, // Space between images and heading
            marginBottom: 0, // Space below heading
          }}
        >
          {/* Heading */}
          <Typography
            variant="h1"
            className="heading-font"
            sx={{
              fontSize: {
                xl: "80px",
                lg: "70px",
                md: "60px",
                sm: "50px",
                xs: "40px",
              }, // Responsive font size
              fontWeight: 600,
              color: "#F9BF29",
              textTransform: "uppercase",
              position: "relative",
            }}
            style={{
              WebkitTextStroke: "1px white",
              WebkitTextFillColor: "#F9BF29",
            }}
          >
            blog
          </Typography>

          {/* Right Image */}
          <Box
            component="img"
            src={Images.pencil} // Replace with actual right image URL
            alt="Right Decorative Image"
            sx={{
              width: { xs: "50px", sm: "60px", md: "80px" },
              height: "auto",
              position: "absolute",
              right: { md: 80, xs: 0, sm: 25 },
            }}
          />
        </Box>

        {/* Search Box */}
        <Box
              className="para-text"
          sx={{
            position: "absolute",
            top: "150%", // Adjust to place it below the heading
            left: "50%",
            transform: "translateX(-50%)", // Center horizontally
            width: "35%", // 30% width
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            InputProps={{
                style: {
                backgroundColor: "#ECE6F0", // Black background
                color: "black", // White text color
                borderRadius: "8px",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon style={{ color: "black" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Blog;
