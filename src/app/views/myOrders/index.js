import React, { useEffect, useState } from 'react'
import { Box, Button, CardMedia, Container, Grid, Typography, TextField, Divider, Chip, ListItemText, ListItem, Menu, MenuItem, Dialog, DialogTitle, StepConnector, StepLabel, Stepper, Step } from '@mui/material'
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images'
import Colors from '../../styles/colors'
import Fonts from '../../styles/fonts'
import InputField from '../../components/InputField'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { addDoc, collection, getDocs, getFirestore, query } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { ErrorToaster, SuccessToaster } from '../../components/Toaster'
import { List } from 'antd'
import moment from 'moment'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const steps = ['Pending', 'Processing', 'Confirmed', 'Delivered'];

const ColorConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${StepConnector.line}`]: {
        borderColor: theme.palette.primary.main,
    },
}));

const ColorStepLabel = styled(StepLabel)(({ theme, active, completed }) => ({
    '& .MuiStepLabel-label': {
        color: active || completed ? '#8F52A1 !important' : 'black',
    },
    '& .MuiStepIcon-root': {
        color: active || completed ? theme.palette.primary.main : theme.palette.text.disabled,
    },
}));

function MyOrders() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    let { state } = useLocation()
    const [orders, setOrders] = useState([])
    let user = localStorage.getItem('user')
    user=JSON.parse(user)
    const [totalPrice, setTotalPrice] = useState(0)
    const [activeState  , setActiveState  ] = useState(0)
    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => {
            return total + (parseFloat(item.price) * item.quantity);
        }, 0);
    };
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
    console.log(state);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [open1, setOpen1] = useState(false)
    const [selectedData, setSelectedData] = useState([])
    const [status, setStatus] = useState()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const getOrders = async () => {
        const q = query(collection(db, "orders"));

        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

   
        let filteredData = dataArray.filter(item => item?.userId == user?.uid)
        console.log(filteredData);
        setOrders(filteredData)

    }


    useEffect(() => {
        getOrders()
    }, [])

    return (
        <Box
            component={"main"}
            sx={{
                width: "100%"
            }}
        >
            <Dialog open={open1} onClose={handleClose}>
               <Box component={'div'} onClick={()=> setOpen1(false)} sx={{color:'black',textAlign:'right',cursor:'pointer',p:'5px'}}><CloseIcon/></Box>
                <DialogTitle sx={{ width: '600px', color: 'black', overflowX: 'hidden', textAlign: 'center' }} >{"Order Details"}</DialogTitle>
                <Stepper activeStep={status} alternativeLabel connector={<ColorConnector />}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <ColorStepLabel
                                active={status >= index}
                                completed={status > index}
                                sx={{color:'black'}}
                            >
                                {label}
                            </ColorStepLabel>
                        </Step>
                    ))}
                </Stepper>
                {selectedData?.length > 0 ? selectedData?.map((product, index) => (
                    <React.Fragment key={index}>

                        <Box
                            sx={{

                                display: 'flex',
                                padding: 2,
                                textAlign: 'center',
                            }}
                        >

                            <img
                                src={product.imgUrl}
                                alt={product.name}
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            />&nbsp;&nbsp;&nbsp;
                            <Typography sx={{ fontSize: '12px', color: 'black', width: '200px', display: 'flex', alignItems: 'center' }} variant="h6">
                                {product.name}
                            </Typography>
                            <Typography sx={{ fontSize: '12px', color: 'black', display: 'flex', alignItems: 'center', width: '100px', }} variant="body1">
                                ${product.price}
                            </Typography>
                            <Typography
                                sx={{ fontSize: '12px', color: 'black', width: '100px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                                variant="body1"
                            >
                                {product.quantity}
                            </Typography>
                            <Typography
                                sx={{ fontSize: '12px', color: 'black', width: '50px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                                variant="body1"
                            >
                                ${product.quantity ? product.quantity * product.price : 1 * product.price}
                            </Typography>

                        </Box>
                        <Divider />
                    </React.Fragment>
                )) : <Box sx={{ color: 'black', fontWeight: 'bold', margin: '0 auto' }}>No Items in Cart</Box>}

            </Dialog>
            <Box
                component={"section"}
                sx={{
                    backgroundImage: `url(${Images.mainBGPink})`,

                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    width: "100%",
                    py: "80px"
                }}
            >

                 {/* Heading */}
                                  <Typography
                                    variant="h1"
                                    className="heading-font"
                                    sx={{
                                      fontSize: {
                                        xl: "100px",
                                        lg: "90px",
                                        md: "70px",
                                        sm: "45px",
                                        xs: "35px",
                                      }, // Adjusts font size for different screens
                                      fontWeight: 600,
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      textTransform: "uppercase",
                                      textAlign:'center',
                
                                      position: "relative", // Ensures alignment with image
                                      zIndex: 1, // Keeps heading above the image
                                    }}
                                    style={{
                                      WebkitTextStroke: "1px white",
                                      WebkitTextFillColor: "#F9BF29",
                                    }}
                                  >
                                    <span>Your </span>
                                    <span
                                      style={{
                
                                        WebkitTextStroke: "1px white",
                                        WebkitTextFillColor: "#4FAAFB",
                                      }}
                                    >
                                      ORDERS
                                    </span>
                                  </Typography>

                <Box sx={{ width: '95%', margin: '0 auto' }}>


                    <List disablePadding>
                        {orders.length > 0 && orders.map((product) => {



                            return (
                                <Grid container justifyContent={'center'}>
                                    <Grid item xs={12} sm={12} lg={6}>
                                        <ListItem key={product.name} sx={{ py: 1, px: 0, color: 'white' }}>
                                            <ListItemText
                                                sx={{ color: 'white' }}
                                                primary={
                                                    <Typography sx={{ color: 'white' }}>
                                                        {`Order# ${product?.id} `}
                                                       &nbsp; <Chip label={product.status} sx={{ color: 'white',textTransform:'capitalize' }} />
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography sx={{ color: 'black' }}>
                                                        {moment(product?.created_at).format('MMMM Do YYYY, h:mm a')}
                                                    </Typography>
                                                }
                                            />
                                            {/* <Typography variant="body2">Total Quantity: {totalQuantity}</Typography> */}
                                            <Typography variant="body2">Total Amount: $ &nbsp;&nbsp;{product?.amount}</Typography>
                                            <div>
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={(e) => { handleClick(e); setSelectedData(product?.details); 
                                                        const normalizedStepToFind = product?.status.toLowerCase();

                                                        // Find the index by comparing the lowercase versions of the elements
                                                        const index = steps.findIndex(step => step.toLowerCase() === normalizedStepToFind);
                                                        
                                                        console.log(index); setStatus(index); }}
                                                    sx={{ color: 'white' }}
                                                >
                                                    <MoreVertIcon />
                                                </Button>
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}

                                                >
                                                    {/* <MenuItem sx={{ color: 'black' }} onClick={handleClose}>Profile</MenuItem> */}
                                                    <MenuItem sx={{ color: 'black' }} onClick={() => { setOpen1(true); handleClose() }}>View Details</MenuItem>

                                                </Menu>
                                            </div>
                                        </ListItem>
                                    </Grid>
                                </Grid>
                            );
                        })}

                    </List>



                </Box>
            </Box >

        </Box >
    )
}

export default MyOrders