import React from "react";
import { Row, Button, Col } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import CsvDownload from "react-json-to-csv";

const DownloadCSV = ({ language, data, fileName }) => {
  return (
    <Row style={{ margin: "20px 40px 0px 0px" }} justify="space-between">
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
