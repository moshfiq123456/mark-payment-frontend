import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from '../../components/Table';
import api from '../../helpers/api';
import moment from 'moment';
import DateFilterTab from '../../components/DateFilterTab';
import { FormatDate, FormatMonth, FormatYear } from '../../utils/dateFormater';
import CreateModal from '../../components/CreateModal';
import TableTab from '../../components/TableTab';
import EditModal from '../../components/EditModal';
import Pagination from "../../components/Pagination";


const Payment = () => {
  const [currentTab,setCurrentTab]= useState(1)
  const [show,setShow]=useState(false)
  const [data,setData]=useState({
    tableData:[],
    total:0
  })
  const [editedData,setEditedData]=useState({})
  const [selectedKey, setSelectedKey] = useState(null);
  // const [pageCount, setPageCount] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  const [params,setParams]=useState({
    date: moment().format("YYYY-MM-DD"),
    filterType:"day",
    page:0,
    size:40,

  })
  const fetch = useCallback(()=>{
    api.get(`icecream/65dae4a6d24875baf64e6c1e?date=${params.date}&filterType=${params.filterType}&page=${Number(params.page)}&size=${Number(params.size)}`).then((res)=>{
      if(res.data.data.length){
        setData(()=>({
          total:res.data.total,
          tableData:res.data.data.map((value,index)=>(
            {
              sl:index+1,
              _id: value._id,
              client: value.client,
              product: value.product,
              carton: value.carton,
              amount: value.amount,
              status: value.status,
              paymentMethod: value.paymentMethod,
              createdOn: moment(value.createdOn).format("DD-MM-YYYY"),
            }
          )  
          )
        }))
        // setPageCount(Math.ceil(res.data.total / size));
  
      } else{
        setData({
          tableData:[],
          total:0
        })
      }
      console.log(res)
    }).catch((error)=>{
      console.log(error)
    })
  },[params])

  useEffect(()=>{
    fetch()
  },[params])
  
  const handleDate = (value) =>{
    setParams((prev)=>(
      {...prev,...value,page:0}
    ))
  }
  const handleSubmit = (value)=>{
    api.post("icecream",value).then((res)=>{
      console.log(res)
      
    }).catch((error)=>{
      console.log(error)
    })
  }
  const handleParams= (key,value) => {
    setParams((prev)=>(
      {...prev,[key]:value}
    ))
  }
  const handleState= (key,value) => {
    setParams((prev)=>(
      {...prev,[key]:value}
    ))
  }

  const handleDelete = (e) =>{
    api.delete(`icecream/${e._id}`).then((res)=>{
      console.log(res)
      fetch()
    }).catch((error)=>{
      console.log(error)
    })
  }
  const handleShow =()=>setShow((prev)=>!prev)
  const handleEdit=(e)=>{
    api.patch(`icecream/${e._id}`,{
      client: e.client,
      carton: e.carton,
      amount: e.amount,
      product: e.product,
      status: e.status,
      paymentMethod: e.paymentMethod
    }).then((res)=>{
      fetch()
    }).catch((error)=>{
      console.log(error)
    })
  }
  const getEdit = (edit) =>{
    setEditedData(edit)
    handleShow()
  }

  const columns = [
    { key: 'sl', title: 'SL', dataIndex: 'sl' },
    { key: 'client', title: 'Client', dataIndex: 'client' },
    { key: 'product', title: 'product', dataIndex: 'product' },
    { key: 'canton', title: 'Carton', dataIndex: 'carton' },
    { key: 'amount', title: 'amount', dataIndex: 'amount' },
    { key: 'status', title: 'Payment Status', dataIndex: 'status' },
    { key: 'paymentMethod', title: 'Payment Method', dataIndex: 'paymentMethod' },
    { key: 'createdOn', title: 'Date', dataIndex: 'createdOn' },
    { key: 'custom', title: 'Actions', render: (row) =>  <TableTab data={row} handleDelete={handleDelete} handleEdit={getEdit}/>}  
  ];
  
  return (
    <div className=' flex flex-col gap-5 w-full bg-white h-full rounded-lg p-6'>
      <div className=' flex justify-center'>
        <DateFilterTab currentTab={currentTab} setCurrentTab={setCurrentTab} date={params} handleDate={(e)=>{handleDate(e)}} />
      </div>
      <div className=' flex flex-row justify-between'>
        <button className="btn btn-primary  text-white">Download</button>
      <CreateModal onSubmit={handleSubmit}/>
      </div>
      
     <Table rows={data.tableData} columns={columns} selectedKey={selectedKey} setSelectedKey={setSelectedKey}/>
     {editedData?<EditModal data={editedData} show={show} onSubmit={handleEdit} controlShow={handleShow}/>:<></>}
     <Pagination itemsPerPage={40}
            total={data.total}
            action={(key)=>handleState("page",key)}/>
    </div>
  );
};

export default Payment;
