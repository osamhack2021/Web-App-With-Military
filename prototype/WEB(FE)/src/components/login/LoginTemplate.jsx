/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Container, Grid, Link,
} from '@mui/material';
import styled from 'styled-components';
import Title from '../../static/imgs/title.svg';

const LoginTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const LoginTemplate = ({ children }) => (
  <LoginTemplateBlock>
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 5,
      }}
    >
      {/*
        <Typography component="h2" align="center" variant="h2" sx={{
            color: "primary.main",
            mb: 2
        }}>
            With
            <br/>
            Millitary
        </Typography>
      */}
      <img src={Title} alt="title" width="80%" style={{ marginBottom: '2rem' }} />

      {children}
      {/* AuthForm이 들어가는공간 */}

      <Grid container>
        <Grid item xs>
          <Link href="#">
            ID/PW 찾기
          </Link>
        </Grid>
        <Grid item>
          <Link href="/register">
            회원가입
          </Link>
        </Grid>
      </Grid>
    </Container>
  </LoginTemplateBlock>
);

export default LoginTemplate;
