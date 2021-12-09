import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from "antd";
import { fakeTagsData } from "../fakeData";
import TaskForm from "../../components/TaskPage/TaskForm";
import { TaskHeaders } from "./TaskHeader";

export const EditTaskPage = ({ language, ...props }) => {
  const [form] = Form.useForm();
  const [redirectEdit, setRedirectEdit] = useState(false);
  const [redirectDelete, setRedirectDelete] = useState(false);

  const editTask = () => {
    console.log("EDIT", form.getFieldValue(), taskDetails.id);
    setRedirectEdit(true);
  };

  const deleteTask = () => {
    console.log("DELETE", form.getFieldValue());
    setRedirectDelete(true);
  };

  const [taskDetails, setTaskDetails] = useState({
    id: 1,
    taskName: "Task Name hha",
    details:
      "Some task tasidfgiahuhfdas fibhbhadbfxbsdfbahdsjdfjgwfgbawgghjo do\n\n\n\n\nHaha\n\nlol\n",
    tags: [1, 2],
    deadline: "2021-12-04T16:00:00.049Z",
    createdBy: "Me",
    assignedTo: "You",
    priority: "high",
    taskStatus: "inProgress",
  });

  const [tagsData, setTagsData] = useState(fakeTagsData);

  return (
    <div className="overview">
      <TaskHeaders
        language={language}
        pageName={language.title.editTask}
        button={true}
      />
      <TaskForm
        language={language}
        form={form}
        createTask={editTask}
        deleteTask={deleteTask}
        tagsData={tagsData}
        taskDetails={taskDetails}
      />
      {redirectEdit && <Navigate to={`/task/details?id=${taskDetails.id}`} />}
      {redirectDelete && <Navigate to={`/overview`} />}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskPage);
