import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadBoard, removeBoard } from "../../../../_actions/user_actions";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { Row, Col, Button, Popconfirm, message } from "antd";
import NewBoard from "./NewBoard";
import Comment from "./Comment";
import EditBoard from "./EditBoard";

function Board({ groupId }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.loginUserData);
  //const userId = localStorage.getItem('userId')
  const [BoardLists, setBoardLists] = useState([]);

  useEffect(() => {
    dispatch(loadBoard({ groupId: groupId }))
    .then((response) => {
      if (response.payload.success) {
        setBoardLists(response.payload.boards);
      } else {
        alert("게시글 불러오기를 실패했습니다.");
      }
    });
  }, []);

  function onClickEdit(event, board) {
    if (board.writerId._id === userData._id) {
      setBoardLists((BoardLists) =>
        BoardLists.map((item) => {
          if (item._id === board._id) {
            item.edit = true;
          }
          return item;
        })
      );
    } else {
      message.error("작성자가 아닙니다.");
    }
  }
  function confirm(e, board) {
    if (board.writerId._id === userData._id) {
      dispatch(removeBoard({ boardId: board._id }))
      .then((response) => {
        if (response.payload.success) {
          setBoardLists(BoardLists.filter((item) => item._id !== board._id));
        } else {
          alert("게시글 삭제에 실패했습니다.");
        }
      });
    } else {
      message.error("작성자가 아닙니다.");
    }
  }

  function cancel(e) {
    message.error("취소하였습니다.");
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
			{/* {BoardLists && (
        <div>
          <Row>
            <Col lg={18} xs={24}>
              <div style={{ width: "100%", padding: "3rem 4rem" }}>
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
                      <Popconfirm
                        title="게시글을 정말로 삭제 하시겠습니까?"
                        onConfirm={(e) => {
                          confirm(e, board);
                        }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <CloseOutlined /> 삭제하기
                      </Popconfirm>
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
			*/}
      <NewBoard 
       refreshFunction={refreshFunction}
       groupId={groupId} />
    </div>
  );
}

export default Board;
