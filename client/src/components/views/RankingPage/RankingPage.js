import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function RankingPage(props) {
	const target = props.match.params.target;
	const [Users, setUsers] = useState([]);
	const [Groups, setGroups] = useState([]);

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
	
	if(target === "user") {
		return (
		<div>
			<h1>유저 랭킹</h1>
			<br />
			{Users.map((user, i) => (
				<a href={`/users/${user._id}`}>
					{i+1} 등 - {user.name} : {user.totalTime}
					<br />
				</a>
			))}
		</div>
	);
	} else if(target === "group") {
		return (
		<div>
			<h1>그룹 랭킹</h1>
			<br />
			{Groups.map((group, i) => (
				<a href={`/groups/${group._id}`}>
					{i+1} 등 - {group.groupName} : {group.totalTime}
					<br />
				</a>
			))}
		</div>
	);
	} else {
		return (
		<div>
			<h1>유저 랭킹</h1>
			<br />
			{Users.map((user, i) => (
				<a href={`/users/${user._id}`}>
					{i+1} 등 - {user.name} : {user.totalTime}
					<br />
				</a>
			))}
			<h1>그룹 랭킹</h1>
			<br />
			{Groups.map((group, i) => (
				<a href={`/groups/${group._id}`}>
					{i+1} 등 - {group.groupName} : {group.totalTime}
					<br />
				</a>
			))}
		</div>
	);
	}

	
}

export default RankingPage;