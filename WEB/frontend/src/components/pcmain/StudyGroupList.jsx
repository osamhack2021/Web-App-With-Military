import React from 'react';
import {
  Box, Grid, IconButton, Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MyListItem from '../common/MyListItem';
import MyAvatar from '../common/MyAvatar';

const studyGroupList = [{
  title: '회화 스터디‍✈️',
  subtitle: '군대에서 스피킹연습하면서 학습기록 열심히 해나가실 분 환영합니다..!',
  tier: '플래티넘',
  totalMember: 28,
  tags: ['영단어', '회화', '스피킹'],
  imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
},
{
  title: '회화 스터디‍✈️',
  subtitle: '군대에서 스피킹연습하면서 학습기록 열심히 해나가실 분 환영합니다..!',
  tier: '플래티넘',
  totalMember: 28,
  tags: ['영단어', '회화', '스피킹'],
  imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
},
{
  title: '회화 스터디‍✈️',
  subtitle: '군대에서 스피킹연습하면서 학습기록 열심히 해나가실 분 환영합니다..!',
  tier: '플래티넘',
  totalMember: 28,
  tags: ['영단어', '회화', '스피킹'],
  imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
},
{
  title: '회화 스터디‍✈️',
  subtitle: '군대에서 스피킹연습하면서 학습기록 열심히 해나가실 분 환영합니다..!',
  tier: '플래티넘',
  totalMember: 28,
  tags: ['영단어', '회화', '스피킹'],
  imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
}];

const ListItems = studyGroupList.map((studyGroup) => <Grid item xs={12} sm={6}>
  <MyListItem
    secondaryElement={
      <IconButton
        size="large"
      >
        <MenuBookIcon />
      </IconButton>
    }
    avatar={<MyAvatar
      sx={{
        width: '3rem',
        height: '3rem',
        borderRadius: '1rem',
      }}
      imageUrl={studyGroup.imageUrl}
    />}
    primary={
      <>
        <Typography component={Box} sx={{ color: '#5E5E5E' }}>{studyGroup.title}</Typography>
        <Typography component={Box} sx={{ color: '#5E5E5E' }}>{studyGroup.subtitle}</Typography>
      </>
    }
    secondary={
      <>
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
          {studyGroup.tier}
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
            {studyGroup.totalMember}
            /30
          </Typography>
        </Box>
        <Box>
          { () => {
            const result = studyGroup.tags.map((tag) => {
              <Typography
                component={Box}
                sx={{
                  p: 2,
                  color: 'white',
                  backgroundColor: '#5E5E5E',
                  boarderRadius: '1rem',
                }}
              >
                {tag}
              </Typography>;
            });
            return result;
          }}
        </Box>
      </>
}
  />
                                                     </Grid>);

const StudyGroup = () => (
  <>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
    }}
    >
      <Box sx={{
        display: 'flex',
      }}
      >
        <Typography
          component={Box}
          sx={{
            px: 2,
            py: 1,
            color: '#5E5E5E',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          전체

        </Typography>
        <Typography
          component={Box}
          sx={{
            px: 2,
            py: 1,
            color: '#5E5E5E',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          가입한 그룹

        </Typography>
      </Box>
    </Box>
    <Box>
      <Typography
        component={Box}
        sx={{
          color: '#073113',
          fontSize: '2rem',
          fontWeight: 'bold',
          p: 3,
        }}
      >
        검색결과
      </Typography>

    </Box>
    <Box sx={{
      backgroundColor: '#E8E8E8',
      borderRadius: '2.5rem',
      p: 4,
    }}
    >
      <Typography
        component={Box}
        sx={{
          pb: 2,
          fontSize: '2rem',
          borderBottom: '1px solid #5E5E5E',
        }}
      >
        스터디 그룹
      </Typography>
      <Grid container spacing={1}>
        {ListItems}
      </Grid>

    </Box>
  </>

);

export default StudyGroup;
