import React from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const RankNumberBox = styled(Box)({
  width: 35,
  height: 35,
  position: "absolute",
  left: 0,
  backgroundColor: "#c4c4c4",
  color: "white",
  borderRadius: "3px 0px 3px 0px",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  //width: 200,
  height: 180,
  display: "flex",
  position: "relative",
  flexDirection: "column",
  alignItems: "center",
  textDecoration: "none",
}));

export default function TopScoreCard({ data }) {
  return (
    <StyledPaper component={Link} to={data.link} elevation={12}>
      <RankNumberBox>{data.rank}</RankNumberBox>
      <br />
      <Avatar src={data.image} />
      <Typography>
        <b>{data.name}</b>
      </Typography>
      <Typography>{data.tier}</Typography>
      <Typography>{data.score}</Typography>
    </StyledPaper>
  );
}
