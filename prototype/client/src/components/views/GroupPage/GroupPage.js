import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col, List, Avatar } from "antd";
import NewBoard from "./Sections/NewBoard";
import Board from "./Sections/Board";

function GroupPage(props) {
  const groupId = props.match.params.groupId;
  const variable = { groupId: groupId };
  const [GroupInfo, setGroupInfo] = useState([]);
  const [Tags, setTags] = useState([]);
  const [BoardLists, setBoardLists] = useState([]);

  useEffect(() => {
    Axios.post("/api/groups/profile", { groupId: groupId }).then((response) => {
      if (response.data.success) {
        setGroupInfo(response.data.group);
        setTags(response.data.group.tags);
      } else {
        alert("그룹정보 가져오기를 실패했습니다.");
      }
    });

    Axios.post("/api/board/group", variable).then((response) => {
      if (response.data.success) {
        setBoardLists(response.data.boards);
      } else {
        alert("게시글 정보를 가져오는 것을 실패했습니다.");
      }
    });
  }, []);

  const refreshFunction = (newBoard) => {
    setBoardLists(BoardLists.concat(newBoard));
  };

  return (
    <div>
      {GroupInfo && (
        <div>
          <h1> 그룹 이름 : {GroupInfo.groupName} </h1>
          <h2> 그룹 설명 : {GroupInfo.Info} </h2>
          <h2> 카테고리 : {GroupInfo.category} </h2>
          <h2> 전체 공부 시간 : {GroupInfo.totalTime} </h2>
          <h3>태그</h3>
          {Tags.map((tag) => (
            <span>{tag} </span>
          ))}
        </div>
      )}
      {BoardLists && (
        <div>
          <Row>
            <Col lg={18} xs={24}>
              <div style={{ width: "100%", padding: "3rem 4rem" }}>
                {/* Boards */}
                <Board refreshFunction={refreshFunction} BoardLists={BoardLists} groupId={groupId} />
              </div>
            </Col>
          </Row>

          
        </div>
      )}
		  <NewBoard
            refreshFunction={refreshFunction}
            groupId={groupId}
          />
    </div>
  );
}

export default GroupPage;
