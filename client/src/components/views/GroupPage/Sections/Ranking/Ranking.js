import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ScoreTable from "./ScoreTable";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const GrayBox = styled(Box)({
  backgroundColor: '#E8E8E8',
  borderRadius: '2.5rem',
  padding: '1rem',
})

export default function Ranking ({
  groupInfo
}) {
  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  
  return (
    <Grid container spacing={4}>
      <Grid item xs={5} sx={{ "& > .MuiBox-root": { mb: 4 } }}>
        <GrayBox sx={{display: 'flex'}}>
          <Typography sx={{
            mr: 1,
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}>
            그룹 전체 랭킹
          </Typography>
          <EqualizerIcon sx={{color: '#5E5E5E'}}/>
        </GrayBox>
        
        <GrayBox sx={{display: 'flex' }}>
          <Typography sx={{
            mr: 1,
            fontSize: '1.2rem', 
            fontWeight: 'bold',
          }}>
            그룹 외국어 랭킹
          </Typography>
          <MenuBookIcon sx={{color: '#5E5E5E'}}/>
        </GrayBox>
      </Grid>
        
      <Grid item xs={7}>
        <GrayBox>
          <Box sx={{display: 'flex'}}>
            <Typography sx={{
              mr: 1,
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}>
              멤버 랭킹
            </Typography>
            <EqualizerIcon sx={{color: '#5E5E5E'}}/>
          </Box>
          {/*ranking tab*/}
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
                //indicatorColor="secondary"
                //textColor="inherit"
                variant="fullWidth"
                aria-label="day week month ranking"
              >
                <Tab label="일간 랭킹" value="1" />
                <Tab label="주간 랭킹" value="2" />
                <Tab label="월별 랭킹" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ScoreTable
                rows={ groupInfo.members }/>
            </TabPanel>
            <TabPanel value="2">
              2
            </TabPanel>
            <TabPanel value="3">
              3
            </TabPanel>
          </TabContext>
        </GrayBox>
      </Grid>

    </Grid>
  );
}