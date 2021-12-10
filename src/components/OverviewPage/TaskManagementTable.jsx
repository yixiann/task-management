import React, { useEffect, useState } from "react";
import { Table, Tag, Row, Button } from "antd";
import { CustomMenu, getFilters, getKeyById, sorter } from "../../utils";
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
  const navigate = useNavigate();
  const routeChange = (id) => {
    let path = `/task/details?id=${id}`;
    navigate(path);
  };

  const [visible, setVisible] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  useEffect(() => {
    setVisible(selectedRows.length > 0 ? true : false);
  }, [selectedRows]);

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
      render: (text, record) => (text ? tooltipEllipse(text,"300px") : language.text.none),
    },
    {
      title: language.overviewTaskTable.tags,
      dataIndex: "tagId",
      key: "tagId",
      width: "150px",
      filters: tagsData.map((item) => ({ text: item.tagName, value: item.id })),
      onFilter: (value, record) => record.tagId.includes(value),
      render: (text, record) => {
        return record.tagId
          ? record.tagId.map((item) => (
              <Row style={{ margin: "10px" }}>
                <Tag color={getKeyById(tagsData, "colour", item)}>
                  {getKeyById(tagsData, "tagName", item)}
                </Tag>
              </Row>
            ))
          : language.text.none;
      },
    },
    {
      title: language.overviewTaskTable.deadline,
      dataIndex: "deadline",
      key: "deadline",
      width: "150px",
      sorter: (a, b) => sorter(a.deadline, b.deadline),
      render: (text, record) => (text ? text : language.text.none),
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
            onSelect={(e) =>
              updateTask({ id: record.id, type: "priority", value: e })
            }
          />
        );
      },
    },
    {
      title: language.overviewTaskTable.taskStatus,
      dataIndex: "taskStatus",
      key: "taskStatus",
      width: "150px",
      filters: getFilters(language.taskStatus, dataSource, "status"),
      onFilter: (value, record) => record.status === value,
      render: (text, record) => {
        return (
          <CustomMenu
            language={language.taskStatus}
            fields={taskStatus}
            value={text}
            onSelect={(e) =>
              updateTask({ id: record.id, type: "taskStatus", value: e })
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
        rowSelection={{ type: "checkbox", ...rowSelection }}
      />
      {visible && (
        <Button
          type="danger"
          onClick={() => deleteSelected()}
          style={{ position: "relative", bottom: "48px" }}
        >
          {language.button.deleteSelected}
        </Button>
      )}
    </>
  );
};

export default TaskManagementTable;
