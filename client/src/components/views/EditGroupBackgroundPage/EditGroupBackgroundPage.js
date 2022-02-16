import Axios from "axios";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function EditGroupBackgroundGroup(props) {
  const { groupId } = props.match.params;
  const [Background, setBackground] = useState();

  const onDrop = (files) => {
    setBackground(files[0]);
    console.log(files[0]);
  };

  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        let formData = new FormData();
        formData.append("image", Background);
        setTimeout(() => {
          Axios.post("/api/groups/background", formData, {
            withCredentials: true,
          }).then((response) => {
            if (response.data.success) {
              props.history.push(`/groups/${groupId}`);
            } else {
              alert(response.data);
            }
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
        return (
          <Box
            sx={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "calc(100vh - 9rem - 1px)",
            }}
          >
            <Typography variant="h5">그룹 배경사진 변경</Typography>
            <form onSubmit={handleSubmit} style={{ width: 500 }}>
              <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    style={{
                      height: "240px",
                      border: "1px solid lightgray",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <AddIcon style={{ fontSize: "4rem" }} />
                  </div>
                )}
              </Dropzone>
              <Button
                type="submit"
                sx={{ my: 1 }}
                fullWidth
                variant="contained"
                disabled={isSubmitting}
              >
                완료
              </Button>
            </form>
          </Box>
        );
      }}
    </Formik>
  );
}
