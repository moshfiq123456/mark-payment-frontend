import React from "react";
import EditIcon from "../../assets/svg/EditIcon";
import DeleteIcon from "../../assets/svg/DeleteIcon";

const TableTab = ({ data,handleDelete,handleEdit }) => {

  return (
    <ul className="menu menu-horizontal bg-base-200 rounded-box  ">
      <li>
        <a className="tooltip" data-tip="Delete" onClick={()=>handleDelete(data)}>
          <DeleteIcon/>
        </a>
      </li>
      <li>
        <a className="tooltip" data-tip="Edit" onClick={()=>handleEdit(data)}>
          <EditIcon/>
        </a>
      </li>
    </ul>
  );
};

export default TableTab;
