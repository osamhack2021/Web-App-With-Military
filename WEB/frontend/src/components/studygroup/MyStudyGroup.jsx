import StudyGroupOutline from './StudyGroupOutline'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import { Divider, ListSubheader } from '@mui/material';

const MyStudyGroup = () => {
    const studyGroupOutlineList = Array(5).fill(0).map(() => <StudyGroupOutline/>);
    return <>
        <List subheader={<ListSubheader component="h1">내가 속한 스터디 그룹</ListSubheader>}><Divider/>{studyGroupOutlineList}</List>
    </>    
}

export default MyStudyGroup