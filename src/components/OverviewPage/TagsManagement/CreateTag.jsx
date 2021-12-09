import { Row, Col, Button, Form, Dropdown, Input} from "antd";
import { CustomMenu } from "../../../utils";
import { colours } from "../../../utils/enum";

const CreateTag = ({ 
  language, 
  createTag,
  tagName,
  setTagName,
  tagColour,
  setTagColour
}) => {

  return (
    <>
      <Row style={{margin: "0px", padding: "0px"}} justify="space-between">
        <Col span={11}>
          <Input 
            placeholder="Tag Name"
            style={{ width: "200px" }}
            maxLength={18}
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
        </Col>
        <Col span={6} align="center">
          <CustomMenu
            language={language.colour}
            fields={colours}
            defaultValue={tagColour}
            value={tagColour}
            onSelect={(e) => setTagColour(e)}
          />
        </Col>
        <Col span={6} align="center">
          <Button type="primary" style={{width:"100px", marginLeft: "14px"}} onClick={createTag}>
            {language.button.create}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CreateTag;