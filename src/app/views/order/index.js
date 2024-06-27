import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, CardMedia, Container, Grid, Typography, TextField, Divider, Rating, DialogActions, DialogContent, DialogTitle, Dialog, useMediaQuery } from '@mui/material'
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images'
import Colors from '../../styles/colors'
import Fonts from '../../styles/fonts'
import InputField from '../../components/InputField'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { ErrorToaster, SuccessToaster } from '../../components/Toaster'
import moment from 'moment'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../config/firebase.config'
import { AuthContext } from '../../Context/AuthContext'
import { useTheme } from '@emotion/react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Modal } from 'antd'


function Order() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
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
    User = JSON.parse(User)
    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => {
            return total + (parseFloat(item.price) * item.quantity);
        }, 0);
    };

    const [rating, setRating] = useState(0);
    const [modalOpen, setModalOpen] = useState(false)
    const [comment, setComment] = useState('');
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

        console.log(User,'UserUserUser');
        if (!User) {
            handleGoogleLogin()


        }
        else {
            setModalOpen(true)
        }

        console.log("🚀 ~ onSubmit ~ formData:", formData)



    }
    const handleGoogleLogin = async () => {

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("User Info: ", user);
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
                fname: getValues('fName'),
                lname: getValues('lName'),
                email: getValues('email'),
                phone: getValues('phone'),
                address: getValues('address'),
                userId: User.uid,
                amount: totalPrice,
                status: 'pending',
                details: state,

                created_at: moment().format('MMMM Do YYYY, h:mm a')


            });

            console.log("Document written with ID: ", docRef.id);
            if (docRef.id) {

                SuccessToaster('Order Placed')
                setOpen(true)

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
                name:getValues('fname')+getValues('lname'),
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
        if (state) {

            const totalPriceSum = calculateTotalPrice(state);

            setTotalPrice(totalPriceSum)
        }

    }, [])

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
                    <Button onClick={handleClose2} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit2} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Box
                component={"section"}
                sx={{
                    background: Colors.primaryGradient,
                    width: "100%",
                    py: "80px"
                }}
            >
                {/* <Container >
          <Box
            sx={{
              backgroundImage: { md: `url(${Images.contactBg})`, sm: `url(${Images.backgroundSm})`, xs: `url(${Images.backgroundSm})` },
              width: "100%",
              height: { md: "624px", xs: "490px" },
              backgroundSize: "cover",
              backgroundPosition: "center center",
              borderRadius: "20px"
            }}
          >
            <Grid container>
              <Grid item md={7} sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "20px",
                    pt: "50px",
                    pl: { md: `60px !important`, sm: "12px", xs: "12px" },
                    pr: { md: 0, sm: "12px", xs: "12px" },
                  }}
                >
                  <Typography
                    variant='h1'
                    sx={{
                      fontFamily: Fonts.righteous,
                      fontSize: { md: "70px", sm: "50px", xs: "40px" },
                      fontWeight: 500,
                      textAlign: { md: "left", sm: "center", xs: "center" },
                      pr: { md: "150px", sm: 0, xs: 0 }
                    }}
                  >
                    To <Typography component={"span"} sx={{ fontFamily: Fonts.righteous, color: Colors.primary, fontSize: { md: "56px", sm: "48px", xs: "40px" } }}>Explore</Typography> More About Tara And Shine. <Typography component={"span"} id='contact-text' sx={{ fontFamily: Fonts.righteous, color: Colors.darkblue, fontSize: { md: "56px !important", sm: "48px !important", xs: "40px !important" } }}>Order </Typography> <span id='Us-text'>Us</span> <span id='mark-text'>!</span>
                  </Typography>
                  <Grid container spacing={2} alignItems={"center"}>
                    <Grid item md={5} sm={5} xs={12}>
                      <Button
                        fullWidth
                        variant='contained'
                        sx={{
                          py: 1,
                          px: 4,
                          textTransform: "capitalize",
                          fontSize: "18px",
                          boxShadow: ` 8px 72px 142px -58px rgba(143,82,161,1)`
                        }}
                        href='https://www.youtube.com/@Shinewithtara'
                      >
                        Start Adventure
                      </Button>
                    </Grid>
                    <Grid item md={7} sm={7} xs={12}>
                      <Grid container spacing={2} sx={{ justifyContent: { md: "flex-start", sm: "flex-start", xs: "center" } }} gap={{ md: "20px", sm: 0, xs: 0 }}>
                        <Grid item md={1.4} sm={3} xs={3}>
                          <Button href='https://www.facebook.com/profile.php?id=61554711500749'>
                            <FacebookRounded />
                          </Button>
                        </Grid>
                        <Grid item md={1.4} sm={3} xs={3}>
                          <Button href='https://www.instagram.com/shineswithtara/ '>
                            <InstagramRounded />
                          </Button>
                        </Grid>
                        <Grid item md={1.4} sm={3} xs={3}>
                          <Button href='https://www.youtube.com/@Shinewithtara'>
                            <YoutubeRounded  />
                          </Button>
                        </Grid>
                        <Grid item md={1.4} sm={3} xs={3}>
                          <Button href='https://www.tiktok.com/@shinewithtara'>
                            <TiktokRounded />
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container> */}

                <Typography sx={{ fontSize: '30px', color: 'black', fontWeight: 'bold', textAlign: 'center', mb: '20px' }} variant="h6">
                    Order Summary
                </Typography>
                <Grid container sx={{ width: '70%', margin: '0 auto' }}>
                    <Grid item xs={3}>
                        <Typography
                            sx={{ fontSize: '12px', color: 'black', fontWeight: 'bold', textAlign: 'left' }}
                            variant="body1"
                        >
                            Product Image
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography
                            sx={{ fontSize: '12px', color: 'black', fontWeight: 'bold', textAlign: 'left' }}
                            variant="body1"
                        >
                            Product Name & Price
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography
                            sx={{ fontSize: '12px', color: 'black', fontWeight: 'bold', textAlign: 'left' }}
                            variant="body1"
                        >
                            Quantity
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography
                            sx={{ fontSize: '12px', color: 'black', fontWeight: 'bold', textAlign: 'left' }}
                            variant="body1"
                        >
                            Total
                        </Typography>
                    </Grid>
                </Grid>
                {state?.length > 0 ? state?.map((product, index) => (
                    <React.Fragment key={index}>
                        <Box sx={{ width: '90%', margin: '0 auto' }}>
                            <Grid container sx={{ width: '80%', margin: '0 auto' }}>
                                <Grid item xs={3}>

                                    <img
                                        src={product.imgUrl}
                                        alt={product.name}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                </Grid>
                                <Grid item xs={3}>

                                    <Typography sx={{ fontSize: '12px', color: 'black', width: '100px' }} variant="h6">
                                        {product.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: '12px', color: 'black' }} variant="body1">
                                        ${product.price}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography
                                        sx={{ fontSize: '12px', color: 'black', width: '50px', fontWeight: 'bold' }}
                                        variant="body1"
                                    >
                                        {product.quantity}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography
                                        sx={{ fontSize: '12px', color: 'black', width: '50px', fontWeight: 'bold' }}
                                        variant="body1"
                                    >
                                        ${product.quantity ? product.quantity * product.price : 1 * product.price}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Divider />
                        </Box>
                    </React.Fragment>
                )) : <Box sx={{ color: 'black', fontWeight: 'bold', margin: '0 auto' }}>No Items in Cart</Box>}
            </Box >
            <Box
                component={"section"}
                sx={{
                    background: Colors.whiteblue,
                    width: "100%",
                    height: "100%",
                    py: "40px"
                }}
            >
                <Container>
                    <Grid container rowGap={"20px"} justifyContent={"center"}>
                        <Grid item md={9} sm={12} xs={12}>
                            {/* <Box sx={{ textAlign: "center" }}>
                <Typography variant='h4' sx={{ fontWeight: 600, fontSize: { md: "36px", sm: "32px", xs: "28px" } }}>
                  Order The Team at <span style={{ color: Colors.darkblue }}>Shine With Tara</span> To Keep In Touch With The Latest Updates
                </Typography>
              </Box> */}
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                        </Grid>
                        <Grid container justifyContent={"center"} alignItems={"center"}>
                            <Grid item md={10} sm={12} xs={12} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                                <Grid container rowGap={"40px"} justifyContent={{ md: "space-between", sm: "center", xs: "center" }} sx={{ background: Colors.secondaryGradient, opacity: 0.8, borderRadius: "20px", p: "40px" }}>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <Grid container justifyContent={"center"} alignItems={"center"}>
                                            <Grid item md={1} display={{ md: "block", sm: "none", xs: "none" }}>
                                                <CardMedia
                                                    component={"img"}
                                                    src={Images.shineStar}
                                                    sx={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain"
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={6}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        textAlign: "center"
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: { md: "42px", sm: "34px", xs: "26px" } }}>
                                                        Order
                                                    </Typography>
                                                    <Typography sx={{ fontSize: { md: "32px", sm: "28px", xs: "24px" }, color: Colors.yellow }}>
                                                        Shine With Tara
                                                    </Typography>
                                                </Box>
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
                                    {/* <Grid item md={12} sm={12} xs={12}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Typography>
                        Email: shineswithtara@gmail.com
                      </Typography>
                      <Typography>
                        Copyright 2024 © All rights Reserved By Shine With Tara Design By Sana Kazmi
                      </Typography>
                    </Box>
                  </Grid> */}
                                    <Grid item md={5.8} sm={12} xs={12}>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                        }}>
                                            <Typography>
                                                First Name
                                            </Typography>
                                            <InputField
                                                register={register("fName", {
                                                    required: "First Name"
                                                })}
                                                error={errors?.fName && true}
                                                helperText={errors?.fName?.message}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item md={5.8} sm={12} xs={12}>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                        }}>
                                            <Typography>
                                                Last Name
                                            </Typography>
                                            <InputField
                                                register={register("lName", {
                                                    required: "Last Name"
                                                })}
                                                error={errors?.lName && true}
                                                helperText={errors?.lName?.message}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item md={5.8} sm={12} xs={12}>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                        }}>
                                            <Typography>
                                                Email
                                            </Typography>
                                            <InputField
                                                register={register("email", {
                                                    required: "Email"
                                                })}
                                                error={errors?.email && true}
                                                helperText={errors?.email?.message}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item md={5.8} sm={12} xs={12}>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                        }}>
                                            <Typography>
                                                Phone
                                            </Typography>
                                            <InputField
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
                                            <Typography>
                                                Address
                                            </Typography>
                                            <InputField
                                                register={
                                                    register("address", {
                                                        required: "address"
                                                    })}
                                                error={errors?.address && true}
                                                multiline={true}
                                                rows={3}
                                                helperText={errors?.address?.message}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item md={12}>
                                        <Grid container justifyContent={"center"}>
                                            <Grid item md={4}>
                                                <Button
                                                    type='submit'
                                                    fullWidth
                                                    variant='contained'
                                                    sx={{ background: Colors.yellow }}
                                                >
                                                    Confirm Order
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box >
    )
}

export default Order