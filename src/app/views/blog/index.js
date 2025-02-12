import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Images from "../../assets/images";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import PageNavigator from "../../components/pagination/index"
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const Blog = () => {
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
        backgroundAttachment: "fixed", // Fix background during scroll
      }}
    >
      <Grid item xs={12} md={12} sx={{ position: "relative" }}>
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
          sx={{
            position: "relative", // Keep it inside the normal flow
            marginTop: "2rem", // Space below the heading
            display: "flex",
            justifyContent: "center", // Center horizontally
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="search text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              maxWidth: "400px", // Restrict width
              backgroundColor: "#ECE6F0", // Light background
              borderRadius: "9px",
              "& .MuiInputBase-input": {
                color: "black", // Set text color to black
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon style={{ color: "black" }} />
                </InputAdornment>
              ),
              className: "para-text",
            }}
          />
        </Box>

        {/* Loader */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
            <CircularProgress style={{ color: "#FF9D04" }} />
          </Box>
        ) : (
          <>
            {/* Cards Section */}
            <Grid
              container
              spacing={3}
              sx={{
                padding: "80px 20px",
                minHeight: "400px", // Ensuring the height stays consistent
                height: currentCards.length === 0 ? "400px" : "auto", // Make sure height doesn't collapse
              }}
            >
              {currentCards.length > 0 ? (
                currentCards.map((card, index) => (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center", // Center content if only one row
                    }}
                  >
                    <Card
                      sx={{
                        width: '100%',
                        borderRadius: "15px",
                        cursor: "pointer", // Add cursor pointer here
                      }}
                      onClick={() =>
                        navigate('/blog-detail', {
                          state: {
                            title: card.title,
                            description: card.html,
                          },
                        })
                      }
                    >
                      <CardActionArea>
                        <CardMedia component="img" height="300" sx={{objectFit:"fill"}}  image={card.imgUrl} alt={card.title}  />
                        <CardContent sx={{ backgroundColor: "#FF9D04" }}>
                          <Typography sx={{ color: "white", fontSize: "15px" }}>
                            {getHighlightedText(card.title, searchQuery)}
                          </Typography>
                          <Typography sx={{ color: "white" }}>{card.date}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))
              ) : (
                // No Data Available
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px", // Center the message
                  }}
                >
                  <Typography sx={{ color: "white", fontSize: "20px" }}>No Data Available</Typography>
                </Grid>
              )}
            </Grid>

            {/* Hide Pagination if loading or no data */}
            {currentCards.length > 0 && !loading && (
              <PageNavigator
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                onPageClick={handlePageClick}
                backwardArrow={Images.backwardArrow}
                forwardArrow={Images.forwardArrow}
              />
            )}
          </>
        )}
      </Grid>

      {/* Bottom images */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          position: "relative",
          bottom: { md: "-300px", lg: "-450px", sm: "-140px", xs: "-100px" },
          zIndex: 1, // Ensure bottom images are behind other content
        }}
      >
        {/* First image */}
        <Box sx={{ position: "absolute", top: "10%", left: 10, width: "20%", height: "auto" }}>
          <img src={Images.faq1} alt="Image 1" style={{ width: "20%", height: "auto" }} />
        </Box>

        {/* Second image */}
        <Box sx={{ width: "100%", height: "auto", bottom: { md: "200px" } }}>
          <img src={Images.blog2} alt="Image 2" style={{ width: "100%", height: "auto" }} />
        </Box>

        {/* Third image */}
        <Box sx={{ width: "100%", height: "auto" }}>
          <img src={Images.character16} alt="Image 3" style={{ width: "100%", height: "auto" }} />
        </Box>

        {/* Fourth image */}
        <Box sx={{ width: "100%", height: "auto" }}>
          <img src={Images.blog4} alt="Image 4" style={{ width: "100%", height: "auto" }} />
        </Box>

        {/* Last image */}
        <Box sx={{ position: "absolute", top: "10%", right: 10, width: "5%", height: "auto" }}>
          <img src={Images.cloud} alt="Image 5" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
    </Grid>


  );
};

export default Blog;
