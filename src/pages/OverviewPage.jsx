import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Typography } from "antd";
import SearchBarAndButtons from "../components/OverviewPage/SearchBarButtons";
import TaskManagementTable from "../components/OverviewPage/TaskManagementTable";
import fakeData, { fakeTagsData } from "./fakeData";
import { TaskHeaders } from "./TaskPages/TaskHeader";
import { ConfirmationSwal } from "../components/UI/ConfirmationSwal";

export const OverviewPage = ({ language, ...props }) => {
  const { Title } = Typography;

  // Task Management
  const [dataSource, setDataSource] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const editTask = (e) => {
    console.log("EDIT TASK", e);
  };

  const dummyDelete = (item) => {
    console.log("DELETE", item);
  };

  const deleteSelected = (e) => {
    ConfirmationSwal({
      title: language.message.confirmDeletion,
      text: language.message.actionIrreversible,
      confirmButtonText: language.message.deleteForever,
      confirmFn: () => dummyDelete(selectedRows),
      // afterFn: () => setRedirectDelete(true),
      afterTitle: language.message.successfullyDeleted,
      failTitle: language.message.failedToDelete,
    });
    console.log("DELETE", selectedRows);
  };

  // Tags management
  const [tagsData, setTagsData] = useState([]);

  // To update data when retrieved
  useEffect(() => {
    setDataSource(fakeData);
    setFullData(fakeData);
    setTagsData(fakeTagsData);
    setLoading(false);
  }, []);

  // Request
  // Fetch All Task
  // Fetch All Tags

  return (
    <div className="overview">
      <TaskHeaders
        language={language}
        pageName={language.title.taskOverview}
        button={true}
        breadcrumbs={false}
      />
      <div style={{ margin: "0px 40px" }}>
        <SearchBarAndButtons language={language} searchData={searchData} />
        <TaskManagementTable
          language={language}
          dataSource={dataSource}
          fullData={fullData}
          loading={loading}
          editTask={(e) => editTask(e)}
          deleteSelected={(e) => deleteSelected(e)}
          selectedRows={selectedRows}
          setSelectedRows={(e)=>setSelectedRows(e)}
          tagsData={tagsData}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
