import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, CardMedia, Container, Grid, Typography, TextField, Divider, Drawer } from '@mui/material'
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images'
import Colors from '../../styles/colors'
import Fonts from '../../styles/fonts'
import InputField from '../../components/InputField'
import { useForm } from 'react-hook-form'
import { CartContext } from '../../Context/CartContext'
import { CartCounter } from '../../Context/CartCounter'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import taraImage from "../../assets/images/tara-pic.webp"
import moment from 'moment'

function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const [selected, setSelected] = useState("mission");
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0)
  const { cartVisible, toggleCartVisibility } = useContext(CartContext);
  const { setCount } = useContext(CartCounter);
  const [open, setOpen] = useState(false);

  console.log(cartVisible, 'cartVisible');


  const handleIncrement = (id) => {
    const updatedData = cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    const totalPrice = updatedData.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0);
    setTotalAmount(totalPrice)
    setCartItems(updatedData);
    setCount(updatedData?.length)
    localStorage.setItem('cartData', JSON.stringify(updatedData))
  };

  const handleDecrement = (id) => {
    const updatedData = cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 } : item)
    const totalPrice = updatedData.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0);
    setTotalAmount(totalPrice)
    setCartItems(updatedData);
    setCount(updatedData?.length)
    localStorage.setItem('cartData', JSON.stringify(updatedData))
  };
  const toggleDrawer = (isOpen) => (event) => {
    console.log('dasdasas');
    setOpen(!open);
    toggleCartVisibility()
  };

  const onSubmit = (formData) => {
    console.log("🚀 ~ onSubmit ~ formData:", formData)
  }
  useEffect(() => {
    let cart = localStorage.getItem('cartData')
    if (cart) {

      cart = JSON.parse(cart)
      if (cart?.length > 0) {
        setCartItems(cart)
        setCount(cart.length)
        const totalPrice = cart.reduce((total, item) => {
          return total + (parseFloat(item.price) * item.quantity);
        }, 0);
        setTotalAmount(totalPrice)
      }
    }
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

    setOpen(cartVisible)


  }, [cartVisible])
  return (
    <Box
      component={"main"}
      sx={{
        width: "100%"
      }}
    >
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 400, padding: 2 }}
          role="presentation"

        >
          <Box display="flex" flexWrap="wrap">

            {cartItems?.length > 0 ? cartItems?.map((product, index) => (
              <React.Fragment key={index}>
                <Box
                  component={'div'}
                  onClick={() => {
                    const updatedData = cartItems.filter(item => product.id != item.id)
                    const totalPrice = updatedData.reduce((total, item) => {
                      return total + (parseFloat(item.price) * item.quantity);
                    }, 0);
                    setTotalAmount(totalPrice)
                    setCartItems(updatedData)
                    setCount(updatedData?.length)
                    localStorage.setItem('cartData', JSON.stringify(updatedData))
                  }}
                  sx={{ color: 'black', cursor: 'pointer', width: '100%' }}
                >
                  <CloseIcon />
                </Box>

                <Box
                  sx={{
                    height: 100,
                    display: 'flex',
                    padding: 2,
                    textAlign: 'center',
                  }}
                >

                  <img
                    src={product.imgUrl}
                    alt={product.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <Typography sx={{ fontSize: '12px', color: 'black', width: '100px' }} variant="h6">
                    {product.name}
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: 'black' }} variant="body1">
                    ${product.price}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '12px', color: 'black', width: '50px', fontWeight: 'bold' }}
                    variant="body1"
                  >
                    ${product.quantity ? product.quantity * product.price : 1 * product.price}
                  </Typography>
                  <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: '10px' }} marginTop={1}>
                    <Button variant="contained" color="secondary" onClick={() => handleDecrement(product.id)}>
                      -
                    </Button>
                    <Typography sx={{ fontSize: '12px', color: 'black' }} variant="body1" marginX={2}>
                      {product.quantity ? product.quantity : 1}
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={() => handleIncrement(product.id)}>
                      +
                    </Button>

                  </Box>
                </Box>
                <Divider />
              </React.Fragment>
            )) : <Box sx={{ color: 'black', fontWeight: 'bold', margin: '0 auto' }}>No Items in Cart</Box>}
          </Box>
          <Box sx={{ color: 'black', fontSize: '27px', textAlign: 'center', fontFamily: Fonts.righteous, }}>Sub Total :  $ {totalAmount}</Box>
        </Box>
        <Button sx={{ width: '90%', textAlign: 'center', margin: '0 auto' }} variant="contained" color="secondary" onClick={() => navigate(
          `/order`,
          { state: cartItems }
        )}>
          CheckOut
        </Button>
      </Drawer>
      <Box
        component={"section"}
        sx={{
          background: Colors.primaryGradient,
          width: "100%",

        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${Images.bannerBg})`,

            backgroundSize: "cover",
            backgroundPosition: "center center",
            width: "100%",
            height: { md: "578px", xs: "490px",xl:"730px" },
            position: "relative", // Ensure child content is positioned relative to this container
            overflow: "hidden", // Prevent content from going outside
          }}
        >
          {/* Right-side Image */}
          <Box
            sx={{
              margin: '0 auto',
              width: { xs: "100%", sm: "100%", md: "66%", lg: "66%", xl: "66%" }, // Responsive width
              height: "100%", // Full height of the parent container
              backgroundImage: `url(${Images.contactCharacter})`,
              backgroundSize: { xs: "cover", sm: "cover", md: "cover", lg: "contain", xl: "contain" }, // Responsive background size
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              display: { xs: "block", sm: "block", md: "block", lg: "block", xl: "block" }, // Always visible, you can remove this line unless there’s a specific visibility control needed
            }}

          />


        </Box>






      </Box>
      <Box
        component={"section"}
        sx={{
          backgroundImage: `url(${Images.introBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          py: "40px",
          position: 'relative',
          pb: { xs: '300px', sm: '500px', md: '700px', lg: '850px', xl: '2000px' },
          '@media (min-width: 1536px)and (max-width:2150px)': {
            pb:"1400px"
          },


        }}
      >
        <Container  >

          <Grid container rowGap={"20px"} justifyContent={"center"} >
            <Grid item md={12} sm={12} xs={12}>
              {/* Flex container for image and heading */}
              <Grid
                container
                sx={{


                  position: "relative",
                  display: "flex",
                  justifyContent: "center", // Centers content horizontally
                  alignItems: "center", // Centers content vertically
                  padding: { xs: 1, sm: 2, md: 3 }, // Adjusts padding for smaller screens
                }}
              >
                {/* Container for Image and Heading */}
                <Box
                  sx={{
                    mt: 4,
                    position: "relative", // Allows absolute positioning for the image
                    textAlign: "center", // Centers the heading text
                    width: "100%", // Ensures proper alignment
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

                      position: "relative", // Ensures alignment with image
                      zIndex: 1, // Keeps heading above the image
                    }}
                    style={{
                      WebkitTextStroke: "1px white",
                      WebkitTextFillColor: "#F9BF29",
                    }}
                  >
                    <span>Contact </span>
                    <span
                      style={{

                        WebkitTextStroke: "1px white",
                        WebkitTextFillColor: "#4FAAFB",
                      }}
                    >
                      US!
                    </span>
                  </Typography>
                </Box>
              </Grid>
              <Grid
                container
                sx={{


                  position: "relative",
                  display: "flex",
                  justifyContent: "center", // Centers content horizontally
                  alignItems: "center", // Centers content vertically
                  padding: { xs: 2, sm: 3, md: 4 }, // Adjusts padding for smaller screens
                }}
              >
                {/* Container for Image and Heading */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 3,
                    position: "relative", // Allows absolute positioning for the image
                    textAlign: "center", // Centers the heading text
                    width: "100%", // Ensures proper alignment
                  }}
                >
                  {/* Tara Image */}
                  <Box
                    sx={{
                      display: { lg: 'block', md: 'block', sm: 'none', xs: "none" },
                      width: '80px',
                      height: '80px',
                      backgroundImage: `url(${taraImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  {/* Heading */}
                  <Typography
                    variant="h1"
                    className='para-text'
                    sx={{
                      fontSize: '27px', // Adjusts font size for different screens
                      flex: 1,


                      paddingBottom: { xl: 6, lg: 5, md: 4, sm: 3, xs: 2 },
                      position: "relative", // Ensures alignment with image
                      zIndex: 1, // Keeps heading above the image
                    }}

                  >
                    <span>  &nbsp;  &nbsp;  &nbsp; Contact  &nbsp;  The   &nbsp;  Team  &nbsp;  at </span> &nbsp;
                    <span style={{ color: "#F9BF29" }}> Shine With Tara </span>
                    <span>   &nbsp; Keep  &nbsp;  in   &nbsp;  Touch   &nbsp; With  &nbsp;  the   &nbsp; Latest  &nbsp;  Updates </span>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
            </Grid>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Grid item md={10} sm={12} xs={12} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowGap={"40px"} justifyContent={{ md: "space-between", sm: "center", xs: "center" }} sx={{ background: '#6791DE', opacity: 0.8, borderRadius: "20px", p: "40px" }}>
                  <Grid item md={12} sm={12} xs={12}>
                    <Grid container justifyContent={"center"} alignItems={"center"}>

                      <Grid item md={12}>
                        <Box
                          sx={{
                            mt: 4,
                            position: "relative", // Allows absolute positioning for the image
                            textAlign: "center", // Centers the heading text
                            width: "100%", // Ensures proper alignment
                          }}
                        >

                          {/* Heading */}
                          <Typography
                            variant="h1"
                            className="heading-font"
                            sx={{
                              fontSize: {
                                xl: "60px",
                                lg: "50px",
                                md: "30px",
                                sm: "35px",
                                xs: "25px",
                              }, // Adjusts font size for different screens
                              fontWeight: 600,

                              textTransform: "uppercase",

                              position: "relative", // Ensures alignment with image
                              zIndex: 1, // Keeps heading above the image
                            }}
                            style={{
                              WebkitTextStroke: "2px white",
                              WebkitTextFillColor: "#F9BF29",
                            }}
                          >
                            <span>Contact </span>
                            <span
                              style={{

                                WebkitTextStroke: "2px white",
                                WebkitTextFillColor: "#4FAAFB",
                              }}
                            >
                              INFORMATION
                            </span>
                          </Typography>
                          {/* Heading */}
                          <Typography
                            variant="h1"
                            className='para-text'
                            sx={{
                              fontSize: '30px', // Adjusts font size for different screens
                              flex: 1,


                              paddingBottom: { xl: 6, lg: 5, md: 4, sm: 3, xs: 2 },
                              position: "relative", // Ensures alignment with image
                              zIndex: 1, // Keeps heading above the image
                            }}

                          >

                            <span style={{ color: "#eeb728" }}> Shine With Tara </span>

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
                  <Grid item md={12} sm={12} xs={12}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Typography className='para-text' sx={{ fontSize: '20px' }}>
                        Email : <Box component={'span'} className='heading-font' sx={{ color: '#FCAE32', textDecoration: 'underline',fontSize: {lg:'20px',md:'20px',sm:'20px',xs:'14px'} }}> shineswithtara@gmail.com</Box>
                      </Typography>
                      <Typography className='para-text' sx={{ fontSize: '20px' }}>
                        Copyright {moment().format('YYYY')} © All rights Reserved By Shine With Tara Design By Sana Kazmi
                      </Typography>
                    </Box>
                  </Grid>
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
                        size={'small'}
                        sx={{ backgroundColor: 'transparent !important', '& .MuiOutlinedInput-root': { border: '1px solid white' } }}
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
                        size={'small'}
                        sx={{ backgroundColor: 'transparent !important', '& .MuiOutlinedInput-root': { border: '1px solid white' } }}
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
                        size={'small'}
                        sx={{ backgroundColor: 'transparent !important', '& .MuiOutlinedInput-root': { border: '1px solid white' } }}
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
                        size={'small'}
                        sx={{ backgroundColor: 'transparent !important', '& .MuiOutlinedInput-root': { border: '1px solid white' } }}
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
                        Message
                      </Typography>
                      <InputField
                        size={'small'}
                        sx={{ backgroundColor: 'transparent !important', '& .MuiOutlinedInput-root': { border: '1px solid white' } }}
                        register={
                          register("message", {
                            required: "Message"
                          })}
                        error={errors?.message && true}
                        multiline={true}
                        rows={4}
                        helperText={errors?.message?.message}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Grid container justifyContent={"center"}>
                      <Grid item md={4}>
                        <Button
                          type='submit'
                          fullWidth
                          className='para-text'
                          variant='contained'
                          sx={{
                            background: '#FF9D04', textTransform: 'capitalize', fontSize: '30px', p: '5px 40px', borderRadius: '8px', WebkitTextStroke: "1px #FF9D04",
                            WebkitTextFillColor: "white",
                          }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Box
              sx={{
                position: "absolute",
                bottom: {xl:1200,lg:600,md:400,sm:350,xs:200},
                left: {lg:220,xl:150, md:100,sm:50,xs:30},
                zIndex: 0,
                display: "block",
                width: "60px"
              }}
              component={'img'}
              src={Images.hearts}
            ></Box>
            <Box
              sx={{
                position: "absolute",
                bottom: {lg:400,md:200,xs:100},
                right: {lg:210,xl:150, md:100,sm:50,xs:30},
                zIndex: 0,
                display: "block",
                width: "60px",
               
              }}
              component={'img'}
              src={Images.rainbow}
            ></Box>
          </Grid>
          <Grid container justifyContent={'center'} >

            <Box sx={{
              backgroundImage: `url(${Images.contactBrothers})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'absolute', bottom: 0, height: { xs: "300px", sm: "500px", md: "760px", xl: "2000px" }, width: { xs: '80%', xl: "100%" },
              '@media (min-width: 1536px)and (max-width:2150px)': {
                height:"1350px"
              },
            }}>

            </Box>
          </Grid>
        </Container>
      </Box>
    </Box >
  )
}

export default Contact