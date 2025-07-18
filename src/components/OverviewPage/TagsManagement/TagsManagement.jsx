import { Button, Table, Modal, Typography } from "antd";
import CreateTag from "./CreateTag";
import { CustomMenu } from "../../../utils/utils";
import { colours } from "../../../utils/enum";

const TagsManagement = ({
  language,
  open,
  setOpen,
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

  const sortedTagsData = [...(tagsData || [])].sort(
    (tag1, tag2) => tag1.id - tag2.id
  );

  const manageTagsColumns = [
    {
      title: language?.tagsManagement.tags,
      dataIndex: "tagName",
      key: "tagName",
      width: "300px",
      render: (text, record) => {
        return (
          <Paragraph
            editable={{
              onChange: (e) => editTag({ record, type: "tagName", value: e }),
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
      title: language?.tagsManagement.colour,
      dataIndex: "colour",
      key: "colour",
      width: "150px",
      align: "center",
      render: (text, record) => {
        return (
          <CustomMenu
            colour={true}
            language={language?.colour}
            fields={colours}
            value={text}
            onSelect={(e) => editTag({ record, type: "colour", value: e })}
          />
        );
      },
    },
    {
      title: language?.tagsManagement.actions,
      dataIndex: "actions",
      key: "actions",
      width: "150px",
      align: "center",
      render: (_, record) => {
        return (
          <Button
            type="primary"
            style={{ width: "100px" }}
            onClick={() => deleteTag(record.id)}
          >
            {language?.button.delete}
          </Button>
        );
      },
    },
  ];

  return (
    <div className="tags-management">
      <Modal
        open={open}
        onCancel={() => {
          setOpen(!open);
          setTagName("");
          setTagColour("");
        }}
        closable={false}
        footer={false}
        width={600}
        style={{ minWidth: "600px" }}
      >
        <Title level={2}>{language?.tagsManagement.manageTags}</Title>
        <Table
          style={{ marginTop: "10px" }}
          loading={loading}
          columns={manageTagsColumns}
          dataSource={sortedTagsData?.map((item) => ({
            ...item,
            key: item.id,
          }))}
          defaultPageSize={5}
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
