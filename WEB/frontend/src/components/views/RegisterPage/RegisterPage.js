import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
const { TreeNode } = TreeSelect;

function RegisterPage(props) {
    const dispatch = useDispatch();

	const [Id, setId] = useState("")
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
	const [Division, setDivision] = useState("");
	
    const onDivisionHandler = (Division) => {
    	setDivision(Division);
		console.log(Division);
    };
	
	const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }
	
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호가 일치하지 않습니다.')
        }

        let body = {
			id: Id,
            email: Email,
            password: Password,
            name: Name,
			division: Division,
        }
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
                }
            })
    }
	
	const onClickHandler = () => {
		props.history.push("/login")
	}



    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
				<label>아이디</label>
                <input type="text" value={Id} onChange={onIdHandler} />
				
				<label>비밀번호</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>비밀번호 확인</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
				
                <label>이메일</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>이름</label>
                <input type="text" value={Name} onChange={onNameHandler} />
				
				<label>소속</label>
				<TreeSelect
					showSearch
					style={{ width: '100%' }}
					value={Division}
					dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
					placeholder="Please select"
					allowClear
					treeDefaultExpandAll
					onChange={onDivisionHandler}
					>
					<TreeNode value="army" title="육군"></TreeNode>
					<TreeNode value="navy" title="해군"></TreeNode>
					<TreeNode value="airforce" title="공군"></TreeNode>
				</TreeSelect>
				
                <br />
                <button type="submit">
                    가입
                </button>
				
				<br/>
				<button onClick={onClickHandler}>
				계정이 있으신가요?
			</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)

