import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 

function LandingPage(props) {
	
	const onClickHandler = () => {
		axios.get('/api/users/logout')
		.then(response => {
			if(response.data.success) {
				props.history.push("/login")
			} else {
				alert('Failed to logout')
			}
		})
	}
	return (
		<div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
			<h1>위드 밀리터리</h1>
			<button onClick={onClickHandler}>
				로그아웃
			</button>
		</div>
	)
}

export default withRouter(LandingPage)