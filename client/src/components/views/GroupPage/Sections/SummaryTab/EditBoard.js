import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editBoard, saveBoard } from "../../../../../_actions/user_actions";
import { Box, Button, Input } from '@mui/material';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function EditBoard({board, toggleEditMode}) {
  const dispatch = useDispatch();
  const [BoardValue, setBoardValue] = useState(board.content);
  const [TitleValue, setTitleValue] = useState(board.title);
	
  const handleContent = (event) => {
    setBoardValue(event.currentTarget.value);
  };
  const handleTitle = (event) => {
    setTitleValue(event.currentTarget.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const boardToEdit = {
      title: TitleValue,
      content: BoardValue,
      boardId: board._id
    };

    dispatch(editBoard(boardToEdit))
    .then((response) => {
      if (response.payload.success) {
        //editFunction(variables);
        console.log(response.payload);
        toggleEditMode();
      } else {
        alert("게시글을 수정하지 못했습니다.");
      }
    });
  };
  return (
    <Box>
      <h2>수정하기</h2>
      <form onSubmit={onSubmit}>
        <Input
          onChange={handleTitle}
          value={TitleValue}
          type="text"
          name="title"
          placeholder="제목을 입력해 주세요."
          required
        />
        <Input
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleContent}
          value={BoardValue}
          placeholder="내용을 입력해 주세요."
          multiline
          rows={3}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          수정
        </Button>
      </form>
    </Box>
  );
}
