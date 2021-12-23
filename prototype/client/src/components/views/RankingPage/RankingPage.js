import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import UserTotalTime from './Sections/UserTotalTime';

function RankingPage(props) {
	const target = props.match.params.target;
	const [Users, setUsers] = useState([]);

	useEffect(() => {
		Axios.get('/api/ranking/user').then((response) => {
			if (response.data.success) {
				setUsers(response.data.result);
			} else {
				alert('Failed');
			}
		});
	}, []);

	return (
		<div>
			{Users.map((user, i) => (
				<div>
					{i+1} 등 - {user.name} : {user.totalTime}
					<br />
				</div>
			))}
		</div>
	);
}

export default RankingPage;