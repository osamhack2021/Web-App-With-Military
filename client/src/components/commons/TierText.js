import React from "react";
import { Box, Typography } from "@mui/material";

export default function TierText({point, tier, variant}) {
  function matchColor(p) {
    if (p < 1000) {
      //언랭크
      return "#A19D94"
    } else if(1000 <= p < 5000) {
      //브론즈
      return "#DA8736"
    } else if(5000 <= p < 20000) {
      //실버
      return "#A4A4A4"
    } else if(20000 <= p < 50000) {
      //골드
      return "#ECD351"
    } else if(50000 <= p < 100000) {
      //플레티넘
      return "#70D9AD"
    } else if (100000 <= p < 200000) {
      //다이아
      return "#35D1C8"
    } else if (200000 <= p < 500000) {
      //마스터
      return "#FF4B7A"
    } else {
      //슈프림
      return "#24FFF2"
    }
  }

  return (
    <Typography
      component={Box}
      variant={variant}
      sx={{
        display: "flex",
        fontWeight: "bold",
        color: matchColor(point),
      }}
    >
      {point} / {tier}
    </Typography>
  )
}