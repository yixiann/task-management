import React from "react";
import { Row, Input, Button, Col } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import CsvDownload from "react-json-to-csv";

const DownloadCSV = ({ language, data, fileName }) => {
  return (
    <Row style={{ marginRight: "40px" }} justify="space-between">
      <Col />
      <CsvDownload
        style={{ padding: "0px", border: "none" }}
        data={data}
        filename={fileName}
      >
        <Button type="primary">
          {language?.button.download} <DownloadOutlined style={{ fontSize: "20px" }} />
        </Button>
      </CsvDownload>
    </Row>
  );
};

export default DownloadCSV;
