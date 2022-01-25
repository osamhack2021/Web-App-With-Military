import React from "react";
import { removeComment } from "../../../../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";
import { Comment, Avatar, Popconfirm, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function SingleComment( {
  refreshFunction,
  removeFunction,
  comment,
  boardId 
}) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.loginUserData);
  function confirm(e) {
    if (comment._id === userData._id) {
      dispatch(removeComment({ commentId:comment._id }))
      .then(
        (response) => {
          if (response.payload.success) {
            removeFunction(comment._id);
            message.success("삭제되었습니다.");
          } else {
            alert("댓글 삭제에 실패하였습니다.");
          }
        }
      );
    } else {
      message.error("작성자가 아닙니다.");
    }
  }

  function cancel(e) {
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

export default SingleComment;
