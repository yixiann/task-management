import React from "react";
import { Button, Table, Modal, Typography, PageHeader } from "antd";
import CreateTag from "./CreateTag";
import { CustomMenu } from "../../../utils";
import { colours } from "../../../utils/enum";

const TagsManagement = ({
  language,
  visible,
  setVisible,
  loading,
  tagName,
  setTagName,
  tagColour,
  setTagColour,
  tagsData,
  createTag,
  editTag,
  deleteTag,
}) => {
  const { Paragraph, Title } = Typography;

  const columns = [
    {
      title: language.tagsManagement.tags,
      dataIndex: "tagName",
      key: "tagName",
      width: "300px",
      render: (text, record) => {
        return (
          <Paragraph
            editable={{
              onChange: (e) =>
                editTag({ id: record.id, type: "tagName", value: e }),
              maxLength: 18,
            }}
            style={{ margin: "0px 12px" }}
          >
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: language.tagsManagement.colour,
      dataIndex: "colour",
      key: "colour",
      width: "150px",
      align: "center",
      render: (text, record) => {
        return (
          <CustomMenu
            colour={true}
            language={language.colour}
            fields={colours}
            defaultValue={text}
            onSelect={(e) =>
              editTag({ id: record.id, type: "colour", value: e })
            }
          />
        );
      },
    },
    {
      title: language.tagsManagement.actions,
      dataIndex: "actions",
      key: "actions",
      width: "150px",
      align: "center",
      render: (text, record) => {
        return (
          <Button
            type="primary"
            style={{ width: "100px" }}
            onClick={() => deleteTag(record.id)}
          >
            {language.button.delete}
          </Button>
        );
      },
    },
  ];

  return (
    <div className="tags-management">
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(!visible);
          setTagName("");
          setTagColour("");
        }}
        closable={false}
        footer={false}
        width={600}
        style={{ minWidth: "600px" }}
      >
        <Title level={2}>{language.tagsManagement.manageTags}</Title>
        <Table
          style={{ marginTop: "10px" }}
          loading={loading}
          columns={columns}
          dataSource={tagsData}
          footer={() => (
            <CreateTag
              language={language}
              tagName={tagName}
              setTagName={setTagName}
              tagColour={tagColour}
              setTagColour={setTagColour}
              createTag={createTag}
            />
          )}
        />
      </Modal>
    </div>
  );
};

export default TagsManagement;
