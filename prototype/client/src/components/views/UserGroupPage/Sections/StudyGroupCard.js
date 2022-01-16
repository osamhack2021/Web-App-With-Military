import * as React from 'react';
import {Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, 
  Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function StudyGroupCard({ group }) {
  return (
    <Card sx={{ minHeight: 400, borderRadius: '1rem' }}>
      <CardMedia
        component="img"
        height="140"
        image={group.imageUrl}
        alt="study group"
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
          {
            group.tags.map((tag, index) => 
              <CardActions
                key={index}
              >
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  sx={{borderRadius: '1rem'}}
                >
                  {tag}
                </Button>
              </CardActions>
              )
          }
        </Box>
      </CardContent>
    </Card>
  );
}