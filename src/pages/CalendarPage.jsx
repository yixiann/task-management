import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TaskHeaders } from "./TaskPages/TaskHeader";
import { ErrorSwal } from "../components/UI/ConfirmationSwal";
import { AppAction, TagAction, TaskAction } from "../redux/action_creators";
import { Calendar, Badge, Button } from "antd";
import moment from 'moment'

export const CalendarPage = ({
  language,
  resetReducerTask,
  resetReducerTag,
  resetTaskDetails,
  updateLanguage,

  fetchAllTask,
  taskFetchAllData,
  taskFetchAllSuccess,
  taskFetchAllFail,

  tagFetchAllData,
  tagFetchAllSuccess,
  tagFetchAllFail,

  tagsState,
  fetchAllTag,
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

  const [formatData, setFormatData] = useState([]);

  // Initial Fetch All Data
  useEffect(() => {
    resetTaskDetails();
    fetchAllTag();
    fetchAllTask();
  }, []);

  // Update Data If Success
  useEffect(() => {
    const nowDate = new Date();
    if (taskFetchAllSuccess && tagFetchAllSuccess) {
      filterData(nowDate.getMonth(), nowDate.getFullYear());
    }
    if (taskFetchAllFail) {
      ErrorSwal(language, language?.message.taskFetchFail);
    }
    if (tagFetchAllFail) {
      ErrorSwal(language, language?.message.tagFetchFail);
    }
  }, [
    taskFetchAllSuccess,
    taskFetchAllFail,
    tagFetchAllSuccess,
    tagFetchAllFail,
  ]);

  function dateCellRender(value) {
    const date = new Date(value);
    const day = date.getDate();
    const data = formatData.filter((item) => item.day === day);
    return (
      <ul style={{ padding: "0px" }}>
        {data.map((item) => (
          <div style={{ border: "red" }} key={item.id}>
            <a href={`/task/details?id=${item.id}`}>
              <Badge color={item.colour} text={item.taskName} />
            </a>
          </div>
        ))}
      </ul>
    );
  }

  function monthCellRender(value) {
    const date = new Date(value);
    const month = date.getMonth();
    const data = formatData.filter((item) => item.month === month);
    return (
      <ul style={{ padding: "0px" }}>
        {data.map((item) => (
          <div style={{ border: "red" }} key={item.id}>
            <a href={`/task/details?id=${item.id}`}>
              <Badge color={item.colour} text={item.taskName} />
            </a>
          </div>
        ))}
      </ul>
    );
  }

  const handleCalendar = (e) => {
    const pageDate = new Date(e);
    filterData(pageDate.getMonth(), pageDate.getFullYear());
  };

  const filterData = (month, year) => {
    const formatTaskForCalendar = taskFetchAllData
      .map((item) => {
        const date = new Date(item.deadline);
        const colour = tagFetchAllData.filter(
          (tag) => tag.id === item.tagId[0]
        )[0]?.colour;
        return {
          id: item.id,
          taskName: item.taskName,
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          colour: colour ? colour : "black",
        };
      })
      .filter((item) => item.month === month && item.year === year);
    setFormatData(formatTaskForCalendar);
  };

  return (
    <div className="calendar">
      <TaskHeaders
        language={language}
        pageName={language?.title.calendarOverview}
        button={true}
        breadcrumbs={false}
        tagsState={tagsState}
        tagsFn={tagsFn}
        updateLanguage={updateLanguage}
      />
      <Calendar
        onPanelChange={handleCalendar}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
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
  resetReducerTag: TagAction.resetReducer,
  resetTaskDetails: TaskAction.resetTaskDetails,
  updateLanguage: AppAction.updateLanguage,

  fetchAllTask: TaskAction.fetchAllTask,
  fetchAllTag: TagAction.fetchAllTag,
  createTag: TagAction.createTag,
  editTag: TagAction.editTag,
  deleteTag: TagAction.deleteTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
