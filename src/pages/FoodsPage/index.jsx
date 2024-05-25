import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../../components/Table";
import moment from "moment";
import DateFilterTab from "../../components/DateFilterTab";
import CreateModal from "../../components/CreateModal";
import TableTab from "../../components/TableTab";
import EditModal from "../../components/EditModal";
import Pagination from "../../components/Pagination";

import useAccounts from "../../hooks/useAccounts";
import { useSelector } from "react-redux";
import { getProductSelector } from "../../redux/selectors/getProductSelector";

const Food = () => { 
  
  const [currentTab, setCurrentTab] = useState(1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    tableData: [],
    total: 0,
  });
  const [editedData, setEditedData] = useState({});
  const [selectedKey, setSelectedKey] = useState(null);
  const [params, setParams] = useState({
    date: moment().format("YYYY-MM-DD"),
    filterType: "day",
    page: 0,
    size: 40,
  });
  
  const {handleSubmit,handleDelete,handleEdit,handleDownload } = useAccounts("food",params,setData)
  const handleDate = (value) => {
    setParams((prev) => ({ ...prev, ...value, page: 0 }));
  };
  

  const handleState = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  
  
  const handleShow = () => setShow((prev) => !prev);
  
  const getEdit = (edit) => {
    setEditedData(edit);
    handleShow();
  };

  const columns = [
    { key: "sl", title: "SL", dataIndex: "sl" },
    { key: "client", title: "Client", dataIndex: "client" },
    { key: "product", title: "Product", dataIndex: "product" },
    { key: "canton", title: "Carton", dataIndex: "carton" },
    { key: "amount", title: "Amount", dataIndex: "amount" },
    {
      key: "status",
      title: "Payment Status",
      render: (row) => (
        <span
          className={`flex justify-center items-center ${
            row.status
              ? "bg-green-100 text-green-800"
              : " bg-red-100 text-red-800 "
          } font-medium text-base rounded-lg py-1 `}
        >
          {row.status ? "Paid" : "Not Paid"}
        </span>
      ),
    },
    {
      key: "paymentMethod",
      title: "Payment Method",
      render: (row) => (
        <span
          className={`flex justify-center items-center ${
            row.paymentMethod
              ? "bg-green-100 text-green-800"
              : " bg-red-100 text-red-800 "
          } font-medium text-base rounded-lg py-1 `}
        >
          {row.paymentMethod ? "Bank" : "Cash"}
        </span>
      ),
    },
    { key: "createdOn", title: "Date", dataIndex: "createdOn" },
    { key: "updateAt", title: "updateAt", dataIndex: "updateAt" },
    {
      key: "custom",
      title: "Actions",
      render: (row) => (
        <TableTab data={row} handleDelete={handleDelete} handleEdit={getEdit} />
      ),
    },
  ];

  return (
    <div className=" flex flex-col gap-5 w-full bg-white h-full rounded-lg p-6">
      <div className=" flex justify-center">
        <DateFilterTab
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          date={params}
          handleDate={(e) => {
            handleDate(e);
          }}
        />
      </div>
      <div className=" flex flex-row justify-between">
        <button
          className="btn btn-primary  text-white"
          onClick={handleDownload}
          disabled={!data.tableData.length}
        >
          Download
        </button>
        <CreateModal onSubmit={handleSubmit} />
      </div>

      <Table
        rows={data.tableData}
        columns={columns}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
      />
      {editedData ? (
        <EditModal
          data={editedData}
          show={show}
          onSubmit={handleEdit}
          controlShow={handleShow}
        />
      ) : (
        <></>
      )}
      <Pagination
        itemsPerPage={40}
        total={data.total}
        action={(key) => handleState("page", key)}
      />
    </div>
  );
};

export default Food;
