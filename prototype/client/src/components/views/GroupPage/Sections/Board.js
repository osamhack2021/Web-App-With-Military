import React from "react";
import Comment from "./Comment";

function GroupPage(props) {

  return (
    <div>
      {props.BoardLists &&
        props.BoardLists.map((board, index) => (
          <React.Fragment>
            <h2>제목 : {board.title}</h2>
            <h3>작성자 : {board.writerId.name}</h3>
            <h3>작성일 : {board.posted}</h3>
            <h3>내용 : {board.content}</h3>
            <Comment
              boardId={board._id}
            />
          </React.Fragment>
        ))}
    </div>
  );
}

export default GroupPage;
