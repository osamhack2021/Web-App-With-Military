import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';


const GrayBox = styled(Box)({
  backgroundColor: '#E8E8E8',
  borderRadius: '2.5rem',
  padding: '1rem',
})

export default function Ranking ({
  boardList,
  onClickEdit,
  removeBoardOnConfirm,
  editMode,
  toggleEditMode,
  refreshComment,
}) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  
  return (
    <GrayBox sx={{
      m: 2,
      width: '100%',
    }}>
      업적
    </GrayBox>
  );
}