/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Menu, Avatar, Badge, Dropdown } from 'antd';
import { PlaySquareOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';

function RightMenu(props) {
	const user = useSelector((state) => state.user);

	const logoutHandler = () => {
		axios.get(`${USER_SERVER}/logout`).then((response) => {
			if (response.status === 200) {
				props.history.push('/login');
			} else {
				alert('Log Out Failed');
			}
		});
	};

	if (user.userData && !user.userData.isAuth) {
		const menu = (
			<Menu>
				<Menu.Item key="mail">
					<a href="/login">Signin</a>
				</Menu.Item>
				<Menu.Item key="app">
					<a href="/register">Signup</a>
				</Menu.Item>
			</Menu>
		);
		return (
			<Menu mode={props.mode}>
				<Menu.Item key="ranking">
					<a>Ranking</a>
				</Menu.Item>
				<Menu.Item key="group">
					<a>StudyGroup</a>
				</Menu.Item>
				<Menu.Item key="search">
					<SearchOutlined style={{ fontSize: '32px' }} />
				</Menu.Item>
				<Menu.Item key="user">
					<Dropdown overlay={menu}>
						<Avatar
							style={{ fontSize: '32px' }}
							icon={<UserOutlined style={{ fontSize: '32px' }} />}
							style={{ position: 'flex', transform: 'translateY(-25%)' }}
						/>
					</Dropdown>
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
			</Menu>
		);

		return (
			<Menu mode={props.mode}>
				<Menu.Item key="ranking">
					<a>Ranking</a>
				</Menu.Item>
				<Menu.Item key="group">
					<a>StudyGroup</a>
				</Menu.Item>
				<Menu.Item key="search">
					<SearchOutlined style={{ fontSize: '32px' }} />
				</Menu.Item>
				<Menu.Item key="play">
					<PlaySquareOutlined style={{ fontSize: '32px' }} />
				</Menu.Item>
				<Menu.Item key="user">
					<Dropdown overlay={menu}>
						<Badge count={1}>
							<Avatar
								size="large"
								src={localStorage.getItem('image')}
								style={{ fontSize: '32px', position: 'flex', transform: 'translateY(-25%)' }}
							/>
						</Badge>
					</Dropdown>
				</Menu.Item>
			</Menu>
		);
	}
}

export default withRouter(RightMenu);