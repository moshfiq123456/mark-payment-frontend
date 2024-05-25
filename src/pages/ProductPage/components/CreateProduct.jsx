import { jwtDecode } from "jwt-decode";
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
const CreateProductModal = ({onSubmit}) => {
  const [initialState, setInitialState] = useState({
    product:""
  });
  const handleSelect = (key,value) => {
    setInitialState((prevState) => ({
      ...prevState,
      [key]: value
    }));

  };
  const handleChange = (e) => {

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
          <h3 className="font-bold text-lg">Enter Product Entry</h3>
          <div>Product</div>
          <input
            type="text"
            name="product"
            value={initialState.product}
            placeholder="Client"
            className="input input-bordered input-info w-full"
            onChange={handleChange}
          />
          <div>
            <button className="btn btn-success text-white" onClick={handleSubmit} disabled={ initialState.product ? false:true  }> Submit</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateProductModal;
