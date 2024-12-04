import { Box, Button, CardMedia, Container, Divider, Drawer, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../../styles/colors'
import Fonts from '../../styles/fonts'
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'


import { CartCounter } from '../../Context/CartCounter'
function Character() {
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
  const handleEmailClick = (emailAddress) => {
    window.location.href = `mailto:${emailAddress}`;
  };
  const characterData = [
    {
      name: "Tara",
      detail: "Tara is 9 years old. She is a shy Muslim girl. Her imaginary best friend is Shine. She is very kind, helpful, and loving. Her special skill is drawing. She gets nervous around a lot of people, but Shine overcomes her weakness.",
      image: Images.Tara,
      logo: Images.logoTara
    },
    {
      name: "Shine",
      detail: "Tara's best imaginary friend is named Shine. She always lends a hand to Tara. She has a lot of energy. She has a bold personality and inspires confidence",
      image: Images.shine,
      logo: Images.logoShine
    },
    {
      name: "Ahmed",
      detail: "Ahmed is Tara’s younger brother; he is 8 years old. Ahmed is very kind and helpful boy. He loves to play video games.",
      image: Images.ahmed,
      logo: Images.logoAhmed
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.laila,
      logo: Images.logoLaila
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Sara,
      logo: Images.logoLaila
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Fatima,
      logo: Images.logoLaila
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Taha,
      logo: Images.logoLaila
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.ali,
      logo: Images.logoLaila
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Maya,
      logo: Images.logoLaila
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Mom,
      logo: Images.logoLaila
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Dad,
      logo: Images.logoLaila
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.annie,
      logo: Images.logoLaila
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Omar,
      logo: Images.logoLaila
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.grandma,
      logo: Images.logoLaila
    },
    {
      name: "Laila",
      detail: "Laila is Tara’s eldest sister. She is 11 years old. She is funny and smart. She loves to eat Ice cream.",
      image: Images.Faiz,
      logo: Images.logoLaila
    },

  ];

  const teamData = [
    {
      name: "Sohaib Ali Khan",
      email: "sohaibalikhann@gmail.com",
      profession: "Social Media Content Writer",
      image: Images.contentWriter
    },
    {
      name: "Onam",
      email: "archiotshimo@gmail.com",
      profession: "Animator, Storyboard, Illustrator, Character",
      image: Images.storyBoard
    },
    {
      name: "Hussnain Shafay",
      email: "hhussnain542@gmail.com",
      profession: "Web Developer And Graphic Design",
      image: Images.webDeveloper
    },
    {
      name: "Sana Kazmi",
      email: "shineswithtara@gmail.com",
      profession: "Script, Story, Animator, Illustrator",
      image: Images.illustrator
    },
  ]
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

      let element = document.getElementById('main-text')
      let element2 = document.getElementById('character-text')

      if (element) {
        console.log(element.style.color)
        if (element.style.color == 'rgb(2, 27, 81)') {
          element.style.color = 'white'
          element2.style.color = Colors.pink

        }


        else {
          element.style.color = Colors.darkblue
          element2.style.color = 'white'

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
            backgroundPosition: "bottom center",
            width: "100%",
            height: { md: "578px", xs: "490px" },
            position: "relative", // Ensure child content is positioned relative to this container
            overflow: "hidden", // Prevent content from going outside
          }}
        >
          {/* Right-side Image */}
          <Box
            sx={{

              margin: '0 auto',
              width: { md: "100%", sm: "100%", xs: "100%" }, // Adjust width for each screen size
              height: "100%", // Full height of the parent container
              backgroundImage: `url(${Images.mainCharacter})`,
              backgroundSize: { md: "cover", xl: "contain", lg: "contain", },
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center", // Ensures the image is aligned at the bottom
              display: { md: "block", xl: "block", lg: "block", sm: "none", xs: "none" }, // Show image only for medium and larger screens

            }}
          />


        </Box>






      </Box>

      <Box
        sx={{ backgroundColor: "#CA6680" ,
        py:"30px"   ,
      }}
      >
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
            textTransform: "uppercase",
            paddingBottom: { xl: 6, lg: 5, md: 4, sm: 3, xs: 2 },
            position: "relative", // Ensures alignment with image
            zIndex: 1, // Keeps heading above the image
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",gap:"20px"
          }}
          
        >
          <span style={{
            WebkitTextStroke: "1px white",
            WebkitTextFillColor: "#F9BF29",
          }}>main </span>
          <span  style={{
                    display: "block",
                    WebkitTextStroke: "1px white",
                    WebkitTextFillColor: "#4FAAFB",
                  }}> charcter's</span>

        </Typography>

    
      </Box>


      <Box
        component={"section"}
        sx={{
          background: Colors.lightPurple,
          width: "100%",
          p: "20px"
        }}
      >
        <Grid container justifyContent={"center"} gap={"40px"}>
          <Grid item md={12} sm={12} xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                alignItems: "center"
              }}
            >
              <CardMedia
                component={"img"}
                src={Images.flower}
                sx={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain"
                }}
              />
              <Typography
                variant='h3'
                sx={{
                  fontWeight: 600,
                  color: Colors.darkblue
                }}
              >
                Team
              </Typography>
              <CardMedia
                component={"img"}
                src={Images.flower}
                sx={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain"
                }}
              />
            </Box>
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            <Grid container spacing={4} justifyContent={"space-between"}>
              {teamData.map((item, i) => (
                <Grid key={i} item md={6} sm={12} xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component={"img"}
                      src={item.image}
                      sx={{
                        width: "100%",
                        height: "350px",
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                        backgroundColor: Colors.yellow,
                        p: 2
                      }}
                    >
                      <Typography
                        variant='caption'
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant='caption'
                      >
                        {item.profession}
                      </Typography>
                      <Box component={'div'} sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} onClick={() => handleEmailClick(item.email)} >
                        <Typography

                          variant='caption'

                        >
                          {item.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Character