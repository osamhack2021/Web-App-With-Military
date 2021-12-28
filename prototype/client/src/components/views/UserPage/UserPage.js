import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import GrassChart from './Sections/GrassChart';
import AllLineChart from './Sections/AllLineChart';

function UserPage(props) {
	const userId = props.match.params.userId;
	const [UserInfo, setUserInfo] = useState([]);

	useEffect(() => {
		Axios.post('/api/users/profile', { userId: userId }).then((response) => {
			if (response.data.success) {
				setUserInfo(response.data.user);
			} else {
				alert('유저정보 가져오기를 실패했습니다.');
			}
		});
	}, []);

	return (
		<div>
			{UserInfo && (
				<div>
					<h1>{UserInfo.userName}</h1>
					<br />
					<h2>{UserInfo.totalTime}</h2>
					<br />
					<GrassChart data={UserInfo.history} />
					<AllLineChart data={UserInfo.history} />
				</div>
			)}
		</div>
	);
}

export default UserPage;