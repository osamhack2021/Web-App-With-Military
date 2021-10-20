import {
  ListItem, ListItemText, ListItemAvatar, ListItemButton,
} from '@mui/material';

const MyStudyGroupListItem = ({
  sx, secondaryElement, avatar, primary, secondary,
}) => (
  <ListItem
    sx={{
      ...sx,
    }}
    secondaryAction={secondaryElement}
    disablePadding
  >
    <ListItemButton sx={{ p: 0 }}>

      <ListItemAvatar>
        {avatar}
      </ListItemAvatar>
      <ListItemText
        primary={primary}
        secondary={secondary}
      />

    </ListItemButton>
  </ListItem>
);

export default MyStudyGroupListItem;
