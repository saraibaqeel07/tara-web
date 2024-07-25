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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function Reviews() {

    const { register, handleSubmit, getValues, formState: { errors }, reset } = useForm();


    const firebaseConfig = {
        apiKey: "AIzaSyCn_Ph5AlAi_wuxR0D7CBIY8_vBCNgD5r8",
        authDomain: "shinetara-86ec0.firebaseapp.com",
        projectId: "shinetara-86ec0",
        storageBucket: "shinetara-86ec0.appspot.com",
        messagingSenderId: "182521981077",
        appId: "1:182521981077:web:3cadc9d70d7fc25fab939c",
        measurementId: "G-BHYZDHJCK9"
    };

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



    const addReview = async () => {
        console.log('submit');
        if (!getValues('name') || !getValues('comment') || !getValues('comment')) {
            return
        }
        try {

            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "reviews"), {
                name: getValues('name'),
                comment: getValues('comment'),
                rating: getValues('rating'),

            });
            console.log("Document written with ID: ", docRef.id);
            if (docRef.id) {

                SuccessToaster('Review Add Succesfully')
                reset()

                getProducts()
            }
            else {
                ErrorToaster('Something Went Wrong')
            }

        } catch (error) {
            console.log(error);
        }
    };


    const getProducts = async () => {
        const q = query(collection(db, "reviews"));

        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log(dataArray);
        setProducts(dataArray)

    }

    const handleDelete = async (id) => {
        console.log(id);
        console.log(tableId);
        let result = await deleteDoc(doc(db, "reviews", tableId));
        console.log(result);
        SuccessToaster('Review Deleted Successfully')
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


            <Box component={'form'} onSubmit={handleSubmit(addReview)} sx={{ width: "80%", margin: '0 auto', mt: 10 }}>

                <Grid container spacing={4}>
                    <Grid item xs={4}>

                        <TextField fullWidth inputProps={{ sx: { color: 'black !important' } }} sx={{ color: 'black' }}  {...register('name', { required: true })} error={!!errors.question}
                            helperText={errors.name ? " name is required" : ""} size='small' id="outlined-basic" label="Name" variant="outlined" />
                    </Grid>

                    <Grid item xs={4} >

                        <TextField fullWidth inputProps={{ sx: { color: 'black !important' } }} rows={4} className='text-color' sx={{ color: 'black' }}  {...register('comment', { required: true })} error={!!errors.answer}
                            helperText={errors.comment ? "comment  is required" : ""} size='small' id="outlined-basic" label="Comment" variant="outlined" />
                    </Grid>
                    <Grid item xs={4}>
        <TextField
          fullWidth
          inputProps={{ 
            sx: { color: 'black !important' }, 
            max: 5 // this ensures that the maximum value entered cannot be more than 5
          }}
          rows={4}
          className='text-color'
          sx={{ color: 'black' }}
          type='number'
          {...register('rating', { 
            required: true, 
            max: {
              value: 5,
              message: "Rating cannot be more than 5" // custom error message
            } 
          })}
          error={!!errors.rating}
          helperText={errors.rating ? errors.rating.message : ""}
          size='small'
          id="outlined-basic"
          label="Rating"
          variant="outlined"
        />
      </Grid>

                </Grid>

                <Grid container xs={9} mt={5} justifyContent={'flex-end'} s>
                    <Button type='submit'  variant="contained">Add</Button>

                </Grid>
            </Box>
            <TableContainer component={Paper} sx={{ color: 'black !important', mt: 5, mb: 5, height: '500px', overflowY: 'scroll' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ color: 'black !important' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }} >Sr.</TableCell>

                            <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }} >Comment</TableCell>

                            <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }} >Rating</TableCell>
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
                                <TableCell sx={{ color: 'black !important', textAlign: 'center' }} >{item?.comment}</TableCell>
                                <TableCell sx={{ color: 'black !important', textAlign: 'center' }} >{item?.rating}</TableCell>
                                <TableCell sx={{ color: 'black !important', textAlign: 'center' }} >

                                    <Box component={'img'} src={item?.imgUrl} sx={{ width: '80px', textAlign: 'center' }} >

                                    </Box>
                                </TableCell>

                                <TableCell sx={{ color: 'black !important', textAlign: 'center', cursor: 'pointer' }} > <span onClick={() => {
                                    setOpen(true)
                                    setTableId(item?.id)
                                }} >Delete</span></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Reviews