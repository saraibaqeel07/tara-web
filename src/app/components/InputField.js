import React from 'react'
import { TextField } from '@mui/material'
import Colors from '../styles/colors'

function InputField({ register, helperText, error, multiline, rows,sx,size }) {
  return (
    <TextField
    size={size}
      fullWidth
      sx={{
        ...sx,
        background: 'transparent',
        borderRadius: "3px",
        border: "1px solid white",
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