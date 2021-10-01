import React from 'react';
import {Container} from '@mui/material';

import NavBar from '../../commons/navigation/NavBar';

const RegisterTemplate = ({children}) => {
    return(
        <>
            <NavBar />
            <Container component="main" maxWidth="xs" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                px: 5,
            }}>
            
                {children}
                
                
            </Container>
        </>
    );
};

export default RegisterTemplate;