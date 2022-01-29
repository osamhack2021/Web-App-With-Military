import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadBoard, removeBoard } from "../../../../_actions/user_actions";
import { Avatar, Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditBoard from "./EditBoard";
import Comment from "./Comment";
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import TimerIcon from '@mui/icons-material/Timer';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CreateIcon from '@mui/icons-material/Create';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Popconfirm, message } from "antd";

const GrayBox = styled(Box)({
  backgroundColor: '#E8E8E8',
  borderRadius: '2.5rem',
  padding: '1rem',
})

export default function CardTemplete({ group, toggleFormOverlay, onFormOverlayToggle }) {
	const dispatch = useDispatch();
	
	const updateBoard = (group_id) => {
		dispatch(loadBoard({ groupId: group_id }))
		.then((response) => {
			if (response.payload.success) {
				//setBoardLists(response.payload.boards);
			} else {
				alert("게시글 불러오기를 실패했습니다.");
			}
		});
	}

	const userData = useSelector((state) => state.auth.loginUserData);
	const boardData = useSelector((state) => state.board.boardData);
	const [editMode, setEditMode] = useState(false);
	
	useEffect(() => {
		updateBoard(group._id);
	}, [toggleFormOverlay, editMode]);
	
	
	const toggleEditMode = () => {
		setEditMode((prev) => !prev);
	}
	
  const onClickEdit = (event, board) => {
		if (board.writerId._id === userData._id) {
			toggleEditMode();
    } else {
      message.error("작성자가 아닙니다.");
    }
  }
  const confirm = (e, board) => {
    if (board.writerId._id === userData._id) {
      dispatch(removeBoard({ boardId: board._id }))
      .then((response) => {
        if (response.payload.success) {
					console.log(response.payload);
					updateBoard(group._id);
          //setBoardLists(BoardLists.filter((item) => item._id !== board._id));
        } else {
          alert("게시글 삭제에 실패했습니다.");
        }
      });
    } else {
      message.error("작성자가 아닙니다.");
    }
  }

  const cancel = (e) => {
    message.error("취소하였습니다.");
  }

	if (boardData === undefined) {
		return <div>데이터 불러오는 중</div>
	} else {
		const boardList = boardData.boards;
		console.log(boardList);
		return (
			<>
				<Button
					variant="contained"
					onClick={onFormOverlayToggle}
					color="secondary"
					style={{
						borderRadius: '0.5rem',
						width: '11rem',
						height: '2.5rem',
						textTransform: 'none',
						marginTop: '1rem',
						position: 'absolute',
						right: '7%',
					}}  
				>
					<Typography sx={{
						mr: 1,
						fontSize: '1rem',
					}}>
						게시글작성
					</Typography>
					<CreateIcon />
				</Button>
				<Box sx={{
					ml: '20%',
					mr: '30%',
				}}>
					<Typography
						sx={{
							fontSize: '2rem',
							fontWeight: 'bold',
						}}
					>
						{group.groupName}
					</Typography>

					<Box
						sx={{
							color: '#5E5E5E',
							display: 'flex',
						}}
					>
						<PersonIcon width="1rem" height="1rem" sx={{ mr: 0.5 }} />
						<Typography
							component={Box}
							sx={{
								fontWeight: 'bold',
								py: '2px',
							}}
						>
							{group.members.length}
							/30
						</Typography>
					</Box>
				</Box>

				<Box
					sx={{
						mt: 2,
						mx: 6,
						p: 4,
						borderTop: '1px solid #5E5E5E',
					}}
				>
					<Grid container spacing={4}
						sx={{
							'& .MuiGrid-root': {
								p: 2,
							},
						}}
					>
						<Grid item xs={5}>
							<GrayBox sx={{display: 'flex'}}>
								<Typography sx={{
									mr: 1,
									fontSize: '1.2rem',
									fontWeight: 'bold',
								}}>
									그룹 전체 랭킹
								</Typography>
								<EqualizerIcon sx={{color: '#5E5E5E'}}/>
							</GrayBox>
						</Grid>

						<Grid item xs={7}>
							<GrayBox >
								<Avatar
									alt="Group Profile Picture"
									sx={{
										width: '3.5rem',
										height: '3.5rem',
									}}
									src={localStorage.getItem('image')}
								/>
								<Typography>유저 이름</Typography>
								<Box
									sx={{
										display: 'flex',
									}}
								>
									<Typography>5시간</Typography>
									<PublicIcon />
								</Box>
							</GrayBox>
						</Grid>

						<Grid item xs={5}>
							<GrayBox sx={{display: 'flex'}}>
								<Typography sx={{
									mr: 1,
									fontSize: '1.2rem', 
									fontWeight: 'bold',
								}}>
									정보
								</Typography>
								<PersonIcon sx={{color: '#5E5E5E'}}/>
							</GrayBox>
						</Grid>
					</Grid>
				</Box>

				{	boardList &&
					boardList.map((board, index) => (
						<React.Fragment>
							<h2>제목 : {board.title}</h2>
							<Button
								onClick={(e) => {
									onClickEdit(e, board);
								}}
							>
								<EditOutlinedIcon />
								수정하기
							</Button>
							<Popconfirm
								title="게시글을 정말로 삭제 하시겠습니까?"
								onConfirm={(e) => {
									confirm(e, board);
								}}
								onCancel={cancel}
								okText="Yes"
								cancelText="No"
							>
								<CloseOutlinedIcon /> 삭제하기
							</Popconfirm>
							<h3>
								작성자 : {board.writerId.name} 작성일 : {board.posted}
							</h3>
							<h3>내용 : {board.content}</h3>
							{editMode && (
								<form style={{ display: "flex", marginLeft: "40px" }}>
									<EditBoard
										board={board}
										toggleEditMode={toggleEditMode}
									/>
									<br />
								</form>
							)}
							<Comment boardId={board._id} />
						</React.Fragment>
				))}
			</>
		);
	}
  
}
