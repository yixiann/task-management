import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PageHeader, Row, Col, Input, Table, Radio, Button, Dropdown, Menu, Typography, Pagination} from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import SearchBarAndButtons from "../components/OverviewPage/SearchBarButtons";
import TaskManagementTable from "../components/OverviewPage/TaskManagementTable";
import fakeData, { fakeTagsData } from "./fakeData";
import TagsManagement from "../components/OverviewPage/TagsManagement/TagsManagement";

export const OverviewPage = ({ language, ...props }) => {
  // Search Logic requires me to store the original copy and filter
  const [dataSource, setDataSource] = useState([]);
  const [fullData, setFullData] = useState([]);

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

  // Tags management
  const [visible, setVisible] = useState(false);
  const [tagsData, setTagsData] = useState([]);

  // To update data when retrieved
  useEffect(() => {
    setDataSource(fakeData);
    setFullData(fakeData);
    setTagsData(fakeTagsData);
  }, []);

  // Request
  // Fetch All Task
  // Fetch All Tags
  // Fetch Task by Id

  const createTask = (e) => {
    console.log("CREATE TASK", e)
  }

  const editTask = (e) => {
    console.log("EDIT TASK", e)
  }

  const deleteTask = (e) => {
    console.log("DELETE TASK", e.value)
  }

  const [ tagName, setTagName ] = useState("");
  const [ tagColour, setTagColour ] = useState("");
  const createTag = () => {
    console.log("CREATE", {tagName: tagName, tagColour: tagColour})
    setTagName("");
    setTagColour("");
  }

  const editTag = (e) => {
    console.log("EDIT TAG", e)
  }

  const deleteTag = (e) => {
    console.log("DELETE TAG", e)
  }

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
          editTask={(e)=>editTask(e)}
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
