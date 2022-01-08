import React, { useState, useEffect } from "react";
import Axios from "axios";
import Comment from "./Comment";
import { EditOutlined } from "@ant-design/icons";
import EditBoard from "./EditBoard";
import { Row, Col } from "antd";
import NewBoard from "./NewBoard";

function Board(props) {
  const groupId = props.groupId;
  const [BoardLists, setBoardLists] = useState([]);
  const [OpenEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    Axios.post("/api/board/group", { groupId: groupId }).then((response) => {
      if (response.data.success) {
        setBoardLists(response.data.boards);
      } else {
        alert("게시글 불러오기를 실패했습니다.");
      }
    });
  }, []);

  const onClickEdit = () => {
    setOpenEdit(!OpenEdit);
  };
  const editFunction = (board) => {
    setOpenEdit(!OpenEdit);
    setBoardLists(BoardLists =>
      BoardLists.map((item) => {
        if (item._id === board.boardId) {
          item.title = board.title;
          item.content = board.content;
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
                      <span onClick={onClickEdit}>
                        <EditOutlined />
                        수정하기
                      </span>
                      <h3>
                        작성자 : {board.writerId.name} 작성일 : {board.posted}
                      </h3>
                      <h3>내용 : {board.content}</h3>
                      {OpenEdit && (
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
