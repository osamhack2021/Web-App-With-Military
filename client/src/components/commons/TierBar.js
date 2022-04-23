import React from "react";
import { Box } from "@mui/material";

export default function TierBar({point}) {
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
    } else if(50000 <= p < 150000) {
      //플레티넘
      return "#70D9AD"
    } else {
      //다이아
      return "#AAAAAA"
    }
  }

  function calcPointPercent(p) {
    if (p < 1000) {
      return p/1000 * 100
    } else if(1000 <= p < 5000) {
      return p/5000 * 100
    } else if(5000 <= p < 15000) {
      return p/15000 * 100
    } else if(15000 <= p < 50000) {
      return p/50000 * 100
    } else if(50000 <= p < 150000) {
      return p/150000 * 100
    } else {
      return 0
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: "#C4C4C4",
        borderRadius: "0.4rem",
        height: "2rem",
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: matchColor(point),
          textAlign: "center",
          color: "white",
          fontSize: "1.2rem",
          fontWeight: "bold",
          borderRadius: "0.4rem",
          padding: "0.1rem 0",
          height: "2rem",
          width: `${ calcPointPercent(point) }%`,
        }}
      >
        {point}
      </Box>
    </Box>
  )
}