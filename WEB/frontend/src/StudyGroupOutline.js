import StudyGroupImage from './StudyGroupImage'
import MoreIcon from './MoreIcon'
import { ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'

const StudyGroupOutline = () => <ListItemButton><ListItemAvatar><StudyGroupImage/></ListItemAvatar><ListItemText primary="Study With Me! ✊"/><MoreIcon/></ListItemButton>

export default StudyGroupOutline