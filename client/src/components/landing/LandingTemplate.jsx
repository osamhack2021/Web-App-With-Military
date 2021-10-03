import React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Box, Button, Typography, Grid, Link } from '@mui/material';
import { ReactComponent as WhiteLogo } from '../../static/icons/logo_white.svg';
import { ReactComponent as Tide } from '../../static/icons/tide.svg';

const LandingTemplate = ({children}) => {
    const StyledBox = styled(Box)({
        background: 'linear-gradient(252.44deg, #148534 0%, #BDDEC6 100%)',
        width: '100vw',
        height: '100vh',
        color: "white",
        position: "relative"
      });
    return(
        <StyledBox>
            <Box sx={{display:'flex', pt: "1rem", pl: "1rem", mb:"25vh"}}>
                <WhiteLogo width='3rem' height='3rem' />
                <Box sx={{pt: 1.3, ml: 2}}>
                    <Typography variant="h5"
                        style={{
                            whiteSpace: "nowrap",
                            fontWeight: 'bold'
                    }}>
                        위드 밀리터리
                    </Typography>
                </Box>
            </Box>
            <Container component="main" >
                <Box>
                    <Typography variant="h3"
                        style={{
                            whiteSpace: "nowrap",
                            fontWeight: 'bold'
                    }}>
                        전 장병이 함께 만드는 스터디 그룹,
                    </Typography>
                </Box>

                <Box sx={{display: 'flex'}}>
                    <Box sx={{ mr: 2 }}>
                        <Typography variant="h2"
                            style={{
                                whiteSpace: "nowrap",
                                fontWeight: 'bold'
                            }}>
                            위드 밀리터리
                        </Typography>
                    </Box>
                    <WhiteLogo width='5rem' height='5rem' />
                </Box>
                
                <Box sx={{display: 'flex', py: 1}}>
                    <Link href="/login">
                        <Button
                            variant="contained"
                            sx={{ mr: 1}}
                            style={{
                                borderRadius: "2rem",
                                backgroundColor:'white',
                                width: '11.5rem',
                                height: '4rem'
                            }}
                        >
                            <Typography variant="h5"
                                style={{
                                    color: '#1c893b',
                            }}>
                                회원가입</Typography>
                        </Button>
                    </Link>
                    
                    <Link href="/register">
                        <Button variant="contained"
                            style={{
                                background:'none',
                                borderRadius: "2rem",
                                border: '2px solid #FFFFFF',
                                width: '11.5rem',
                                height: '4rem'
                            }}
                        >
                            <Typography variant="h5">회원가입</Typography>
                        </Button>
                    </Link>
                </Box>
            
                
            </Container>
            <Box sx={{
                position: 'absolute',
                bottom: '0px',
                left: '0px',
            }}>
                <Tide width= '100%' />
            </Box>
            
        </StyledBox>
    );
};

export default LandingTemplate;