import React, { useEffect, useState } from "react";
import Axios from "axios";

function GroupPage(props) {
  const groupId = props.match.params.groupId;
  const [GroupInfo, setGroupInfo] = useState([]);
	const [Tags, setTags] = useState([]);

  useEffect(() => {
    Axios.post("/api/groups/profile", { groupId: groupId }).then((response) => {
      if (response.data.success) {
        setGroupInfo(response.data.group);
		  setTags(response.data.group.tags);
      } else {
        alert("그룹정보 가져오기를 실패했습니다.");
      }
    });
  }, []);

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
              <span>
                {tag}
                {' '}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}

export default GroupPage;
