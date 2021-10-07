import {
  ListItem, ListItemAvatar, ListItemButton,
} from '@mui/material';

// import MoreIcon from './MoreIcon'

const MyStudyGroupListItem = ({
  secondaryElement, avatar, primaryListItemText, secondaryListItemText,
}) => (
  <ListItem
    secondaryAction={
      secondaryElement
  }
    disablePadding
  >
    <ListItemButton>
      <ListItemAvatar>
        {avatar}
      </ListItemAvatar>
      {primaryListItemText}
      {secondaryListItemText}

    </ListItemButton>
  </ListItem>
);

export default MyStudyGroupListItem;
