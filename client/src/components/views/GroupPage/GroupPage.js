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
import defaultGroupProfile from "../../../static/imgs/group_profile.png";
import defaultGroupBackground from "../../../static/imgs/group_background.png";

export default function GroupPage(props) {
  const { groupId } = props.match.params;
  const dispatch = useDispatch();

  const groupData = useSelector((state) => state.profile.groupProfile);
  const [toggleFormOverlay, setToggleFormOverlay] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackVariant, setSnackVariant] = useState("success");
  const [snackMessage, setSnackMessage] = useState("");
  const [bgImageId, setBgImageId] = useState(null);

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
  
  const getBgImageId = (group_id) => {
    dispatch(profileGroup({ groupId: group_id })).then((response) => {
      if (response.payload.success) {
        const bgImageId = response.payload.group.background;
        setBgImageId(bgImageId);
      } else {
        alert("그룹정보 가져오기 실패");
      }
    });
  }
  //just for test
  //<--
  useEffect(() => {
    getBgImageId(groupId);
  }, []);
  // -->

  if (groupData === undefined) {
    return <div>그룹정보 불러오는 중</div>;
  } else {
    const { group } = groupData;
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
            backgroundImage:
            `${ bgImageId
              ? `url(/api/groups/download/background/${bgImageId})`
              : `url(${defaultGroupBackground})`
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
            mt: "13rem",
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
          src={group.image ? group.image : defaultGroupProfile}
          sx={{
            width: "9rem",
            height: "9rem",
            position: "absolute",
            zIndex: 3,
            top: "13rem",
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
