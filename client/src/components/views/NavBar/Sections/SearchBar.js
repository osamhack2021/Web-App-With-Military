import React, { useState } from 'react';
import { Input, Space } from 'antd';
import Axios from 'axios';
const { Search } = Input;

function SearchBar(props) {
	const [SearchData, setSearchData] = useState('');

	const onSearch = value => {
		Axios.post('/api/search/all', { search: value }).then((response) => {
			if (response.status === 200) {
				console.log(response.data)
			} else {
				alert('Failed');
			}
		});
	};
	
	const handleChange = (e) => {
		console.log(e.target.value);
	}

	return <Search placeholder="input search text" onSearch={onSearch} enterButton onChange={handleChange} />;
}

export default SearchBar;