import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import AddIcon from "@mui/icons-material/Add";
import { profileGroup } from "../../../_actions/user_actions";

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
  const [Background, setBackground] = useState(null);
  const dispatch = useDispatch();

  const groupData = useSelector((state) => state.profile.groupProfile);

  useEffect(() => {
    dispatch(profileGroup({ groupId: groupId })).then((response) => {
      if (response.payload.success) {
        if (response.payload.group.background)
          setBackground(response.payload.group.background);
      } else {
        alert("그룹정보 가져오기를 실패했습니다.");
      }
    });
  }, []);

  const onDrop = (files) => {
    let formData = new FormData();
    formData.append("image", files[0]);
    Axios.post("/api/groups/upload/background", formData, {
      withCredentials: true,
    }).then((response) => {
      if (response.data.success) {
        setBackground(response.data.backgroundId);
      } else {
        alert(response.data);
      }
    });
  };

  if (groupData === undefined) {
    return <div>그룹정보 불러오는 중</div>;
  } else {
    const { group } = groupData;

    const onEXIT = (e) => {
      props.history.push(`/groups/${groupId}`);
    };

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
          {Background && (
            <img
              src={`/api/groups/download/${Background}`}
              alt="background"
            />
          )}
          <Button
            type="button"
            sx={{ my: 1 }}
            variant="contained"
            onClick={onEXIT}
          >
            완료
          </Button>
        </form>
      </Box>
    );
  }
}
