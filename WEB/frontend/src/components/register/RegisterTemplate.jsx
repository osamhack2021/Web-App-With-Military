import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from '../common/NavBar';

const StyledTypography = styled(Typography)({
    color: "#14571b",
    fontWeight: "bold"
});

const RegisterTemplate = ({children}) => {
    return(
        <>
            <Container component="main" maxWidth="xs" sx={{
                //display: 'flex',
                //flexDirection: 'column',
                p: 0
            }}>
                <NavBar bgColor={"secondary"} />
                <Box sx={{ px: 2,  }}>
                    <Box sx={{
                        py: 1,
                        borderBottom: "1px solid #073113"
                    }}>
                        <StyledTypography>
                            회원가입
                        </StyledTypography>
                    </Box>
                    {/* ↓ RegisterForm */}
                    {children}
                    
                </Box>
                
            </Container>
        </>
    );
};

export default RegisterTemplate;