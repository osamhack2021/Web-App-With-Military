/* eslint-disable max-len */
import {
  List, ListItem, ListItemText, ListItemAvatar, ListItemButton,
} from '@mui/material';

const MyProfileList = ({
  secondaryElement, avatar, primary, secondary,
}) => (
  <>
    <List disablePadding>
      <ListItem
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
    </List>
  </>
);

export default MyProfileList;
