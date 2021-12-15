import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Form } from "antd";
import TaskForm from "../../components/TaskPage/TaskForm";
import TaskHeaders from "./TaskHeader";
import { TagAction, TaskAction } from "../../redux/action_creators";
import { ErrorSwal, SuccessSwal } from "../../components/UI/ConfirmationSwal";
import { checkForDuplicates } from "../../utils";

export const CreateTaskPage = ({
  language,
  resetReducerTask,
  resetReducerTag,

  createTask,
  taskCreateSuccess,
  taskCreateFail,

  fetchAllTask,
  taskFetchAllData,
  taskFetchAllSuccess,
  taskFetchAllFail,

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
  // Form logic
  const [form] = Form.useForm();

  // Redirect to overview page after creation of task
  const [redirect, setRedirect] = useState(false);

  // Fetch Tags
  useEffect(() => {
    if (!tagFetchAllSuccess) {
      fetchAllTag();
    }
    if (tagFetchAllFail) {
      ErrorSwal(language, language.message.tagFetchFail);
    }
  }, [tagFetchAllSuccess, tagFetchAllData]);

  // Create Task
  const handleCreateTask = () => {
    form.validateFields().then(() => {
      if (
        checkForDuplicates(
          taskFetchAllData,
          "taskName",
          form.getFieldValue("taskName")
        )
      ) {
        ErrorSwal(language, language.message.taskExist);
      } else {
        createTask(form.getFieldValue());
      }
    });
  };

  useEffect(() => {
    if (taskCreateSuccess) {
      SuccessSwal(language, language.message.taskCreateSuccess);
      resetReducerTask();
      setRedirect(true);
    }
    if (taskCreateFail) {
      ErrorSwal(language, language.message.taskCreateFail);
    }
  }, [taskCreateSuccess, taskCreateFail]);

  // Fetch All Task For Validation
  useEffect(() => {
    if (!taskFetchAllSuccess) {
      fetchAllTask();
    }
    if (taskFetchAllFail) {
      ErrorSwal(language, language.message.taskFetchFail);
      resetReducerTag();
    }
  }, [taskFetchAllSuccess, taskFetchAllData]);

  return (
    <div className="create-task">
      <TaskHeaders
        language={language}
        pageName={language.title.createTask}
        button={true}
        tagsState={tagsState}
        tagsFn={tagsFn}
      />
      <TaskForm
        language={language}
        form={form}
        createTask={handleCreateTask}
        tagsData={tagFetchAllData}
        loading={false}
      />
      {redirect && <Navigate to="/overview" />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  taskCreateSuccess: state.task.createSuccess,
  taskCreateFail: state.task.createFail,
  taskFetchAllData: state.task.fetchAllData,
  taskFetchAllSuccess: state.task.fetchAllSuccess,
  taskFetchAllFail: state.task.fetchAllFail,

  tagFetchAllData: state.tag.fetchAllData,
  tagFetchAllSuccess: state.tag.fetchAllSuccess,
  tagFetchAllFail: state.tag.fetchAllFail,
  tagsState: state.tag,
});

const mapDispatchToProps = {
  resetReducerTask: TaskAction.resetReducer,
  fetchAllTask: TaskAction.fetchAllTask,
  createTask: TaskAction.createTask,

  resetReducerTag: TagAction.resetReducer,
  fetchAllTag: TagAction.fetchAllTag,
  createTag: TagAction.createTag,
  editTag: TagAction.editTag,
  deleteTag: TagAction.deleteTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskPage);
