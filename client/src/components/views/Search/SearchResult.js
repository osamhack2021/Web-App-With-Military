import React, { useState, useEffect } from 'react';
import SearchBar from './Sections/SearchBar';
import Axios from 'axios';

function SearchResult(props) {
	const [Users, setUsers] = useState([]);
	const [Groups, setGroups] = useState([]);
	
	let search = props.match.params.searchData;

	useEffect(() => {
		Axios.post('/api/search/all', { search: search })
			.then((response) => {
				if (response.data.success) {
					setUsers(response.data.Users);
					setGroups(response.data.Groups);
				} else {
					alert('Failed');
				}
			}
		);
	}, [search]);

	return (
		<div>
			<br />
			<SearchBar />
			<span>전체 유저 검색 결과 {Users.length} 건</span>
			{Users.map((user) => (
				<div>
					{user.name} : {user.totalTime}
					<br />
				</div>
			))}
			<br />
			<span>전체 그룹 검색 결과 {Groups.length} 건</span>
			{Groups.map((group) => (
				<div>
					{group.groupName} : {group.totalTime}
					<br />
				</div>
			))}
		</div>
	);
}

export default SearchResult;