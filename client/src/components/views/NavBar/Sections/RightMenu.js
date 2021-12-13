/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StudyMenu from './StudyMenu';

import { Menu, Avatar, Badge, Dropdown } from 'antd';
import { EditOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';

function RightMenu(props) {
	const user = useSelector((state) => state.user);

	const logoutHandler = () => {
		Axios.get(`${USER_SERVER}/logout`).then((response) => {
			if (response.status === 200) {
				console.log(user);
				props.history.push('/login');
			} else {
				alert('Log Out Failed');
			}
		});
	};

	if (user.userData && !user.userData.isAuth) {
		return (
			<Menu mode={props.mode}>
				<Menu.Item key="ranking">
					<a href="/ranking/user">Ranking</a>
				</Menu.Item>
				<Menu.Item key="group">
					<a>StudyGroup</a>
				</Menu.Item>
				<Menu.Item key="search">
					<a href="/search">
						<SearchOutlined style={{ fontSize: '32px' }} />
					</a>
				</Menu.Item>
				<Menu.Item key="mail">
					<a href="/login">Signin</a>
				</Menu.Item>
				<Menu.Item key="app">
					<a href="/register">Signup</a>
				</Menu.Item>
			</Menu>
		);
	} else {
		const menu = (
			<Menu>
				<Menu.Item key="0">
					<a href={`/users/${localStorage.getItem('userId')}`}>Profile</a>
				</Menu.Item>
				<Menu.Item key="1">
					<a onClick={logoutHandler}>Logout</a>
				</Menu.Item>
				{user.userData !== undefined &&
					user.userData.groupList.map((group, index) => (
						<Menu.Item key="groups">
							<a href={`/groups/${group._id}`}>{group.groupName}</a>
						</Menu.Item>
					))}
			</Menu>
		);
		return (
			<Menu mode={props.mode} style={{ transform: 'translateY(40%)' }}>
				<Menu.Item key="ranking">
					<a href="/ranking/user">Ranking</a>
				</Menu.Item>
				<Menu.Item key="group">
					<a>StudyGroup</a>
				</Menu.Item>
				<Menu.Item key="search">
					<a href="/search">
						<SearchOutlined style={{ fontSize: '32px' }} />
					</a>
				</Menu.Item>
				<Menu.Item key="study">
					<Dropdown overlay={<StudyMenu />} trigger={['click']}>
						<Badge status="success">
							<EditOutlined style={{ fontSize: '32px' }} />
						</Badge>
					</Dropdown>
				</Menu.Item>
				<Menu.Item key="user">
					<div style={{ transform: 'translateY(-20%)' }}>
						<Dropdown overlay={menu} trigger={['click']}>
							<Badge count={1}>
								<Avatar
									size="large"
									src={localStorage.getItem('image')}
									style={{
										fontSize: '32px',
										position: 'flex',
									}}
								/>
							</Badge>
						</Dropdown>
					</div>
				</Menu.Item>
			</Menu>
		);
	}
}

export default withRouter(RightMenu);