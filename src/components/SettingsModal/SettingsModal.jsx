import React from "react";
import { Modal, Typography, Select, Row, Col } from "antd";
import { LanguageCode } from "../../constants/Languages";

const Settings = ({ language, updateLanguage, visible, setVisible }) => {
  const { Title } = Typography;
  const { Option } = Select;

  const handleLanguageChange = (e) => {
    updateLanguage(e);
  };

  return (
    <div className="settings">
      <Modal
        visible={visible}
        onCancel={() => setVisible(!visible)}
        closable={false}
        footer={false}
        width={600}
        style={{ minWidth: "600px" }}
      >
        <Title level={2}>{language?.settings.settings}</Title>
        <Row>
          <Col span={6}>
            <Title level={5} style={{ marginTop: "3px" }}>
              {language?.settings.language}:
            </Title>
          </Col>
          <Select
            defaultValue={window.localStorage.getItem("languageCode")}
            style={{ width: 120 }}
            onChange={handleLanguageChange}
          >
            {Object.entries(LanguageCode).map((item) => (
              <Option value={item[1]}>{item[1]}</Option>
            ))}
          </Select>
        </Row>
      </Modal>
    </div>
  );
};

export default Settings;
