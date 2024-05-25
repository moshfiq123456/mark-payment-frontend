// TableComponent.js
import React from 'react';
import "./styles.scss"

const Table = ({ rows, columns, selectedKey, setSelectedKey }) => {

  return (
    <div className='flex flex-col overflow-auto gap-8' >
      <table className="table--custom">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows.map((row) => (
            <tr key={row._id}>
              {columns.map((col) => (
                <td className='text-wrap' key={`${row._id}-${col.key}`}>
                  {col.render ? col.render(row, selectedKey, setSelectedKey) : row[col.dataIndex]}
                </td>
              ))}
            </tr>
          )):<></>}
        </tbody>
      </table>
      {rows.length ? <></>:<div className='flex justify-center'>Not Found</div>}
    </div>
  );
};

export default Table;
