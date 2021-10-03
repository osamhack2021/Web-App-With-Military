import React from 'react';
import {Box, Container, Typography, Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from '../common/NavBar';

const StyledTypography = styled(Typography)({
    color: "#14571b",
    fontWeight: "bold"
});

const StudyGroupTemplate = ({children}) => {
    return(
        <>
            <Container component="main" maxWidth="xs" sx={{
                //display: 'flex',
                //flexDirection: 'column',
                p: 0
            }}>
                <NavBar bgColor={"none"} />
            </Container>
        </>
    );
};

export default StudyGroupTemplate;