import { Button, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [user, setUser] = useState(null);

    
    const navigate = useNavigate();

    useEffect( () => {
        const loggedUser = localStorage.getItem('user');
        if(!loggedUser) navigate('/login')
        setUser(loggedUser);
    },[user, navigate])

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

  return (
    <Container>
        <Box sx={{
            margin: 18,
            display: 'flex',
            alignItems:'center',
            flexDirection:'column'
        }}>
            <Typography m={3}> Welcome {user || 'User'} </Typography>
            <Button variant='contained' onClick={logout}> Sign Out </Button>
        </Box>
    </Container>   
  )
}

export default Home