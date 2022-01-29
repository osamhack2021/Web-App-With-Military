import React from "react";
import { removeComment } from "../../../../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";
import { Comment, Popconfirm, message } from "antd";
import { Avatar, Box, Typography } from '@mui/material';
import { CloseOutlined } from "@ant-design/icons";

export default function SingleComment( {
  comment,
  boardId ,
	updateComment
}) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.loginUserData);
	
  const confirm = (e) => {
    if (comment.writerId._id === userData._id) {
      dispatch(removeComment({ commentId:comment._id }))
      .then(
        (response) => {
          if (response.payload.success) {
            message.success("삭제되었습니다.");
						updateComment(boardId);
          } else {
            alert("댓글 삭제에 실패하였습니다.");
          }
        }
      );
    } else {
      message.error("작성자가 아닙니다.");
    }
  }

  const cancel = (e) => {
    message.error("취소하였습니다.");
  }

  const actions = [
    <Popconfirm
      title="댓글을 정말로 삭제 하시겠습니까?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <CloseOutlined /> 삭제하기
    </Popconfirm>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writerId.name}
        avatar={<Avatar src={comment.writerId.image} alt="image" />}
        content={<p> {comment.content}</p>}
      />
    </div>
  );
}
