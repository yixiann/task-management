import { Row, Col } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import CsvDownload from "react-json-to-csv";

const DownloadCSV = ({ language, data, fileName }) => {
  return (
    <Row style={{ margin: "20px 40px 0px 0px" }} justify="space-between">
      <Col />
      <CsvDownload
        data={data}
        filename={fileName}
        style={{
          backgroundColor: "#1677ff",
          color: "white",
          padding: "6px 18px",
          borderRadius: "6px",
          border: "none",
          fontSize: "14px",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {language?.button.download}
        <DownloadOutlined style={{ fontSize: "20px", marginLeft: "8px" }} />
      </CsvDownload>
    </Row>
  );
};

export default DownloadCSV;
