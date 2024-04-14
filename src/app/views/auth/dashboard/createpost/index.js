import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/");
    }
  }, [])
  return (
    <div>CreatePost</div>
  )
}

export default CreatePost