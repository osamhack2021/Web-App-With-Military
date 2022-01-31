import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function RankingPage(props) {
	const target = props.match.params.target;
	const [Users, setUsers] = useState([]);
	const [Groups, setGroups] = useState([]);
	
	const [value, setValue] = useState( target === 'user' ? 0 : 1 );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

	useEffect(() => {
		Axios.get('/api/ranking/user').then((response) => {
			if (response.data.success) {
				setUsers(response.data.result);
			} else {
				alert('Failed');
			}
		});
		Axios.get('/api/ranking/group').then((response) => {
			if (response.data.success) {
				setGroups(response.data.result);
			} else {
				alert('Failed');
			}
		});
	}, []);
	
	let result;
	
	switch (target) {
		case "user":
			result = 
				<div>
					<br />
					{Users.map((user, i) => (
						<a href={`/users/${user._id}`}>
							{i+1} 등 - {user.name} : {user.totalTime}
							<br />
						</a>
					))}
				</div>
			break;
		case "group":
			result = 
				<div>
					<br />
					{Groups.map((group, i) => (
						<a href={`/groups/${group._id}`}>
							{i+1} 등 - {group.groupName} : {group.totalTime}
							<br />
						</a>
					))}
				</div>
			break;
		default:
			result = <div></div>
	}
	
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
				value={value}
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
			{ result }
		</Container>
	);
	
}