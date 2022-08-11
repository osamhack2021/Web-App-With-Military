import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Summary from "./Summary/Summary";
import Ranking from "./Ranking/Ranking";
import Post from "./Post/Post";
import Group from "./Group/Group";
import Achievement from "./Achievement/Achievement";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import TierScoreAndText from "../../../commons/TierScoreAndText";

export default function CardTemplete({ userInfo }) {
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.auth.loginUserData);
  const [tabValue, setTabValue] = useState("1");

  let history = useHistory();
  const changeBgImage = (e, user_id) => {
    history.push(`/users/${user_id}/background`);
  };

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  console.log(userInfo);

  if (loginData === undefined) {
    return <div>데이터 불러오는 중</div>;
  } else {
    return (
      <>
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 20,
          }}
        >
          {/*user 본인이 맞으면 배경수정 아이콘을 생성*/}
          {userInfo._id === loginData._id && (
            <IconButton
              type="button"
              variant="contained"
              onClick={(e) => {
                changeBgImage(e, userInfo._id);
              }}
              sx={{ mr: 2 }}
            >
              <AddPhotoAlternateOutlinedIcon
                sx={{
                  fontSize: "2rem",
                  color: "#5E5E5E",
                  my: "auto",
                }}
              />
            </IconButton>
          )}
        </Box>

        <Box sx={{ ml: "22%", mr: "30%" }}>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {userInfo.name}
          </Typography>

          <TierScoreAndText
            point={userInfo.totalTime}
            tier={userInfo.tier}
            rank={userInfo.rank}
            variant={"h6"}
          />

          <Typography>가입일 : {userInfo.created.substr(0, 10)}</Typography>
        </Box>

        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="개요" value="1" />
              <Tab label="랭킹" value="2" />
              <Tab label="게시글" value="3" />
              <Tab label="그룹" value="4" />
              <Tab label="업적" value="5" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Summary userInfo={userInfo} />
          </TabPanel>

          <TabPanel value="2">
            <Ranking />
          </TabPanel>
          <TabPanel value="3">
            <Post />
          </TabPanel>

          <TabPanel value="4">
            <Group />
          </TabPanel>

          <TabPanel value="5">
            <Achievement />
          </TabPanel>
        </TabContext>
      </>
    );
  }
}
