import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import { Row, Col, Button } from "antd";
import NewBoard from "./NewBoard";
import Comment from "./Comment";
import EditBoard from "./EditBoard";

function Board(props) {
  const user = useSelector((state) => state.user);
  const groupId = props.groupId;
  const [BoardLists, setBoardLists] = useState([]);

  useEffect(() => {
    Axios.post("/api/board/group", { groupId: groupId }).then((response) => {
      if (response.data.success) {
        setBoardLists(response.data.boards);
      } else {
        alert("게시글 불러오기를 실패했습니다.");
      }
    });
  }, []);

  function onClickEdit(event, board) {
    if (board.writerId._id === user.userData._id) {
      setBoardLists((BoardLists) =>
        BoardLists.map((item) => {
          if (item._id === board._id) {
            item.edit = true;
          }
          return item;
        })
      );
    }
  }
  const editFunction = (board) => {
    setBoardLists((BoardLists) =>
      BoardLists.map((item) => {
        if (item._id === board.boardId) {
          item.title = board.title;
          item.content = board.content;
          item.edit = false;
        }
        return item;
      })
    );
  };

  const refreshFunction = (newBoard) => {
    setBoardLists(BoardLists.concat(newBoard));
  };

  return (
    <div>
      {BoardLists && (
        <div>
          <Row>
            <Col lg={18} xs={24}>
              <div style={{ width: "100%", padding: "3rem 4rem" }}>
                {/* Boards */}
                {BoardLists &&
                  BoardLists.map((board, index) => (
                    <React.Fragment>
                      <h2>제목 : {board.title}</h2>
                      <Button
                        onClick={(e) => {
                          onClickEdit(e, board);
                        }}
                      >
                        <EditOutlined />
                        수정하기
                      </Button>
                      <h3>
                        작성자 : {board.writerId.name} 작성일 : {board.posted}
                      </h3>
                      <h3>내용 : {board.content}</h3>
                      {board.edit && (
                        <form style={{ display: "flex", marginLeft: "40px" }}>
                          <EditBoard
                            board={board}
                            editFunction={editFunction}
                          />
                          <br />
                        </form>
                      )}
                      <Comment boardId={board._id} />
                    </React.Fragment>
                  ))}
              </div>
            </Col>
          </Row>
        </div>
      )}
      <NewBoard refreshFunction={refreshFunction} groupId={groupId} />
    </div>
  );
}

export default Board;
