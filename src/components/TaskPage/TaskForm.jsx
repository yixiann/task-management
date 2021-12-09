import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Input, DatePicker, Tag, Select } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { CustomMenu, getColour, getKeyById } from "../../utils";
import { priority, taskStatus } from "../../utils/enum";

const TaskForm = ({ form, language, createTask, tagsData }) => {
  const { TextArea } = Input;
  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 10,
    },
  };

  function tagRender(props) {
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
  }

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
          format="YYYY-MM-DD HH:mm:ss"
          showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
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
        name="status"
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
      <Form.Item>
        <Row>
          <Col align="center">
            <Button type="primary" htmlType="submit">
              {language.button.create}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
