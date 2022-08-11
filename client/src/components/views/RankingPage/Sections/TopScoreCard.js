import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import TierText from "../../../commons/TierText";

const RankNumberBox = styled(Box)({
  width: 35,
  height: 35,
  position: "absolute",
  left: 0,
  backgroundColor: "#c4c4c4",
  color: "white",
  borderRadius: "0 0px 3px 0",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  position: "relative",
  width: "70%",
  height: 150,
  textDecoration: "none",
}));

export default function TopScoreCard({ data }) {
  return (
    <StyledCard component={Link} to={data.link} elevation={12}>
      <RankNumberBox>{data.rank}</RankNumberBox>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={data.image}
        alt="group card"
      />
      <CardContent>
        <Typography component={Box} variant="h4">
          {data.name}
        </Typography>
        <Typography
          component={Box}
          style={{
            background:
              "-webkit-linear-gradient(180deg, #66CFA3 0%, rgba(123, 235, 188, 0.8) 100%)",
            webkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          {data.tier}
        </Typography>
        <Typography component={Box}>{data.score}</Typography>
      </CardContent>
    </StyledCard>
  );
}
