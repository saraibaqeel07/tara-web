import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Typography, Paper, TextField, IconButton, Divider } from '@mui/material';
import Images from '../../assets/images';
import reviewSection from "../../assets/images/review-section.png"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const Cart = () => {
    let User = localStorage.getItem('user')

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
        const q = query(collection(db, "cartData"));
    
        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    
        const sortedData = dataArray.sort((a, b) => {
          return a.price === "0" ? 1 : b.price === "0" ? -1 : 0;
        });
        console.log('books', sortedData);
        // Update state with sorted data
        
        setCartItems(sortedData)
    
      }

      const handleIncrement = (id) => {
    
    console.log(cartItems);
    
    setCartItems((prevItems) => {
        const updatedItems = prevItems.map((item) => {
          console.log('Item ID matches:', item?.data?.id === id); // Log the condition check
          if (item?.data?.id === id) {
            console.log('Before increment:', item?.data?.qty); // Log the current quantity before increment
            return { ...item, data: { ...item.data, qty: item?.data?.qty + 1 } }; // Increment qty
          }
          return item; // If not matching, return the item unchanged
        });
      
        console.log('Updated items after increment:', updatedItems); // Log the updated array
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
      
    const [count, setCount] = useState(0);



    const updateQuantity = (id, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0; // Free shipping for this example
    const total = subtotal + shipping;
useEffect(() => {
    getCartData()
}, [])

    return (
        <Box sx={{ width: '100%', backgroundImage: `url(${Images.mainBGPink})`, backgroundSize: 'cover', pt: '80px' }}>
            <Grid container spacing={4} p={'20px'} mt={5}>

                <Grid container justifyContent={'center'} xs={9} sx={{ margin: "0 auto", backgroundColor: '#6791DE', borderRadius: '12px' }} py={3}>
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
                                    <Box component={'img'} width={'12px'} src={Images.crossIcon} sx={{ position: 'absolute', top: 10, right: 10, fontWeight: 'bold', cursor: 'pointer' }} ></Box>
                                    <Grid container spacing={2} alignItems="center">
                                        {/* Item Image */}
                                        <Grid item lg={6} md={6} sm={12} xs={12} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>

                                            <Box sx={{ p: '10px', display: 'flex', justifyContent: 'center' }}>


                                                <Box
                                                    component="img"
                                                    src={item?.data?.imgUrl}
                                                    alt="Item"
                                                    sx={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: 1,
                                                    }}
                                                />
                                            </Box>


                                            <Box>
                                                <Typography variant="body2" style={{ color: 'white' }}>{item?.data?.name}</Typography>

                                            </Box>
                                        </Grid>



                                        {/* Price and Quantity */}
                                        <Grid item lg={2} md={2} sm={4} xs={4} textAlign="center">
                                            <Typography sx={{ color: 'white' }}> {item?.data?.price}</Typography>

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
                                                    border:"1px solid #e7b9c5",
                                                    width: "80px",
                                                    height: "50px",
                                                }}
                                            >
                                                <TextField
                                                    value={item?.data?.qty}
                                                    InputProps={{
                                                        readOnly: true,
                                                        disableUnderline: true,
                                                        sx: {
                                                            width: "100%",
                                                            textAlign: "center",
                                                            background: "transparent",
                                                            color: "white",
                                                            fontSize: "17px",
                                                            fontFamily:'Adiana !important',
                                                            p:"1px",
                                                            border: "none"
                                                        },
                                                        endAdornment: (
                                                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                                <IconButton
                                                                    sx={{ padding: "2px", color: "white" }}
                                                                    onClick={()=> handleIncrement(item?.data?.id,item?.data?.qty)}
                                                                >
                                                                    <ArrowDropUpIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    sx={{ padding: "2px", color: "white" }}
                                                                    onClick={()=> handleDecrement(item?.data?.id,item?.data?.qty)}
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
                                            <Typography sx={{ color: 'white' }}> {item?.data?.price * item?.data?.qty}</Typography>

                                        </Grid>
                                    </Grid>
                                </Box>
                            )) : <Box sx={{ backgroundColor: '#151d2f', p: 2, borderRadius: "15px", mb: 2 }}>
                                <Grid container spacing={2} alignItems="center" justifyContent={'flex-end'}>




                                    <Grid item xs={12} textAlign="center">
                                        <Typography component="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                            No Items Available
                                        </Typography>
                                    </Grid>

                                </Grid>
                            </Box>}
                            <Grid container justifyContent={'flex-end'} mt={8}>
                                <Grid item xs={12} md={4}>
                                    <Paper sx={{ padding: 3, backgroundColor: '#b9ccf0',borderRadius:'12px' }}>
                                        <Typography variant="h5" className='heading-font'>CART TOTAL</Typography>
                                        <Box display="flex" justifyContent="space-between" my={1}>
                                            <Typography className='para-text'>Subtotal:</Typography>
                                            <Typography className='para-text'>${subtotal}</Typography>
                                        </Box>
                                        <Divider sx={{backgroundColor:'#d5e0f6'}}/>
                                        <Box display="flex" justifyContent="space-between" my={1}>
                                            <Typography className='para-text'>Shipping:</Typography>
                                            <Typography className='para-text'>Free</Typography>
                                        </Box>
                                        <Divider sx={{backgroundColor:'#d5e0f6'}}/>
                                        <Box display="flex" justifyContent="space-between" my={1}>
                                            <Typography className='para-text'>Total:</Typography>
                                            <Typography className='para-text'>${total}</Typography>
                                        </Box>
                                        <Divider sx={{backgroundColor:'#d5e0f6'}}/>
                                        <Box sx={{display:'flex',justifyContent:'center'}}>
                                        <Button variant="contained" className='para-text'  color="secondary" sx={{ marginTop: 2,backgroundColor:'#CA6680',textTransform:"capitalize",textAlign:'center',p:"11px 40px" }} onClick={() => alert('Proceed to Checkout')}>
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
                backgroundImage: `url(${reviewSection})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: {
                    xs: '300px',  // Smallest screens
                    sm: '400px',  // Small screens
                    md: '500px',  // Medium screens
                    lg: '700px',  // Large screens
                }, mt: '20px'
            }}>

            </Grid>
        </Box>
    );
};

export default Cart;
