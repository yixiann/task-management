import React from "react";
import { Row, Col, Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function DataTable({
  columns,
  searchFn,
  dataSource,
  searchValue,
  pagination,
  searchBarText,
  xScroll,
}) {
  return (
    <div className="data-table">
      <Row style={{ marginBottom: "20px" }}>
        <Col className="search-bar" span={10}>
          <Input
            prefix={<SearchOutlined />}
            placeholder={searchBarText}
            value={searchValue}
            onChange={searchFn}
            style={{ borderRadius: "5px" }}
          />
        </Col>
      </Row>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        scroll={{ x: xScroll }}
      />
    </div>
  );
}

export default DataTable;
