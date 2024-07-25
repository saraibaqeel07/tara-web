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


function Users() {

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
  const [users, setUsers] = useState([])

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


 
  const getProducts = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(dataArray)
    console.log(dataArray);
    setProducts(dataArray)

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
   

     
   
      <TableContainer component={Paper} sx={{ color: 'black !important', mt: 5, mb: 5, height: '500px', overflowY: 'scroll' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ color: 'black !important' }}>
            <TableRow>
              <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }} >Sr.</TableCell>

              <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }} >Email</TableCell>
              <TableCell sx={{ color: 'black !important', textAlign: 'center', fontWeight: 'bold' }} >Last login</TableCell>

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

                <TableCell sx={{ color: 'black !important', textAlign: 'center' }} >{item?.displayName}</TableCell>
                <TableCell sx={{ color: 'black !important', textAlign: 'center' }} >{item?.email}</TableCell>
                <TableCell sx={{ color: 'black !important', textAlign: 'center' }} >

                {item?.lastLogin}
                </TableCell>

           

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Users