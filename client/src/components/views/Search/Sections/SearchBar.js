import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Box, InputAdornment, InputBase, TextField, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
	border: '2px solid #073113',
	borderRadius: '2rem',
	width: '50%',
	height: '3rem',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
	}
}));

function SearchBar(props) {
	const [searchData, setSearchData] = useState('');

	const onSearch = () => {
		props.history.push(`/search/${searchData}`);
	};
	
	const onChange = (e) => {
		setSearchData(e.target.value);
	}
	
	const onKeyPress = (e) => {
		if( e.key === 'Enter' ) {
			onSearch();
			setSearchData('');
		}
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
					height: '4rem',
					'& input': {
						color: '#5E5E5E',
					},
					mt: 10,
				}}
			>
				<StyledInputBase
					placeholder="찾고 싶은 그룹을 검색해보세요."
					onChange={onChange}
					onKeyPress={onKeyPress}
					value={searchData}
					endAdornment={
						<InputAdornment
							onClick={onSearch}
							position="start"
						>
							<SearchIcon
								sx={{
									color: '#073113',
									width: '2.5rem',
									height: '2.5rem',
									pl: 1,
									borderLeft:'2px solid #073113',
									cursor: 'pointer',
								}}
							/>
						</InputAdornment>
					}
				/>
			</Box>
		</>
	);
}

export default withRouter(SearchBar);