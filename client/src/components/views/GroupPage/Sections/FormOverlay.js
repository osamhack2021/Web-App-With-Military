import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Box, Toolbar, Input, IconButton, Typography, } from '@mui/material';
import { saveBoard } from "../../../../_actions/user_actions";
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const StyledToolbar = styled(Toolbar)({
    backgroundColor: '#000F04',
    color: 'white',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  });

export default function FormOverlay({ groupId, onFormOverlayToggle }) {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.loginUserData);
	const studyingData = useSelector((state) => state.studying.studyingData);
	const state = useSelector((state) => state);
	
  const [submitForm, setSubmitForm] = useState({
    title: '',
    subTitle: '',
    content: '',
		writerId: userData._id,
		groupId: groupId,
  });
  const onChange = e => {
    const nextSubmitForm = {
      ...submitForm,
      [e.target.name]: e.target.value,
    };
    setSubmitForm(nextSubmitForm);
    console.log(submitForm);
  };

  const onSubmit = e => {
    e.preventDefault();
		dispatch(saveBoard(submitForm))
    .then((response) => {
      if (response.payload.success) {
        setSubmitForm({title:'', subTitle:'', content:''});
      } else {
        alert("게시글을 저장하지 못했습니다.");
      }
			onFormOverlayToggle();
    });
  };
	
	if(studyingData === undefined) {
		console.log(state);
		alert("시간측정을 해주세요!");
		onFormOverlayToggle();
    return <></>;
	} else {
		if (studyingData.success) {
			console.log(studyingData);
			if (studyingData.activeGroup !== groupId ) {
				alert("최근 측정한 그룹에서 글쓰기를 진행해 주세요!");
				onFormOverlayToggle();
				return <></>;
			}
		} else {
			alert("시간 측정이 정상적으로 이뤄지지 않았습니다.");
			onFormOverlayToggle();
			return <></>;
		}
		const { elapsedTime } = studyingData;
		return (
			<Box sx={{
				backgroundColor: '#000F04',
				'& .MuiInput-root': {
					padding: '1rem 1rem 1rem 2rem',
					borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
				},
				'& input, & textarea': {
					color: 'white',
				},
				position: 'fixed',
				top: '20%',
				left: '50%',
				zIndex: 4,
				transform: 'translateX(-50%)',
			}}
			>
				<form onSubmit={onSubmit}>
					<StyledToolbar>
						<IconButton size="large" color="inherit">
							<ClearIcon onClick={onFormOverlayToggle} />
						</IconButton>
						<Box sx={{ flexGrow: 1 }} />
						<Typography style={{ color: 'white' }}>글쓰기</Typography>
						<Box sx={{ flexGrow: 1 }} />
						<IconButton type="submit" size="large" color="inherit">
							<CheckIcon />
						</IconButton>
					</StyledToolbar>
					<Input
						placeholder="제목"
						value={submitForm.title}
						onChange={onChange}
						name="title"
						fullWidth
						required
					/>
					<Input
						placeholder="소제목"
						value={submitForm.subTitle}
						onChange={onChange}
						name="subTitle"
						fullWidth
						required
						disabled
					/>
					<Input
						placeholder="내용을 입력하세요."
						value={submitForm.content}
						onChange={onChange}
						name="content"
						fullWidth
						required
						multiline
						rows={8}
					/>
				</form>
				<Box sx={{
					display: 'flex',
					justifyContent: 'center',
					textAlign: 'center',
					color: 'white',
					py: '1rem',
				}}>
					<Typography sx={{mr: 1}}>집중시간</Typography>
					<Typography sx={{fontWeight: 'bold'}}>
							{ parseInt(elapsedTime/3600) }
					</Typography>:
					<Typography sx={{fontWeight: 'bold'}}>
							{ parseInt((elapsedTime%3600)/60) }
					</Typography>:
					<Typography sx={{fontWeight: 'bold'}}>
							{ elapsedTime%60 }
					</Typography>
				</Box>
			</Box>
		);
	}
}

