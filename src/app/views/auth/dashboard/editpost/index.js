import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function EditPost() {
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token,'tokentokentokentoken');
      if (token) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
      
       
        // ...
      } else {
        window.location.href="/login";
      }
 
 
  }, [])
  return (
    <div>EditPost</div>
  )
}

export default EditPost