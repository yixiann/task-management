import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Breadcrumb, Typography, Divider, Row, Col, Button } from "antd";
import { fakeTagsData } from "../fakeData";
import TagsManagement from "../../components/OverviewPage/TagsManagement/TagsManagement";
import { ConfirmationSwal } from "../../components/UI/ConfirmationSwal";

export const TaskHeaders = ({
  language,
  pageName,
  button,
  breadcrumbs = true,
  ...props
}) => {
  const { Title } = Typography;

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

  const dummyDelete = (item) => {
    console.log("DELETE TAG", item);
  };

  const deleteTag = (e) => {
    ConfirmationSwal({
      title: language.message.confirmDeletion,
      text: language.message.actionIrreversible,
      confirmButtonText: language.message.deleteForever,
      confirmFn: () => dummyDelete(e),
      afterTitle: language.message.successfullyDeleted,
      failTitle: language.message.failedToDelete,
    })
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
      {breadcrumbs && (
        <Breadcrumb separator=">" style={{ margin: "0px 24px" }}>
          <Breadcrumb.Item href="/overview">
            {language.title.taskOverview}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{pageName}</Breadcrumb.Item>
        </Breadcrumb>
      )}
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
      <Divider style={{ margin: "20px"}} />
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
