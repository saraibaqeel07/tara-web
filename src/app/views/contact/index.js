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
    if(cart){

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
      if(element){
        console.log(element.style.color)
        if(element.style.color =='rgb(254, 157, 4)'){
          element.style.color='white'
          element2.style.color=Colors.darkblue
          element3.style.color='white'
        }
        
        else if(element3.style.color == 'white'){
          element.style.color='white'
          element2.style.color='white'
          element3.style.color=Colors.pink
        }
        else{
          element.style.color='rgb(254, 157, 4)'
          element2.style.color='white'
          element3.style.color='white'
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
                  sx={{ color: 'black', cursor: 'pointer',width:'100%' }}
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
          py: "80px"
        }}
      >
        
          <Box
            sx={{
              backgroundImage: { md: `url(${Images.contactBg})`, sm: `url(${Images.backgroundSm})`, xs: `url(${Images.backgroundSm})` },
              width: "95%",
              height: { md: "624px", xs: "490px" },
              backgroundSize: "cover",
              backgroundPosition: "center center",
              borderRadius: "20px",
              margin:'0 auto'
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
                    To <Typography component={"span"} sx={{ fontFamily: Fonts.righteous, color: Colors.primary, fontSize: { md: "56px", sm: "48px", xs: "40px" } }}>Explore</Typography> More About Tara And Shine. <Typography component={"span"} id='contact-text' sx={{ fontFamily: Fonts.righteous, color: Colors.darkblue, fontSize: { md: "56px !important", sm: "48px !important", xs: "40px !important" } }}>Contact </Typography> <span id='Us-text'>Us</span> <span id='mark-text'>!</span>
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
              <Box sx={{ textAlign: "center" }}>
                <Typography variant='h4' sx={{ fontWeight: 600, fontSize: { md: "36px", sm: "32px", xs: "28px" } }}>
                  Contact The Team at <span style={{ color: Colors.darkblue }}>Shine With Tara</span> To Keep In Touch With The Latest Updates
                </Typography>
              </Box>
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
                            Contact Information
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
                  <Grid item md={12} sm={12} xs={12}>
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
                        Message
                      </Typography>
                      <InputField
                        register={
                          register("message", {
                            required: "Message"
                          })}
                        error={errors?.message && true}
                        multiline={true}
                        rows={3}
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
                          variant='contained'
                          sx={{ background: Colors.yellow }}
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
        </Container>
      </Box>
    </Box >
  )
}

export default Contact