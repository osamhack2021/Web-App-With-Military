import React from 'react'
import { Box } from '@mui/material';

function Footer() {
    return (
      <Box component="footer" sx={{
        height: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:'1rem',
      }}>
         <p> © 2021 temp </p>
      </Box>
    )
}

export default Footer
