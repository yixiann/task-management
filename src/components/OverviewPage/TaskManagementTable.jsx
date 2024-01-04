import React, { useEffect, useState } from "react";
import { Table, Tag, Row, Button } from "antd";
import {
  CustomMenu,
  formatDate,
  getFilters,
  getKeyById,
  sorter,
} from "../../utils";
import { priority, taskStatus } from "../../utils/enum";
import { useNavigate } from "react-router-dom";
import { tooltipEllipse } from "../UI/TooltipEllipse";

const TaskManagementTable = ({
  language,
  dataSource,
  loading,
  updateTask,
  selectedRows,
  setSelectedRows,
  deleteSelected,
  tagsData,
}) => {
  const sortedTaskData = dataSource?.sort(
    (task1, task2) => task1.id - task2.id
  );

  // Navigation for clicking on rows
  const navigate = useNavigate();
  const routeChange = (id) => {
    let path = `/task/details?id=${id}`;
    navigate(path);
  };

  // Selection of rows for deleting and visibility of delete button
  const [visible, setVisible] = useState(false);

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  useEffect(() => {
    setVisible(selectedRows.length > 0 ? true : false);
  }, [dataSource, selectedRows]);

  const taskManagementColumns = [
    {
      title: language?.overviewTaskTable.taskName,
      dataIndex: "taskName",
      key: "taskName",
      width: "200px",
      sorter: (a, b) => sorter(a.taskName, b.taskName),
    },
    {
      title: language?.overviewTaskTable.details,
      dataIndex: "details",
      key: "details",
      width: "300px",
      sorter: (a, b) => sorter(a.details, b.details),
      render: (text, record) =>
        text ? tooltipEllipse(text, "300px") : language?.text.none,
    },
    {
      title: language?.overviewTaskTable.tags,
      dataIndex: "tagId",
      key: "tagId",
      width: "150px",
      filters: tagsData.map((item) => ({ text: item.tagName, value: item.id })),
      onFilter: (value, record) => record?.tagId?.includes(value),
      render: (_, record) => {
        const tagIds = tagsData.map((item) => item.id);
        const currentTags = record.tagId?.filter((item) =>
          tagIds?.includes(item)
        );
        return currentTags && currentTags.length !== 0
          ? record.tagId
              .filter((item) => tagIds?.includes(item))
              .map((item) => (
                <Row style={{ margin: "10px" }}>
                  <Tag color={getKeyById(tagsData, "colour", item)}>
                    {getKeyById(tagsData, "tagName", item)}
                  </Tag>
                </Row>
              ))
          : language?.text.none;
      },
    },
    {
      title: language?.overviewTaskTable.deadline,
      dataIndex: "deadline",
      key: "deadline",
      width: "150px",
      sorter: (a, b) => sorter(a.deadline, b.deadline),
      render: (text, _) => (text ? formatDate(text) : language?.text.none),
    },
    {
      title: language?.overviewTaskTable.priority,
      dataIndex: "priority",
      key: "priority",
      width: "150px",
      filters: getFilters(language?.priority, dataSource, "priority"),
      onFilter: (value, record) => record.priority === value,
      render: (text, record) => {
        return (
          <CustomMenu
            language={language?.priority}
            fields={priority}
            value={text}
            onSelect={(e) => updateTask({ record, type: "priority", value: e })}
          />
        );
      },
    },
    {
      title: language?.overviewTaskTable.taskStatus,
      dataIndex: "taskStatus",
      key: "taskStatus",
      width: "150px",
      filters: getFilters(language?.taskStatus, dataSource, "taskStatus"),
      onFilter: (value, record) => record.taskStatus === value,
      render: (text, record) => {
        return (
          <CustomMenu
            language={language?.taskStatus}
            fields={taskStatus}
            value={text}
            onSelect={(e) =>
              updateTask({ record, type: "taskStatus", value: e })
            }
          />
        );
      },
    },
  ];

  return (
    <>
      <Table
        rowKey={"id"}
        dataSource={sortedTaskData}
        loading={loading}
        columns={taskManagementColumns}
        scroll={{ x: 1100 }}
        defaultPageSize={8}
        pagination={{ pageSize: 8 }}
        onRow={(record) => ({
          onClick: () => routeChange(record.id),
        })}
        rowSelection={{ type: "checkbox", ...rowSelection }}
      />
      {visible && (
        <Button
          type="danger"
          onClick={() => deleteSelected()}
          style={{ position: "relative", bottom: "48px" }}
        >
          {language?.button.deleteSelected}
        </Button>
      )}
    </>
  );
};

export default TaskManagementTable;
