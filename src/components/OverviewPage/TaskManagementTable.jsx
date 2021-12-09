import React, { useEffect, useState } from "react";
import { Row, Table, Button, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { CustomMenu, PriorityMenu } from "../../utils";
import { priority, status } from "../../utils/enum";

const TaskManagementTable = ({ 
  language, 
  dataSource, 
  editTask
}) => {

  const columns = [
    {
      title: language.overviewTaskTable.taskName,
      dataIndex: "taskName",
      key: "taskName",
      width: "200px",
    },
    {
      title: language.overviewTaskTable.details,
      dataIndex: "details",
      key: "details",
      width: "400px",
    },
    // {title: language.overviewTaskTable.tags, dataIndex: 'tags', key: 'tags', width: '150px'},
    // {title: language.overviewTaskTable.createdBy, dataIndex: 'createdBy', key: 'createdBy', width: '150px'},
    // {title: language.overviewTaskTable.createdOn, dataIndex: 'createdOn', key: 'createdOn', width: '150px'},
    // {title: language.overviewTaskTable.assignedTo, dataIndex: 'assignedTo', key: 'assignedTo', width: '200px'},
    {
      title: language.overviewTaskTable.priority,
      dataIndex: "priority",
      key: "priority",
      width: "150px",
      render: (text, record) => {
        return (
          <CustomMenu
            language={language.priority}
            fields={priority}
            defaultValue={text}
            onSelect={(e) => editTask({id: record.id, priority: e})}
          />
        );
      },
    },
    {
      title: language.overviewTaskTable.status,
      dataIndex: "status",
      key: "status",
      width: "150px",
      render: (text, record) => {
        return (
          <CustomMenu
            language={language.status}
            fields={status}
            defaultValue={text}
            onSelect={(e) => editTask({id: record.id, status: e})}
          />
        );
      },
    },
    {
      title: language.overviewTaskTable.actions,
      dataIndex: "actions",
      key: "actions",
      width: "200px",
      render: (text, record) => {
        return (
          <Row justify="space-around">
            <Button type="primary" style={{ width: "80px" }}>
              <Link to={`/task/edit`}>{language.button.edit}</Link>
            </Button>
            <Button type="primary" style={{ width: "80px" }}>
              <Link to={`/task/details`}>{language.button.details}</Link>
            </Button>
          </Row>
        );
      },
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      scroll={{ x: 1100 }}
      defaultPageSize={8}
      pagination={{ pageSize: 8 }}
    />
  );
};

export default TaskManagementTable;
