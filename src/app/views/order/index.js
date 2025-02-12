import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, CardMedia, Container, Grid, Typography, TextField, Divider, Rating, DialogActions, DialogContent, DialogTitle, Dialog, useMediaQuery, Paper, FormControlLabel, Radio, FormControl, RadioGroup } from '@mui/material'
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images'
import Colors from '../../styles/colors'
import Fonts from '../../styles/fonts'
import InputField from '../../components/InputField'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { ErrorToaster, SuccessToaster } from '../../components/Toaster'
import moment from 'moment'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebase.config'
import { AuthContext } from '../../Context/AuthContext'
import { useTheme } from '@emotion/react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Modal } from 'antd'
import shopImg1 from "../../assets/images/shop-intro.webp"
import reviewSection from "../../assets/images/review-section.webp"
import VisaIcon from '@mui/icons-material/CreditCard'; // Replace with actual Visa/Mastercard icons
import MasterCardIcon from '@mui/icons-material/CreditCard'; // Replace with an appropriate icon
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // For cash on delivery


function Order() {
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();
    let { state } = useLocation()
    const navigate = useNavigate()
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = React.useState(2);
    let User = localStorage.getItem('user')
    const [open, setOpen] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [selectedOption, setSelectedOption] = useState('bank'); // State for selected payment method

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    User = JSON.parse(User)
    const calculateTotalPrice = (items) => {
        return cartItems.reduce((total, item) => {
            return total + (parseFloat(item.price) * item.qty);
        }, 0);
    };

    const [rating, setRating] = useState(0);
    const [modalOpen, setModalOpen] = useState(false)
    const [comment, setComment] = useState('');
    const [cartItems, setCartItems] = useState([])
    const { user, setUser } = useContext(AuthContext);
    const handleRatingChange = (event, newRating) => {
        setRating(newRating);
    };
    const handleModalClose = () => {
        setModalOpen(false)
    }
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    const handleClose2 = (event) => {
        setOpen(true)
    }
    const onSubmit2 = () => {
        submitReview()

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
    const onSubmit = (formData) => {
        let User = localStorage.getItem('user')
        User = JSON.parse(User)

        console.log(User, 'UserUserUser');
        if (!User) {
            handleGoogleLogin()


        }
        else {
            if (selectedOption == 'bank') {
                setModalOpen(true)
            }
            else {

                placeOrder()
            }

        }

        console.log("🚀 ~ onSubmit ~ formData:", formData)



    }
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
    const placeOrder = async () => {
        console.log('submit');
        try {

            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "orders"), {
                name: getValues('name'),

                email: getValues('email'),
                phone: getValues('phone'),
                address: getValues('address'),
                userId: User.uid,
                amount: totalPrice,
                status: 'pending',
                details: state,
                paymentType:selectedOption,

                created_at: moment().format('MMMM Do YYYY, h:mm a')


            });

            console.log("Document written with ID: ", docRef.id);
            if (docRef.id) {

                SuccessToaster('Order Placed')
                setOpen(true)
                reset()
            }
            else {
                ErrorToaster('Something Went Wrong')
            }

        } catch (error) {
            console.log(error);
        }
    };
    const submitReview = async () => {
        console.log('submit');
        try {

            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "reviews"), {
                fname: getValues('fName'),
                lname: getValues('lName'),
                email: getValues('email'),
                name: getValues('fname') + getValues('lname'),
                comment: comment,
                profile: User.photoURL,
                rating: rating,
                created_at: moment().format('MMMM Do YYYY, h:mm a')


            });

            console.log("Document written with ID: ", docRef.id);
            if (docRef.id) {

                SuccessToaster('Review Submitted')
                setOpen(false)
                navigate('/myorders')

            }
            else {
                ErrorToaster('Something Went Wrong')
            }

        } catch (error) {
            setOpen(false)
            console.log(error);
        }
    };

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalPrice,
                    },
                },
            ],
        });
    }

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

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
            placeOrder()
        });
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Generate a random color

            let element = document.getElementById('contact-text')
            let element2 = document.getElementById('Us-text')
            let element3 = document.getElementById('mark-text')
            if (element) {
                console.log(element.style.color)
                if (element.style.color == 'rgb(254, 157, 4)') {
                    element.style.color = 'white'
                    element2.style.color = Colors.darkblue
                    element3.style.color = 'white'
                }

                else if (element3.style.color == 'white') {
                    element.style.color = 'white'
                    element2.style.color = 'white'
                    element3.style.color = Colors.pink
                }
                else {
                    element.style.color = 'rgb(254, 157, 4)'
                    element2.style.color = 'white'
                    element3.style.color = 'white'
                }
            }
        }, 1000); // Change color every 1000ms (1 second)

        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        

            
     
        getCartData()
    }, [])
    useEffect(() => {
        const totalPriceSum = calculateTotalPrice();

        setTotalPrice(totalPriceSum)
    }, [cartItems])
    

    return (
        <Box
            component={"main"}
            sx={{
                width: "100%"
            }}
        >
            <Modal open={modalOpen} onCancel={handleModalClose} footer={[]}>
                <Box sx={{ mt: '20px' }}>



                    <ul className='totalprize'>
                        <li><h5>Total Prize</h5>
                            <b>${totalPrice}</b>
                        </li>
                    </ul>

                    <div className="checkout">
                        {isPending ? <p>LOADING...</p> : (
                            <>
                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                                />
                            </>
                        )}
                    </div>
                </Box>
            </Modal>
            <Dialog open={open} onClose={handleClose2}>
                <DialogTitle sx={{ color: 'black' }}>Submit a Review</DialogTitle>
                <DialogContent sx={{ width: fullScreen ? '100%' : '500px' }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={handleRatingChange}
                        />
                        <TextField
                            label="Comment"
                            multiline
                            rows={4}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                },
                            }}
                            value={comment}
                            onChange={handleCommentChange}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit2} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', backgroundImage: `url(${Images.mainBGPink})`, backgroundSize: 'cover', pt: '80px' }}>
                <Grid container p={'20px'} mt={5}>

                    <Grid container justifyContent={'center'} lg={9} md={9} sm={11} xs={12} sx={{ margin: "0 auto", backgroundColor: '#6791DE', borderRadius: '12px' }} py={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Box sx={{ color: '#00bcd4', p: 4, borderRadius: 2 }}>
                                <Grid container justifyContent={"center"} alignItems={"flex-start"}>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Grid container rowGap={'20px'} justifyContent={{ md: "space-between", sm: "center", xs: "center" }} sx={{ background: 'transparent', opacity: 0.8, borderRadius: "20px", p: "40px", pt: 0 }}>
                                            <Grid item md={12} sm={12} xs={12}>
                                                <Grid container justifyContent={"center"} alignItems={"center"}>

                                                    <Grid item md={12}>

                                                        <Typography className='heading-font' sx={{ fontSize: { md: "42px", sm: "34px", xs: "26px" }, color: 'white' }}>
                                                            BILLING DETAILS
                                                        </Typography>


                                                    </Grid>
                                                    <Grid item md={1.5} display={{ md: "block", sm: "none", xs: "none" }}>
                                                        <CardMedia
                                                            component={"img"}
                                                            src={Images.contactImg}
                                                            sx={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "contain"
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item md={12} sm={12} xs={12}>
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "10px",
                                                }}>
                                                    <Typography sx={{ color: 'white' }}>
                                                        Name
                                                    </Typography>
                                                    <InputField
                                                        size='small'
                                                        register={register("name", {
                                                            required: " Name"
                                                        })}
                                                        error={errors?.name && true}
                                                        helperText={errors?.name?.message}
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item md={12} sm={12} xs={12}>
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "10px",
                                                }}>
                                                    <Typography sx={{ color: 'white' }}>
                                                        Address
                                                    </Typography>
                                                    <InputField
                                                        size='small'
                                                        register={register("address", {
                                                            required: "address"
                                                        })}
                                                        error={errors?.address && true}
                                                        helperText={errors?.address?.message}
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item md={12} sm={12} xs={12}>
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "10px",
                                                }}>
                                                    <Typography sx={{ color: 'white' }}>
                                                        Phone Number
                                                    </Typography>
                                                    <InputField
                                                        size='small'
                                                        register={register("phone", {
                                                            required: "Phone"
                                                        })}
                                                        error={errors?.phone && true}
                                                        helperText={errors?.phone?.message}
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item md={12} sm={12} xs={12}>
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "10px",
                                                }}>
                                                    <Typography sx={{ color: 'white' }}>
                                                        Email
                                                    </Typography>
                                                    <InputField
                                                        size='small'
                                                        register={register("email", {
                                                            required: "Email"
                                                        })}

                                                        error={errors?.email && true}
                                                        helperText={errors?.email?.message}
                                                    />
                                                </Box>
                                            </Grid>


                                        </Grid>
                                    </Grid>
                                    <Grid lg={6} md={6} sm={12} xs={12} >
                                        <Paper sx={{ padding: 3, backgroundColor: '#b9ccf0', borderRadius: '12px' }}>
                                            {cartItems?.length > 0 ? cartItems?.map((item, index) => (
                                                <Box key={index} sx={{ backgroundColor: 'transparent', borderRadius: "3px", position: 'relative', mt: 1, mb: 1 }}>
                                                    <Box component={'img'} width={'12px'} src={Images.crossIcon} sx={{ position: 'absolute', top: 10, right: 10, fontWeight: 'bold', cursor: 'pointer' }} ></Box>
                                                    <Grid container alignItems="center">
                                                        {/* Item Image */}
                                                        <Grid item lg={6} md={6} sm={6} xs={6} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>

                                                            <Box sx={{ p: '1px', display: 'flex', justifyContent: 'center' }}>


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





                                                        {/* Total and Remove Button */}
                                                        <Grid item lg={6} md={6} sm={6} xs={6} textAlign="right">
                                                            <Typography sx={{ color: 'white' }}> {item?.price } x { item?.qty} = {item?.price * item?.qty}</Typography>

                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            )) : <Box sx={{ backgroundColor: 'transparent', p: 2, borderRadius: "3px", mb: 2 }}>
                                                <Grid container spacing={2} alignItems="center" justifyContent={'flex-end'}>




                                                    <Grid item xs={12} textAlign="center">
                                                        <Typography component="span" className='para-text' sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                                            No Items Available
                                                        </Typography>
                                                    </Grid>

                                                </Grid>
                                            </Box>}

                                            <Box display="flex" justifyContent="space-between" mt={4}>
                                                <Typography className='para-text'>Subtotal:</Typography>
                                                <Typography className='para-text'>${cartItems.reduce((sum, item) => sum + item.qty * parseFloat(item.price), 0)}</Typography>
                                            </Box>
                                            <Divider sx={{ backgroundColor: '#d5e0f6' }} />
                                            <Box display="flex" justifyContent="space-between" my={1}>
                                                <Typography className='para-text'>Shipping:</Typography>
                                                <Typography className='para-text'>Free</Typography>
                                            </Box>
                                            <Divider sx={{ backgroundColor: '#d5e0f6' }} />
                                            <Box display="flex" justifyContent="space-between" my={1}>
                                                <Typography className='para-text'>Total:</Typography>
                                                <Typography className='para-text'>${cartItems.reduce((sum, item) => sum + item.qty * parseFloat(item.price), 0)}</Typography>
                                            </Box>


                                            <Box sx={{ borderRadius: 2, maxWidth: 400, display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                                <FormControl>
                                                    <RadioGroup value={selectedOption} onChange={handleChange}>
                                                        {/* Bank Option */}
                                                        <FormControlLabel
                                                            value="bank"
                                                            control={
                                                                <Radio
                                                                    sx={{
                                                                        color: '#fff',
                                                                        '&.Mui-checked': {
                                                                            color: '#fff',
                                                                        },
                                                                    }}
                                                                />
                                                            }
                                                            label={
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Typography sx={{ marginRight: 2, color: '#fff' }}>Bank</Typography>
                                                                </Box>
                                                            }
                                                        />
                                                        {/* Cash on Delivery Option */}
                                                        <FormControlLabel
                                                            value="cashOnDelivery"
                                                            control={
                                                                <Radio
                                                                    sx={{
                                                                        color: '#fff',
                                                                        '&.Mui-checked': {
                                                                            color: '#fff',
                                                                        },
                                                                    }}
                                                                />
                                                            }
                                                            label={
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Typography sx={{ marginRight: 2, color: '#fff' }}>Cash on delivery</Typography>
                                                                </Box>
                                                            }
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                                <Box component={'img'} src={Images.paymentIcons} width={'90px'} height={'30px'} />
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Button variant="contained" className='para-text' type='submit' color="secondary" sx={{ marginTop: 2, backgroundColor: '#CA6680', textTransform: "capitalize", textAlign: 'center', p: "11px 40px" }} onClick={() => navigate('/order')}>
                                                    Confirm Order
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
                        xs: '550px',  // Smallest screens
                        sm: '650px',  // Small screens
                        md: '750px',  // Medium screens
                        lg: '950px',  // Large screens
                    }, mt: '20px'
                }}>

                </Grid>
            </Box>

        </Box >
    )
}

export default Order