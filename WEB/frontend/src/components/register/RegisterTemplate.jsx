import React from 'react';
import {Container, Typography} from '@mui/material';
import { Box } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import NavBar from '../common/navigation/NavBar';

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
                <NavBar />

                <Box sx={{ px: 2 }}>
                    <Box style={{
                        borderBottom: "1px solid #073113"
                    }}>
                        <StyledTypography>
                            회원가입
                        </StyledTypography>
                    </Box>
                    {/* RegisterForm */}
                    {children}
                </Box>
                
            </Container>
        </>
    );
};

export default RegisterTemplate;