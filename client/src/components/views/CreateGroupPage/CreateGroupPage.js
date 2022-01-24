import React, {useState} from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Axios from 'axios';

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
  return (
    <Formik
      initialValues={{
        groupName: "",
        category: "",
        info: "",
      }}
      validationSchema={Yup.object().shape({
        category: Yup.string().required("Category is required"),
        groupName: Yup.string().required("Group Name is required"),
        info: Yup.string().min(6, "Info must be at least 6 characters"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
				let dataToSubmit = {
            groupName: values.groupName,
            category: values.category,
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
            <h2>Sign up</h2>
            <Form
              style={{ minWidth: "375px" }}
              {...formItemLayout}
              onSubmit={handleSubmit}
            >
              <Form.Item required label="Category">
                <Input
                  id="category"
                  placeholder="Enter your Category"
                  type="text"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.category && touched.category
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.category && touched.category && (
                  <div className="input-feedback">{errors.category}</div>
                )}
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
