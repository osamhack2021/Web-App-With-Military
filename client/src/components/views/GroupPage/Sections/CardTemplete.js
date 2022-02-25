import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { loadBoard, profileGroup } from "../../../../_actions/user_actions";
import { Box, Button, IconButton, Paper, Popper, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Summary from "./Summary/Summary";
import Ranking from "./Ranking/Ranking";
import Achievement from "./Achievement/Achievement";
import CreateIcon from "@mui/icons-material/Create";
import PanToolIcon from "@mui/icons-material/PanTool";
import PersonIcon from "@mui/icons-material/Person";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

export default function CardTemplete({
  groupInfo,
  toggleFormOverlay,
  onFormOverlayToggle,
  handleSnackOpen,
}) {
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.auth.loginUserData);
  const [boardList, setBoardList] = useState([]);
  const [refreshComment, setRefreshComment] = useState(false);
  const [waitingUsers, setWaitingUsers] = useState([]);

  let history = useHistory();
  const changeBgImage = (e, group_id) => {
    history.push(`/groups/${group_id}/background`);
  };
  
  //popper code
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "waiting-list-popper" : undefined;
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  //tab code
  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const toggleRefreshComment = () => {
    setRefreshComment((prev) => !prev);
  };

  const updateBoard = (group_id) => {
    dispatch(loadBoard({ groupId: group_id })).then((response) => {
      if (response.payload.success) {
        setBoardList(response.payload.boards);
        toggleRefreshComment();
      } else {
        alert("게시글 불러오기를 실패했습니다.");
      }
    });
  };
  
  const updateGroup = (group_id) => {
    dispatch(profileGroup({ groupId: group_id }))
    .then((response) => {
      if (response.payload.success) {
        //console.log(response.payload);
      } else {
        alert("Fail to dispatch group data.");
      }
    });
  }

  const join = () => {
    Axios.post("/api/groups/join", { groupId: groupInfo._id }).then(
      (response) => {
        if (response.data.success) {
          handleSnackOpen("success", response.data.message);
          updateGroup(groupInfo._id);
        } else {
          handleSnackOpen("error", response.data.message);
        }
      }
    );
  };

  const approve = (event, user_id) => {
    Axios.post("/api/groups/approve", {
      groupId: groupInfo._id,
      userId: user_id,
    }).then((response) => {
      if (response.data.success) {
        handleSnackOpen("success", response.data.message);
        updateGroup(groupInfo._id);
      } else {
        handleSnackOpen("error", response.data.message);
      }
    });
  };
  
  const getUser = (user_id) => {
    return Axios.post("/api/users/profile", { userId: user_id })
  };

  const getUserName = (userIdArray) => {
    const userArray = userIdArray.map((userId, index) =>
      new Promise((resolve, reject) => {
        const userData = getUser(userId);
        resolve(userData);
      })
    );
    Promise.all(userArray).then((users) => {
      const userNameArray = users.map((user) => {
        return { name: user.data.user.name, id: user.data.user._id };
      });
      setWaitingUsers(userNameArray);
    })
  }
  
  useEffect(() => {
    const fetchedList = groupInfo.waiting.slice();
    getUserName(fetchedList);
  }, [groupInfo]);

  useEffect(() => {
    updateBoard(groupInfo._id);
  }, [toggleFormOverlay]);

  if (loginData === undefined) {
    return <div>데이터 불러오는 중</div>;
  } else {
    return (
      <>
        {/*기능 버튼*/}
        <Box sx={{
          position: "absolute",
          top: 10,
          right: 20
        }}>
          {/*admins에 본인이 포함되면 배경수정 아이콘을 생성*/}
          {groupInfo.admins.indexOf(loginData._id) !== -1 && (
            <IconButton
              type="button"
              variant="contained"
              onClick={(e) => { changeBgImage(e, groupInfo._id) }}
              sx={{ mr: 2 }}
            >
              <AddPhotoAlternateOutlinedIcon sx={{
                fontSize: "2rem",
                color: "#5E5E5E",
                my: "auto"
              }} />
            </IconButton>
          )}
          <IconButton onClick={onFormOverlayToggle}>
            <CreateIcon sx={{
              fontSize: "2rem",
              color: "#5E5E5E",
              my: "auto"
            }} />
          </IconButton>  
          {/*admins에 본인이 포함되지않으면 가입신청 버튼을 생성*/}
          {groupInfo.admins.indexOf(loginData._id) === -1 && (
            <IconButton onClick={join}>
              <PanToolIcon sx={{
                fontSize: "2rem",
                color: "#5E5E5E",
                my: "auto"
              }}/>
            </IconButton>
          )}
        </Box>
  
        {/*그룹 이름과 멤버인원수, 대기인원*/}
        <Box sx={{ ml: "20%", mr: "30%", }}>
          <Typography sx={{
            fontSize: "2rem",
            fontWeight: "bold",
          }}>
            {groupInfo.groupName}
          </Typography>

          <Box sx={{
            color: "#5E5E5E",
            display: "flex",
          }}>
            <PersonIcon sx={{ mr: 0.5 }} />
            <Typography sx={{
              fontWeight: "bold",
              py: "2px",
            }}>
              {groupInfo.members.length}
              /30
            </Typography>

            <Typography sx={{
              ml: 2,
              py: "2px",
            }}>
              대기인원: <strong>{groupInfo.waiting.length}</strong>명
            </Typography>
            {/* waitingList가 없거나 admins에 자신이 없으면 승인영역을 생성하지 않음*/}
            {groupInfo.waiting &&
              groupInfo.admins.indexOf(loginData._id) !== -1 && (
                <Box sx={{ display: "flex", ml: 2 }}>
                  <Button
                    aria-describedby={id}
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleClick}
                    sx={{ ml: 2 }}
                  >
                    대기목록
                  </Button>
                  <Popper id={id} open={open} anchorEl={anchorEl} disablePortal>
                    <Paper sx={{
                      width: 150,
                      p: 2,
                      textAlign: "center",
                    }}>
                      {waitingUsers.map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            my: 1,
                          }}
                        >
                          <Typography sx={{ mr: 2 }}>{item.name}</Typography>
                          <button
                            type="button"
                            onClick={(e) => {
                              approve(e, item.id);
                            }}
                          >
                            승인
                          </button>
                        </Box>
                      ))}
                    </Paper>
                  </Popper>
                </Box>
              )}
          </Box>
        </Box>
        
        {/*탭 페이지*/}
        <Box sx={{ mx: 6, p: 2 }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
                sx={{width: "30%"}}
              >
                <Tab label="개요" value="1" />
                <Tab label="랭킹" value="2" />
                <Tab label="업적" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Summary
                groupInfo={groupInfo}
                boardList={boardList}
                refreshComment={refreshComment}
                updateBoard={updateBoard}
              />
            </TabPanel>
            <TabPanel value="2">
              <Ranking groupInfo={groupInfo}/>
            </TabPanel>
            <TabPanel value="3">
              <Achievement />
            </TabPanel>
          </TabContext>
        </Box>
      </>
    );
  }
}