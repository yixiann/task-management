import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Form, Breadcrumb, Typography, Divider, Row, Col, Button } from "antd";
import TaskForm from "../../components/TaskPage/TaskForm";
import { fakeTagsData } from "../fakeData";
import TagsManagement from "../../components/OverviewPage/TagsManagement/TagsManagement";

export const TaskHeaders = ({ language, pageName, button, ...props }) => {

  const {Title} = Typography;

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
    setTagsData(fakeTagsData);
  }, []);

  return (
    <div className="task-header">
      <Title level={2} style={{ margin: "50px 20px 5px 20px" }}>
        {language.title.taskManagement}
      </Title>
      <Breadcrumb separator=">" style={{ margin: "0px 24px" }}>
        <Breadcrumb.Item href="/overview">
          {language.title.overviewPage}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{pageName}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col span={20}>
          <Title
            className="site-page-header"
            level={4}
            style={{ margin: "12px 0px 0px 24px" }}
          >
            {pageName}
          </Title>
        </Col>
        <Col span={4} align="right">
          {button && (
            <Button type="primary" onClick={() => setVisible(true)}>
              {language.button.manageTags}
            </Button>
          )}
        </Col>
      </Row>
      <Divider style={{ margin: "20px" }} />
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
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskHeaders);
