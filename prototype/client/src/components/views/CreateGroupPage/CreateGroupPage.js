import React, {useState} from "react";
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
	const [Tags, setTags] = useState([]);
  const onFinish = (values) => {
    setTags(values.tags);
  };
  return (
    <Formik
      initialValues={{
        groupName: "",
        category: "",
        tags: [],
        info: "",
      }}
      validationSchema={Yup.object().shape({
        category: Yup.string().required("Category is required"),
        groupName: Yup.string().required("Group Name is required"),
        tags: Yup.array(),
        info: Yup.string().min(6, "Info must be at least 6 characters"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
			if(Tags.length === 0) alert('Tag is required');
			else {
				let dataToSubmit = {
            groupName: values.groupName,
            tags: Tags,
            category: values.category,
            info: values.info,
          };

          Axios.post('/api/groups/create', dataToSubmit).then((response) => {
            if (response.data.success) {
              props.history.push(`/groups/${response.data.group._id}`);
            } else {
              alert(response.data.err.errmsg);
            }
          });

          
			}
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
              <Form
                name="dynamic_form_item"
                {...formItemLayoutWithOutLabel}
                onFinish={onFinish}
              >
                <Form.List
                  name="tags"
                  rules={[
                    {
                      validator: async (_, tags) => {
                        if (!tags || tags.length < 1) {
                          return Promise.reject(
                            new Error("At least 1 tags")
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item
                          {...(index === 0
                            ? formItemLayout
                            : formItemLayoutWithOutLabel)}
                          label={index === 0 ? "Tags" : ""}
                          required={false}
                          key={field.key}
                        >
                          <Form.Item
                            {...field}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message:
                                  "Please input tag's name or delete this field.",
                              },
                            ]}
                            noStyle
                          >
                            <Input
                              placeholder="tag name"
                              style={{ width: "60%" }}
                            />
                          </Form.Item>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          style={{ width: "60%" }}
                          icon={<PlusOutlined />}
                        >
                          Add Tag
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    태그 완료
                  </Button>
                </Form.Item>
              </Form>

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
