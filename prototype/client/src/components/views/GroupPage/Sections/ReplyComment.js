import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';
import { Button } from 'antd';

function ReplyComment(props) {
	
	const [ChildCommentNumber, setChildCommentNumber] = useState(0);
	const [OpenReplyComments, setOpenReplyComments] = useState(false);
	
	useEffect(() => {
		let commentNumber = 0;
		props.CommentLists.map((comment) => {
			if(comment.responseTo === props.parentCommentId) {
				commentNumber++;
			}
		})
		
		setChildCommentNumber(commentNumber);
	}, [props.CommentLists])
	
	let renderReplyComment = (parentCommentId) =>
		props.CommentLists.map((comment, index) => (
			<React.Fragment>
				{comment.responseTo === parentCommentId && 
				 <div style={{ width: '80%', marginLeft: '40px' }}>
					<SingleComment
						 refreshFunction={props.refreshFunction}
						 comment={comment} 
						 boardId={props.boardId}/>
					<ReplyComment 
						 refreshFunction={props.refreshFunction}
						 parentCommentId={comment._id} 
						 CommentLists={props.CommentLists} 
						 boardId={props.boardId} />
				 </div>
				}
			</React.Fragment>
		))
	
	const onHandleChange = () => {
		setOpenReplyComments(!OpenReplyComments)
	}
	
	return(
		<div>
			{ChildCommentNumber > 0 && 
				<Button type="link" style={{fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleChange}>
				View {ChildCommentNumber} more comment(s)
				</Button>
			}
			{OpenReplyComments &&
				renderReplyComment(props.parentCommentId)
			}
		</div>
	)
}

export default ReplyComment