import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Avatar,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const SearchResult = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '15rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <ArrowBackIcon />
          <Typography>영단어</Typography>
        </Box>
        <Box>
          <CancelIcon color="action" />
          <SearchIcon color="action" />
        </Box>
      </Box>
      <List>
        <ListItemButton sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <ListItemAvatar>
            <Avatar
              alt="Taking notes"
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Study with me! :)</Typography>
                <MenuBookIcon />
              </Box>
            }
            secondary={
              <>
                <Typography
                  sx={{
                    background:
                      'linear-gradient(180deg, rgba(255, 215, 0, 0.8) 0%, rgba(253, 255, 135, 0.8) 100%)',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  골드
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <PersonIcon />
                  <Typography>26/30</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '10rem',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Chip label="영단어" component="a" href="/" clickable />
                  <Chip label="토익" component="a" href="/" clickable />
                  <Chip label="RC" component="a" href="/" clickable />
                  <Chip label="LC" component="a" href="/" clickable />
                </Box>
              </>
            }
          />
        </ListItemButton>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar
              alt="Taking notes"
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
            />
          </ListItemAvatar>
          <ListItemText primary="Study with me! :)" />
        </ListItemButton>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar
              alt="Taking notes"
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
            />
          </ListItemAvatar>
          <ListItemText primary="Study with me! :)" />
        </ListItemButton>
      </List>
    </Box>
  </Box>
);

export default withRouter(SearchResult);
