import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Box, Button, Card, Container, Grid, Link, Typography } from '@mui/material';
import { profileUser } from "../../../_actions/user_actions";
import GroupCardVertical from './Sections/GroupCardVertical';
import PeopleIcon from '@mui/icons-material/People';

export default function UserGroupPage(props) {
  const dispatch = useDispatch();
  const { userId } = props.match.params;

  useEffect( () => {
    dispatch(profileUser({userId : userId}))
    .then(response => {
      if (response.payload.success) {
        //console.log(response.payload);
      }
    });
  }, []);
  const userInfo= useSelector((state) => state.profile.userProfile);

  if (userInfo === undefined) {
      return <div>유저정보 불러오는 중</div>;
  } else {
    const {user} = userInfo;
    const myElapsedDays = Math.floor((new Date().getTime() - new Date(user.created).getTime()) / 1000 / 60 / 60 / 24);
    return (
      <Container 
        component="main"
        maxWidth="lg"
        sx={{
          minHeight: 'calc(100vh - 9rem - 1px)',
          overflow: 'hidden'
        }}
      >
        <Box sx={{display: 'flex', my: 4 }}>
          <Avatar
            size="large"
            src={user.image}
            style={{
              fontSize: "32px",
              position: "flex",
            }}
          />
          <Typography variant="h5" >
            안녕하세요, {user.name}님!
            공부를 시작한지 벌써 {myElapsedDays}일이 지났어요
          </Typography>
        </Box>

        <Box 
          sx={{
            backgroundColor: '#E8E8E8',
            borderRadius: '2.5rem',
            p: 4,
          }}
        >
          <Box sx={{ display: 'flex'}}>
            <Typography sx={{
              pb: 2,
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}>
              내 스터디그룹
            </Typography>
            <PeopleIcon sx={{
              color: '#5E5E5E',
              fontSize: '2rem',
              ml: 1,
            }}/>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <Card sx={{ 
                  minHeight: 400, 
                  borderRadius: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  padding: 0,
              }}>
                <Button
                  component="a"
                  href="/group/create"
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                  }}
                >
                  <Typography
                      variant="h2"
                      sx={{ color: '#5E5E5E', }}
                  >
                    +
                  </Typography>
                </Button>
                <Typography
                  variant="h6"
                  sx={{
                    position: 'absolute',
                    top: '55%',
                    color: '#5E5E5E',
                }}>
                  스터디 그룹 추가
                </Typography>
              </Card>
            </Grid>
            { user.groupList.map((group, index) => (
              <Grid item xs={3}key={index}>
                <Link
                  href={`/groups/${group._id}`}
                  underline="none"
                >
                  <GroupCardVertical group={group}/>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }
}