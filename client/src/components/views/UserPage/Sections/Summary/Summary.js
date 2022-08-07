import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { rankingUser } from "../../../../../_actions/user_actions";
import GrassChart from "./GrassChart";
import WeekBarChart from "./WeekBarChart";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TierBar from "../../../../commons/TierBar";
import TierText from "../../../../commons/TierText";

const GrayBox = styled(Box)({
  backgroundColor: "#E8E8E8",
  borderRadius: "1rem",
  padding: "1rem",
});

export default function Summary({ userInfo }) {
  const dispatch = useDispatch();

  const [userRankArray, setUserRankArray] = useState(0);

  useEffect(() => {
    dispatch(rankingUser()).then((response) => {
      if (response.payload.success) {
        setUserRankArray(response.payload.result);
      } else {
        alert("유저랭킹 불러오기를 실패했습니다.");
      }
    });
  }, []);

  // console.log(userInfo);
  return (
    <Box sx={{ "& > .MuiBox-root": { mb: 2 } }}>
      <GrayBox>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              mr: 1,
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            랭크
          </Typography>
          <EqualizerIcon sx={{ color: "#5E5E5E" }} />
        </Box>

        {/* Tier-Text */}
        <TierText
          point={userInfo.totalTime}
          tier={userInfo.tier}
          variant={"h5"}
        />
        {/* Tier-Bar*/}
        <TierBar point={userInfo.totalTime} />

        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{
            py: 1,
            "& > .MuiBox-root": {
              display: "flex",
            },
          }}
        >
          <Box>
            <Typography>
              유저랭킹 <strong>{userInfo.rank}</strong>위{" "}
            </Typography>
          </Box>
          <Box>
            <Typography>상위</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {(((userInfo.rank - 1) / userRankArray.length) * 100).toFixed(0)}
            </Typography>
            <Typography>%</Typography>
          </Box>
          <Box>
            <Typography>
              활동시간 : <strong>{parseInt(userInfo.totalTime / 3600)}</strong>
            </Typography>
            <Typography sx={{ mr: 1 }}>시간</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {parseInt((userInfo.totalTime % 3600) / 60)}
            </Typography>
            <Typography sx={{ mr: 1 }}>분</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {userInfo.totalTime % 60}
            </Typography>
            <Typography>초</Typography>
          </Box>
        </Stack>
      </GrayBox>

      <GrayBox>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              mr: 1,
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            연속
          </Typography>
          <DoneAllIcon sx={{ color: "#5E5E5E" }} />
        </Box>
        <Typography>
          현재
          <strong> {userInfo.curStreak}</strong>일 연속 자기개발 중! / 최고기록{" "}
          <strong>{userInfo.maxStreak}</strong>일
        </Typography>
        <GrassChart data={userInfo.history} />
      </GrayBox>

      <GrayBox>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              mr: 1,
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            일주일간 활동 그래프
          </Typography>
          <ShowChartIcon sx={{ color: "#5E5E5E" }} />
        </Box>
        <WeekBarChart data={userInfo.history} />
      </GrayBox>
    </Box>
  );
}
