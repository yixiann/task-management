import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Input, DatePicker, Tag, Select, Typography } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { getKeyById } from "../../utils";
import { priority, taskStatus } from "../../utils/enum";

const TaskForm = ({
  form,
  language,
  createTask,
  deleteTask,
  tagsData,
  taskDetails,
}) => {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (taskDetails) {
      setEdit(true);
      form.setFieldsValue({
        ...taskDetails,
        deadline: moment(taskDetails.deadline, "YYYY-MM-DD").local(),
      });
    }
  }, []);


  const { TextArea } = Input;
  const { Title } = Typography;
  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 10,
    },
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={getKeyById(tagsData, "colour", value)}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Form
      form={form}
      name="task-form"
      onFinish={() => createTask()}
      {...layout}
    >
      <Form.Item
        label={language.task.taskName}
        name="taskName"
        requiredMark={"optional"}
        rules={[
          {
            required: true,
            message: "Please input a task name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={language.task.details} name="details">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label={language.task.tags} name="tags">
        <Select
          mode="multiple"
          showArrow
          tagRender={tagRender}
          options={tagsData.map((item) => ({
            value: item.id,
            label: item.tags,
          }))}
        />
      </Form.Item>
      <Form.Item label={language.task.deadline} name="deadline">
        <DatePicker
          format="DD-MM-YYYY"
        />
      </Form.Item>
      <Form.Item
        label={language.task.createdBy}
        name="createdBy"
        wrapperCol={{
          span: 6,
        }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={language.task.assignedTo}
        name="assignedTo"
        wrapperCol={{
          span: 6,
        }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={language.task.priority}
        name="priority"
        wrapperCol={{
          span: 4,
        }}
      >
        <Select placeHolder="Select">
          {Object.keys(priority).map((item) => (
            <Option value={item}>{language.priority[item]}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label={language.task.status}
        name="taskStatus"
        wrapperCol={{
          span: 4,
        }}
      >
        <Select placeHolder="Select">
          {Object.keys(taskStatus).map((item) => (
            <Option value={item}>{language.taskStatus[item]}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Row align="center">
          <Col span={9} />
          <Col span={3} align="center">
            <Button type="primary" style={{ width: "100px" }}>
              <Link
                to={edit ? `/task/details?id=${taskDetails.id}` : "/overview"}
              >
                {language.button.cancel}
              </Link>
            </Button>
          </Col>
          <Col span={3} align="center">
            <Button
              type="primary"
              style={{ width: "100px" }}
              onClick={() => createTask()}
            >
              {edit ? language.button.save : language.button.create}
            </Button>
          </Col>
          <Col span={6} />
          <Col span={3} align="center">
            {edit && (
              <Button
                type="danger"
                style={{ width: "120px" }}
                onClick={() => deleteTask()}
              >
                {language.button.deleteTask}
              </Button>
            )}
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
