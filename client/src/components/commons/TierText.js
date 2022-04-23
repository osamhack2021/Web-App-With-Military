import React from "react";
import { Box, Typography } from "@mui/material";

export default function TierText({point, tier, variant}) {
  function matchColor(p) {
    if (p < 1000) {
      //브론즈
      return "#DA8736"
    } else if(1000 <= p < 5000) {
      //실버
      return "#A4A4A4"
    } else if(5000 <= p < 15000) {
      //골드
      return "#ECD351"
    } else if(15000 <= p < 50000) {
      //플레티넘
      return "#70D9AD"
    } else if(15000 <= p < 50000) {
      //플레티넘
      return "#70D9AD"
    } else {
      //다이아
      return "#AAAAAA"
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