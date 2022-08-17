import React from "react";
import { Box, Link } from "@mui/material";

export default function Footer() {
  if (window.location.pathname === "/") return null;
  return (
    <div>
      <Box
        component="footer"
        sx={{
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1rem",
        }}
      >
        <strong>
          © 2022{" "}
          <Link
            href="https://github.com/osamhack2021/Web_With_Military_temp"
            target="_blank"
            underline="hover"
          >
            With Military
          </Link>{" "}
          | powered by temp
        </strong>
      </Box>
    </div>
  );
}
