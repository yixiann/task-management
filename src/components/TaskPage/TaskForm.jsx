import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  DatePicker,
  Tag,
  Select,
  Spin,
} from "antd";
import { Link } from "react-router-dom";
import { getKeyById } from "../../utils/utils";
import { priority, taskStatus } from "../../utils/enum";
import dayjs from "dayjs";

const TaskForm = ({
  form,
  language,
  createTask,
  deleteTask,
  tagsData,
  taskDetails,
  loading,
  tagsSuccess,
  edit = true,
}) => {
  const { TextArea } = Input;
  const { Option } = Select;

  // Store form progress in local storage to prevent loss when edit tag
  const save = () => {
    window.localStorage.setItem(
      "TaskForm",
      JSON.stringify(form.getFieldValue())
    );
  };

  const [taskDetailsFinal, setTaskDetailsFinal] = useState("");

  const current = window.localStorage.getItem("TaskForm");

  useEffect(() => {
    if (taskDetails && current.length === 0) {
      setTaskDetailsFinal(taskDetails);
    }
    if (current.length !== 0) {
      setTaskDetailsFinal(JSON.parse(current));
    }
  }, [current, taskDetails]);

  // Form label and wrapper width
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 10,
    },
  };

  useEffect(() => {
    if (taskDetailsFinal && tagsData) {
      const tagIds = tagsData?.map((item) => item.id);
      const filterTagIds = taskDetailsFinal?.tagId?.filter((item) =>
        tagIds.includes(item)
      );
      form.setFieldsValue({
        ...taskDetailsFinal,
        tagId: filterTagIds,
        deadline: dayjs(taskDetailsFinal?.deadline),
      });
    }
  }, [taskDetailsFinal, tagsData, form]);

  // Making cool colourful tags
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
    <Spin spinning={loading}>
      <Form form={form} name="task-form" {...layout} onClick={() => save()}>
        <Form.Item
          label={language?.task.taskName}
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
        <Form.Item
          label={language?.task.details}
          name="details"
          wrapperCol={{
            span: 12,
          }}
        >
          <TextArea rows={4} maxLength={9999} showCount />
        </Form.Item>
        <Form.Item
          label={language?.task.tags}
          name="tagId"
          help={
            tagsData.length === 0 && tagsSuccess
              ? language?.tagsManagement.helpTag
              : ""
          }
        >
          <Select
            mode="multiple"
            tagRender={tagRender}
            options={tagsData.map((item) => ({
              value: item.id,
              label: item.tagName,
            }))}
            onChange={() => save()}
          />
        </Form.Item>
        <Form.Item label={language?.task.deadline} name="deadline">
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          label={language?.task.createdBy}
          normalize={(value) =>
            value.replace(/[^A-Za-z0-9 ]+/, "").slice(0, 64)
          }
          name="createdBy"
          wrapperCol={{
            span: 6,
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={language?.task.assignedTo}
          normalize={(value) =>
            value.replace(/[^A-Za-z0-9 ]+/, "").slice(0, 64)
          }
          name="assignedTo"
          wrapperCol={{
            span: 6,
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={language?.task.priority}
          name="priority"
          wrapperCol={{
            span: 4,
          }}
        >
          <Select placeholder="Select">
            {Object.keys(priority).map((item) => (
              <Option value={item}>{language?.priority[item]}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={language?.task.status}
          name="taskStatus"
          wrapperCol={{
            span: 4,
          }}
        >
          <Select placeholder="Select">
            {Object.keys(taskStatus).map((item) => (
              <Option value={item}>{language?.taskStatus[item]}</Option>
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
                  to={
                    edit
                      ? `/task/details?id=${taskDetailsFinal.id}`
                      : "/overview"
                  }
                >
                  {language?.button.cancel}
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
                {edit ? language?.button.save : language?.button.create}
              </Button>
            </Col>
            <Col span={5} />
            <Col span={3} align="center">
              {edit && (
                <Button
                  type="danger"
                  style={{ width: "120px" }}
                  onClick={() => deleteTask(taskDetailsFinal.id)}
                >
                  {language?.button.deleteTask}
                </Button>
              )}
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default TaskForm;
