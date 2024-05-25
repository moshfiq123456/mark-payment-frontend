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
const EditUserModal = ({ data, show, onSubmit, controlShow }) => {
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
          <h3 className="font-bold text-lg">Enter  Entry</h3>
          <input
            type="text"
            name="product"
            value={initialState.product}
            placeholder="Client"
            className="input input-bordered input-info w-full"
            onChange={handleChange}
          />
        
          <div>
            <button
              className="btn btn-success text-white"
              onClick={handleSubmit}
              disabled={
                initialState.product ? false : true
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

export default EditUserModal;
