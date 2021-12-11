import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Input, DatePicker, Tag, Select } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { formatDate, getKeyById } from "../../utils";
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
    if (taskDetails && tagsData) {
      setEdit(true);
      const deadlineFormat = moment(
        formatDate(taskDetails?.deadline),
        "DD/MM/YYYY"
      );
      const tagIds = tagsData?.map((item) => item.id);
      const filterTagIds = taskDetails?.tagId?.filter((item) =>
        tagIds.includes(item)
      );
      form.setFieldsValue({
        ...taskDetails,
        deadline: deadlineFormat,
        tagId: filterTagIds,
      });
      if (!deadlineFormat.isValid()) {
        form.resetFields(["deadline"]);
      }
    }
  }, [taskDetails, tagsData, form]);

  const { TextArea } = Input;
  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 4,
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
        normalize={(value) => value.replace(/[^A-Za-z0-9 ]+/, "")}
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
      <Form.Item label={language.task.tags} name="tagId">
        <Select
          mode="multiple"
          showArrow
          tagRender={tagRender}
          options={tagsData.map((item) => ({
            value: item.id,
            label: item.tagName,
          }))}
        />
      </Form.Item>
      <Form.Item label={language.task.deadline} name="deadline">
        <DatePicker format="DD/MM/YYYY" />
      </Form.Item>
      <Form.Item
        label={language.task.createdBy}
        normalize={(value) => value.replace(/[^A-Za-z0-9 ]+/, "").slice(0, 64)}
        name="createdBy"
        wrapperCol={{
          span: 6,
        }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={language.task.assignedTo}
        normalize={(value) => value.replace(/[^A-Za-z0-9 ]+/, "").slice(0, 64)}
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
          <Col span={8} />
          <Col span={3} align="center">
            <Button type="primary" style={{ width: "100px" }}>
              <Link
                to={edit ? `/task/details?id=${taskDetails.id}` : "/overview"}
              >
                {language.button.cancel}
              </Link>
            </Button>
          </Col>
          <Col span={2} />
          <Col span={3} align="center">
            <Button
              type="primary"
              style={{ width: "100px" }}
              onClick={() => createTask()}
            >
              {edit ? language.button.save : language.button.create}
            </Button>
          </Col>
          <Col span={5} />
          <Col span={3} align="center">
            {edit && (
              <Button
                type="danger"
                style={{ width: "120px" }}
                onClick={() => deleteTask(taskDetails.id)}
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
