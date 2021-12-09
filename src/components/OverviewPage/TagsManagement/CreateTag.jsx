import { Row, Col, Button, Form, Dropdown, Input } from "antd";
import { CustomMenu } from "../../../utils";
import { colours } from "../../../utils/enum";

const CreateTag = ({
  language,
  createTag,
  tagName,
  setTagName,
  tagColour,
  setTagColour,
}) => {
  return (
    <>
      <Row justify="space-between">
        <Col span={11}>
          <Input
            placeholder={language.text.tagName}
            style={{ width: "200px" }}
            maxLength={18}
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
        </Col>
        <Col span={6} align="center">
          <CustomMenu
            colour={true}
            language={language.colour}
            fields={colours}
            defaultValue={'none'}
            onSelect={(e) => setTagColour(e)}
          />
        </Col>
        <Col span={6} align="center">
          <Button
            type="primary"
            style={{ width: "100px", marginLeft: "14px" }}
            onClick={createTag}
          >
            {language.button.create}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CreateTag;
