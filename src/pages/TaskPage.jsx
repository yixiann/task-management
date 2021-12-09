import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { PageHeader, Form, Breadcrumb, Typography } from "antd";
import TaskForm from "../components/TaskPage/TaskForm";
import { fakeTagsData } from "./fakeData";

export const TaskPage = ({ language, ...props }) => {
  const [ form ] = Form.useForm();
  const [ redirect, setRedirect ] = useState(false);
  const [tagsData, setTagsData] = useState([]);
  
  const { Title } = Typography;

  const createTask = () => {
    console.log("CREATE", form.getFieldValue());
    setRedirect(true);
  };

  useEffect(() => {
    setTagsData(fakeTagsData);
  }, []);

  return (
    <div className="overview">
      <PageHeader className="site-page-header" title={language.title.taskManagement} />
      <Breadcrumb separator=">" style={{ margin: "0px 24px" }}>
        <Breadcrumb.Item href="/overview">{language.title.overviewPage}</Breadcrumb.Item>
        <Breadcrumb.Item>{language.title.createTask}</Breadcrumb.Item>
      </Breadcrumb>
      <Title
        className="site-page-header"
        level={5}
        style={{ margin: "24px" }}
      >
        {language.title.createTask}
      </Title>
      <TaskForm
        language={language}
        form={form}
        createTask={createTask}
        tagsData={tagsData}
      />
      { redirect && <Navigate to="/overview"/>}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
