import React from "react";
import { Row, Col, Input, Radio } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBarAndButtons = ({ language, searchData, setVisible }) => {
  return (
    <Row style={{ marginBottom: "20px" }} justify="space-between">
      <Col className="search-bar" span={10}>
        <Input
          prefix={<SearchOutlined />}
          placeholder={"Search"}
          onChange={searchData}
        />
      </Col>
      <Col>
        <Radio.Group value={"large"}>
          <Radio.Button value="manageTags" onChange={() => setVisible(true)}>
            {language.button.manageTags}
          </Radio.Button>
          <Radio.Button value="deleteTask">
            {language.button.deleteTask}
          </Radio.Button>
          <Radio.Button value="createTask">
            {language.button.createTask}
          </Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  );
};

export default SearchBarAndButtons;
