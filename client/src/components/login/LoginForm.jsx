import React from 'react';
import {Button, TextField, Checkbox, FormControlLabel} from '@mui/material';

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

const LoginForm = ({form, onChange, onSubmit, error}) => {
    const {email, password} = form;

    return(
        <form onSubmit={onSubmit}>
            <TextField
                label="EMAIL" 
                variant="outlined"
                fullWidth 
                autoFocus={(error.email|!(error.email&&error.password))?true:false}
                required
                name="email"
                sx={{ my: 1 }}
                value={email}
                onChange={onChange}
                error={error.email}
                helperText={error.email?"존재하지 않는 이메일입니다":false}
            />
            <TextField 
                label="PASSWORD" 
                variant="outlined" 
                fullWidth
                autoFocus={error.password}
                required
                name="password"
                value={password}
                onChange={onChange}
                sx={{ my: 1 }}
                error={error.password}
                helperText={error.password?"비밀번호가 일치하지 않습니다":false}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="자동 로그인"
              sx={{ my: 1 }}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
            >
                Sign In
            </Button>
        </form>
    )
}

export default LoginForm;