import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Avatar, Box, Button, Container, IconButton, Snackbar, Typography, Popper } from '@mui/material';
import { profileGroup } from "../../../_actions/user_actions";
import CardTemplete from './Sections/CardTemplete';
import FormOverlay from './Sections/FormOverlay';

export default function GroupPage(props) {
  const { groupId } = props.match.params;
  const dispatch = useDispatch();
	
  const groupData = useSelector((state) => state.profile.groupProfile);
  const [toggleFormOverlay, setToggleFormOverlay] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackVariant, setSnackVariant] = useState("success");
  const [snackMessage, setSnackMessage] = useState("");

  
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  
  const handleSnackOpen = (variant, message) => {
    setSnackVariant(variant);
    setSnackMessage(message);
    setOpenSnack(true);
  };

  const handleSnackClose = () => {
    setOpenSnack(false);
  };
  
  const onFormOverlayToggle = () => {
    setToggleFormOverlay(prev => !prev);
  };

  useEffect(() => {
    dispatch(profileGroup({ groupId: groupId }))
    .then((response) => {
      if (response.payload.success) {
        //console.log(response.payload);
      } else {
        alert("그룹정보 가져오기를 실패했습니다.");
      }
    });
  }, []);
  

  if (groupData === undefined) {
    return (
        <div>그룹정보 불러오는 중</div>
    );
  } else {
    const {group} = groupData;
    return (
      <Container 
        component="main"
        maxWidth="lg"
        sx={{
          position: 'relative',
          height: '100vh',
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnack}
          onClose={handleSnackClose}
          autoHideDuration={6000}
        >
          <Alert onClose={handleSnackClose} severity={snackVariant} sx={{ width: '100%' }}>
            { snackMessage }
          </Alert>
        </Snackbar>
        <Box
          sx={{
            width: '100%',
            height: '25%',
            backgroundImage:
              'url("https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=850&q=80 850w")',
            position: 'absolute',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            width: '100%',
            height: '80%',
            position: 'absolute',
            backgroundColor: '#f1f8ff',
            zIndex: 2,
            bottom: 0,
            borderRadius: '40px 40px 0px 0px',
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
          sx={{
            width: '9rem',
            height: '9rem',
            position: 'absolute',
            zIndex: 3,
            top: '20%',
            left: '15%',
            transform: 'translate(-50%, -50%)',
          }}
          src={group.image}
        />

        { toggleFormOverlay && (
        <FormOverlay
          groupId={groupId}
          onFormOverlayToggle={onFormOverlayToggle}
        /> )}

        <Box>
          <button aria-describedby={id} type="button" onClick={handleClick}>
            Toggle Popper
          </button>
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            disablePortal
            placement="bottom-start">
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', }}>
              The content of the Popper.
            </Box>
          </Popper>
        </Box>
      </Container>
    );
  }
}
