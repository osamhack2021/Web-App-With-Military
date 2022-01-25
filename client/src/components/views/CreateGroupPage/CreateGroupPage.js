import React, { useState } from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Form, Input, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};




function CreateGroup(props) {
	const [category, setCategory] = useState('');

  const categoryChange = (event) => {
    setCategory(event.target.value);
  };
	
  return (
    <Formik
      initialValues={{
        groupName: "",
        info: "",
      }}
      validationSchema={Yup.object().shape({
        groupName: Yup.string().required("Group Name is required"),
        info: Yup.string().min(6, "Info must be at least 6 characters"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
				let dataToSubmit = {
            groupName: values.groupName,
            category: category,
            info: values.info,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          Axios.post('/api/groups/create', dataToSubmit).then((response) => {
            if (response.data.success) {
              props.history.push(`/groups/${response.data.group._id}`);
            } else {
              alert(response.data.err.errmsg);
            }
          });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app">
            <h2>스터디 그룹 생성</h2>
            <Form
              style={{ minWidth: "375px" }}
              {...formItemLayout}
              onSubmit={handleSubmit}
            >
              <Form.Item required label="카테고리">
				  <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">카테고리를 선택 해주세요.</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="카테고리"
          onChange={categoryChange}
        >
          <MenuItem value={"language"}>어학</MenuItem>
          <MenuItem value={"programming"}>프로그래밍</MenuItem>
			<MenuItem value={"exam"}>시험대비</MenuItem>
          <MenuItem value={"activity"}>운동/교양</MenuItem>
			<MenuItem value={"anything"}>자율</MenuItem>
        </Select>
      </FormControl>
    </Box>
              </Form.Item>

              <Form.Item
                required
                label="Group Name"
                hasFeedback
                validateStatus={
                  errors.groupName && touched.groupName ? "error" : "success"
                }
              >
                <Input
                  id="groupName"
                  placeholder="Enter your Group Name"
                  type="groupName"
                  value={values.groupName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.groupName && touched.groupName
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.groupName && touched.groupName && (
                  <div className="input-feedback">{errors.groupName}</div>
                )}
              </Form.Item>

        

              <Form.Item required label="Info" hasFeedback>
                <Input
                  id="info"
                  placeholder="Enter your Group Info"
                  type="info"
                  value={values.info}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.info && touched.info
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.info && touched.info && (
                  <div className="input-feedback">{errors.info}</div>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default CreateGroup;
