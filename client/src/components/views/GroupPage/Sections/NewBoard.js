import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveBoard } from "../../../../_actions/user_actions";
import { Button, Input, Form } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function NewBoard({refreshFunction, groupId}) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.loginUserData);
  if (userData !== undefined) {
    console.log(userData._id)
  }
  const [BoardValue, setBoardValue] = useState("");
  const [TitleValue, setTitleValue] = useState("");

  const handleContent = (event) => {
    setBoardValue(event.currentTarget.value);
  };
	const handleTitle = (event) => {
    setTitleValue(event.currentTarget.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      title: TitleValue,
      content: BoardValue,
      writerId: userData._id,
      groupId: groupId,
    };
    dispatch(saveBoard(variables))
    .then((response) => {
      if (response.payload.success) {
        setBoardValue("");
        refreshFunction(response.payload.result);
      } else {
        alert("게시글을 저장하지 못했습니다.");
      }
    });
  };
  return (
    <div>
	<h2>글 쓰기</h2>
      <Form>
        <Form.Item
          label="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={handleTitle}
            value={TitleValue}
            type="text"
            name="title"
			  placeholder="제목을 입력해 주세요."
          />
        </Form.Item>
        <Form.Item
          label="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleContent}
            value={BoardValue}
            placeholder="내용을 입력해 주세요."
          />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" onClick={onSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewBoard;
