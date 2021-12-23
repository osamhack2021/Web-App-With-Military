import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function GroupPage(props) {
	const groupId = props.match.params.groupId;
	const [GroupInfo, setGroupInfo] = useState([]);

	useEffect(() => {
		Axios.post('/api/groups/profile', { groupId: groupId }).then((response) => {
			if (response.data.success) {
				setGroupInfo(response.data.group);
			} else {
				alert('그룹정보 가져오기를 실패했습니다.');
			}
		});
	}, []);

	return (
		<div>
			{GroupInfo && (
				<div>
					<h1>  {GroupInfo.groupName}</h1>
				</div>
			)}
		</div>
	);
}

export default GroupPage;