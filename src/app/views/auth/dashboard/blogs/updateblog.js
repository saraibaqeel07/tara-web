import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from '@ckeditor/ckeditor5-react';



function UpdateBlog() {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
        reset
    } = useForm();
    const { state } = useLocation()
    console.log(state);


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
    const [disabled, setDisabled] = useState(false)

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
    const [image2, setImage2] = useState(null);
    const [products, setProducts] = useState([])
    const [tableId, setTableId] = useState()
    const [imgUrl, setImgUrl] = useState()

    const [imgUrl2, setImgUrl2] = useState()
    const [open1, setOpen1] = useState(false);
    const [editorData, setEditorData] = useState("");

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
        console.log(data); // You can see the editor's content here.
    };

    const handleClickOpenModal = () => {
        setOpen1(true);
    };

    const handleClose = () => {
        setOpen1(false);
    };
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setDisabled(true)

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
                            setDisabled(false)
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
            console.log(editorData);


            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "blogs"), {
                title: getValues('productName'),

                imgUrl: imgUrl,
                html: editorData
            });
            console.log("\dasdasd ", {
                title: getValues('productName'),

                imgUrl: imgUrl,
                html: editorData
            });
            if (docRef.id) {

                SuccessToaster('Blog Added Successfully')
                setEditorData('')
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

            const productRef = doc(db, 'blogs', state?.id);

            // Update the product fields
            await updateDoc(productRef, {
                title: getValues('productName'),

                imgUrl: imgUrl,
                html: editorData
            })
                .then(() => {
                    console.log("successfully updated!");
                    SuccessToaster('Blog Updated Successfully')
                    navigate('/admin/blogs')

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
        const q = query(collection(db, "blogs"));

        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        
        setProducts(dataArray)

    }

    const handleDelete = async (id) => {
        console.log(id);
        console.log(tableId);
        let result = await deleteDoc(doc(db, "blogs", state?.id));
        console.log(result);
        SuccessToaster('blog Deleted Successfully')
        setOpen(false)
        getProducts()

    }
    useEffect(() => {

        if (state) {

            setEditorData(state?.html)
            setValue('productName', state?.title)
            setImgUrl(state?.imgUrl)
            setImage(state?.imgUrl)
            setDisabled(false)
        }

    }, [])


    function uploadAdapter(loader) {
        return {
            upload: () => {
                return loader.file.then(file => {
                    return new Promise((resolve, reject) => {
                        const formData = new FormData();
                        formData.append("image", file);

                        // Call handleImageChange2 to upload the image to Firebase Storage
                        const imageRef = ref(storage, `images/${file.name}`);

                        uploadBytes(imageRef, file)
                            .then((snapshot) => {
                                console.log("Uploaded a blob or file!");
                                getDownloadURL(snapshot.ref)
                                    .then((url) => {
                                        console.log("Download URL:", url);
                                        setDisabled(false)
                                        // Return the download URL as part of the upload process
                                        resolve({
                                            default: url // The key 'default' is required by CKEditor for image URLs
                                        });
                                    })
                                    .catch((error) => {
                                        console.error("Error getting download URL:", error);
                                        reject(error);
                                    });
                            })
                            .catch((error) => {
                                console.error("Error uploading file:", error);
                                reject(error);
                            });
                    });
                });
            }
        };
    }

    function uploadPlugin(editor) {
        setDisabled(true)
        editor.plugins.get("FileRepository").createUploadAdapter = loader => {
            return uploadAdapter(loader);
        };
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

            <Dialog open={open1} onClose={handleClose}>
                <DialogTitle sx={{ width: '500px', color: 'black' }} >{"Edit Price"}</DialogTitle>
                <Box sx={{ display: 'flex', p: '20px' }}>
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
                    <Button onClick={() => editProduct()} color="primary" autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            <Box component={'form'} onSubmit={handleSubmit(editProduct)} sx={{ width: "80%", margin: '0 auto', mt: 10 }}>

                <Grid container>
                    <Grid item xs={6} display={'flex'} alignItems={'center'}>

                        <TextField inputProps={{ sx: { color: 'black !important' } }} sx={{ color: 'black' }}  {...register('productName', { required: true })} error={!!errors.productName}
                            helperText={errors.productName ? "Title is required" : ""} size='small' id="outlined-basic" label="Title" variant="outlined" />
                    </Grid>

                    <Grid item xs={12}>

                        <Grid container justifyContent={'space-between'}>
                            <Grid item xs={12} mt={5}>

                                <TextField size='small' type='file' onChange={handleImageChange} required={true} />
                            </Grid>
                            <Grid item xs={12} mt={5}>

                                {image && (
                                    <div>
                                        <h4>Image Preview:</h4>
                                        <img src={image} id='myimg' alt="Preview" style={{ width: '200px', height: '200px' }} />
                                    </div>
                                )}
                            </Grid>

                        </Grid>
                    </Grid>



                </Grid>
                <div>
                    <h2>Blog Editor</h2>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            extraPlugins: [uploadPlugin],
                            image: {
                                toolbar: [
                                    "imageStyle:alignLeft",
                                    "imageStyle:alignCenter",
                                    "imageStyle:alignRight",
                                    "|",
                                    "resizeImage",


                                ],
                                styles: ["alignLeft", "alignCenter", "alignRight"], // Ensure alignment options
                            },
                            alignment: {
                                options: ['left', 'right', 'center', 'justify']
                            },
                            htmlSupport: {
                                allow: [
                                    {
                                        name: /.*/,
                                        attributes: true,
                                        classes: true,
                                        styles: true
                                    }
                                ]
                            },
                        }}

                        data={editorData}
                        onChange={handleEditorChange}
                    />

                </div>
                <Grid container xs={9} mt={5} justifyContent={'flex-end'} >
                    <Button type='submit' variant="contained" disabled={disabled}>Update</Button>

                </Grid>
            </Box>

        </Box>
    )
}

export default UpdateBlog