import React from "react";
import { Row, Col, Typography, Button, Tag, Input } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const TaskDetails = ({ language, taskDetails, tagsData }) => {
  const { Title } = Typography;
  const { TextArea } = Input;

  const tags = taskDetails?.tagId
    ? tagsData?.filter((item) => taskDetails.tagId.includes(item.id))
    : [];

  const newDate = taskDetails?.deadline
    ? moment(taskDetails.deadline).format("DD/MM/YYYY")
    : language.text.none;

  const status = taskDetails?.taskStatus
    ? language.taskStatus[taskDetails?.taskStatus]
    : language.text.none;

  const priority = taskDetails?.priority
    ? language.priority[taskDetails?.priority]
    : language.text.none;

  const formatDetails = [
    { label: language.overviewTaskTable.taskName, data: taskDetails?.taskName },
    { label: language.overviewTaskTable.details, data: taskDetails?.details },
    { label: language.overviewTaskTable.tags, data: taskDetails?.tags },
    { label: language.overviewTaskTable.deadline, data: newDate },
    {
      label: language.overviewTaskTable.createdBy,
      data: taskDetails?.createdBy,
    },
    {
      label: language.overviewTaskTable.assignedTo,
      data: taskDetails?.assignedTo,
    },
    { label: language.overviewTaskTable.priority, data: priority },
    { label: language.overviewTaskTable.taskStatus, data: status },
  ];

  return (
    <>
      {formatDetails.map((item) => {
        return (
          <Row style={{ margin: "12px 24px" }}>
            <Col span={4}>
              <Title level={5} align="right">
                {item.label + " : "}
              </Title>
            </Col>
            <Col span={1} />
            <Col span={6}>
              {item.label === language.overviewTaskTable.tags ? (
                tags.length === 0 ? (
                  <Title level={5}>{language.text.none}</Title>
                ) : (
                  tags.map((item) => (
                    <Tag color={item.colour}>{item.tagName}</Tag>
                  ))
                )
              ) : item.label === language.overviewTaskTable.details ? (
                <TextArea
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    minWidth: "800px",
                  }}
                  autoSize={true}
                  value={item.data}
                  disabled
                />
              ) : (
                <Title level={5}>
                  {item.data === "" ? language.text.none : item.data}
                </Title>
              )}
            </Col>
          </Row>
        );
      })}
      <Row align="center" style={{marginBottom: "50px"}}>
        <Col span={3} align="center">
          <Button type="primary" style={{ width: "100px" }}>
            <Link to="/overview">{language.button.back}</Link>
          </Button>
        </Col>
        <Col span={3} align="center">
          <Button type="primary" style={{ width: "100px" }}>
            <Link to={`/task/edit?id=${taskDetails.id}`}>
              {language.button.edit}
            </Link>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default TaskDetails;
