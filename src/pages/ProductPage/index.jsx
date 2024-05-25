import React from "react";
import { useSelector } from "react-redux";

import CreateProductModal from "./components/CreateProduct"; // Adjust the import path
import TableTab from "../../components/TableTab";
import { getProductSelector } from "../../redux/selectors/getProductSelector";
import EditProductModal from "./components/EditProduct";
import useProduct from "../../hooks/useProduct";
import Table from "../../components/Table";
import moment from "moment";

const Product = () => {
  const { handleDelete, handleEdit, handleSubmit } = useProduct(false);
  const { products, loading, error } = useSelector(getProductSelector);
  const [show, setShow] = React.useState(false);
  const [editedData, setEditedData] = React.useState({});
  const [selectedKey, setSelectedKey] = React.useState(null);

  const handleShow = () => setShow((prev) => !prev);

  const getEdit = (edit) => {
    console.log(edit,"edit")
    handleEdit(edit)
    setEditedData(edit);
    handleShow();
  };

  const columns = [
    { key: "sl", title: "SL", dataIndex: "sl" },
    { key: "product", title: "Product", dataIndex: "product" },
    { key: "createdOn", title: "Date", dataIndex: "createdOn" },
    { key: "updateAt", title: "Updated At", dataIndex: "updateAt" },
    {
      key: "custom",
      title: "Actions",
      render: (row) => (
        <TableTab data={row} handleDelete={() => handleDelete(row)} handleEdit={() => getEdit(row)} />
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(editedData)
  return (
    <div className="flex flex-col gap-5 w-full bg-white h-full rounded-lg p-6">
      <div className="flex flex-row justify-end">
        <CreateProductModal onSubmit={handleSubmit} />
      </div>

      <Table
        rows={products.length ? products.map((value, index) => ({
          sl: index +1,
          _id: value._id,
          product: value.product,
        
          createdOn: moment(value.createdOn).format("DD-MM-YYYY"),
          updateAt: moment(value.updateAt).format("DD-MM-YYYY"),
        })):[]}
        columns={columns}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
      />
      {editedData && show ? (
        <EditProductModal
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

export default Product;
