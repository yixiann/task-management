import React from "react";
import { Row, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const SearchBarAndButtons = ({ language, searchData }) => {
  return (
    <Row style={{ marginBottom: "20px" }} justify="space-between">
      <Input
        prefix={<SearchOutlined />}
        placeholder={language.text.search}
        onChange={searchData}
        style={{ width: "300px" }}
      />
      <Button type="primary" value="createTask" style={{ width: "200px" }}>
        <Link to="/task/create">{language.button.createTask}</Link>
      </Button>
    </Row>
  );
};

export default SearchBarAndButtons;
