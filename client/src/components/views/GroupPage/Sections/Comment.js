import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadComment, saveComment } from "../../../../_actions/user_actions";
import SingleComment from "./SingleComment";
import { Box, Button, Divider, Input } from '@mui/material';

export default function Comment({ boardId, refreshComment }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.loginUserData);
  const [commentValue, setCommentValue] = useState("");
	const [commentList, setCommentList] = useState([]);
	
	const updateComment = (board_id) => {
		dispatch(loadComment({ boardId: board_id }))
		.then((response) => {
			if (response.payload.success) {
				setCommentList(response.payload.comments);
				//console.log(commentList);
			} else {
				alert("게시글 불러오기를 실패했습니다.");
			}
		});
	}
	
  useEffect(() => {
    updateComment(boardId);
  }, [refreshComment]);

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: commentValue,
      writerId: userData._id,
      boardId: boardId,
    };
    dispatch(saveComment(variables))
    .then((response) => {
      if (response.payload.success) {
        setCommentValue("");
				updateComment(boardId);
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };
	
	return (
		<div>
			<p>Replies</p>
			<Divider />
			{commentList &&
				commentList.map((comment) => {
					if (comment.boardId === boardId) {
						return (
							<SingleComment
								key={comment._id}
								comment={comment}
								boardId={boardId}
								updateComment={updateComment}
							/>
						);
					}
				})
			}

			<form style={{ display: "flex" }} onSubmit={onSubmit}>
				<Input
					style={{ width: "100%", borderRadius: "5px" }}
					onChange={handleClick}
					value={commentValue}
					placeholder="코멘트를 작성해 주세요"
					multiline
					rows={2}
				/>
				<br />
				<Button
					size="medium"
					onClick={onSubmit}
					variant="contained"
					color="primary"
				>
					입력
				</Button>
			</form>
		</div>
	);
}
