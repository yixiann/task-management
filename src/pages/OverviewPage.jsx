import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SearchBarAndButtons from "../components/OverviewPage/SearchBarButtons";
import TaskManagementTable from "../components/OverviewPage/TaskManagementTable";
import { TaskHeaders } from "./TaskPages/TaskHeader";
import {
  ConfirmationSwal,
  ErrorSwal,
  SuccessSwal,
} from "../components/UI/ConfirmationSwal";
import { TagAction, TaskAction } from "../redux/action_creators";

export const OverviewPage = ({
  language,
  resetReducerTask,
  resetReducerTag,

  fetchAllTask,
  taskFetchAllData,
  taskFetchAllSuccess,
  taskFetchAllFail,

  updateTask,
  taskUpdateSuccess,
  taskUpdateFail,
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
  ...props
}) => {
  const tagsFn = { resetReducerTag, fetchAllTag, createTag, editTag, deleteTag };
  // Task Management
  const [dataSource, setDataSource] = useState([]);
  const [fullData, setFullData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const searchData = (e) => {
    const currValue = e.target.value;
    const filteredData = fullData.filter((entry) =>
      Object.keys(entry).some((k) => {
        const keydata =
          entry[k] != null ? entry[k].toString().toLowerCase() : "";
        return keydata.includes(currValue.toLowerCase());
      })
    );
    setDataSource([...filteredData]);
  };

  const handleUpdateTask = (e) => {
    resetReducerTask();
    updateTask(e);
  };

  const handleDeleteTask = (e) => {
    resetReducerTask();
    deleteTask(e);
  };

  const deleteSelected = (e) => {
    ConfirmationSwal({
      title: language.message.confirmDeletion,
      text: language.message.actionIrreversible,
      confirmButtonText: language.message.deleteForever,
      confirmFn: () => handleDeleteTask(selectedRows),
    });
  };

  // Tags Management
  const [tagsData, setTagsData] = useState([]);

  // Initial Fetch All Data
  useEffect(() => {
    fetchAllTask();
    fetchAllTag();
  }, []);

  // Update Data If Success
  useEffect(() => {
    if (taskFetchAllSuccess) {
      setDataSource(taskFetchAllData);
      setFullData(taskFetchAllData);
      // setLoading(false);
    }
    if (taskFetchAllFail) {
      ErrorSwal(language, language.message.taskFetchFail);
    }
    if (tagFetchAllSuccess) {
      setTagsData(tagFetchAllData);
    }
    if (tagFetchAllFail) {
      ErrorSwal(language, language.message.tagFetchFail);
    }
  }, [
    taskFetchAllSuccess,
    taskFetchAllFail,
    tagFetchAllSuccess,
    tagFetchAllFail,
  ]);

  // Handle After-Effects Of Actions
  useEffect(() => {
    if (taskUpdateSuccess) {
      resetReducerTask();
      // setLoading(true);
      fetchAllTask();
    }
    if (taskUpdateFail) {
      ErrorSwal(language, language.message.taskUpdateFail);
      resetReducerTask();
      // setLoading(true);
      fetchAllTask();
    }
    if (taskDeleteSuccess) {
      SuccessSwal(language, language.message.taskDeleteSuccess);
      resetReducerTask();
      // setLoading(true);
      fetchAllTask();
    }
    if (taskDeleteFail) {
      ErrorSwal(language, language.message.taskDeleteFail);
      resetReducerTask();
    }
  }, [taskUpdateFail, taskUpdateSuccess, taskDeleteFail, taskDeleteSuccess]);

  return (
    <div className="overview">
      <TaskHeaders
        language={language}
        pageName={language.title.taskOverview}
        button={true}
        breadcrumbs={false}
        tagsState={tagsState}
        tagsFn={tagsFn}
      />
      <div style={{ margin: "0px 40px" }}>
        <SearchBarAndButtons language={language} searchData={searchData} />
        <TaskManagementTable
          language={language}
          dataSource={dataSource}
          fullData={fullData}
          // loading={loading}
          updateTask={handleUpdateTask}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          deleteSelected={deleteSelected}
          tagsData={tagsData}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  taskFetchAllData: state.task.fetchAllData,
  taskFetchAllSuccess: state.task.fetchAllSuccess,
  taskFetchAllFail: state.task.fetchAllFail,

  taskUpdateSuccess: state.task.updateSuccess,
  taskUpdateFail: state.task.updateFail,
  taskDeleteSuccess: state.task.deleteSuccess,
  taskDeleteFail: state.task.deleteFail,

  tagFetchAllData: state.tag.fetchAllData,
  tagFetchAllSuccess: state.tag.fetchAllSuccess,
  tagFetchFail: state.tag.fetchAllFail,
  tagsState: state.tag,
});

const mapDispatchToProps = {
  resetReducerTask: TaskAction.resetReducer,
  resetReducerTag: TagAction.resetReducer,

  fetchAllTask: TaskAction.fetchAllTask,
  updateTask: TaskAction.updateTask,
  deleteTask: TaskAction.deleteTask,

  fetchAllTag: TagAction.fetchAllTag,
  createTag: TagAction.createTag,
  editTag: TagAction.editTag,
  deleteTag: TagAction.deleteTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
