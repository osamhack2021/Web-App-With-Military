import Axios from 'axios';
import React, { useState } from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, FormControl, 
        TextField, Typography, InputLabel, MenuItem, Select } from '@mui/material';

export default function CreateGroup(props) {
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
          handleSubmit,
        } = props;
        return (
          <div className="app">
            <Typography variant="h5">스터디 그룹 생성</Typography>
            <form onSubmit={handleSubmit} style={{ width: 500 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">카테고리 선택</InputLabel>
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

              <TextField
                type="text"
                name="groupName"
                placeholder="Enter your Group Name"
                fullWidth
                required
                sx={{ my: 1 }}
                value={values.groupName}
                onChange={handleChange}
                error={!!errors.groupName && touched.groupName}
                helperText={!!errors.groupName ? errors.groupName : false}
              />

              <TextField
                type="text"
                name="info"
                label="Info"
                placeholder="Enter your Group Info"
                fullWidth
                required
                sx={{ my: 1 }}
                multiline
                rows={5}
                value={values.info}
                onChange={handleChange}
                error={!!errors.info && touched.info}
                helperText={!!errors.info ? errors.info : false}
              />

              <Button
                type="submit"
                sx={{ my: 1 }}
                fullWidth
                variant="contained"
                disabled={isSubmitting}
              >
                그룹 생성
              </Button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}