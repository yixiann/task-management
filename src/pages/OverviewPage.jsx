import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PageHeader } from "antd";
import SearchBarAndButtons from "../components/OverviewPage/SearchBarButtons";
import TaskManagementTable from "../components/OverviewPage/TaskManagementTable";
import fakeData, { fakeTagsData } from "./fakeData";
import TagsManagement from "../components/OverviewPage/TagsManagement/TagsManagement";

export const OverviewPage = ({ language, ...props }) => {
  // Task Management
  const [dataSource, setDataSource] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Tags management
  const [visible, setVisible] = useState(false);
  const [tagsData, setTagsData] = useState([]);
  const [tagName, setTagName] = useState("");
  const [tagColour, setTagColour] = useState("");

  const createTag = () => {
    console.log("CREATE", { tagName: tagName, tagColour: tagColour });
    setTagName("");
    setTagColour("");
  };

  const editTag = (e) => {
    console.log("EDIT TAG", e);
  };

  const deleteTag = (e) => {
    console.log("DELETE TAG", e);
  };

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
      <PageHeader className="site-page-header" title="Task Management" />
      <div style={{ margin: "0px 20px" }}>
        <SearchBarAndButtons
          language={language}
          searchData={searchData}
          setVisible={setVisible}
        />
        <TaskManagementTable
          language={language}
          dataSource={dataSource}
          fullData={fullData}
          loading={loading}
          editTask={(e) => editTask(e)}
        />
        <TagsManagement
          language={language}
          visible={visible}
          setVisible={setVisible}
          tagsData={tagsData}
          tagName={tagName}
          setTagName={setTagName}
          tagColour={tagColour}
          setTagColour={setTagColour}
          createTag={createTag}
          editTag={(e) => editTag(e)}
          deleteTag={(e) => deleteTag(e)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
