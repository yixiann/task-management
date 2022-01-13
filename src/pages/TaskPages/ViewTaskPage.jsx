import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import TaskDetails from "../../components/TaskPage/TaskDetails";
import { ErrorSwal } from "../../components/UI/ConfirmationSwal";
import { AppAction, TagAction, TaskAction } from "../../redux/action_creators";
import { TaskHeaders } from "./TaskHeader";

export const ViewTaskPage = ({
  language,
  location,
  resetReducerTask,
  resetReducerTag,
  updateLanguage,

  fetchByIdTask,
  taskFetchByIdData,
  taskFetchByIdSuccess,
  taskFetchByIdFail,

  fetchAllTag,
  tagFetchAllData,
  tagFetchAllSuccess,
  tagFetchAllFail,

  tagsState,
  createTag,
  editTag,
  deleteTag,
  ...props
}) => {
  const tagsFn = {
    resetReducerTag,
    fetchAllTag,
    createTag,
    editTag,
    deleteTag,
  };
  // Loading spinner
  const [loading, setLoading] = useState(true);

  // Redirect to overview page after viewing task
  const [redirect, setRedirect] = useState(false);

  // Fetch Task
  const id = new URLSearchParams(window.location.search).get("id");
  useEffect(() => {
    window.localStorage.setItem("TaskForm", "");
    setLoading(true);
    fetchByIdTask(id);
    return () => resetReducerTask();
  }, []);

  useEffect(() => {
    if (taskFetchByIdData !== [] && tagFetchAllSuccess) {
      setLoading(false);
    }
  }, [taskFetchByIdData,tagFetchAllSuccess, id]);

  // Fetch Tags
  useEffect(() => {
    setLoading(true);
    if (!tagFetchAllSuccess) {
      fetchAllTag();
    } 
    if (tagFetchAllFail) {
      ErrorSwal(language, language?.message.tagFetchFail);
    }
  }, [tagFetchAllSuccess, tagFetchAllData]);

  useEffect(() => {
    if (taskFetchByIdFail) {
      ErrorSwal(language, language?.message.taskFetchFail);
      setRedirect(true);
    }
  }, [taskFetchByIdSuccess, taskFetchByIdFail]);

  return (
    <div className="overview">
      <TaskHeaders
        language={language}
        pageName={language?.title.viewTask}
        button={true}
        tagsState={tagsState}
        tagsFn={tagsFn}
        updateLanguage={updateLanguage}
      />
      <TaskDetails
        language={language}
        taskDetails={taskFetchByIdData}
        tagsData={tagFetchAllData}
        loading={loading}
      />
      {redirect && <Navigate to={`/overview`} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  taskFetchByIdData: state.task.fetchByIdData,
  taskFetchByIdSuccess: state.task.fetchByIdSuccess,
  taskFetchByIdFail: state.task.fetchByIdFail,

  tagFetchAllData: state.tag.fetchAllData,
  tagFetchAllSuccess: state.tag.fetchAllSuccess,
  tagFetchAllFail: state.tag.fetchAllFail,
  tagsState: state.tag,
});

const mapDispatchToProps = {
  resetReducerTask: TaskAction.resetReducer,
  fetchByIdTask: TaskAction.fetchByIdTask,
  updateLanguage: AppAction.updateLanguage,

  resetReducerTag: TagAction.resetReducer,
  fetchAllTag: TagAction.fetchAllTag,
  createTag: TagAction.createTag,
  editTag: TagAction.editTag,
  deleteTag: TagAction.deleteTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskPage);
