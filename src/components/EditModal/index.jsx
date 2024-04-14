import React, { useEffect, useState } from "react";

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
const EditModal = ({ data, show, onSubmit, controlShow }) => {
  const [initialState, setInitialState] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue =
      type === "number"
        ? Number(value)
        : type === "text"
        ? value
        : parseTextToBoolean(value);
    setInitialState((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };
  const handleSubmit = () => {
    onSubmit(initialState);
    controlShow()
  };
  useEffect(() => {
    setInitialState(data);
  }, [data]);
  return (
    <>
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button> */}
      <dialog id="my_modal_3" className={`modal ${show && "modal-open"}`}>
        <div className="modal-box flex flex-col gap-5">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={controlShow}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Enter Food Entry</h3>
          <input
            type="text"
            name="client"
            value={initialState.client}
            placeholder="Client"
            className="input input-bordered input-info w-full"
            onChange={handleChange}
          />
          <input
            type="number"
            name="carton"
            value={initialState.carton}
            placeholder="Carton"
            className="input input-bordered input-info w-full"
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            value={initialState.amount}
            placeholder="Amount"
            className="input input-bordered input-info w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="product"
            value={initialState.product}
            placeholder="Product"
            className="input input-bordered input-info w-full"
            onChange={handleChange}
          />
          <select
            className="select select-accent w-full"
            name="status"
            value={initialState.status}
            onChange={handleChange}
          >
            <option value={false}>Not Paid</option>
            <option value={true}>Paid</option>
          </select>
          <select
            className="select select-accent w-full"
            name="paymentMethod"
            value={initialState.paymentMethod}
            onChange={handleChange}
          >
            <option className="" value={false}>Cash</option>
            <option value={true}>Bank</option>
          </select>
          <div>
            <button
              className="btn btn-success text-white"
              onClick={handleSubmit}
              disabled={
                initialState.client && initialState.product ? false : true
              }
            >
              {" "}
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditModal;
