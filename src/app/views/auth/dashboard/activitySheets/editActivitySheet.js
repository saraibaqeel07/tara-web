import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Box, Button, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, Typography, CircularProgress, IconButton } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, doc, getDoc, getDocs, query, where, deleteDoc, updateDoc, orderBy } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Bounce, toast } from 'react-toastify';
import { ErrorToaster, SuccessToaster } from '../../../../components/Toaster';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import moment from 'moment/moment';


function EditActivitySheet() {
  const [imgUrls, setImgUrls] = useState([]);
  const [imageLoader, setImageLoader] = useState(false)
  const [previewImages, setPreviewImages] = useState([]);
  const {state} = useLocation()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
    reset,
    watch
  } = useForm();

  const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, control: control2 } = useForm();

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
  const [open, setOpen] = React.useState(false);
  const [modalValue, setModalValue] = useState()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseBox = (id) => {
    setTableId(id)
    setOpen(false);

  };

  const handleCloseBox2 = (id) => {
    setOpen(false);

  };

  const navigate = useNavigate();
const {id} = useParams()
  const auth = getAuth();
  const storage = getStorage();
  const storageRef = ref(storage, 'images' + Math.random());
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([])
  const [tableId, setTableId] = useState()
  const [imgUrl, setImgUrl] = useState()

  const [open1, setOpen1] = useState(false);

  const handleClickOpenModal = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };
  const handleImageChange = (e) => {
    setImageLoader(true);
    const files = Array.from(e.target.files);
    if (!files.length) return;
  
    setImage(files.map((file) => URL.createObjectURL(file))); // Local preview
  
    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return { url, type: file.type.startsWith("video/") ? "video" : "image" };
    });
  
    Promise.all(uploadPromises)
      .then((uploadedFiles) => {
        // Convert existing imgUrls to objects with url and type properties
        const existingUrls = imgUrls.map(url => ({
          url,
          // Determine type based on file extension or set default to "image"
          type: url.toLowerCase().endsWith('.mp4') || 
                url.toLowerCase().endsWith('.mov') || 
                url.toLowerCase().endsWith('.webm') ? "video" : "image"
        }));
        
        // Combine and sort
        const sortedUrls = [...existingUrls, ...uploadedFiles]
          .sort((a, b) => (a.type === "video" ? 1 : -1))
          .map((item) => item.url);
  
        setImgUrls(sortedUrls);
        console.log("Sorted Uploaded Image URLs:", sortedUrls);
        setImageLoader(false);
      })
      .catch((error) => console.error("Error uploading files:", error));
  };


  console.log(watch(), 'watch');
  const addProduct = async () => {



    try {

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "products"), {
        name: getValues('productName'),
        subHeading: getValues('subHeading'),
        Pages: getValues('Pages'),
        AgeGroup: getValues('AgeGroup'),
        ParentReason: getValues('ParentReason'),
        HelpChild: getValues('HelpChild'),
        price: getValues('productPrice'),
        createdAt:moment().format('YYYY-MM-DD HH:mm:ss'),
        imgUrl: imgUrls
      });
      console.log("Document written with ID: ", docRef.id);
      if (docRef.id) {
        setImgUrls([])
        SuccessToaster('Product Add Successfully')
        reset()
        setImage('')
        getProducts()
      }
      else {
        ErrorToaster('Something Went Wrong')
      }

    } catch (error) {
      console.log(error);
    }

  };

  const editProduct = async () => {

    try {

      const productRef = doc(db, 'activitysheets', id);

      // Update the product fields
      await updateDoc(productRef, {
        name: getValues('productName'),
        subHeading: getValues('subHeading'),
        Pages: getValues('Pages'),
        AgeGroup: getValues('AgeGroup'),
        ParentReason: getValues('ParentReason'),
        HelpChild: getValues('HelpChild'),
        price: getValues('productPrice'),
    
        imgUrl: imgUrls

      })
        .then(() => {
          SuccessToaster("Document successfully updated!");
          navigate('/admin/activity-sheets')
          getProducts()
          handleClose()
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });

    } catch (error) {
      console.log(error);
    }
  };
  const getProducts = async () => {
    // Order by any existing field that might indicate recency
    const q = query(
      collection(db, "products"), 
      orderBy("createdAt", "asc") // Assuming document IDs have some chronological order
    );
  
    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    setProducts(dataArray);
  }

  const handleDelete = async (id) => {
    console.log(id);
    console.log(tableId);
    let result = await deleteDoc(doc(db, "products", tableId));
    console.log(result);
    SuccessToaster('Product Deleted Successfully')
    setOpen(false)
    getProducts()

  }
  const handleRemoveImage = (index) => {
    setImgUrls(prevImages => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, 'tokentokentokentoken');
    if (token) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user


      // ...
    } else {
      window.location.href = "/login";
    }

    getProducts()

  }, [])

  useEffect(() => {
    console.log(state);
    if(state){
        setValue('productName',state?.name)
        setValue('subHeading',state?.subHeading)
        setValue('productPrice',state?.price)
        setValue('Pages',state?.Pages)
        setValue('AgeGroup',state?.AgeGroup)
        setValue('ParentReason',state?.ParentReason)
        setValue('HelpChild',state?.HelpChild)
        setImgUrls(state?.imgUrl)
        setValue("media", { shouldValidate: true });
    }
    
  }, [])
  
  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleCloseBox2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={'lg'}
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: 'black !important' }}>
          {"Are You Sure?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => handleDelete()} >
            Yes
          </Button>
          <Button onClick={handleCloseBox2}>No</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open1} onClose={handleClose}>
        <DialogTitle sx={{ width: '500px', color: 'black' }} >{"Edit Price"}</DialogTitle>
        <Box sx={{ display: 'flex', p: '20px' }}>
          <TextField
            inputProps={{ sx: { color: 'black !important' } }}
            className='text-color'
            value={modalValue}
            sx={{ color: 'black' }}
            error={!!errors2.productPricemodal}
            type='number'
            helperText={errors2.productPricemodal ? "Product price is required" : ""}
            size='small'
            id="outlined-basic"
            label="Product Price"
            variant="outlined"
            {...register2('productPricemodal', {
              required: true,
              onChange: (e) => {
                setModalValue(e.target.value);

              }
            })}
          />

        </Box>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => editProduct()} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Box component={'form'} onSubmit={handleSubmit(editProduct)} sx={{ width: "90%", margin: '0 auto', mt: 10 }}>

        <Grid container spacing={2}>
          <Grid item xs={6}>

            <TextField inputProps={{ sx: { color: 'black !important' } }} sx={{ color: 'black' }} fullWidth {...register('productName', { required: true })} error={!!errors.productName}
              helperText={errors.productName ? "Product name is required" : ""} size='small' id="outlined-basic" label="Book Name" variant="outlined" />
          </Grid>
          <Grid item xs={6} >

            <TextField inputProps={{ sx: { color: 'black !important' } }} fullWidth rows={4} sx={{ color: 'black' }}  {...register('subHeading', { required: true })} error={!!errors.subHeading}
              helperText={errors.subHeading ? "sub heading is required" : ""} size='small' multiline id="outlined-basic" label="Sub Heading" variant="outlined" />
          </Grid>

          <Grid item xs={4} mt={2}>

            <TextField inputProps={{ sx: { color: 'black !important' } }} fullWidth className='text-color' sx={{ color: 'black' }}  {...register('productPrice', { required: true })} error={!!errors.productPrice} type='number'
              helperText={errors.productPrice ? "Product price is required" : ""} size='small' id="outlined-basic" label="Book Price" variant="outlined" />
          </Grid>
          <Grid item xs={4} mt={2}>

            <TextField inputProps={{ sx: { color: 'black !important' } }} fullWidth className='text-color' sx={{ color: 'black' }}  {...register('Pages', { required: true })} error={!!errors.Pages} type='number'
              helperText={errors.Pages ? "Pages is required" : ""} size='small' id="outlined-basic" label="No of Pages" variant="outlined" />
          </Grid>
          <Grid item xs={4} mt={2}>

            <TextField inputProps={{ sx: { color: 'black !important' } }} fullWidth className='text-color' sx={{ color: 'black' }}  {...register('AgeGroup', { required: true })} error={!!errors.AgeGroup} type='text'
              helperText={errors.AgeGroup ? "Age Group is required" : ""} size='small' id="outlined-basic" label="Age Group" variant="outlined" />
          </Grid>
          <Grid item xs={12} >
            <Grid container spacing={2}>
              <Grid item xs={6} mt={2}>

                <TextField inputProps={{ sx: { color: 'black !important' } }} fullWidth rows={4} sx={{ color: 'black' }}  {...register('ParentReason', { required: true })} error={!!errors.ParentReason}
                  helperText={errors.ParentReason ? "Parent Reason is required" : ""} size='small' multiline id="outlined-basic" label="Why Parent's Love it" variant="outlined" />
              </Grid>
              <Grid item xs={6} mt={2}>

                <TextField inputProps={{ sx: { color: 'black !important' } }} fullWidth rows={4} sx={{ color: 'black' }}  {...register('HelpChild', { required: true })} error={!!errors.HelpChild}
                  helperText={errors.HelpChild ? "help child is required" : ""} size='small' multiline id="outlined-basic" label="How it help's children" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid container m={2} >
            <Grid item xs={12} sm={5}>
              <InputLabel sx={{ textTransform: "capitalize", textAlign: 'left', fontWeight: 700, display: 'block', mb: 2 }}>

                Upload  Media :*
              </InputLabel>

              <Controller
                name="media"
                control={control}
                rules={{
                  required: "At least one media file is required",
                  validate: (value) => {
                    if (!value || value.length === 0) {
                      return "At least one media file is required";
                    }
                    for (let i = 0; i < value.length; i++) {
                      if (value[i].size > 10 * 1024 * 1024) { // Increased limit to 10MB
                        return "Each file must be smaller than 10MB";
                      }
                      
                    }
                    return true;
                  },
                }}
                render={({ field: { onChange } }) => (
                  <>
                    <Box
                      sx={{
                        border: "2px dashed #0EA5EA",
                        borderRadius: "8px",
                        padding: "20px",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: "#f9f9f9",
                        height: '135px',
                        "&:hover": { backgroundColor: "#eef7ff" },
                      }}
                      onClick={() => document.getElementById("upload-media").click()}
                    >
                      {!imageLoader ? (
                        <>
                          <input
                            type="file"
                            accept="image/*,audio/*,video/*"
                            multiple
                            style={{ display: "none" }}
                            id="upload-media"
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              onChange(files); // Update react-hook-form
                              handleImageChange(e); // Handle upload logic
                            }}
                          />
                          <CloudUploadIcon sx={{ fontSize: 40, color: "#0EA5EA" }} />
                          <Typography variant="body1" sx={{ color: "#333", mt: 1 }}>
                            Drag & drop or click to upload media
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#666" }}>
                            Allowed: Images and Videos (Max 10MB per file)
                          </Typography>
                        </>
                      ) : (
                        <CircularProgress size={90} />
                      )}
                    </Box>

                    {errors.media && (
                      <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {errors.media.message}
                      </Typography>
                    )}
                  </>
                )}
              />






            </Grid>
            <Grid container>
            {imgUrls?.length > 0 && <InputLabel sx={{ textTransform: "capitalize", textAlign: 'left', fontWeight: 700, display: 'block', mb: 3, mt: 3 }}>

              Media :
            </InputLabel>}
            </Grid>
            <Grid container>



              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {imgUrls?.length > 0 ? (
                  imgUrls.map((file, index) => {
                    const isVideo = file?.includes(".mp4") || file?.includes(".mov") || file?.includes(".avi") || file?.includes(".webm");

                    return (
                      <Box key={index} sx={{ position: "relative", display: "inline-block", mt: 1 }}>
                        {/* Image or Video */}
                        {isVideo ? (
                          <video
                            width="300px"
                            height="200px"
                            controls
                            style={{ borderRadius: "5px", objectFit: "cover" }}
                          >
                            <source src={file} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            className="rounded"
                            src={file}
                            width="300px"
                            height="200px"
                            alt={`media-${index}`}
                            style={{ borderRadius: "5px", objectFit: "cover" }}
                          />
                        )}

                        {/* Remove Button */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                          }}
                        >
                          <IconButton
                            onClick={() => handleRemoveImage(index)}
                            sx={{
                              backgroundColor: "rgba(0,0,0,0.6)",
                              color: "#fff",
                              "&:hover": { backgroundColor: "red" },
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              p: 2,
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <p></p>
                )}
              </Box>
            </Grid>

          </Grid>



        </Grid>

        <Grid container xs={9} mt={5} justifyContent={'flex-end'} >
          <Button type='submit' variant="contained">Update</Button>

        </Grid>
      </Box>

    </Box>
  )
}

export default EditActivitySheet