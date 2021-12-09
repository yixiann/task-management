import React from "react";
import { Row, Col, Input, Radio } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const SearchBarAndButtons = ({ language, searchData, setVisible }) => {
  return (
    <Row style={{ marginBottom: "20px" }} justify="space-between">
      <Col className="search-bar" span={10}>
        <Input
          prefix={<SearchOutlined />}
          placeholder={language.text.search}
          onChange={searchData}
        />
      </Col>
      <Col>
        <Radio.Group value={"large"}>
          <Radio.Button value="manageTags" onChange={() => setVisible(true)}>
            {language.button.manageTags}
          </Radio.Button>
          <Radio.Button value="createTask">
            <Link to="/task/create">{language.button.createTask}</Link>
          </Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  );
};

export default SearchBarAndButtons;
