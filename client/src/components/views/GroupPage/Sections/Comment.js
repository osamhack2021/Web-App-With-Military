import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadComment, saveComment } from "../../../../_actions/user_actions";
import SingleComment from "./SingleComment";
import { Button, Input } from "antd";


const { TextArea } = Input;

function Comment({ boardId }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.loginUserData);
  const [CommentValue, setCommentValue] = useState("");
  const [CommentLists, setCommentLists] = useState([]);

  useEffect(() => {
    dispatch(loadComment({ boardId: boardId }))
    .then((response) => {
      if (response.payload.success) {
        setCommentLists(response.payload.comments);
      } else {
        alert("코멘트 정보를 가져오는 것을 실패했습니다.");
      }
    });
  }, []);

  const refreshFunction = (comment) => {
    setCommentLists(CommentLists.concat(comment));
  };
  const removeFunction = (commentId) => {
    setCommentLists(CommentLists.filter((item) => item._id !== commentId));
  };

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: CommentValue,
      writerId: userData._id,
      boardId: boardId,
    };

    dispatch(saveComment(variables))
    .then((response) => {
      if (response.payload.success) {
        setCommentValue("");
        refreshFunction(response.payload.result);
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
        CommentLists.map((comment, index) => (
          <React.Fragment>
            <SingleComment
              refreshFunction={refreshFunction}
              removeFunction={removeFunction}
              comment={comment}
              boardId={boardId}
            />
          </React.Fragment>
        ))}

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
