import React from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@mui/material/Button';
import { Typography } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';

const StudyGroupComponent = () => {
  return (
    <Box sx={{
      color: '#e6e1e0'
    }}
    >
      <Box sx={{
        display: 'flex',
        padding: '0.5rem 0'
      }}>
        <Avatar
          sx={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '35%'
          }}
        />
        <Box sx={{
          pl: '0.5rem'
        }}>
          <Typography style={{ fontSize: '0.9rem' }}>
            Study with me :)
          </Typography>
          <Typography style={{ fontSize: '0.75rem' }}>
            이 그룹에서 획득한 포인트 : 890P
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button 
          variant="contained"
          style={{
            backgroundColor:'#86A37C',
            width: '60px',
            height: '40px'
          }}
          size="small"
          sx={{ borderRadius: '10px' }}
        >
          <Typography style={{
            fontSize: '14px'
          }}>Start With</Typography>
        </Button>
      </Box>

      <Box sx={{
        display: 'flex',
        padding: '0.5rem 0'
      }}>
        <Avatar
          sx={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '35%'
          }}
        />
        <Box sx={{
          pl: '0.5rem'
        }}>
          <Typography style={{ fontSize: '0.9rem' }}>
            회화 스터디‍✈️
          </Typography>
          <Typography style={{ fontSize: '0.75rem' }}>
            이 그룹에서 획득한 포인트 : 782P
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button 
          variant="contained"
          style={{
            backgroundColor:'#86A37C',
            width: '60px',
            height: '40px'
          }}
          size="small"
          sx={{ borderRadius: '10px' }}
        >
          <Typography style={{
            fontSize: '14px'
          }}>Start With</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default StudyGroupComponent;