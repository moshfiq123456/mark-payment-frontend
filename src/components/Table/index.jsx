// TableComponent.js
import React, { useState } from 'react';
import "./styles.scss"
const Table = ({ rows, columns, selectedKey, setSelectedKey }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  return (
    <div className='flex flex-col overflow-auto gap-8' style={{maxHeight:"500px"}}>
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
                <td className='text-nowrap' key={`${row._id}-${col.key}`}>
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

{/* <div className="pagination">
<button disabled={page === 1} onClick={() => setPage(page - 1)}>
  Previous
</button>
<span>{page}</span>
<button disabled={page * pageSize >= sortedData.length} onClick={() => setPage(page + 1)}>
  Next
</button>
</div> */}