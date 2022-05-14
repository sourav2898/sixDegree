import { Alert, AlertTitle, Backdrop, Stack } from '@mui/material'
import React from 'react'

const AlertMsg = ({error = false, title="", msg="", open, handleClose}) => {
  return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        >
         <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
            <AlertTitle>{title}</AlertTitle>
            {msg}
        </Alert>
    </Backdrop>
  )
}

export default AlertMsg