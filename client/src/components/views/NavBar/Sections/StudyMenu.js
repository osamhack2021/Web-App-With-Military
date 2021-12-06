import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Menu } from 'antd';
import { Button, Tooltip } from 'antd';
import { CaretRightOutlined, PauseOutlined, CheckOutlined } from '@ant-design/icons';

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
			{Studying ? 
				(
				Pause ?
				<Menu.Item key="0">
				<Tooltip title="재시작">
				<Button icon={<CaretRightOutlined />} type="primary" shape="circle">
   				</Button>
				</Tooltip>
				</Menu.Item>
				:
				<Menu.Item key="0">
				<Tooltip title="일시정지">
				<Button icon={<PauseOutlined />} type="primary" shape="circle">
   				</Button>
				</Tooltip>
				</Menu.Item>
				
			) :
				<Menu.Item key="0">
				<Tooltip title="공부 시작">
				<Button icon={<CaretRightOutlined />} type="primary" shape="circle">
   				</Button>
				</Tooltip>
				</Menu.Item>
			}
			<Menu.Item key="1">
				<Tooltip title="공부 끝내기">
				<Button icon={<CheckOutlined />} type="primary" shape="circle">
   				</Button>
				</Tooltip>
				</Menu.Item>
			
			
		</Menu>
	);
}

export default StudyMenu;