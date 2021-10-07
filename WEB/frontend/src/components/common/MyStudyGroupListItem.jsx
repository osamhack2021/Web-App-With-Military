import {
  ListItem, ListItemAvatar, ListItemButton, ListItemText,
} from '@mui/material';
import MyStudyGroupAvatar from './MyStudyGroupAvatar';
// import MoreIcon from './MoreIcon'

const MyStudyGroupListItem = ({ secondaryElement, sloganText }) => (
  <ListItem
    secondaryAction={
      secondaryElement
  }
    disablePadding
  >
    <ListItemButton>
      <ListItemAvatar>
        <MyStudyGroupAvatar sx={{
          width: '3rem',
          height: '3rem',
        }}
        />
      </ListItemAvatar>

      <ListItemText primary={sloganText} sx={{ color: 'white' }} />

    </ListItemButton>
  </ListItem>
);

export default MyStudyGroupListItem;
