import * as React from 'react';
import {Box, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Typography} from '@mui/material';
import { styled } from "@mui/material/styles";
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import defaultGroupBackground from "../../../../static/imgs/group_background.png";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: 400,
  borderRadius: '1rem'
}));

export default function GroupCardVertical({ group }) {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        height={140}
        image={group.image? group.image : defaultGroupBackground}
        alt="group card"
      />
      <CardHeader
        action={
          <IconButton aria-label="studygroup">
            <MenuBookIcon />
          </IconButton>
        }
        title={group.groupName}
        //subheader="September 14, 2016"
      />
      <CardContent>
        <Typography
          component={Box}
          style={{
            background:
            '-webkit-linear-gradient(180deg, #66CFA3 0%, rgba(123, 235, 188, 0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          플레티넘
        </Typography>
        <Box sx={{
          color: '#5E5E5E',
          display: 'flex',
        }}
        >
          <PersonIcon width="1rem" height="1rem" sx={{ mr: 0.5 }} />
          <Typography
            component={Box}
            sx={{
              fontWeight: 'bold',
              py: '2px',
            }}
          >
            {group.members.length}
            /30
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            sx={{borderRadius: '1rem'}}
          >
            {group.category}
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
}