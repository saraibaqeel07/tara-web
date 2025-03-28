import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Box, Button, Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, Typography, CircularProgress, IconButton, FormControl, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, FormHelperText } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import moment from 'moment';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


function Bundles() {
    const [imgUrls, setImgUrls] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [personName, setPersonName] = React.useState([]);


    const handleChange = (event) => {
        const selectedIds = event.target.value.map(item => item.id); // Extract IDs from selected values
        console.log("Selected IDs:", selectedIds);

        setSelectedList((prevSelectedList) => {
            console.log("Previous Selected List:", prevSelectedList);

            const isAlreadySelected = prevSelectedList.some(item => selectedIds.includes(item.id));
            console.log("Is Already Selected:", isAlreadySelected);

            let updatedList;
            if (isAlreadySelected) {
                // Remove if already selected
                updatedList = prevSelectedList.filter(item => !selectedIds.includes(item.id));
                console.log("Updated List after removal:", updatedList);
            } else {
                // Add if not already selected
                const newSelections = productsList.filter(product =>
                    selectedIds.includes(product.id) && !prevSelectedList.some(item => item.id === product.id)
                );
                updatedList = [...prevSelectedList, ...newSelections];
                console.log("New Selections:", newSelections);
                console.log("Updated List after addition:", updatedList);
            }

            return updatedList;
        });
    };


    const {
        register,
        handleSubmit,
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
    const [imageLoader, setImageLoader] = useState(false)
    const [productsList, setProductsList] = useState([])
    const [selectedList, setSelectedList] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseBox = (id) => {
        setTableId(id)
        setOpen(false);

    };
    console.log(selectedList, 'selectedList');

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
    const addProduct = async (formData) => {
        console.log(formData);



        try {

            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, formData?.cat), {
                name: getValues('productName'),
                subHeading: getValues('description'),
                // Pages: getValues('Pages'),
                AgeGroup: getValues('AgeGroup'),
                type: 'bundle',
                cat: formData?.cat,
                price: getValues('productPrice'),
                  createdAt:moment().format('YYYY-MM-DD HH:mm:ss'),
                imgUrl: imgUrls,
                products: selectedList
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

    const handleRemoveImage = (index) => {
        setImgUrls(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const editProduct = async (id) => {

        try {

            const productRef = doc(db, 'Bundles', tableId);

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

    const collections = ["Toys", "GeneralToys", "activitysheets", "products", "extra", "coloringsheets"];

    const getAllProducts = async () => {
        let allProducts = [];

        for (const colName of collections) {
            const colRef = collection(db, colName);
            const snapshot = await getDocs(colRef);

            snapshot.forEach((doc) => {
                allProducts.push({
                    id: doc.id,
                    collectionName: colName, // Add collection name for reference
                    ...doc.data(),
                });
            });
        }
        setProductsList(allProducts)
        console.log("Total products fetched:", allProducts.length);
        console.log("All products:", allProducts);
        return allProducts;
    };
    const getProducts = async () => {
        const q = query(collection(db, "Bundles"));

        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        
        setProducts(dataArray)

    }

    const handleDelete = async (id) => {
        console.log(id);
        console.log(tableId);
        let result = await deleteDoc(doc(db, "Bundles", tableId));
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
        getAllProducts()
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
            <Box component={'form'} onSubmit={handleSubmit(addProduct)} sx={{ width: "90%", margin: '0 auto', mt: 10 }}>

                <Grid container spacing={2}>
                    <Grid item xs={4} mt={2}>

                        <TextField inputProps={{ sx: { color: 'black !important' } }} sx={{ color: 'black' }} fullWidth {...register('productName', { required: true })} error={!!errors.productName}
                            helperText={errors.productName ? "Product name is required" : ""} size='small' id="outlined-basic" label="Bundle Name" variant="outlined" />
                    </Grid>


                    <Grid item xs={4} mt={2}>

                        <TextField inputProps={{ sx: { color: 'black !important' } }} fullWidth className='text-color' sx={{ color: 'black' }}  {...register('productPrice', { required: true })} error={!!errors.productPrice} type='number'
                            helperText={errors.productPrice ? "Product price is required" : ""} size='small' id="outlined-basic" label="Bundle Price" variant="outlined" />
                    </Grid>
                    {/* <Grid item xs={4} mt={2}>

            <TextField inputProps={{ sx: { color: 'black !important' } }} fullWidth className='text-color' sx={{ color: 'black' }}  {...register('Pages', { required: true })} error={!!errors.Pages} type='number'
              helperText={errors.Pages ? "Pages is required" : ""} size='small' id="outlined-basic" label="No of Pages" variant="outlined" />
          </Grid> */}
                    <Grid item xs={4} mt={2}>

                        <TextField inputProps={{ sx: { color: 'black !important' } }} fullWidth className='text-color' sx={{ color: 'black' }}  {...register('AgeGroup', { required: true })} error={!!errors.AgeGroup} type='text'
                            helperText={errors.AgeGroup ? "Age Group is required" : ""} size='small' id="outlined-basic" label="Age Group" variant="outlined" />
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth size="small" required error={!!errors.description}>
                            <InputLabel id="description-select-label">Categories</InputLabel>
                            <Select
                                labelId="description-select-label"
                                id="description-select"
                                {...register('cat', { required: 'required' })}
                                label="Category"
                                sx={{ color: 'black' }}
                            >
                                <MenuItem sx={{ color: 'black' }} value="products">Books</MenuItem>
                                <MenuItem sx={{ color: 'black' }} value="coloringsheets">Coloring Sheets </MenuItem>
                                <MenuItem sx={{ color: 'black' }} value="activitysheets">Activity Sheets </MenuItem>
                                <MenuItem sx={{ color: 'black' }} value="extra">Extra </MenuItem>
                                <MenuItem sx={{ color: 'black' }} value="Toys">Toys </MenuItem>
                                <MenuItem sx={{ color: 'black' }} value="GeneralToys">General Toys </MenuItem>
                            </Select>
                            <FormHelperText>{errors.description ? 'Description is required' : ''}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} >

                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Products</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                size='small'
                                value={selectedList.map(product => product.name)} // Show names in input
                                onChange={handleChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')} // Show names in input field
                                MenuProps={MenuProps}
                                sx={{ color: 'black' }}
                            >
                                {productsList?.map((item) => (
                                    <MenuItem key={item?.id} value={item}>
                                        <Checkbox checked={selectedList.some(product => product.id === item.id)} />
                                        <ListItemText sx={{ color: 'black' }} primary={item?.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} >

                        <TextField inputProps={{ sx: { color: 'black !important' } }} fullWidth rows={4} sx={{ color: 'black' }}  {...register('description', { required: true })} error={!!errors.subHeading}
                            helperText={errors.subHeading ? "description is required" : ""} size='small' multiline id="outlined-basic" label="Description" variant="outlined" />
                    </Grid>
                    <Grid container m={2} >
                        <Grid item xs={12} sm={5}>
                            <InputLabel sx={{ textTransform: "capitalize", textAlign: 'left', fontWeight: 700, display: 'block', mb: 2 }}>

                                Upload  Images :*
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
                                            if (!["image/"].some(type => value[i].type.startsWith(type))) {
                                                return "Only images are allowed";
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
                                                        Drag & drop or click to upload image
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: "#666" }}>
                                                        Allowed: Images (Max 10MB per file)
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

                                Images :
                            </InputLabel>}
                        </Grid>
                        <Grid container>



                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {imgUrls?.length > 0 ? (
                                    imgUrls.map((file, index) => {
                                        const isVideo = file.endsWith(".mp4") || file.endsWith(".mov") || file.endsWith(".avi") || file.endsWith(".webm");

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
                    <Button type='submit' variant="contained">Add</Button>

                </Grid>
            </Box>
            {/* <TableContainer component={Paper} sx={{ color: 'black !important', mt: 5, mb: 5, height: '500px', overflowY: 'scroll' }}>
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
                                <TableCell sx={{ color: 'black !important', textAlign: 'center', cursor: 'pointer' }} > <span onClick={() => { setOpen1(true); setModalValue(item?.price); setTableId(item?.id) }} >Edit</span></TableCell>
                                <TableCell sx={{ color: 'black !important', textAlign: 'center', cursor: 'pointer' }} > <span onClick={() => {
                                    setOpen(true)
                                    setTableId(item?.id)
                                }} >Delete</span></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </Box>
    )
}

export default Bundles