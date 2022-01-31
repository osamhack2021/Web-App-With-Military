import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function RankingPage(props) {
	const target = props.match.params.target;
	const [Users, setUsers] = useState([]);
	const [Groups, setGroups] = useState([]);
	
	const [tabValue, setTabValue] = useState( target === 'user' ? 0 : 1 );
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

	let result;
	
	useEffect(() => {
		switch (target) {
			case "user":
				Axios.get('/api/ranking/user').then((response) => {
					if (response.data.success) {
						setUsers(response.data.result);
						if (tabValue !== 0) {
							setTabValue(0);
						}
					} else {
						alert('Failed');
					}
				});
				break;
			case "group":
				Axios.get('/api/ranking/group').then((response) => {
					if (response.data.success) {
						setGroups(response.data.result);
						if (tabValue !== 1) {
							setTabValue(1);
						}
					} else {
						alert('Failed');
					}
				});
				break;
			default:
				result = <div>로딩중</div>
		}
	}, [target]);
	
	return (
		<Container 
			component="main"
			maxWidth="lg"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<br/>
			<Tabs
				value={tabValue}
				onChange={handleChange}
				aria-label="basic tabs example"
				textColor="secondary"
				indicatorColor="secondary"
			>
				<Tab
					label="유저 랭킹"
					sx={{ fontSize: '2rem', fontWeight: 'bold' }}
					component={Link}
					to={'/ranking/user'}
				/>
				<Tab
					label="그룹 랭킹"
					sx={{ fontSize: '2rem', fontWeight: 'bold' }}
					component={Link}
					to={'/ranking/group'}
				/>
			</Tabs>
			{ tabValue === 0 ? 
				<div>
					<br />
					{Users.map((user, i) => (
						<a href={`/users/${user._id}`}>
							{i+1} 등 - {user.name} : {user.totalTime}
							<br />
						</a>
					))}
				</div>
				: 
				<div>
					<br />
					{Groups.map((group, i) => (
						<a href={`/groups/${group._id}`}>
							{i+1} 등 - {group.groupName} : {group.totalTime}
							<br />
						</a>
					))}
				</div> }
		</Container>
	);
	
}