import React from "react";
import { useSelector } from "react-redux";

import CreateProductModal from "./components/CreateProduct"; // Adjust the import path
import TableTab from "../../components/TableTab";
import { getProductSelector } from "../../redux/selectors/getProductSelector";
import EditProductModal from "./components/EditProduct";
import useProduct from "../../hooks/useProduct";
import Table from "../../components/Table";
import moment from "moment";
import useUsers from "../../hooks/useUsers";
import { getUsersSelector } from "../../redux/selectors/getUsersSelector";
import CreateUserModal from "./components/CreateProduct";
import EditUserModal from "./components/EditProduct";
import DeleteIcon from "../../assets/svg/DeleteIcon";

const User = () => {
  const { handleDelete, handleEdit, handleSubmit } = useUsers();
  const { users, loading, error } = useSelector(getUsersSelector);
  const [show, setShow] = React.useState(false);
  const [editedData, setEditedData] = React.useState({});
  const [selectedKey, setSelectedKey] = React.useState(null);
 
  const handleShow = () => setShow((prev) => !prev);

  const getEdit = (edit) => {
    handleEdit(edit)
    setEditedData(edit);
    handleShow();
  };

  const columns = [
    { key: "sl", title: "SL", dataIndex: "sl" },
    { key: "email", title: "Email", dataIndex: "email" },
    {
      key: "roles",
      title: "Roles",
      render: (row) => (
        <span
          className={`flex justify-center items-center bg-blue-100 text-blue-800 font-medium text-base rounded-lg px-2 py-1 `}
        >
          {row.roles}
        </span>
      ),
    },
    { key: "userName", title: "User Name", dataIndex: "userName" },
    { key: "createdOn", title: "Date", dataIndex: "createdOn" },
    { key: "updateAt", title: "Updated At", dataIndex: "updateAt" },
    {
      key: "custom",
      title: "Actions",
      render: (row) => (
        <button onClick={()=> handleDelete(row)}><DeleteIcon/></button>
        // <TableTab data={row} handleDelete={() => handleDelete(row)} handleEdit={() => getEdit(row)} />
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-5 w-full bg-white h-full rounded-lg p-6">
      <div className="flex flex-row justify-end">
        <CreateUserModal onSubmit={handleSubmit} />
      </div>

      <Table
        rows={users.length ? users.map((value, index) => ({
          sl: index +1,
          _id: value._id,
          email: value.email,
          roles: value.roles,
          userName: value.userName,
          createdOn: moment(value.createdOn).format("DD-MM-YYYY"),
          updateAt: moment(value.updateAt).format("DD-MM-YYYY"),
        })):[]}
        columns={columns}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
      />
      {editedData && show ? (
        <EditUserModal
          data={editedData}
          show={show}
          onSubmit={getEdit}
          controlShow={handleShow}
        />
      ) : null}
      {/* <Pagination
        itemsPerPage={40}
        total={products.length}
        action={(key) => handleState("page", key)}
      /> */}
    </div>
  );
};

export default User;
