import React from "react";
import { Table } from "antd";
import { CustomMenu, getFilters, sorter } from "../../utils";
import { priority, taskStatus } from "../../utils/enum";
import { useNavigate } from "react-router-dom";

const TaskManagementTable = ({ language, dataSource, loading, editTask }) => {
  const navigate = useNavigate();
  const routeChange = (id) => {
    let path = `/task/details?id=${id}`;
    navigate(path);
  };

  const columns = [
    {
      title: language.overviewTaskTable.taskName,
      dataIndex: "taskName",
      key: "taskName",
      width: "200px",
      sorter: (a, b) => sorter(a.taskName, b.taskName),
    },
    {
      title: language.overviewTaskTable.details,
      dataIndex: "details",
      key: "details",
      width: "300px",
      sorter: (a, b) => sorter(a.details, b.details),
    },
    {
      title: language.overviewTaskTable.tags,
      dataIndex: "tags",
      key: "tags",
      width: "150px",
    },
    {
      title: language.overviewTaskTable.deadline,
      dataIndex: "deadline",
      key: "deadline",
      width: "150px",
    },
    {
      title: language.overviewTaskTable.priority,
      dataIndex: "priority",
      key: "priority",
      width: "150px",
      filters: getFilters(language.priority, dataSource, "priority"),
      onFilter: (value, record) => record.priority === value,
      render: (text, record) => {
        return (
          <CustomMenu
            language={language.priority}
            fields={priority}
            value={text}
            onSelect={(e) => editTask({ id: record.id, priority: e })}
          />
        );
      },
    },
    {
      title: language.overviewTaskTable.status,
      dataIndex: "status",
      key: "status",
      width: "150px",
      filters: getFilters(language.taskStatus, dataSource, "status"),
      onFilter: (value, record) => record.status === value,
      render: (text, record) => {
        return (
          <CustomMenu
            language={language.taskStatus}
            fields={taskStatus}
            value={text}
            onSelect={(e) => editTask({ id: record.id, status: e })}
          />
        );
      },
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      loading={loading}
      columns={columns}
      pagination={false}
      scroll={{ x: 1100 }}
      defaultPageSize={8}
      pagination={{ pageSize: 8 }}
      onRow={(record) => ({
        onClick: () => routeChange(record.id),
      })}
    />
  );
};

export default TaskManagementTable;
