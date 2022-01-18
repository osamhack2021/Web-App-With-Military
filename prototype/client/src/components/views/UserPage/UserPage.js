import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import GrassChart from './Sections/GrassChart';
import AllLineChart from './Sections/AllLineChart';

function UserPage(props) {
	const { userId } = props.match.params;
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
					<h1> 유저 이름 : {UserInfo.name}</h1>
					<br />
					<h2> 전체 공부 시간 : {UserInfo.totalTime}</h2>
					<br />
					<h2> 최장 스트릭 : {UserInfo.maxStreak} 현재 스트릭 : {UserInfo.curStreak}</h2>
					<br />
					<GrassChart data={UserInfo.history} />
					<AllLineChart data={UserInfo.history} />
				</div>
			)}
		</div>
	);
}

export default UserPage;