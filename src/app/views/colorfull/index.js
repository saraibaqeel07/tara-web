import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, CardMedia, Container, Grid, Typography, ButtonGroup, TextField, Divider, Drawer } from '@mui/material';
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images';
import Colors from '../../styles/colors';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { CartCounter } from '../../Context/CartCounter';
import CloseIcon from '@mui/icons-material/Close';
import Fonts from '../../styles/fonts';

function Colorfull() {
  const navigate = useNavigate()
  
  const [selected, setSelected] = useState("mission");
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0)
  const { cartVisible, toggleCartVisibility } = useContext(CartContext);
  const { setCount } = useContext(CartCounter);
  const [open, setOpen] = useState(false);

  console.log(cartVisible, 'cartVisible');
  const buttons = [
    <Button
      key="mission"
      variant={selected == 'mission' ? "contained" : "outlined"}
      color="secondary"
      sx={{
        // width: { md: "180px", sm: "150px", xs: "100%" },
        // background: selected == "mission" ? Colors.darkblue : "transparent",
        // color: selected == "mission" ? Colors.white : Colors.darkblue,
        width: "100%",
        px: 4,
        py: 1.5
      }}
      onClick={() => setSelected("mission")}
    >
      Mission
    </Button>,
    <Button
      key="vision"
      variant={selected == 'vision' ? "contained" : "outlined"}
      color="secondary"
      sx={{
        // width: { md: "180px", sm: "150px", xs: "100%" },
        // background: selected == "vision" ? Colors.darkblue : "transparent",
        // color: selected == "vision" ? Colors.white : Colors.darkblue,
        width: "100%",
        px: 4,
        py: 1.5
      }}
      onClick={() => setSelected("vision")}
    >
      Vision
    </Button>,
  ];


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

      let element = document.getElementById('color-text')
      let element2 = document.getElementById('with-text')
      let element3 = document.getElementById('tara-text')
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
          pt: "80px",

        }}
      >
       
          <Box
            sx={{
              backgroundImage: `url(${Images.mainBackground})`,
              width: "95%",
              height: { md: '700px', xs: '320px' },
              borderRadius: '20px',
              backgroundSize: "cover",
              backgroundPosition: "center center",
              margin:'0 auto'
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    pt: "60px",

                  }}
                >
                  <Typography
                    variant='h1'
                    sx={{
                      fontSize: { md: '50px', xs: '30px', lg: '70px' },
                      fontWeight: 700,
                      color: Colors.white,
                      textAlign: 'center'
                    }}
                  >
                    Come And  <span id='color-text' style={{ color: Colors.primary }}>Color</span>  <span id='with-text' style={{ color: "#F9BF29 " }}>with</span> <span id='tara-text' style={{ color: "#021B51" }}> Tara</span>
                  </Typography>

                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box

                  sx={{
                    backgroundImage: `url(${Images.colorfullBack})`,
                    width: '100%',
                    height: { md: '500px', xs: '200px' },
                    backgroundSize: "cover",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: "center center",
                    gap: "40px",


                  }}
                >


                </Box>
              </Grid>
            </Grid>
          </Box>
       
        <Box
          component={"section"}
          sx={{
            background: Colors.whiteblue,
            pt: "80px",
            mt: 20
          }}
        >
          <Container>
        
            <Grid
              container

            >
              <Grid item md={12}>
                <Box
                  sx={{
                    mb: "40px",

                  }}
                >
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 900,
                      color: '#021B51', textAlign: 'center'
                    }}
                  >
                    Come And Color With Tara
                  </Typography>
                  <Box sx={{
                    mt: 5,
                    mb: 5,
                    display: "flex",
                    justifyContent: 'center'
                  }}>
                    <Typography
                      variant='p'
                      sx={{ textAlign: 'center' }}
                    >
                      If your little ones love Tara, then why not download these activities to help learn with their favorite characters off-screen.
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Grid container justifyContent={'space-between'}>
                    <Grid md={5} item >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: "20px",
                          position: 'relative'
                        }}
                      >


                        <CardMedia
                          component={"img"}
                          src={Images?.colorCardImg1}
                          sx={{
                            height: "400px",
                            borderRadius: "20px 20px 0px 0px"
                          }}
                        />
                        <Box
                          component={'div'}
                          onClick={() => navigate('/')}
                          sx={{
                            backgroundColor: "#C77805",
                            p: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            borderRadius: "0px 0px 20px 20px",
                            cursor: 'pointer'
                          }}
                        >
                          <Typography sx={{ textAlign: 'center' }}>
                            Learning & Activity
                          </Typography>
                          <Typography sx={{ textAlign: 'center' }}>
                            See More
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid md={5} item >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: "20px",
                          position: 'relative'
                        }}
                      >


                        <CardMedia
                          component={"img"}
                          src={Images?.colorCardImg2}
                          sx={{
                            height: "400px",
                            borderRadius: "20px 20px 0px 0px"
                          }}
                        />
                        <Box
                          component={'div'}
                          onClick={() => navigate('/')}
                          sx={{
                            backgroundColor: "#C77805",
                            p: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            borderRadius: "0px 0px 20px 20px",
                            cursor: 'pointer'
                          }}
                        >
                          <Typography sx={{ textAlign: 'center' }}>
                            Coloring Book
                          </Typography>
                          <Typography sx={{ textAlign: 'center' }}>
                            See More
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    alignItems: "center",
                    mt: '100px'
                  }}
                >
                  <CardMedia
                    component={"img"}
                    src={Images.flower}
                    sx={{
                      width: "70px",
                      heigth: "70px",
                      objectFit: "contain"
                    }}
                  />
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 600,
                      color: "#021B51"
                    }}
                  >
                    Sheets
                  </Typography>
                  <CardMedia
                    component={"img"}
                    src={Images.flower}
                    sx={{
                      width: "70px",
                      heigth: "70px",
                      objectFit: "contain"
                    }}
                  />
                </Box>
              </Grid>
              <Grid container >
                <Grid item xs={12} md={6}>
                  <Box sx={{ mt: 20 }}>
                    <Typography
                      onClick={() => navigate('/')}
                      variant='p'
                      sx={{
                        fontSize: { md: '18px', xs: '18px', lg: '18px' },
                        cursor: 'pointer',
                        color: Colors.white,
                        textAlign: 'center'
                      }}
                    >
                      We Offer The Following Worksheets!
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }} >
                    <Box sx={{ display: 'flex', alignItems: 'center' }} >
                      <CardMedia
                        component={"img"}
                        src={Images.flower}
                        sx={{
                          width: "30px",
                          heigth: "30px",
                          objectFit: "contain"
                        }}
                      />
                      <Typography
                        onClick={() => navigate(
                          `/`,
                          { state: {colorful: true,section:'coloring-section'} }
                        )}
                        variant='p'
                        sx={{
                          fontSize: { md: '18px', xs: '18px', lg: '18px' },
                          cursor: 'pointer',
                          color: Colors.white,
                          textAlign: 'left'
                        }}
                      >
                        Coloring Sheets
                      </Typography>
                      <CardMedia
                        component={"img"}
                        src={Images.flower}
                        sx={{
                          width: "30px",
                          heigth: "30px",
                          objectFit: "contain"
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CardMedia
                        component={"img"}
                        src={Images.flower}
                        sx={{
                          width: "30px",
                          heigth: "30px",
                          objectFit: "contain"
                        }}
                      />
                      <Typography
                        onClick={() => navigate(
                          `/`,
                          { state: {colorful: true,section:'activity-section'} }
                        )}
                        variant='p'
                        sx={{
                          fontSize: { md: '18px', xs: '18px', lg: '18px' },
                          cursor: 'pointer',
                          color: Colors.white,
                          textAlign: 'left'
                        }}
                      >
                        Activity Sheets
                      </Typography>
                      <CardMedia
                        component={"img"}
                        src={Images.flower}
                        sx={{
                          width: "30px",
                          heigth: "30px",
                          objectFit: "contain"
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CardMedia
                        component={"img"}
                        src={Images.flower}
                        sx={{
                          width: "30px",
                          heigth: "30px",
                          objectFit: "contain"
                        }}
                      />
                      <Typography
                       onClick={() => navigate(
                        `/`,
                        { state: {colorful: true,section:'activity-section'} }
                      )}
                        variant='p'
                        sx={{
                          fontSize: { md: '18px', xs: '18px', lg: '18px' },
                          cursor: 'pointer',
                          color: Colors.white,
                          textAlign: 'left'
                        }}
                      >
                        Learning Sheets
                      </Typography>
                      <CardMedia
                        component={"img"}
                        src={Images.flower}
                        sx={{
                          width: "30px",
                          heigth: "30px",
                          objectFit: "contain"
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box

                    sx={{
                      backgroundImage: `url(${Images.topper})`,
                      width: '100%',
                      height: '300px',
                      backgroundSize: "contain",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: { md: "center right", xs: 'center center' },
                      gap: "40px",
                      mt: 5


                    }}
                  >
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box >
  )
}

export default Colorfull