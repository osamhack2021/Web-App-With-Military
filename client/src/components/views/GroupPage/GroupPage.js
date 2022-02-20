import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Snackbar,
  Popper,
} from "@mui/material";
import { profileGroup } from "../../../_actions/user_actions";
import CardTemplete from "./Sections/CardTemplete";
import FormOverlay from "./Sections/FormOverlay";

export default function GroupPage(props) {
  const { groupId } = props.match.params;
  const dispatch = useDispatch();

  const groupData = useSelector((state) => state.profile.groupProfile);
  const [toggleFormOverlay, setToggleFormOverlay] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackVariant, setSnackVariant] = useState("success");
  const [snackMessage, setSnackMessage] = useState("");
  const [bgImage, setBgImage] = useState(null);

  const handleSnackOpen = (variant, message) => {
    setSnackVariant(variant);
    setSnackMessage(message);
    setOpenSnack(true);
  };

  const handleSnackClose = () => {
    setOpenSnack(false);
  };

  const onFormOverlayToggle = () => {
    setToggleFormOverlay((prev) => !prev);
  };

  //just for test
  //<--
  useEffect(() => {
    dispatch(profileGroup({ groupId: groupId })).then((response) => {
      if (response.payload.success) {
        //console.log(response.payload);
      } else {
        alert("그룹정보 가져오기를 실패했습니다.");
      }
    });
    Axios.get(`/api/groups/download/background`, {
      params: {
        id: groupId
      }
    })
    .then((response) => {
      console.log(response.data)
      if (response.data.success) {
        
        console.log(response.data);
        //setBgImage(response.data.backgroundId);
      } else {
        alert(response.data);
      }
    });
  }, []);
  // -->

  if (groupData === undefined) {
    return <div>그룹정보 불러오는 중</div>;
  } else {
    const { group } = groupData;
    console.log(group);
    console.log(bgImage);
    return (
      <Container
        component="main"
        maxWidth="lg"
        disableGutters //If true, the left and right padding is removed.
        sx={{
          position: "relative",
          minHeight: "calc(100vh - 9rem - 1px)",
          overflow: "hidden",
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnack}
          onClose={handleSnackClose}
          autoHideDuration={6000}
        >
          <Alert
            onClose={handleSnackClose}
            severity={snackVariant}
            sx={{ width: "100%" }}
          >
            {snackMessage}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            width: "100%",
            height: "15rem",
            position: "absolute",
            top: 0,
            zIndex: 1,
            backgroundImage: `${bgImage
              ? `url(${bgImage})`
              : `url(${group.image})`
            }`,
            backgroundRepeat : "no-repeat",
            backgroundSize : "cover",
            backgroundPosition: "center"
          }}
        />
        <Box
          sx={{
            width: "100%",
            position: "relative",
            mt: "10rem",
            zIndex: 2,
            backgroundColor: "#f1f8ff",
            borderRadius: "40px 40px 0px 0px",
          }}
        >
          {/* 템플릿 안에 내용이 들어가는 부분 */}
          <CardTemplete
            groupInfo={group}
            toggleFormOverlay={toggleFormOverlay}
            onFormOverlayToggle={onFormOverlayToggle}
            handleSnackOpen={handleSnackOpen}
          />
        </Box>
        <Avatar
          alt="Group Profile Picture"
          src={group.image}
          sx={{
            width: "9rem",
            height: "9rem",
            position: "absolute",
            zIndex: 3,
            top: "10rem",
            left: "12%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {toggleFormOverlay && (
          <FormOverlay
            groupId={group._id}
            onFormOverlayToggle={onFormOverlayToggle}
          />
        )}
      </Container>
    );
  }
}
