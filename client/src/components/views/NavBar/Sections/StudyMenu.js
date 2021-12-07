import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Menu, Button, Space} from 'antd';

function StudyMenu() {
	
	const [ElapsedTime, setElapsedTime] = useState(0);
	const [Pause, setPause] = useState(false);
	const [Studying, setStudying] = useState(false);

	useEffect(() => {
		
		Axios.get('/api/studying')
			.then((response) => {
			if (response.data.success) {
				if(response.data.isStudyingNow) {
					setElapsedTime(response.data.elapsedTime)
					setPause(response.data.isPaused)
				}
				setStudying(response.data.isStudyingNow)
			} else {
				alert('공부상태 가져오기를 실패했습니다.');
			}
		});
	}, []);
	
	return (
		<Menu>
			<Menu.Item key="1">
			<Space size='large'>
			{Studying ? 
				(
				Pause ?
				<Button type="primary" shape="circle" size="large">
						재시작
   				</Button>
				:
				<Button type="primary" shape="circle" size="large">
					일시정지
   				</Button>
				
			) :
				<Button type="primary" shape="circle" size="large">
					시작
   				</Button>
			}
			<Button type="primary" size="large">
				끝내기
   			</Button>
			</Space>
			</Menu.Item>
		</Menu>
	);
}

export default StudyMenu;