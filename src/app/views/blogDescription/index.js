import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'; // Import useLocation
import {
    Box,
    Grid,
    Typography,
    IconButton
} from "@mui/material";
import Images from "../../assets/images";
import { CreditCard, Facebook, Instagram, PayPal, Tiktok, Youtube } from '../../assets/images'
import parse from 'html-react-parser';


const BlogDetail = () => {
    const location = useLocation();
    const { title, description } = location.state || {}; // Retrieve the title passed from the card


console.log(description);


    return (

        <Grid
            container
            sx={{
                backgroundImage: `url(${Images.watchBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "40vh",
                padding: { md: "100px 0", sm: "100px 0" },
                margin: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Center content horizontally
                backgroundAttachment: "fixed", // Fix background during scroll
            }}
        >
            <Grid
                item
                xs={12}
                md={12}
                sx={{
                    position: "relative",
                    textAlign: "center", // Ensure text is centered horizontally within this grid item
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        position: "relative",
                    }}
                >

                    {/* Right Image */}
                    <Box
                        component="img"
                        src={Images.heart} // Replace with actual right image URL
                        alt="Right Decorative Image"
                        sx={{
                            width: { xs: "50px", sm: "60px", md: "80px" },
                            height: "auto",
                            position: "absolute",
                            left: { md: 80, xs: 0, sm: 25 },
                            top: "100%",
                            transform: "rotate(-45deg)", // Rotate image counterclockwise by 45 degrees

                        }}
                    />

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
                            },
                            fontWeight: 600,
                            color: "#F9BF29",
                            textTransform: "uppercase",
                            position: "relative",
                            maxWidth: "80%", // Reduce the width of the heading
                            width: "100%",
                            margin: "0 auto", // Center the text within its container
                        }}
                        style={{
                            WebkitTextStroke: "1px white",
                            WebkitTextFillColor: "#F9BF29",
                        }}
                    >
                        {title} {/* Display the title */}
                    </Typography>

                </Box>
            </Grid>
   {/* Social Media Icons */}
                        {/* <Box
                            sx={{
                                display: "flex",
                                flexWrap: { xs: "wrap", sm: "nowrap" }, // Wrap for xs, single row for sm and larger
                                gap: "10px",
                                justifyContent: { xs: "center", sm: "flex-start" }, // Center for xs screens
                            }}
                        >
                            <IconButton
                                sx={{
                                    p: 0,
                                    color: "#6791DE",
                                    height: "40px",
                                    width: "40px",
                                }}
                                component="a"
                                href="https://www.facebook.com/profile.php?id=61554711500749"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Facebook fontSize="inherit" />
                            </IconButton>
                            <IconButton
                                sx={{
                                    p: 0,
                                    color: "#6791DE",
                                    height: "40px",
                                    width: "40px",
                                }}
                                component="a"
                                href="https://www.instagram.com/shinewith.tara/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram fontSize="inherit" />
                            </IconButton>
                            <IconButton
                                sx={{
                                    p: 0,
                                    color: "#6791DE",
                                    height: "40px",
                                    width: "40px",
                                }}
                                component="a"
                                href="https://www.tiktok.com/@shinewithtara"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Tiktok fontSize="inherit" />
                            </IconButton>
                            <IconButton
                                sx={{
                                    p: 0,
                                    color: "#6791DE",
                                    height: "40px",
                                    width: "40px",
                                }}
                                component="a"
                                href="https://www.youtube.com/@Shinewithtara"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Youtube fontSize="inherit" />
                            </IconButton>
                        </Box> */}
            <Grid container sx={{  py: 20, px: 5 }}  >
                <Grid item md={9} sm={11} xs={11} sx={{ backgroundColor: "#6791DE", // Entire box background color
                            opacity: 0.8,}}>
                    <Box
                        container
                        rowGap="40px"
                       
                        sx={{
                           
                            borderRadius: 0,
                            p: "40px",
                        }}
                        dangerouslySetInnerHTML={{ __html: description }}
                    >
                     


                       


                        
                       

                    </Box>

                </Grid>

                {/* Right side text box */}
                <Grid
                    item
                    md={3} // Adjust the width on larger screens
                    sm={11} // For smaller screens, make it take up most of the space
                    xs={11} // For extra small screens, also take most of the space
                    sx={{
                        display: "flex",
                        justifyContent: { md: "flex-end", sm: "center" }, // Align to the right
                        alignItems: "center",
                        padding: "20px",
                        flexDirection: "column", // Arrange items in a column
                        gap: "600px", // Add vertical space between elements


                    }}
                >
                    <Box
                        sx={{
                            position: "relative", // Required for positioning the pseudo-element
                            backgroundColor: "transparent",
                            color: "#FFFFFF",
                            padding: "10px 20px",
                            borderRadius: 0,
                            fontSize: "16px",
                        }}
                    >
                        {/* Gradient Border */}
                        <Box
                            sx={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "5px", // Adjust thickness
                                background: " linear-gradient(0deg, #F8D11500 0%, #F8B229 100%, #F8D1150D 5%)",
                                content: '""', // Required to create the pseudo-element
                            }}
                        />

                        {/* Content */}
                        <Typography className="para-text" sx={{ fontSize: "14px" }}>
                            Published Year
                        </Typography>
                        <Typography
                            className="heading-font"
                            variant="h6"
                            sx={{
                                fontSize: "18px", // Fallback if the class isn't applied
                                fontWeight: 600, // Fallback styling
                            }}
                        >
                            Feb 20, 2024
                        </Typography>

                        <Typography className="para-text" sx={{ fontSize: "14px" }}>
                            Category
                        </Typography>
                        <Typography
                            className="heading-font"
                            variant="h6"
                            sx={{
                                fontSize: "18px", // Fallback if the class isn't applied
                                fontWeight: 600, // Fallback styling
                            }}
                        >
                            Islamic Duas
                        </Typography>

                        <Typography className="para-text" sx={{ fontSize: "14px" }}>
                            Author
                        </Typography>
                        <Typography
                            className="heading-font"
                            variant="h6"
                            sx={{
                                fontSize: "18px", // Fallback if the class isn't applied
                                fontWeight: 600, // Fallback styling
                            }}
                        >
                            Ayesha Tahir
                            <br />
                            Sana Kazmi
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: "100%", // Adjust image width
                            textAlign: "center", // Center image horizontally
                        }}
                    >
                        <img
                            src={Images.reading} // Replace with the actual image URL
                            alt="Descriptive Alt Text"
                            style={{
                                width: "100%", // Make the image responsive
                                maxWidth: "100px", // Set a max width
                                height: "auto", // Maintain aspect ratio
                                margin: "10px 0", // Add vertical margin for spacing

                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            width: "100%", // Adjust image width
                            textAlign: "center", // Center image horizontally
                        }}
                    >
                        <img
                            src={Images.handImg} // Replace with the actual image URL
                            alt="Descriptive Alt Text"
                            style={{
                                width: "100%", // Make the image responsive
                                maxWidth: "100px", // Set a max width
                                height: "auto", // Maintain aspect ratio
                                margin: "10px 0", // Add vertical margin for spacing

                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: "100%", // Adjust image width
                            textAlign: "center", // Center image horizontally
                        }}
                    >
                        <img
                            src={Images.rainbow} // Replace with the actual image URL
                            alt="Descriptive Alt Text"
                            style={{
                                width: "100%", // Make the image responsive
                                maxWidth: "100px", // Set a max width
                                height: "auto", // Maintain aspect ratio
                                margin: "10px 0", // Add vertical margin for spacing

                            }}
                        />
                    </Box>
                </Grid>
            </Grid>

        </Grid >



    );
}
export default BlogDetail