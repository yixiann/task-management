import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Breadcrumb, Typography, Divider, Row, Col, Button } from "antd";
import TagsManagement from "../../components/OverviewPage/TagsManagement/TagsManagement";
import {
  ConfirmationSwal,
  ErrorSwal,
} from "../../components/UI/ConfirmationSwal";
import { TagAction } from "../../redux/action_creators";
import { checkForDuplicates } from "../../utils";

export const TaskHeaders = ({
  language,
  pageName,
  button,
  breadcrumbs = true,
  tagsState,
  tagsFn,
  ...props
}) => {
  const { Title } = Typography;

  const { resetReducerTag, fetchAllTag, createTag, editTag, deleteTag } =
    tagsFn;

  const {
    fetchAllData,
    createSuccess,
    createFail,
    editSuccess,
    editFail,
    deleteSuccess,
    deleteFail,
  } = tagsState;

  // Tags management
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tagsData, setTagsData] = useState();

  useEffect(() => {
    setTagsData(fetchAllData);
    setLoading(false);
  }, [fetchAllData]);

  // Create Tag
  const [tagName, setTagName] = useState("");
  const [tagColour, setTagColour] = useState("");
  const handleCreateTag = () => {
    if(checkForDuplicates(fetchAllData, "tagName", tagName)){
      ErrorSwal(language, language.message.tagExist)
    } else {
      createTag({ tagName: tagName, tagColour: tagColour });
      setTagName("");
      setTagColour("");
    }
  };


  // Edit Tag
  const handleEditTag = (e) => {
    editTag(e);
  };

  // Delete Tag
  const handleDeleteTag = (e) => {
    ConfirmationSwal({
      title: language.message.confirmDeletion,
      text: language.message.actionIrreversible,
      confirmButtonText: language.message.deleteForever,
      confirmFn: () => deleteTag([e]),
      afterTitle: language.message.successfullyDeleted,
      failTitle: language.message.failedToDelete,
    });
  };

  // Handle After-Effects Of Actions
  useEffect(() => {
    if (editSuccess || createSuccess || deleteSuccess) {
      resetReducerTag();
      fetchAllTag();
      setLoading(true);
    }
    if (createFail) {
      ErrorSwal(language, language.message.tagCreateFail);
    }
    if (editFail) {
      ErrorSwal(language, language.message.tagEditFail);
    }
    if (deleteFail) {
      ErrorSwal(language, language.message.tagDeleteFail);
    }
  }, [
    createSuccess,
    editSuccess,
    deleteSuccess,
    createFail,
    editFail,
    deleteFail,
  ]);

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
      <Divider style={{ margin: "20px" }} />
      <TagsManagement
        language={language}
        visible={visible}
        setVisible={setVisible}
        loading={loading}
        tagsData={tagsData}
        tagName={tagName}
        setTagName={setTagName}
        tagColour={tagColour}
        setTagColour={setTagColour}
        createTag={handleCreateTag}
        editTag={handleEditTag}
        deleteTag={handleDeleteTag}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  state: state,
  tagFetchAllData: state.tag.fetchAllData,
  tagFetchAllSuccess: state.tag.fetchAllSuccess,
  tagFetchAllFail: state.tag.fetchAllFail,

  tagCreateSuccess: state.tag.createSuccess,
  tagCreateFail: state.tag.createFail,
  tagEditSuccess: state.tag.editSuccess,
  tagEditFail: state.tag.editFail,
  tagDeleteSuccess: state.tag.deleteSuccess,
  tagDeleteFail: state.tag.deleteFail,
});

const mapDispatchToProps = {
  fetchAllTag: TagAction.fetchAllTag,
  createTag: TagAction.createTag,
  editTag: TagAction.editTag,
  deleteTag: TagAction.deleteTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskHeaders);
