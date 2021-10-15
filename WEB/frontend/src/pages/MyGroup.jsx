import { withRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import MyStudyGroup from '../MyStudyGroup';
import MyMenu from '../components/studygroup/MyMenu';

const MyGroup = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <div>
      <MyStudyGroup />
      <MyMenu />
    </div>
  </Box>
);

export default withRouter(MyGroup);
