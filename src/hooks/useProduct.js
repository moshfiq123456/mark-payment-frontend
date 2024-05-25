import React, { useCallback, useEffect, useState } from "react";
import api from "../helpers/api";

import { useDispatch } from "react-redux";
import { createProduct, deleteProduct, updateProduct,fetchProduct } from "../redux/actionHandler/productActionHandler";

const useProduct = (getOnMount=true) => {

  const dispatch = useDispatch();
  const [createSuccess,setCreateSuccess ] = useState(false)
  const fetch = useCallback(() => {
    dispatch(fetchProduct())

  }, [dispatch]);

  const handleSubmit = (value) => {
    setCreateSuccess(false)
    dispatch(createProduct({...value})).then(()=>{
      setCreateSuccess(true)
    });
    setCreateSuccess(false)

  };

  const handleDelete = (e) => {
    dispatch(deleteProduct(e._id))
  };

  const handleEdit = (e) => {
    dispatch( updateProduct(e))

  }

  useEffect(() => {
    if(getOnMount){
      fetch()
    }

  }, [dispatch,getOnMount]);

  useEffect(() => {
    if(createSuccess){
      fetch()
    }

  }, [createSuccess]);

  return {fetch,handleSubmit,handleDelete,handleEdit};
};

export default useProduct;
