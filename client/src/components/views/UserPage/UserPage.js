import React, { useEffect, useState } from 'react';
import Axios from 'axios';

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
				</div>
			)}
		</div>
	);
}

export default UserPage;