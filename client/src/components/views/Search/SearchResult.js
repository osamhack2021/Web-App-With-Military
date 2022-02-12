import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box, Container, Divider, Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import GroupCardHorizon from './Sections/GroupCardHorizon';
import SearchBar from './Sections/SearchBar';

const GrayBox = styled(Box)({
	backgroundColor: '#E8E8E8',
	borderRadius: '1rem',
	padding: '1rem',
})

export default function SearchResult(props) {
	const [users, setUsers] = useState([]);
	const [groups, setGroups] = useState([]);
	
	let search = props.match.params.searchData;

  useEffect(() => {
    Axios.post('/api/search/all', { search: search })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setUsers(response.data.Users);
          setGroups(response.data.Groups);
        } else {
          alert('Failed');
        }
      }
    );
  }, [search]);

  return (
    <Container 
      component="main"
      maxWidth="lg"
    >
      <br/>
      <SearchBar />
      <br />
      <GrayBox>
        <Typography variant="h5" sx={{ mb: 2 }}>
          그룹 검색 결과: <strong>{groups.length}</strong>건
        </Typography>
        <Divider />
        <Grid
          container
          spacing={4}
          sx={{ mt: 1}}
        >
          { groups.map((group) => (
            <Grid
              item
              xs={6}
              key={group._id}
            >
              <Link
                href={`/groups/${group._id}`}
                underline="none"
              >
                <GroupCardHorizon group={group}/>
              </Link>
            </Grid>
          ))}
        </Grid>
      </GrayBox>
    </Container>
  );
}