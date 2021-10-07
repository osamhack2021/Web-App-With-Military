/* eslint-disable max-len */
import {
  List, ListItem, ListItemAvatar, ListItemButton,
} from '@mui/material';

const MyProfileList = ({
  secondaryElement, avatar, primaryListItemText, secondaryListItemText,
}) => (
  <>
    <List>
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
    </List>
  </>
);

export default MyProfileList;
