import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import AddIcon from "@mui/icons-material/Add";
import { profileUser } from "../../../_actions/user_actions";

import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";

export default function EditUserBackgroundPage(props) {
  const { userId } = props.match.params;
  const dispatch = useDispatch();
  const [bgImageId, setBgImageId] = useState(null);

  const userData = useSelector((state) => state.profile.userProfile);
  
  const getBgImageId = (user_id) => {
    dispatch(profileUser({ userId: user_id })).then((response) => {
      if (response.payload.success) {
        console.log(response.payload.user.background);
        const bgImageId = response.payload.user.background;
        setBgImageId(bgImageId);
      } else {
        alert("유저정보 가져오기 실패");
      }
    });
  }
  
  const onDrop = (files) => {
    let formData = new FormData();
    formData.append("image", files[0]);
    Axios.post("/api/users/upload/background", formData, {
      withCredentials: true,
    }).then((response) => {
      if (response.data.success) {
        setBgImageId(response.data.backgroundId);
      } else {
        alert("배경이미지 업로드 실패");
      }
    });
  };
  
  useEffect(() => {
    getBgImageId(userId);
  }, []);

  if (userData === undefined) {
    return <div>유저정보 불러오는 중</div>;
  } else {
    const { user } = userData;

    const onExit = (e) => {
      props.history.push(`/users/${userId}`);
    };

    return (
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 9rem - 1px)",
        }}
      >
        <Typography variant="h5">유저 배경사진 변경</Typography>
        <form style={{ width: 500 }}>
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
        </form>
        <Typography variant="h5"> &#60;미리보기&#62;</Typography>
        {bgImageId && (
          <>
            <Box sx={{
              width: "100%",
              height: "15rem",
              backgroundImage:
                `url(/api/users/download/background/${bgImageId})`,
              backgroundRepeat : "no-repeat",
              backgroundSize : "cover",
              backgroundPosition: "center"
            }} />
            <Box sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}>
              <Button
                type="submit"
                sx={{ my: 1 }}
                variant="contained"
                onClick={onExit}
              >
                완료
              </Button>
            </Box>
          </>
        )}
      </Container>
    );
  }
}
