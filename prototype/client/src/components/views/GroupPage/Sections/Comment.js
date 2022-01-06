import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { Button, Input } from "antd";
const { TextArea } = Input;

function Comment(props) {
  const boardId = props.boardId;
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState("");
  const [CommentLists, setCommentLists] = useState([]);
	
	useEffect(() => {
    Axios.post("/api/comment/", {boardId: boardId}).then((response) => {
      if (response.data.success) {
        setCommentLists(response.data.comments);
      } else {
        alert("코멘트 정보를 가져오는 것을 실패했습니다.");
      }
    });
  }, []);
	const refreshFunction = (comment) => {
    setCommentLists(CommentLists.concat(comment));
  };

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: CommentValue,
      writerId: user.userData._id,
      boardId: boardId,
    };

    Axios.post("/api/comment/save", variables).then((response) => {
      if (response.data.success) {
        setCommentValue("");
        refreshFunction(response.data.result);
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };
  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />

      {/* Coment Lists */}
      {CommentLists &&
        CommentLists.map(
          (comment, index) =>
            (!comment.responseTo && 
              <React.Fragment>
                <SingleComment
                  refreshFunction={refreshFunction}
                  comment={comment}
                  boardId={props.boardId}
                />
                <ReplyComment
                  refreshFunction={refreshFunction}
                  parentCommentId={comment._id}
                  CommentLists={CommentLists}
                  boardId={props.boardId}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={CommentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comment;
