import { Box, Button, Container, TextField, Typography } from '@mui/material'
import {  Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { USER_NAME, PASSWORD } from '../../credentials/credentail';
import AlertMsg from '../Alert';

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be 8 chars long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required")
});

const Login = () => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const login = (values) => {
        if(values.email === USER_NAME && values.password === PASSWORD){
            localStorage.setItem("user", values.email);
            navigate('/');
        }
        else{
            setOpen(true);
        }
    }


    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user) navigate('/')
    },[navigate])


  return (
    <Container component='main'>
        <AlertMsg 
            open={open} 
            handleClose={() => setOpen(false)} 
            error={true} 
            title="Error Signing In" 
            msg="Username and Password does not match" 
        />
        <Box sx={{
            maxWidth:'45%',
            margin: '120px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow:'hidden'
        }}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
             
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={login}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                error={ touched.email && errors.email}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
              />
              {
                    touched.email && errors.email && 
                    <Typography fullWidth variant="p" color='crimson'> {errors.email} </Typography>
              }
              <TextField
                error={ touched.password && errors.password}
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="password"
                value={values.password}
                onChange={handleChange}
              />
              {
                    touched.password && errors.password && 
                    <Typography fullWidth variant="p" color='crimson'> {errors.password} </Typography>
              }
              
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                   
            </Box>
          )}
        </Formik>
        </Box>
    </Container>
  )
}

export default Login