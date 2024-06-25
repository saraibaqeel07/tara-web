import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Box, Button, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, doc, getDoc, getDocs, query, where, deleteDoc, updateDoc } from "firebase/firestore";
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


function ManageActivitySheets() {

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset
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
  let productId=''
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
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(URL.createObjectURL(selectedImage));
  
      uploadBytes(storageRef, selectedImage)
        .then((snapshot) => {
          console.log('Uploaded a blob or file!');
          console.log(snapshot);
  
          // Get the download URL of the uploaded file
          getDownloadURL(snapshot.ref)
            .then((url) => {
              console.log('Download URL:', url);
              setImgUrl(url);
              // You can use this URL for various purposes, such as displaying the image in an <img> element
              const img = document.getElementById('myimg');
              if (img) {
                img.setAttribute('src', url);
              } else {
                console.error('Image element not found');
              }
            })
            .catch((error) => {
              // Handle any errors
              console.error('Error getting download URL:', error);
            });
        })
        .catch((error) => {
          // Handle any errors during upload
          console.error('Error uploading file:', error);
        });
    } else {
      console.error('No file selected');
    }
  };


  const addProduct = async () => {
    console.log('submit');
    try {

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "activitysheets"), {
        name: getValues('productName'),
        price: getValues('productPrice'),
        imgUrl: imgUrl
      });
      console.log("Document written with ID: ", docRef.id);
      if (docRef.id) {

        SuccessToaster('Product Add Succesfully')
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

  const editProduct = async (id) => {

    try {

      const productRef = doc(db,'activitysheets',tableId);

      // Update the product fields
      await updateDoc(productRef, {
        
        price: modalValue,  // Update the product price
       
      })
      .then(() => {
        console.log("Document successfully updated!");
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
    const q = query(collection(db, "activitysheets"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log(dataArray);
    setProducts(dataArray)

  }

  const handleDelete = async (id) => {
    console.log(id);
    console.log(tableId);
    let result = await deleteDoc(doc(db, "activitysheets", tableId));
    console.log(result);
    SuccessToaster('Product Deleted Successfully')
    setOpen(false)
    getProducts()

  }

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

      <Dialog  open={open1} onClose={handleClose}>
        <DialogTitle sx={{width:'500px',color:'black'}} >{"Edit Price"}</DialogTitle>
        <Box sx={{display:'flex',p:'20px'}}>
        <TextField
        inputProps={{ sx: { color: 'black !important' } }}
        className='text-color'
        value={modalValue}
        sx={{ color: 'black' }}
        error={!!errors.productPricemodal}
        type='number'
        helperText={errors.productPricemodal ? "Product price is required" : ""}
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
          <Button onClick={()=> editProduct()} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Box component={'form'} onSubmit={handleSubmit(addProduct)} sx={{ width: "80%", margin: '0 auto', mt: 10 }}>

        <Grid container>
          <Grid item xs={6}>

            <TextField inputProps={{sx:{color:'black !important'}}} sx={{color:'black'}}  {...register('productName', { required: true })} error={!!errors.productName}
              helperText={errors.productName ? "Product name is required" : ""} size='small' id="outlined-basic" label="Book Name" variant="outlined" />
          </Grid>

          <Grid item xs={6}>

            <TextField inputProps={{sx:{color:'black !important'}}}  className='text-color'  sx={{color:'black'}}  {...register('productPrice', { required: true })} error={!!errors.productPrice} type='number'
              helperText={errors.productPrice ? "Product price is required" : ""} size='small' id="outlined-basic" label="Book Price" variant="outlined" />
          </Grid>

          <Grid container justifyContent={'space-between'}>
            <Grid item xs={4} mt={5}>

              <TextField size='small' type='file' onChange={handleImageChange} required={true} />
            </Grid>
            <Grid item xs={4} mt={5}>

              {image && (
                <div>
                  <h4>Image Preview:</h4>
                  <img src={image} id='myimg' alt="Preview" style={{ maxWidth: '100%' }} />
                </div>
              )}
            </Grid>

          </Grid>

        </Grid>

        <Grid container xs={9} mt={5} justifyContent={'flex-end'} s>
          <Button type='submit' variant="contained">Add</Button>

        </Grid>
      </Box>
      <TableContainer component={Paper} sx={{ color: 'black !important', mt: 5, mb: 5, height: '500px', overflowY: 'scroll' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ color: 'black !important' }}>
            <TableRow>
              <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }} >Sr.</TableCell>

              <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }} >Price</TableCell>
              <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }} >Picture</TableCell>
              <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }} >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ color: 'black !important', textAlign: 'center' }} component="th" scope="row">
                  {index + 1}
                </TableCell>

                <TableCell sx={{ color: 'black !important', textAlign: 'center' }} >{item?.name}</TableCell>
                <TableCell sx={{ color: 'black !important', textAlign: 'center' }} >{item?.price}</TableCell>
                <TableCell sx={{ color: 'black !important', textAlign: 'center' }} >

                  <Box component={'img'} src={item?.imgUrl} sx={{ width: '80px', textAlign: 'center' }} >

                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'black !important', textAlign: 'center', cursor: 'pointer' }} > <span  onClick={()=> {setOpen1(true); setModalValue(item?.price);  setTableId(item?.id)}} >Edit</span></TableCell>
                <TableCell sx={{ color: 'black !important', textAlign: 'center', cursor: 'pointer' }} > <span onClick={() => {setOpen(true)
                setTableId(item?.id)}} >Delete</span></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ManageActivitySheets