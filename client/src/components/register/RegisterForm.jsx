import React from 'react';
import {Button, TextField} from '@mui/material';

//import { useSelector, useDispatdh } from 'react-redux';

/*
const AuthInput = (props) => {
    return(
    <TextField
        id = {props.name}
        label = {props.label}
        variant="outlined"
        fullWidth 
        required
    >

    </TextField>
    );
};
*/

const RegisterForm = ({form, onChange, onSubmit, error}) => {
    const {email, password, userName} = form;

    return(
        <form onSubmit={onSubmit}>
            <TextField
                label="EMAIL" 
                variant="outlined"
                fullWidth 
                autoFocus={true}
                required
                name="email"
                sx={{ my: 1 }}
                value={email}
                onChange={onChange}
                error={error.email?true:false}
                helperText={error.email?"이미 사용중인 이메일입니다":false}
            />
            <TextField 
                label="PASSWORD" 
                variant="outlined" 
                fullWidth
                required
                name="password"
                value={password}
                onChange={onChange}
                sx={{ my: 1 }}
            />
            <TextField
                label="USERNAME" 
                variant="outlined"
                fullWidth
                required
                name="userName"
                sx={{ my: 1 }}
                value={userName}
                onChange={onChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
            >
                Register
            </Button>
        </form>
    )
}

export default RegisterForm;