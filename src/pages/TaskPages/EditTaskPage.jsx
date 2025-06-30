import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from "antd";
import TaskForm from "../../components/TaskPage/TaskForm";
import { TaskHeaders } from "./TaskHeader";
import {
  ConfirmationSwal,
  ErrorSwal,
  SuccessSwal,
} from "./../../components/UI/ConfirmationSwal";
import { AppAction, TagAction, TaskAction } from "../../redux/action_creators";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const EditTaskPage = ({
  language,
  resetReducerTask,
  resetReducerTag,
  updateLanguage,

  fetchByIdTask,
  taskFetchByIdData,
  taskFetchByIdSuccess,

  editTask,
  taskEditSuccess,
  taskEditFail,

  deleteTask,
  taskDeleteSuccess,
  taskDeleteFail,

  fetchAllTag,
  tagFetchAllData,
  tagFetchAllSuccess,
  tagFetchAllFail,

  tagsState,
  createTag,
  editTag,
  deleteTag,
}) => {
  const tagsFn = {
    resetReducerTag,
    fetchAllTag,
    createTag,
    editTag,
    deleteTag,
  };
  // Form logic and loading spinner
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Redirect to respective pages after edit or delete of task
  const [redirectEdit, setRedirectEdit] = useState(false);
  const [redirectDelete, setRedirectDelete] = useState(false);

  // Fetch Task
  const [taskDetails, setTaskDetails] = useState(taskFetchByIdData);
  useEffect(() => {
    var id = new URLSearchParams(window.location.search).get("id");
    if (id !== taskDetails.id || !!taskDetails.id) {
      setLoading(true);
      fetchByIdTask(id);
    }
    return () => resetReducerTask();
  }, []);

  useEffect(() => {
    if (taskFetchByIdSuccess) {
      setTaskDetails(taskFetchByIdData);
      setLoading(false);
      resetReducerTask();
    }
  }, [taskFetchByIdSuccess]);

  // Fetch Tags
  useEffect(() => {
    if (!tagFetchAllSuccess) {
      fetchAllTag();
    }
    if (tagFetchAllFail) {
      ErrorSwal(language, language?.message.failedFetchTags);
    }
  }, [tagFetchAllSuccess, tagFetchAllData]);

  // Edit Task
  const handleEditTask = () => {
    form.validateFields().then(() => {
      setLoading(true);
      editTask({
        ...form.getFieldValue(),
        id: taskDetails.id,
        deadline: dayjs(form.getFieldValue("deadline")).utc().format(),
      });
    });
  };

  // Delete Task
  const handleDeleteTask = () => {
    ConfirmationSwal({
      title: language?.message.confirmDeletion,
      text: language?.message.actionIrreversible,
      confirmButtonText: language?.message.deleteForever,
      confirmFn: () => {
        setLoading(true);
        deleteTask(taskDetails.id);
      },
      afterFn: () => setRedirectDelete(true),
      afterTitle: language?.message.successfullyDeleted,
      failTitle: language?.message.failedToDelete,
    });
  };

  // Handle After-Effects Of Actions
  useEffect(() => {
    if (taskEditSuccess) {
      SuccessSwal(language, language?.message.taskEditSuccess);
      setRedirectEdit(true);
    }
    if (taskEditFail) {
      ErrorSwal(language, language?.message.taskEditFail);
    }
    if (taskDeleteSuccess) {
      SuccessSwal(language, language?.message.taskDeleteSuccess);
      setRedirectDelete(true);
    }
    if (taskDeleteFail) {
      ErrorSwal(language, language?.message.taskDeleteFail);
    }
  }, [taskEditSuccess, taskEditFail, taskDeleteSuccess, taskDeleteFail]);

  return (
    <div className="edit-task">
      <TaskHeaders
        language={language}
        pageName={language?.title.editTask}
        button={true}
        tagsState={tagsState}
        tagsFn={tagsFn}
        updateLanguage={updateLanguage}
      />
      <TaskForm
        language={language}
        form={form}
        createTask={handleEditTask}
        deleteTask={handleDeleteTask}
        tagsData={tagFetchAllData}
        taskDetails={taskDetails}
        loading={loading}
        tagsSuccess={tagFetchAllSuccess}
      />
      {redirectEdit && <Navigate to={`/task/details?id=${taskDetails.id}`} />}
      {redirectDelete && <Navigate to={`/overview`} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  taskFetchByIdData: state.task.fetchByIdData,
  taskFetchByIdSuccess: state.task.fetchByIdSuccess,
  taskFetchByIdFail: state.task.fetchByIdFail,
  taskEditSuccess: state.task.editSuccess,
  taskEditFail: state.task.editFail,
  taskDeleteSuccess: state.task.deleteSuccess,
  taskDeleteFail: state.task.deleteFail,

  tagFetchAllData: state.tag.fetchAllData,
  tagFetchAllSuccess: state.tag.fetchAllSuccess,
  tagFetchAllFail: state.tag.fetchAllFail,
  tagsState: state.tag,
});

const mapDispatchToProps = {
  updateLanguage: AppAction.updateLanguage,
  resetReducerTask: TaskAction.resetReducer,
  fetchByIdTask: TaskAction.fetchByIdTask,
  editTask: TaskAction.editTask,
  deleteTask: TaskAction.deleteTask,

  resetReducerTag: TagAction.resetReducer,
  fetchAllTag: TagAction.fetchAllTag,
  createTag: TagAction.createTag,
  editTag: TagAction.editTag,
  deleteTag: TagAction.deleteTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskPage);
