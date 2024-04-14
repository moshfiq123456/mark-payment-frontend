import React, { useState } from "react";
import ReactSelect from "react-select";

export const statusOptions =[
  {
    label:"Paid",
    value:true
  },
  {
    label:"Not Paid",
    value:false
    
  }
]
export const paymentOptions =[
  {
    label:"Bank",
    value:true
  },
  {
    label:"Cash",
    value:false
    
  }
]
const parseTextToBoolean = (text) => {
  const lowerCaseText = text.toLowerCase().trim();
  switch (lowerCaseText) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return Boolean(text);
  }
};
const CreateModal = ({onSubmit}) => {
  const [initialState, setInitialState] = useState({
    client: "",
    carton: "",
    amount: "",
    product: "",
    status: false,
    paymentMethod: false
  });
  const handleSelect = (key,value) => {
    console.log(key,value)
    setInitialState((prevState) => ({
      ...prevState,
      [key]: value
    }));

  };
  const handleChange = (e) => {
    console.log(e.target)
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : type === "text" ? value : parseTextToBoolean(value) ;
    setInitialState((prevState) => ({
      ...prevState,
      [name]: parsedValue
    }));

  };
  const handleSubmit = () => {
    onSubmit(initialState)
    const modal = document.getElementById("my_modal_3");
  if (modal) {
    modal.close();
  }
  }
  console.log(initialState)
  return (
    <>
      <button
        className="btn btn-success text-white"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box flex flex-col gap-5">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Enter Food Entry</h3>
          <div>Client</div>
          <input
            type="text"
            name="client"
            value={initialState.client}
            placeholder="Client"
            className="input input-bordered input-info w-full"
            onChange={handleChange}
          />
          <div>Carton</div>
          <input
            type="number"
            name="carton"
            value={initialState.carton}
            placeholder="Carton"
            className="input input-bordered input-info w-full"
            onChange={handleChange}
          />
          <div>Amount</div>
          <input
            type="number"
            name="amount"
            value={initialState.amount}
            placeholder="Amount"
            className="input input-bordered input-info w-full"
            onChange={handleChange}
          />
          <div>Product</div>
          <input
            type="text"
            name="product"
            value={initialState.product}
            placeholder="Product"
            className="input input-bordered input-info w-full"
            onChange={handleChange}
          />
          <div>Status</div>
          <ReactSelect value={{
            label:initialState.status === false ? "Not Paid":"Paid",
            value:initialState.status
          }} options={statusOptions} onChange={(e)=> handleSelect("status",e.value)} name="status"/>
          <div>Payment Method</div>
          <ReactSelect value={{
            label:initialState.paymentMethod === false?"Cash":"Bank",
            value:initialState.paymentMethod
          }} options={paymentOptions} onChange={(e)=> handleSelect("paymentMethod",e.value)} name="paymentMethod"/>
          <div>
            <button className="btn btn-success text-white" onClick={handleSubmit} disabled={initialState.client && initialState.product ? false:true  }> Submit</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateModal;
