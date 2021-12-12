import React, { useState, useEffect } from 'react';
import SearchBar from './Sections/SearchBar';
import Axios from 'axios';

function SearchResult(props) {
	const [Users, setUsers] = useState([]);
	const [Groups, setGroups] = useState([]);
	
	useEffect(() => {
		Axios.post('/api/search/all', { search: props.match.params.searchData }).then((response) => {
			if (response.data.success) {
				console.log(response.data.USERS)
				setUsers(response.data.USERS);
			} else {
				alert('Failed');
			}
		});
	})
	
	return (
		<div>
			<br />
			<SearchBar />
		</div>
	);
}

export default SearchResult;