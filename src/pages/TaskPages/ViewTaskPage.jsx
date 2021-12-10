import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import TaskDetails from "../../components/TaskPage/TaskDetails";
import { ErrorSwal } from "../../components/UI/ConfirmationSwal";
import { TagAction, TaskAction } from "../../redux/action_creators";
import { TaskHeaders } from "./TaskHeader";

export const ViewTaskPage = ({
  language,
  location,
  resetReducerTask,
  resetReducerTag,

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
  const tagsFn = { resetReducerTag, fetchAllTag, createTag, editTag, deleteTag };
  const [redirect, setRedirect] = useState(false);

  // Fetch Task
  useEffect(() => {
    var id = new URLSearchParams(window.location.search).get("id");
    fetchByIdTask(id);
    return () => resetReducerTask();
  }, []);

  // Fetch Tags
  useEffect(() => {
    if (!tagFetchAllSuccess) {
      fetchAllTag();
    }
    if (tagFetchAllFail) {
      ErrorSwal(language, language.message.failedFetchTags);
    }
  }, [tagFetchAllSuccess, tagFetchAllData]);

  // If Fetch Task Fail
  useEffect(() => {
    if (taskFetchByIdFail) {
      ErrorSwal(language, language.message.taskFetchFail);
      setRedirect(true);
    }
  }, [taskFetchByIdSuccess, taskFetchByIdFail]);

  return (
    <div className="overview">
      <TaskHeaders
        language={language}
        pageName={language.title.viewTask}
        button={true}
        tagsState={tagsState}
        tagsFn={tagsFn}
      />
      <TaskDetails
        language={language}
        taskDetails={taskFetchByIdData}
        tagsData={tagFetchAllData}
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
  tagsState: state.tag
});

const mapDispatchToProps = {
  resetReducerTask: TaskAction.resetReducer,
  fetchByIdTask: TaskAction.fetchByIdTask,
  
  resetReducerTag: TagAction.resetReducer,
  fetchAllTag: TagAction.fetchAllTag,
  createTag: TagAction.createTag,
  editTag: TagAction.editTag,
  deleteTag: TagAction.deleteTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskPage);
