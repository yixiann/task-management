import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Form } from "antd";
import TaskForm from "../../components/TaskPage/TaskForm";
import { fakeTagsData } from "../fakeData";
import TaskHeaders from "./TaskHeader";

export const CreateTaskPage = ({ language, ...props }) => {
  const [form] = Form.useForm();
  const [redirect, setRedirect] = useState(false);
  const [tagsData, setTagsData] = useState([]);

  const createTask = () => {
    form.validateFields().then(() => {
      console.log("CREATE", form.getFieldValue());
      setRedirect(true);
    });
  };

  useEffect(() => {
    setTagsData(fakeTagsData);
  }, []);

  return (
    <div className="create-task">
      <TaskHeaders
        language={language}
        pageName={language.title.createTask}
        button={true}
      />
      <TaskForm
        language={language}
        form={form}
        createTask={createTask}
        tagsData={tagsData}
      />
      {redirect && <Navigate to="/overview" />}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskPage);
