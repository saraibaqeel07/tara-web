import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    CardMedia,
    Container,
    Grid,
    Typography,
    ButtonGroup,
    TextField,
    Drawer,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Rating,
    CircularProgress,
    Dialog,
    styled,
} from "@mui/material";
import Images, {
    FacebookRounded,
    InstagramRounded,
    TiktokRounded,
    YoutubeRounded,
} from "../../assets/images";
import Colors from "../../styles/colors";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "../../../App.css";
import Fonts from "../../styles/fonts";
import { initializeApp } from "firebase/app";
import { getFirestore, increment, updateDoc } from "firebase/firestore";
import {
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    deleteDoc,
} from "firebase/firestore";
import { isIOS, isMobile } from 'react-device-detect';
import ProductModal from "../modal/ProductModal";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Avatar, Divider } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ArrowBack, Star } from "@mui/icons-material";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { setCart, CartContext } from "../../Context/CartContext";
import { CartCounter } from "../../Context/CartCounter";

import shopImg1 from "../../assets/images/shop-intro.webp";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import moment from "moment";
import { SuccessToaster } from "../../components/Toaster";
import { AuthContext } from "../../Context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase.config";


// Styled component for the images
const StyledImage = styled("img")({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transition: "opacity 0.3s ease",
})
function ProductDetail() {
    const { state } = useLocation();
    console.log(state);


    const swiperRef = useRef(null);
    const { cartVisible, toggleCartVisibility } = useContext(CartContext);
    const { setCount } = useContext(CartCounter);
    const { id } = useParams();
    console.log(cartVisible, "cartVisible");

    const firebaseConfig = {
        apiKey: "AIzaSyCn_Ph5AlAi_wuxR0D7CBIY8_vBCNgD5r8",
        authDomain: "shinetara-86ec0.firebaseapp.com",
        projectId: "shinetara-86ec0",
        storageBucket: "shinetara-86ec0.appspot.com",
        messagingSenderId: "182521981077",
        appId: "1:182521981077:web:3cadc9d70d7fc25fab939c",
        measurementId: "G-BHYZDHJCK9",
    };
    let productId = "";
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [selected, setSelected] = useState("merchandise");
    const [products, setProducts] = useState([]);
    const [textColor, setTextColor] = useState(Colors.orange);

    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [showTopImage, setShowTopImage] = useState(true)
    const [detail, setDetail] = useState(null)
    const { user, setUser } = useContext(AuthContext);
    let User = localStorage.getItem("user");

    User = JSON.parse(User);


    const addToCart = async (data) => {
        console.log("submit");

        try {
            const cartRef = collection(db, "cartData");

            const querySnapshot = await getDocs(
                query(cartRef, where("userId", "==", User.uid))
            );

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                const cartDoc = querySnapshot.docs[0].data();
                console.log(cartDoc?.data,'cartDoc');
                console.log(data,'cartDoc');
                const existingItemIndex = cartDoc.data.findIndex(
                    (item) => item.id === data.id
                );

                if (existingItemIndex !== -1) {
                    const updatedData = [...cartDoc.data];
                    updatedData[existingItemIndex].qty += 1;

                    await updateDoc(docRef, { data: updatedData });
                    getCartData()
                    SuccessToaster("Quantity Increased");
                } else {
                    // Item doesn't exist: Append new item with qty = 1
                    const newItem = { ...data, qty: 1 };
                    await updateDoc(docRef, { data: [...cartDoc.data, newItem] });
                    SuccessToaster("Added To Cart");
                    getCartData()
                }
            } else {
                // No cart document for the user: Create a new cart document
                const newCart = {
                    userId: User.uid,
                    data: [{ ...data, qty: 1 }], // Initialize with the first item
                    created_at: moment().format("MMMM Do YYYY, h:mm a"),
                };

                const docRef = await addDoc(cartRef, newCart);
                console.log("Document written with ID: ", docRef.id);

                SuccessToaster("Added To Cart");
                getCartData()
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            // ErrorToaster("Something Went Wrong");
            handleGoogleLogin()
        }
    };
    const buyNow = async (data) => {
        console.log("submit");

        try {
            const cartRef = collection(db, "cartData");

            const querySnapshot = await getDocs(
                query(cartRef, where("userId", "==", User.uid))
            );

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                const cartDoc = querySnapshot.docs[0].data();

                const existingItemIndex = cartDoc.data.findIndex(
                    (item) => item.id === data.id
                );

                if (existingItemIndex !== -1) {
                    const updatedData = [...cartDoc.data];
                    updatedData[existingItemIndex].qty += 1;

                    await updateDoc(docRef, { data: updatedData });
                    getCartData()
                    navigate('/cart')
                } else {
                    // Item doesn't exist: Append new item with qty = 1
                    const newItem = { ...data, qty: 1 };
                    await updateDoc(docRef, { data: [...cartDoc.data, newItem] });
                    navigate('/cart')
                    getCartData()
                }
            } else {
                // No cart document for the user: Create a new cart document
                const newCart = {
                    userId: User.uid,
                    data: [{ ...data, qty: 1 }], // Initialize with the first item
                    created_at: moment().format("MMMM Do YYYY, h:mm a"),
                };

                const docRef = await addDoc(cartRef, newCart);
                console.log("Document written with ID: ", docRef.id);

                navigate('/cart')
                getCartData()
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            // ErrorToaster("Something Went Wrong");
            handleGoogleLogin()
        }
    };

    const getCartData = async () => {
        try {

            const userId = User.uid;


            const q = query(collection(db, "cartData"), where("userId", "==", userId));

            const querySnapshot = await getDocs(q);
            const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(dataArray[0]?.data, 'dataArray');




            // setCartItems(dataArray[0]?.data);
            // console.log(dataArray[0]?.data?.length);

            setCount(dataArray[0]?.data?.length)
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    const handleGoogleLogin = async () => {

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("User Info: ", user);
            if (user) {
                // Add a new document with a generated id.
                const docRef = await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    lastLogin: moment().format('DD/MM/YYYY')
                });
                console.log("Document written with ID: ", docRef.id);
            }
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)
            // Handle user info here (e.g., save to state, context, or redirect)
        } catch (error) {
            console.error("Error during Google login: ", error);
        }
    };
    const getProducts = async () => {
        const q = query(collection(db, "products"));

        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const sortedData = dataArray.sort((a, b) => {
            return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
        });

        setProducts(prevProducts => [...prevProducts, ...sortedData]);
    };

    const getActivitySheets = async () => {
        const q = query(collection(db, "activitysheets"));

        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const sortedData = dataArray.sort((a, b) => {
            return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
        });

        setProducts(prevProducts => [...prevProducts, ...sortedData]);
    };

    const getColoringSheets = async () => {
        const q = query(collection(db, "coloringsheets"));

        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const sortedData = dataArray.sort((a, b) => {
            return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
        });

        setProducts(prevProducts => [...prevProducts, ...sortedData]);
    };

    const getExtrasheets = async () => {
        const q = query(collection(db, "extra"));

        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const sortedData = dataArray.sort((a, b) => {
            return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
        });

        setProducts(prevProducts => [...prevProducts, ...sortedData]);
    };

    const getProductDetail = async (productId) => {
        const collections = ["products", "activitysheets", "coloringsheets", "extra",'Toys']; // List of all collections

        for (const collectionName of collections) {
            try {
                const productRef = doc(db, collectionName, productId);
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                    console.log(`Product found in ${collectionName}`);
                    setDetail({ id: productSnap.id, ...productSnap.data(), collection: collectionName })
                    return { id: productSnap.id, ...productSnap.data(), collection: collectionName };
                }
            } catch (error) {
                console.error(`Error searching in ${collectionName}:`, error);
            }
        }

        console.log("Product not found in any collection!");
        return null;
    };


    const productDetails = {
        title: "Teach Your Kids Salah The Easy And Fun Way!",
        rating: 5,
        reviews: 250,
        price: "296",
        salePrice: "190",
        features: ["The perfect gift of prayer", "Age group: 3+ years", "25 pages"],
        benefits: ["Why Parents Love It", "How it Helps Your Child", "This book is the perfect gift"],
    }
    const currentImages = [{
        id: 0,
        src: Images.character11
        , name: "Fatima", comment: "loves nature, her pet is her bird."

    },
    {
        id: 1,
        src: Images.character12
        , name: "Ali", comment: "book worm, loves to read books."
    },
    {
        id: 2,
        src: Images.character13
        , name: "Laila", comment: "loves to eat  and cooks."
    },
    {
        id: 3,
        src: Images.character14, name: "Ahmed", comment: "loves to solve puzzles, creative mindss."
    },
    {
        id: 4,
        src: Images.character15
        , name: "Tara", comment: "Adventurous and have imaginary best friend shine."
    },
    {
        id: 5,
        src: Images.character16
        , name: "SHINE", comment: "Guides Tara towards good deed."
    },
    {
        id: 6,
        src: Images.character17
        , name: "Sara", comment: "She is very shy, and best friends with Tara."
    },
    {
        id: 7,
        src: Images.character18
        , name: "Maya", comment: "4 years old, adventurous and has a kitten name fluffy."

    },
    {
        id: 8,
        src: Images.character19
        , name: "Taha", comment: "  Loves Science, Scientist."
    }]


    useEffect(() => {
        getProducts();
        getProductDetail(id)
        getColoringSheets();
        getActivitySheets();
        getExtrasheets();
    }, [])
    console.log(products, 'products');



    return (
        <>
            {" "}

            <Box
                component={"main"}
                sx={{
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        backgroundImage: `url(${Images.bannerBg})`,

                        backgroundSize: "cover",
                        backgroundPosition: "bottom center",
                        width: "100%",
                        height: { md: "578px", xs: "490px", xl: "730px" },
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
                            backgroundImage: `url(${shopImg1})`,
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
                <Box sx={{ bgcolor: "#cb6782", minHeight: "100vh" }}>
                    <Container maxWidth="lg" sx={{ py: 6 }}>
                        <Grid container spacing={4}>
                            {/* Left side - Images */}
                            <Grid item xs={12} md={6}>
                                <Box sx={{ position: "relative", mb: 3 }}>
                                    <img
                                        src={detail?.imgUrl[selectedImage] || "/placeholder.svg"}
                                        alt="Product"
                                        className="w-full rounded-lg cursor-pointer"
                                        onClick={() => setModalOpen(true)}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            maxHeight: "550px",
                                            objectFit: "cover",
                                            borderRadius: '15px'
                                        }}
                                    />
                                </Box>

                                <Grid container spacing={2}>
                                    {detail?.imgUrl?.map((img, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index} sx={{ height: '180px' }}>
                                            <Box
                                                sx={{
                                                    border: selectedImage === index ? "5px solid #F6921E" : "3px solid transparent",
                                                    borderRadius: 5,
                                                    overflow: "hidden",
                                                    cursor: "pointer",
                                                    mb: 2,
                                                    width: "100%",
                                                    height: '100%',
                                                    backgroundImage: `url(${img || "/placeholder.svg"})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    backgroundRepeat: "no-repeat",
                                                }}
                                                onClick={() => setSelectedImage(index)}
                                            />
                                        </Grid>

                                    ))}
                                </Grid>
                            </Grid>

                            {/* Right side - Product Info */}
                            <Grid item xs={12} md={6}>
                                <Box sx={{ color: "white" }}>
                                    <Typography
                                        variant="h3"
                                        component="h1"

                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: { xs: "2rem", md: "2.5rem" },
                                        }}
                                    >
                                        {detail?.name}
                                    </Typography>
                                    <Typography
                                        variant="p"

                                        gutterBottom
                                        sx={{

                                            fontSize: { xs: "1rem", md: "1.5rem" },
                                        }}
                                    >
                                        {detail?.subHeading}
                                    </Typography>


                                    <Box sx={{ mb: 2, mt: 2 }}>
                                        <Typography variant="p" sx={{ mb: 1.5, fontSize: "0.9rem", display: 'flex', gap: 2 }}>
                                            <span style={{ width: "20px", height: '20px', borderRadius: '50%', backgroundColor: '#0277CE', display: "block" }}></span>  <span style={{ fontWeight: 'bold' }}>The number Of pages:</span> {detail?.Pages} pages
                                        </Typography>

                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="p" sx={{ mb: 1.5, fontSize: "0.9rem", display: 'flex', gap: 2 }}>
                                            <span style={{ width: "20px", height: '20px', borderRadius: '50%', backgroundColor: '#0277CE', display: "block" }}></span> <span style={{ fontWeight: 'bold' }}>Age group:</span> {detail?.AgeGroup} years
                                        </Typography>

                                    </Box>

                                    <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>

                                        <span style={{ width: "20px", height: '20px', borderRadius: '50%', backgroundColor: '#0277CE', display: "block" }}></span>     <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                            <Rating value={productDetails.rating} readOnly size="medium" />
                                            <Typography variant="p" sx={{ ml: 1, fontSize: "0.9rem" }}>({productDetails.reviews} reviews)</Typography>
                                        </Box>


                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "baseline",
                                            gap: 2,
                                            mb: 4,
                                            backgroundColor: "rgba(255,255,255,0.1)",
                                            p: 3,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography
                                            variant="h3"
                                            component="h1"

                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: { xs: "2rem", md: "2.5rem" },
                                            }}
                                        >
                                            $ {detail?.price}
                                        </Typography>

                                    </Box>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} display={'flex'} sx={{ justifyContent: { lg: 'flex-start', md: 'flex-start', sm: 'center', xs: 'center' } }}>
                                            <Button
                                                variant="contained"
                                                onClick={() => addToCart(detail)}
                                                size="large"
                                                sx={{
                                                    bgcolor: "#F9BF29",
                                                    color: "white",
                                                    py: 2,
                                                    px: { lg: 15, md: 15, sm: 10, xs: 10 },
                                                    borderRadius: '12px',
                                                    fontSize: "1.2rem",
                                                    fontWeight: 'bold',
                                                    "&:hover": {
                                                        bgcolor: "#357ABD",
                                                    },
                                                }}
                                            >
                                                Add to Cart
                                            </Button>
                                        </Grid>

                                    </Grid>


                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container mt={5}>
                            <Box sx={{ width: '100%' }}>
                                <Grid container spacing={4}>
                                    {/* Left Section: Images */}
                                    <Grid item xs={12} md={4}>
                                        <Box
                                            sx={{
                                                position: "relative",
                                                width: "200px",
                                                height: "200px",
                                                backgroundImage: `url(${detail?.imgUrl[0]})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                border: "4px solid #F6921E",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    bottom: -60,
                                                    right: -60,
                                                    width: "150px",
                                                    height: "150px",
                                                    backgroundImage: `url(${detail?.imgUrl[1]})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    zIndex: 2, // Ensures it appears above the first Box
                                                    border: "4px solid #F6921E",
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Right Section: Content */}
                                    <Grid item xs={12} md={8} lg={8} justifyContent={'space-between'} sx={{ mt: { lg: 0, md: 0, sm: 10, xs: 10 } }}>
                                        {/* Why Parents Love It */}
                                        <Box display="flex" alignItems="center" justifyContent={'center'} mb={2} gap={2}>
                                            <Box component={'img'} src={Images.butterfly} width={'35px'}></Box>
                                            <Typography
                                                variant="h3"
                                                component="h1"

                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: { xs: "1.5rem", md: "2.5rem" },
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Why Parents Love It
                                            </Typography>
                                            <Box component={'img'} src={Images.butterfly} width={'35px'}></Box>
                                        </Box>
                                        <Typography variant="p" color="text.primary" style={{ textAlign: 'center' }} mb={4}>
                                            {detail?.ParentReason}
                                        </Typography>

                                        {/* How It Helps Your Child */}
                                        <Box display="flex" alignItems="center" justifyContent={'center'} mb={2} mt={4} gap={2}>
                                            <Box component={'img'} src={Images.child} width={'35px'}></Box>
                                            <Typography
                                                variant="h3"
                                                component="h1"

                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: { xs: "1.5rem", md: "2.5rem" },
                                                    textAlign: 'center'
                                                }}
                                            >
                                                How It Helps Your Child
                                            </Typography>
                                            <Box component={'img'} src={Images.child} width={'35px'}></Box>
                                        </Box>
                                        <Typography variant="p" color="text.primary" mb={4}>
                                            {detail?.HelpChild}
                                        </Typography>


                                    </Grid>


                                </Grid>
                                {/* Closing Note */}
                                <Box display="flex" alignItems="center" justifyContent={'center'} gap={2} mt={20}>
                                    <Box component={'img'} src={Images.flower2} width={'35px'}></Box>
                                    <Typography variant="p" color="text.primary">
                                        This book is the perfect gift for young Muslims just beginning to
                                        learn about prayer.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid container xs={12} mt={10} display={'flex'} sx={{ justifyContent: { lg: 'space-between', md: 'space-between', sm: 'center', xs: 'center' } }} >
                            <Button
                                variant="contained"
                                onClick={() => buyNow(detail)}
                                size="large"
                                sx={{
                                    bgcolor: "#0277CE",
                                    color: "white",
                                    py: 2,
                                    px: 10,
                                    borderRadius: '12px',
                                    fontSize: "1.2rem",
                                    fontWeight: 'bold',
                                    mt: 5,
                                    textTransform: 'capitalize',
                                    "&:hover": {
                                        bgcolor: "#357ABD",
                                    },
                                }}
                            >
                                Order Now
                            </Button>
                            <Button
                                variant="contained"

                                size="large"
                                sx={{
                                    bgcolor: "#0277CE",
                                    color: "white",
                                    py: 2,
                                    px: 10,
                                    mt: 5,
                                    borderRadius: '12px',
                                    fontSize: "1.2rem",
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    "&:hover": {
                                        bgcolor: "#357ABD",
                                    },
                                }}
                            >
                                <FavoriteBorderIcon />  &nbsp; Follow On Shop
                            </Button>
                        </Grid>
                        <Typography
                            variant="h3"
                            component="h1"

                            sx={{
                                fontWeight: "bold",
                                fontSize: { xs: "1.5rem", md: "2rem" },
                                textAlign: { lg: 'left', md: 'left', sm: 'center', xs: 'center' },
                                mt: 10
                            }}
                        >
                            More From Our Shop
                        </Typography>
                        <Box pb={10} mt={5}>
                            <Box sx={{ width: "100%", margin: "0 auto", overflowX: "visible" }}>
                                <Grid item md={11} sm={11} xs={11} >
                                    <Swiper
                                        ref={swiperRef}
                                        style={{ display: "flex", alignItems: "flex-end" }}
                                        loop={true}
                                        spaceBetween={10}
                                        slidesPerView={3}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        modules={[Autoplay, Pagination, Navigation]}
                                        breakpoints={{
                                            300: { slidesPerView: 1 },
                                            460: { slidesPerView: 2 },
                                            786: { slidesPerView: 3 },
                                            1080: { slidesPerView: 3 },
                                            1700: { slidesPerView: 5 },
                                        }}
                                        onSlideChange={() => {
                                            if (swiperRef.current) {
                                                swiperRef.current.swiper.autoplay.start();
                                            }
                                        }}
                                    >
                                        {products?.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <Box
                                                    key={index}
                                                    component={'div'}
                                                    sx={{
                                                        position: "relative",
                                                        width: "100%",
                                                        height: "400px", // Adjust height as needed
                                                        borderRadius: "8px",
                                                        backgroundImage: `url(${item?.imgUrl[0]})`,
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                        backgroundRepeat: "no-repeat",
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => {

                                                        window.open(`/products-detail/${item?.id}`, "_blank");
                                                    }}
                                                />
                                            </SwiperSlide>
                                        ))}

                                    </Swiper>
                                </Grid>
                            </Box>
                        </Box>

                        {/* Image Modal */}
                        <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="xl">
                            <Box sx={{ position: "relative", p: 2 }}>
                                <img src={detail?.imgUrl[selectedImage] || "/placeholder.svg"} alt="Product" className="w-full" />

                            </Box>
                        </Dialog>
                    </Container>
                </Box>

            </Box>
        </>
    );
}

export default ProductDetail;