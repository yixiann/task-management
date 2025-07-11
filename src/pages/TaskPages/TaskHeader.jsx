import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Breadcrumb, Typography, Divider, Row, Col, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import TagsManagement from "../../components/OverviewPage/TagsManagement/TagsManagement";
import {
  ConfirmationSwal,
  ErrorSwal,
  SuccessSwal,
} from "../../components/UI/ConfirmationSwal";
import { checkForDuplicates } from "../../utils/utils";
import { Link } from "react-router-dom";
import Settings from "../../components/SettingsModal/SettingsModal";

export const TaskHeaders = ({
  language,
  updateLanguage,
  pageName,
  button,
  breadcrumbs = true,
  tagsState,
  tagsFn,
  overview = false,
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

  // Setting
  const [openSetting, setOpenSetting] = useState(false);

  // Tags management
  const [loading, setLoading] = useState(true);
  const [openTags, setOpenTags] = useState(false);
  const [tagsData, setTagsData] = useState();

  useEffect(() => {
    setTagsData(fetchAllData);
    setLoading(false);
  }, [fetchAllData]);

  // Create Tag
  const [tagName, setTagName] = useState("");
  const [tagColour, setTagColour] = useState("");
  const handleCreateTag = () => {
    if (checkForDuplicates(fetchAllData, "tagName", tagName)) {
      ErrorSwal(language, language?.message.tagExist);
    } else if (tagColour === "") {
      ErrorSwal(language, language?.message.selectColour);
    } else {
      setLoading(true);
      createTag({ tagName: tagName, colour: tagColour });
      setTagName("");
      setTagColour("");
    }
  };

  // Edit Tag
  const handleEditTag = (e) => {
    if (e.record[e.type] !== e.value) {
      const newTagsData = tagsData.map((item) => {
        if (item.id === e.record.id) {
          return {
            ...item,
            [e.type]: e.value,
          };
        } else {
          return item;
        }
      });
      setTagsData(newTagsData);
      setLoading(true);
      editTag(e);
    }
  };

  // Delete Tag
  const handleDeleteTag = (e) => {
    ConfirmationSwal({
      title: language?.message.confirmDeletion,
      text: language?.message.actionIrreversible,
      confirmButtonText: language?.message.deleteForever,
      confirmFn: () => {
        setLoading(true);
        deleteTag([e]);
      },
      afterTitle: language?.message.successfullyDeleted,
      failTitle: language?.message.failedToDelete,
    });
  };

  // Handle After-Effects Of Actions
  useEffect(() => {
    if (editSuccess || createSuccess) {
      resetReducerTag();
      fetchAllTag();
      setLoading(true);
    }
    if (deleteSuccess) {
      SuccessSwal(language, language?.message.tagDeleteSuccess);
      resetReducerTag();
      fetchAllTag();
    }
    if (createFail) {
      ErrorSwal(language, language?.message.tagCreateFail);
      resetReducerTag();
    }
    if (editFail) {
      ErrorSwal(language, language?.message.tagEditFail);
      resetReducerTag();
    }
    if (deleteFail) {
      ErrorSwal(language, language?.message.tagDeleteFail);
      resetReducerTag();
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
        {language?.title.taskManagement}{" "}
        <SettingOutlined onClick={() => setOpenSetting(true)} />
      </Title>
      {breadcrumbs && (
        <Breadcrumb
          style={{ margin: "0px 24px" }}
          items={[
            { title: language?.title.taskOverview, href: "/overview" },
            { title: pageName },
          ]}
        />
      )}
      <Row>
        <Col span={12}>
          <Title
            className="site-page-header"
            level={4}
            style={{ margin: "12px 0px 0px 24px" }}
          >
            {pageName}
          </Title>
        </Col>
        <Col span={12} align="right">
          {button && (
            <Button type="primary" onClick={() => setOpenTags(true)}>
              {language?.button.manageTags}
            </Button>
          )}
          <Button style={{ width: "150px" }}>
            {overview ? (
              <Link to="/calendar">{language.button.calendar}</Link>
            ) : (
              <Link to="/overview">{language.button.overview}</Link>
            )}
          </Button>
        </Col>
      </Row>
      <Divider style={{ margin: "20px" }} />
      <Settings
        language={language}
        updateLanguage={updateLanguage}
        open={openSetting}
        setOpen={setOpenSetting}
      />
      <TagsManagement
        language={language}
        open={openTags}
        setOpen={setOpenTags}
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskHeaders);
