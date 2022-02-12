import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { Button, TextField, Typography } from '@mui/material';

export default function RegisterPage(props) {
  const dispatch = useDispatch();
  
  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('User Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        let dataToSubmit = {
          email: values.email,
          password: values.password,
          name: values.name,
          image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
        };
        try {
          dispatch(registerUser(dataToSubmit)).then(response => {
            console.log(response);
            if (response.payload.success) {
              props.history.push("/login");
            } else {
               console.log(response.payload.err.errmsg);
            }
          })
          setSubmitting(false);
        } catch(e) {
          console.log(e);
        }
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleSubmit,
        } = props;

        console.log(errors);

        return (
          <div className="app">
            <Typography variant="h5">Sign up</Typography>
            <form onSubmit={handleSubmit} style={{ width: 500 }}>
              <TextField
                type="text"
                name="name"
                label="User Name"
                variant="outlined"
                placeholder="Enter your User Name"
                fullWidth
                required
                sx={{ my: 1 }}
                value={values.name}
                onChange={handleChange}
                error={!!errors.name && !!touched.name}
                helperText={!!errors.name && !!touched.name ? !!errors.name : false}
              />
              <TextField
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                placeholder="Enter your email"
                fullWidth
                required
                sx={{ my: 1 }}
                value={values.email}
                onChange={handleChange}
                size="normal"
                error={!!errors.email && !!touched.email}
                helperText={!!errors.email && !!touched.email ? errors.email : false}
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                placeholder="Enter your password"
                fullWidth
                required
                sx={{ my: 1 }}
                value={values.password}
                onChange={handleChange}
                error={!!errors.password && !!touched.password}
                helperText={!!errors.password && !!touched.password ? errors.password : false}
                //autoFocus={!!errors.password || !!formErrorMessage}
              />
              <TextField
                type="password"
                name="confirmPassword"
                label="Comfirm"
                variant="outlined"
                placeholder="Confirm your password"
                fullWidth
                required
                sx={{ my: 1 }}
                value={values.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword && !!touched.confirmPassword}
                helperText={!!errors.confirmPassword && !!touched.confirmPassword? errors.confirmPassword : false}
                //autoFocus={!!errors.password || !!formErrorMessage}
              /> 
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                disabled={isSubmitting}
              >
                회원가입
              </Button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};
