import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, 
  Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function GroupCardHorizon({group}) {
  return (
    <Card sx={{ display: 'flex', width: '100%', height: 150 }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={group.image}
        alt="group card"
      />
      <CardContent>
        <Typography component={Box} variant="h5">
          {group.groupName}
        </Typography>
        <Typography
          component={Box}
          style={{
            background:
            '-webkit-linear-gradient(180deg, #66CFA3 0%, rgba(123, 235, 188, 0.8) 100%)',
            webkitBackgroundClip: 'text',
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
    </Card>
  );
}