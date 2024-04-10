import React from 'react'
import { Box, Button, CardMedia, Container, Grid, Typography, TextField } from '@mui/material'
import Images, { FacebookRounded, InstagramRounded, TiktokRounded, YoutubeRounded } from '../../assets/images'
import Colors from '../../styles/colors'
import Fonts from '../../styles/fonts'
import InputField from '../../components/InputField'
import { useForm } from 'react-hook-form'

function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (formData) => {
    console.log("🚀 ~ onSubmit ~ formData:", formData)
  }

  return (
    <Box
      component={"main"}
      sx={{
        width: "100%"
      }}
    >
      <Box
        component={"section"}
        sx={{
          background: Colors.primaryGradient,
          width: "100%",
          py: "80px"
        }}
      >
        <Container >
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
                    To <span style={{ color: Colors.primary, fontSize: { md: "56px !important", sm: "48px !important", xs: "40px !important" } }}>Explore</span> More About Tara And Shine. <span style={{ color: Colors.darkblue, fontSize: { md: "56px !important", sm: "48px !important", xs: "40px !important" } }}>Contact Us!</span>
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
                      >
                        Start Adventure
                      </Button>
                    </Grid>
                    <Grid item md={7} sm={7} xs={12}>
                      <Grid container spacing={2} sx={{ justifyContent: { md: "flex-start", sm: "flex-start", xs: "center" } }} gap={{ md: "20px", sm: 0, xs: 0 }}>
                        <Grid item md={1.4} sm={3} xs={3}>
                          <Button>
                            <FacebookRounded />
                          </Button>
                        </Grid>
                        <Grid item md={1.4} sm={3} xs={3}>
                          <Button>
                            <InstagramRounded />
                          </Button>
                        </Grid>
                        <Grid item md={1.4} sm={3} xs={3}>
                          <Button>
                            <YoutubeRounded />
                          </Button>
                        </Grid>
                        <Grid item md={1.4} sm={3} xs={3}>
                          <Button>
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
        </Container>
      </Box>
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
    </Box>
  )
}

export default Contact