import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem("userId", response.payload.userId);
                window.localStorage.setItem("image", response.payload.image);
                if (rememberMe === true) {
                  window.localStorage.setItem("rememberMe", values.email);
                } else {
                  localStorage.removeItem("rememberMe");
                }
                props.history.push("/main");
              } else {
                setFormErrorMessage("Check out your Account or Password again");
              }
            })
            .catch((err) => {
              setFormErrorMessage("Check out your Account or Password again");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
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
          <Box sx={{
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 9rem - 1px)',
          }}>
            <Typography variant="h5">로그인</Typography>
            <form onSubmit={handleSubmit} style={{ width: 500 }}>
              <TextField
                type="email"
                name="email"
                label="이메일"
                variant="outlined"
                fullWidth
                sx={{ my: 1 }}
                value={values.email}
                onChange={handleChange}
                error={!!errors.email && !!touched.email}
                helperText={
                  !!errors.email && !!touched.email ? errors.email : false
                }
                //autoFocus={!!((errors.email || !(errors.email && errors.password)))}
              />
              <TextField
                type="password"
                name="password"
                label="비밀번호"
                variant="outlined"
                fullWidth
                sx={{ my: 1 }}
                value={values.password}
                onChange={handleChange}
                error={!!errors.password && !!touched.password}
                helperText={
                  !!formErrorMessage
                    ? formErrorMessage
                    : !!errors.password && !!touched.password
                    ? errors.password
                    : false
                }
                //autoFocus={!!errors.password || !!formErrorMessage}
              />
              <FormControlLabel
                label="자동 로그인"
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={handleRememberMe}
                    checked={rememberMe}
                  />
                }
                sx={{ my: 1 }}
              />
              <a href="/reset_user" style={{ float: "right" }}>
                비밀번호를 잊으셨나요?
              </a>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                disabled={isSubmitting}
              >
                로그인
              </Button>
              계정이 없으신가요? <a href="/register"> 가입하기</a>
            </form>
          </Box>
        );
      }}
    </Formik>
  );
}
