import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
  Container,
  ImageListItem,
  ImageList,
  useTheme,
  useMediaQuery
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Images, { Videos } from "../../assets/images";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import PageNavigator from "../../components/pagination/index"
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import shopImg1 from "../../assets/images/shop-intro.png";
import Colors from "../../styles/colors";

const EventShow = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCn_Ph5AlAi_wuxR0D7CBIY8_vBCNgD5r8",
    authDomain: "shinetara-86ec0.firebaseapp.com",
    projectId: "shinetara-86ec0",
    storageBucket: "shinetara-86ec0.appspot.com",
    messagingSenderId: "182521981077",
    appId: "1:182521981077:web:3cadc9d70d7fc25fab939c",
    measurementId: "G-BHYZDHJCK9"
  };
  let productId = ''
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCards, setCurrentCards] = useState([])
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0)
  const [data, setData] = useState([]); // All data fetched
  const cardsPerRow = 4; // Number of cards per row
  const cardsPerPage = 2 * cardsPerRow; // Two rows of cards per page

  const navigate = useNavigate()
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));

  let cols;
  if (isXs) {
    cols = 1;
  } else if (isSm) {
    cols = 1;
  } else if (isMd) {
    cols = 3;
  } else if (isLg) {
    cols = 4;
  } else {
    cols = 5;
  }
  const itemData = [
    {
      img: Images.pic1,
      title: 'Breakfast',
    },
    {
      img: Images.pic2,
      title: 'Burger',
    },
    {
      img: Images.pic3,
      title: 'Camera',
    },
    {
      img: Images.pic4,
      title: 'Coffee',
    },
    {
      img: Images.pic5,
      title: 'Hats',
    },
    {
      img: Images.pic6,
      title: 'Honey',
    },
    {
      img: Images.pic7,
      title: 'Basketball',
    },
    {
      img: Images.pic8,
      title: 'Fern',
    },
    {
      img: Images.pic9,
      title: 'Mushrooms',
    },
    {
      img: Images.pic10,
      title: 'Tomato basil',
    },

  ];
  const videos = [
    Videos.video1,
    Videos.video2,
    Videos.video3,
    Videos.video4,
    Videos.video5,
    Videos.video6,
    Videos.video7,
    Videos.video8,
    Videos.video9,
    Videos.video10,
    Videos.video11,
    Videos.video12,
    Videos.video13,

  ];
  // Simulate fetching data dynamically
  useEffect(() => {
    setLoading(true);
    // Simulating an API call
    setTimeout(() => {
      const fetchedData = [
        {
          date: "2024-12-01",
          image: Images.blog1,
          title: "title 1",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        },
        {
          date: "2024-12-02",
          image: Images.blog1,
          title: "10 ESSENTIAL DUAS FOR CHILDREN",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        },
        {
          date: "2024-12-03",
          image: Images.blog1,
          title: "title 2",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        },
        {
          date: "2024-12-03",
          image: Images.blog1,
          title: "title 2",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        }, {
          date: "2024-12-03",
          image: Images.blog1,
          title: "title 2",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        }, {
          date: "2024-12-03",
          image: Images.blog1,
          title: "title 2",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        }, {
          date: "2024-12-03",
          image: Images.blog1,
          title: "title 2",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        }, {
          date: "2024-12-03",
          image: Images.blog1,
          title: "title 2",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        }, {
          date: "2024-12-03",
          image: Images.blog1,
          title: "title 2",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        }, {
          date: "2024-12-03",
          image: Images.blog1,
          title: "title 2",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        }, {
          date: "2024-12-03",
          image: Images.blog1,
          title: "title 2",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        }, {
          date: "2024-12-03",
          image: Images.blog1,
          title: "title 2",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        }, {
          date: "2024-12-03",
          image: Images.blog1,
          title: "title 2",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        }, {
          date: "2024-12-03",
          image: Images.blog1,
          title: "title 2",
          description: "When our kids start to grow up, we try our best to teach them something new every day. Unfortunately, we mostly focus on worldly things and do not concentrate on religious studies. As Muslim parents, it is our duty to teach our children about our religion as well. Teaching Islamic simple duas to the kids can help us take the first steps towards introducing Islamic studies to our kids.",
        },
      ];
      setData(fetchedData);
      setLoading(false); // Stop loader
    }, 1000);
  }, []);


  const getProducts = async () => {
    const q = query(collection(db, "blogs"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log(dataArray);
    setCurrentCards(dataArray)

  }


  // Calculate filtered and paginated data
  const filteredCards = data.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    setTotalPages(Math.ceil(filteredCards.length / cardsPerPage))
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    setCurrentCards(filteredCards.slice(indexOfFirstCard, indexOfLastCard))
  }, [currentPage])




  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span
          key={index}
          style={{
            backgroundColor: "#5B73AD",
            color: "white",
          }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  useEffect(() => {
    getProducts()
  }, [])


  return (
    <>

      <Grid
        container
        sx={{
          backgroundImage: `url(${Images.watchBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "40vh",
          // padding: { md: "5rem 0", sm: "1rem 0" },
          pb: 1,
          margin: 0,
          display: "flex",
          alignItems: "center",
          backgroundAttachment: "fixed", // Fix background during scroll
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${Images.bannerBg})`,

            backgroundSize: "cover",
            backgroundPosition: "bottom center",
            width: "100%",
            height: { md: "578px", xs: "490px" ,xl:"730px" },
            position: "relative", // Ensure child content is positioned relative to this container
            overflow: "hidden", // Prevent content from going outside
          }}
        >
          {/* Right-side Image */}
          <Box
            sx={{
              margin: "0 auto",
              width: { md: "100%", sm: "100%", xs: "100%" }, // Adjust width for each screen size
              height: "100%", // Full height of the parent container
              backgroundImage: `url(${Images.eventPic})`,
              backgroundSize: {
                md: "contain",
                xl: "contain",
                lg: "contain",
                xs: "cover",
                sm: "contain",
              },
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center", // Ensures the image is aligned at the bottom
            }}
          />
        </Box>
        <Grid item xs={12} md={12} sx={{ position: "relative", mt: 5 }}>
          {/* Center Heading */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
            {/* Heading */}
            <Typography
              variant="h1"
              className="heading-font"
              sx={{
                fontSize: { xl: "80px", lg: "70px", md: "60px", sm: "50px", xs: "40px" },
                fontWeight: 600,
                color: "#F9BF29",
                textTransform: "uppercase",
                position: "relative",
                WebkitTextStroke: "1px white",
                WebkitTextFillColor: "#F9BF29",
              }}
            >
              Event
            </Typography>
            <Typography
              variant="h1"
              className="heading-font"
              sx={{
                fontSize: { xl: "80px", lg: "70px", md: "60px", sm: "50px", xs: "40px" },
                fontWeight: 600,
                color: "#F9BF29",
                textTransform: "uppercase",
                position: "relative",
                WebkitTextStroke: "1px white",
                WebkitTextFillColor: "#57ABF1",
              }}
            >
              Shows
            </Typography>

            {/* Right Image */}
            <Box
              component="img"
              src={Images.heart} // Replace with actual right image URL
              alt="Right Decorative Image"
              sx={{
                width: { xs: "50px", sm: "60px", md: "80px" },
                height: "auto",
                position: "absolute",
                right: { lg:30,xl:130,md: 25, xs: 0, sm: 25 },
                top: 120,
                display: { sm: "block", xs: "none" },
              }}
            />
          </Box>



        </Grid>
        {/* <Container>


          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "40px"
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                mt: 5
              }}
            >
              <Typography
              className="para-text"
                variant='h3'
                sx={{
                  fontSize: { md: "44px", xs: "32px" },
                  fontWeight: 900
                }}
              >
                Some Clicks of Events Organized By  <span style={{ color: Colors.purple }}>Shine With Tara</span>

              </Typography>

            </Box>
            <ImageList sx={{ width: '100%', height: 'auto' }} cols={cols} rowHeight={164}>
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Container> */}
        
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Typography
          className="para-text"
            variant='h3'
            sx={{
              fontSize: { xl:"60px",lg:"50px",md: "35px", xs: "25px" },
              fontWeight: 900,
              textAlign: 'center',
              mt: 5,
              mb: 5
            }}
          >
            Some Videos of Events Organized By  <span style={{ color: Colors.purple }}>Shine With Tara</span>

          </Typography>
          <Grid container spacing={2}>
{/* 
            {videos.map((video, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <video
                    src={video}
                    controls={true}
                    muted={true}
                    autoPlay={true}

                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </Box>

              </Grid>
            ))} */}
          </Grid>
        </Box>
        {/* Bottom images */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            position: "relative",
            // bottom: {md:"-300px",lg:"-450px",sm:"-140px",xs:"-100px"},
            zIndex: 1, // Ensure bottom images are behind other content
          }}
        >
          {/* First image */}
          <Box sx={{ position: "absolute", top: "10%", left: 30, width: "20%", height: "auto" }}>
            <img src={Images.faq1} alt="Image 1" style={{ width: "20%", height: "auto" }} />
          </Box>


          <Box sx={{
            width: "100%", height: { md: "500px", xl: "800px", lg:"700px", sm:"350px" ,xs:"250px"}, bottom: { md: "200px" },
            "@media (min-width: 1700px) and (max-width: 2100px)": {
              height: "1000px",
            },
            "@media (min-width: 2100px) and (max-width: 2500px)": {
              height: "1200px",
            },
            "@media (min-width: 2501px) and (max-width: 2800px)": {
              height: "1450px",
            },
            "@media (min-width: 2801px) ": {
              height: "1500px",
            },
            "@media (max-width: 400px) ": {
              height: "180px",
            },
          }}>
            <img src={Images.eventCharacters} alt="Image 2" style={{ width: "100%", height: "auto" }} />
          </Box>





          {/* Last image */}
          <Box sx={{ position: "absolute", top: "50%", right: 30, width: "5%", height: "auto" }}>
            <img src={Images.cloud} alt="Image 5" style={{ width: "100%", height: "auto" }} />
          </Box>
        </Box>
      </Grid>

    </>
  );
};

export default EventShow;
