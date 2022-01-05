import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { Button, Input, Form, InputNumber } from "antd";
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function NewBoard(props) {
  const groupId = props.groupId;
  const user = useSelector((state) => state.user);
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
      writerId: user.userData._id,
      groupId: groupId,
    };

    Axios.post("/api/board/save", variables).then((response) => {
      if (response.data.success) {
        setBoardValue("");
        props.refreshFunction(response.data.result);
      } else {
        alert("게시글을 저장하지 못했습니다.");
      }
    });
  };
  return (
    <div>
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
            placeholder="게시글을 작성해 주세요"
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
