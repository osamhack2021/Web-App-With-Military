import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Space } from 'antd';
const { Search } = Input;

function SearchBar(props) {
	const [SearchData, setSearchData] = useState('');

	const onSearch = value => {
		props.history.push(`/search/${value}`);
	};
	
	const handleChange = (e) => {
		console.log(e.target.value);
	}

	return <Search placeholder="input search text" onSearch={onSearch} enterButton onChange={handleChange} />;
}

export default withRouter(SearchBar);