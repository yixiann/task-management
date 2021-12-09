import React, { useState } from "react";
import { connect } from "react-redux";
import TaskDetails from "../../components/TaskPage/TaskDetails";
import { fakeTagsData } from "../fakeData";
import { TaskHeaders } from "./TaskHeader";

export const ViewTaskPage = ({ language, ...props }) => {

  const [taskDetails, setTaskDetails] = useState({
    id: 1,
    taskName: "Task Name hha",
    details: "Some task tasidfgiahuhfdas fibhbhadbfxbsdfbahdsjdfjgwfgbawgghjo do\n\n\n\n\nHaha\n\nlol\n",
    tags: [1, 2],
    deadline: "2021-12-04",
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
        pageName={language.title.viewTask}
        button={true}
      />
      <TaskDetails
        language={language}
        taskDetails={taskDetails}
        tagsData={tagsData}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskPage);
