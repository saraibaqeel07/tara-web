import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditPost() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
  }, []);
  return (
    <div>EditPost</div>
  )
}

export default EditPost