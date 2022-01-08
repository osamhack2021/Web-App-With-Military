import React from "react";
import { useSelector } from "react-redux";
import { Comment, Avatar, Popconfirm, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Axios from "axios";

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  function confirm(e) {
    if (props.comment._id === user.userData._id) {
      Axios.post("/api/comment/remove", { commentId: props.comment._id }).then(
        (response) => {
          if (response.data.success) {
            props.removeFunction(props.comment._id);
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
    console.log(e);
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
        author={props.comment.writerId.name}
        avatar={<Avatar src={props.comment.writerId.image} alt="image" />}
        content={<p> {props.comment.content}</p>}
      />
    </div>
  );
}

export default SingleComment;
