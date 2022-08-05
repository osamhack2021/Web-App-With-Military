import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  profileUser,
  rankingUser,
  rankingGroup,
} from "../../../_actions/user_actions";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import defaultUserProfile from "../../../static/imgs/user_profile.png";
import TierText from "../../commons/TierText";
import TierBar from "../../commons/TierBar";

const GrayBox = styled(Box)({
  backgroundColor: "#E8E8E8",
  borderRadius: "1rem",
  padding: "1rem",
});

export default function MainPage() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const userId = localStorage.getItem("userId");

  const [userRankArray, setUserRankArray] = useState(0);
  const [groupRankArray, setGroupRankArray] = useState(0);

  const findUserIndex = (userArray, user_id) => {
    return userArray.findIndex((user) => user._id === user_id);
  };

  const findUser = (userArray, user_id) => {
    return userArray.find((user) => user._id === user_id);
  };

  useEffect(() => {
    dispatch(profileUser({ userId: userId })).then((response) => {
      if (response.payload.success) {
        //console.log(response.payload);
      } else {
        alert("로그인이 필요한 서비스 입니다.");
      }
    });
    dispatch(rankingUser()).then((response) => {
      if (response.payload.success) {
        setUserRankArray(response.payload.result);
      } else {
        alert("유저랭킹 불러오기를 실패했습니다.");
      }
    });
    dispatch(rankingGroup()).then((response) => {
      if (response.payload.success) {
        setGroupRankArray(response.payload.result);
      } else {
        alert("그룹랭킹 불러오기를 실패했습니다.");
      }
    });
  }, []);

  if (userProfile === undefined || !userRankArray || !groupRankArray) {
    return <div>데이터 불러오는 중</div>;
  } else {
    const myRank = findUserIndex(userRankArray, userId) + 1;
    const myData = findUser(userRankArray, userId);

    const userInfo = userProfile.user;
    console.log(userInfo);
    const myElapsedDays = Math.floor(
      (new Date().getTime() - new Date(userInfo.created).getTime()) /
        1000 /
        60 /
        60 /
        24
    );
    return (
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          //NavBar와 Footer의 높이를 뺀 값
          //1px 더 빼서 화면 스크롤 방지
          minHeight: "calc(100vh - 9rem - 1px)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", my: 4 }}>
          <Avatar
            size="large"
            src={userInfo.image ? userInfo.image : defaultUserProfile}
            sx={{
              width: "3rem",
              height: "3rem",
              mr: 2,
            }}
          />
          <Typography variant="h5">
            안녕하세요, {userInfo.name}님! 공부를 시작한지 벌써 {myElapsedDays}
            일이 지났어요
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={3}>
            <GrayBox sx={{ display: "flex" }}>
              <Typography sx={{ mr: 1 }}>남은 군생활</Typography>
              <HomeIcon sx={{ color: "#5E5E5E" }} />
            </GrayBox>
          </Grid>

          <Grid item xs={9}>
            <GrayBox>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ mr: 1 }}>내 랭킹</Typography>
                <EqualizerIcon sx={{ color: "#5E5E5E" }} />
              </Box>
              {/* Tier-Text */}
              <TierText
                point={userInfo.totalTime}
                tier={userInfo.tier}
                variant={"h6"}
              />
              {/* Tier-Bar*/}
              <TierBar point={userInfo.totalTime} />
              <Stack
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
                sx={{
                  py: 1,
                  textAlign: "center",
                  "& > .MuiBox-root": {
                    display: "flex",
                  },
                }}
              >
                <Box>
                  <Typography>
                    <strong>{myRank}</strong>위
                  </Typography>
                  <Typography></Typography>
                </Box>
                <Box>
                  <Typography>
                    상위&nbsp;
                    <strong>
                      {(((myRank - 1) / userRankArray.length) * 100).toFixed(0)}
                    </strong>
                    %
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    <strong>{parseInt(myData.totalTime / 3600)}</strong>
                    시간&nbsp;
                  </Typography>
                  <Typography>
                    <strong>{parseInt((myData.totalTime % 3600) / 60)}</strong>
                    분&nbsp;
                  </Typography>
                  <Typography>
                    <strong>{myData.totalTime % 60}</strong>
                    초&nbsp;
                  </Typography>
                </Box>
              </Stack>
            </GrayBox>
          </Grid>

          <Grid item xs={3}>
            <GrayBox>2월 활동량</GrayBox>
          </Grid>

          <Grid item xs={9}>
            <GrayBox>일주일간 활동 그래프</GrayBox>
          </Grid>

          <Grid item xs={3}>
            <GrayBox>일주일간 활동한 카테고리</GrayBox>
          </Grid>

          <Grid item xs={3}>
            <GrayBox>WM와 함께한 시간</GrayBox>
          </Grid>

          <Grid item xs={3}>
            <GrayBox>인기 태그</GrayBox>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
