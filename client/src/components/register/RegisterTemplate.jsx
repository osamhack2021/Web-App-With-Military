import React from 'react';

import {Container, Typography, Grid, Link} from '@mui/material';
import styled from 'styled-components';

const RegisterTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;



const RegisterTemplate = ({children}) => {
    return(
        <RegisterTemplateBlock>
            <Container component="main" maxWidth="xs" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                px: 5,
            }}>
                {children}{/*AuthForm이 들어가는공간*/}
            </Container>
        </RegisterTemplateBlock>
    );
};

export default RegisterTemplate;