import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Typography, Paper, TextField, IconButton, Divider } from '@mui/material';
import Images from '../../assets/images';
import reviewSection from "../../assets/images/review-section.webp"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { SuccessToaster } from '../../components/Toaster';
import shopImg1 from "../../assets/images/shop-intro.webp"

const Cart = () => {
    let User = localStorage.getItem('user')
    const navigate = useNavigate()

    User = JSON.parse(User)
    const [cartItems, setCartItems] = useState([])

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

    const getCartData = async () => {
        try {
          
            const userId = User.uid;

            
            const q = query(collection(db, "cartData"), where("userId", "==", userId));

            const querySnapshot = await getDocs(q);
            const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(dataArray[0]?.data, 'dataArray');



           
            setCartItems(dataArray[0]?.data);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    const updateCartInFirebase = async (userId) => {
        try {
            
            if (!cartItems || (typeof cartItems !== 'object' && !Array.isArray(cartItems))) {
                console.error('Invalid cartItems data:', cartItems);
                return; 
            }
    
           
            const cartRef = collection(db, "cartData");
    
           
            const querySnapshot = await getDocs(query(cartRef, where("userId", "==", User?.uid)));
            console.log(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    
           
            if (!querySnapshot.empty) {
               
                const cartDocId = querySnapshot.docs[0].id;
                console.log(cartDocId, 'cartDocId');
    
               
                const cartDocRef = doc(db, "cartData", cartDocId);
                console.log(cartDocRef, 'cartDocRef');
    
               
                await updateDoc(cartDocRef, {
                    data: cartItems 
                });
    
               SuccessToaster('Cart updated successfully');
            } else {
                console.log('No cart found for this user');
            }
        } catch (error) {
            console.error(`Error updating cart for User: ${userId}`, error);
        }
    };
    

    const handleIncrement = (id) => {
        console.log('Cart Items:', cartItems);

        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) => {
                console.log('Checking Item ID:', item?.id);
                console.log('Increment Target ID:', id);

                if (item?.id === id) {
                    console.log('Before Increment:', item?.qty); // Log the current quantity
                    return { ...item, qty: item.qty + 1 }; // Correctly increment qty
                }
                return item; // Return the unchanged item if IDs don't match
            });

            console.log('Updated Items After Increment:', updatedItems); // Log the updated array
            return updatedItems;
        });
    };


    const handleDecrement = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
            )
        );
    };





    const updateQuantity = (id, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };
    const handleElementDelete = (id) => {
        setCartItems(cartItems.filter((item2 => item2?.id !== id)))
        
    };

    const subtotal = cartItems?.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = 0; // Free shipping for this example
    const total = subtotal + shipping;
    useEffect(() => {
        getCartData()
    }, [])

    return (
        <Box sx={{ width: '100%', backgroundImage: `url(${Images.mainBGPink})`, backgroundSize: 'cover', pt: '80px' }}>
            <Grid container  p={'20px'} mt={5}>

                <Grid container justifyContent={'center'} lg={9} md={9} sm={11} xs={12} sx={{ margin: "0 auto", backgroundColor: '#6791DE', borderRadius: '12px' }} py={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box sx={{ color: '#00bcd4', p: 4, borderRadius: 2 }}>

                            <Box sx={{ backgroundColor: '#FF9D04', p: 2, borderRadius: "3px", mb: 2, display: { lg: 'block', md: 'block', sm: 'none', xs: 'none' } }}>
                                <Grid container spacing={2} alignItems="center">
                                    {/* Item Image */}
                                    <Grid item xs={6} sx={{ color: 'white' }}>
                                        <Typography sx={{ color: 'white', textTransform: 'uppercase' }}>Product </Typography>
                                    </Grid>



                                    {/* Price and Quantity */}
                                    <Grid item xs={2} textAlign="center">
                                        <Typography sx={{ color: 'white', textTransform: 'uppercase' }}>Price </Typography>

                                    </Grid>
                                    <Grid item xs={2} textAlign="center">
                                        <Typography sx={{ fontSize: '1.2rem', color: 'white', textTransform: 'uppercase' }}>
                                            Quantity
                                        </Typography>
                                    </Grid>
                                    {/* Total and Remove Button */}
                                    <Grid item xs={2} textAlign="center">
                                        <Typography sx={{ color: 'white', textTransform: 'uppercase' }}>Sub Total</Typography>

                                    </Grid>
                                </Grid>
                            </Box>
                            {cartItems?.length > 0 ? cartItems?.map((item, index) => (
                                <Box key={index} sx={{ backgroundColor: '#CA6680', p: 2, borderRadius: "3px", mb: 2, position: 'relative' }}>
                                    <Box component={'span'} onClick={()=> handleElementDelete(item?.id)} sx={{ position: 'absolute', top: 10, right: 10, fontWeight: 'bold', cursor: 'pointer',color:'white' }} >X</Box>
                                    <Grid container spacing={2} alignItems="center">
                                        {/* Item Image */}
                                        <Grid item lg={6} md={6} sm={12} xs={12} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>

                                            <Box sx={{ p: '10px', display: 'flex', justifyContent: 'center' }}>


                                                <Box
                                                    component="img"
                                                    src={item?.imgUrl}
                                                    alt="Item"
                                                    sx={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: 1,
                                                    }}
                                                />
                                            </Box>


                                            <Box>
                                                <Typography variant="body2" style={{ color: 'white' }}>{item?.name}</Typography>

                                            </Box>
                                        </Grid>



                                        {/* Price and Quantity */}
                                        <Grid item lg={2} md={2} sm={4} xs={4} textAlign="center">
                                            <Typography sx={{ color: 'white' }}> {item?.price}</Typography>

                                        </Grid>
                                        <Grid item lg={2} md={2} sm={4} xs={4} display={'flex'} justifyContent={'center'} textAlign="center">
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "#CA6680",
                                                    borderRadius: "8px",
                                                    padding: "5px",
                                                    border: "1px solid #e7b9c5",
                                                    width: "80px",
                                                    height: "50px",
                                                }}
                                            >
                                                <TextField
                                                    value={item?.qty}
                                                    InputProps={{
                                                        readOnly: true,
                                                        disableUnderline: true,
                                                        sx: {
                                                            width: "100%",
                                                            textAlign: "center",
                                                            background: "transparent",
                                                            color: "white",
                                                            fontSize: "17px",
                                                            fontFamily: 'Adiana !important',
                                                            p: "1px",
                                                            border: "none"
                                                        },
                                                        endAdornment: (
                                                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                                <IconButton
                                                                    sx={{ padding: "2px", color: "white" }}
                                                                    onClick={() => handleIncrement(item?.id, item?.qty)}
                                                                >
                                                                    <ArrowDropUpIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    sx={{ padding: "2px", color: "white" }}
                                                                    onClick={() => handleDecrement(item?.id, item?.qty)}
                                                                >
                                                                    <ArrowDropDownIcon />
                                                                </IconButton>
                                                            </Box>
                                                        ),
                                                    }}
                                                    variant="standard"
                                                />
                                            </Box>
                                        </Grid>
                                        {/* Total and Remove Button */}
                                        <Grid item lg={2} md={2} sm={4} xs={4} textAlign="center">
                                            <Typography sx={{ color: 'white' }}> {item?.price * item?.qty}</Typography>

                                        </Grid>
                                    </Grid>
                                </Box>
                            )) : <Box sx={{ backgroundColor: '#CA6680', p: 2, borderRadius: "3px", mb: 2 }}>
                                <Grid container spacing={2} alignItems="center" justifyContent={'flex-end'}>




                                    <Grid item xs={12} textAlign="center">
                                        <Typography component="span" className='para-text' sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                            No Items Available
                                        </Typography>
                                    </Grid>

                                </Grid>
                            </Box>}
                            <Grid container   mt={8}>
                                <Grid item lg={6} md={6} sm={12} xs={12} sx={{display:'flex',justifyContent:{lg:'flex-start',md:'flex-start',sm:'center',xs:'center'},alignItems:'flex-start'}} mb={6}>
                                    <Box sx={{ display: 'flex', justifyContent:{lg:'flex-end',md:'flex-end',sm:'center',xs:'center'}, gap: 2,flexWrap:'wrap' }}>
                                        <Button variant="contained" className='para-text' color="secondary" sx={{ marginTop: 2, backgroundColor: 'transparent', textTransform: "capitalize", textAlign: 'center', p: "11px 40px", boxShadow: 'none', border: '1px solid white' }} onClick={() => navigate('/products')}>
                                            Return To Shop
                                        </Button>
                                        <Button variant="contained" className='para-text' color="secondary" sx={{ marginTop: 2, backgroundColor: 'transparent', textTransform: "capitalize", textAlign: 'center', p: "11px 40px", boxShadow: 'none', border: '1px solid white' }} onClick={() => updateCartInFirebase()}>
                                            Update Cart
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ padding: 3, backgroundColor: '#b9ccf0', borderRadius: '12px' }}>
                                        <Typography variant="h5" className='heading-font'>CART TOTAL</Typography>
                                        <Box display="flex" justifyContent="space-between" my={1}>
                                            <Typography className='para-text'>Subtotal:</Typography>
                                            <Typography className='para-text'>${subtotal}</Typography>
                                        </Box>
                                        <Divider sx={{ backgroundColor: '#d5e0f6' }} />
                                        <Box display="flex" justifyContent="space-between" my={1}>
                                            <Typography className='para-text'>Shipping:</Typography>
                                            <Typography className='para-text'>Free</Typography>
                                        </Box>
                                        <Divider sx={{ backgroundColor: '#d5e0f6' }} />
                                        <Box display="flex" justifyContent="space-between" my={1}>
                                            <Typography className='para-text'>Total:</Typography>
                                            <Typography className='para-text'>${total}</Typography>
                                        </Box>
                                        <Divider sx={{ backgroundColor: '#d5e0f6' }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button variant="contained" className='para-text' color="secondary" sx={{ marginTop: 2, backgroundColor: '#CA6680', textTransform: "capitalize", textAlign: 'center', p: "11px 40px" }} onClick={() => navigate('/order')}>
                                                Proceed to Checkout
                                            </Button>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container sx={{
                backgroundImage: `url(${shopImg1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: {
                    xs: '550px',  // Smallest screens
                    sm: '650px',  // Small screens
                    md: '750px',  // Medium screens
                    lg: '950px',  // Large screens
                }, mt: '20px'
            }}>

            </Grid>
        </Box>
    );
};

export default Cart;
