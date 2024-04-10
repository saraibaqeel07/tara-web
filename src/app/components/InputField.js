import React from 'react'
import { TextField } from '@mui/material'
import Colors from '../styles/colors'

function InputField({ register, helperText, error, multiline, rows }) {
  return (
    <TextField
      fullWidth
      sx={{
        background: Colors.white,
        borderRadius: "8px",
        border: "none",
        "& fieldset": { border: "none" },
        "& .MuiInputBase-root": { color: Colors.black }
      }}
      {...register}
      helperText={helperText}
      error={error}
      multiline={multiline}
      rows={rows}
    />
  )
}

export default InputField