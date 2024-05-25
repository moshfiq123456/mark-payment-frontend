import React, { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createUsers, deleteUsers, fetchUsers, updateUsers } from "../redux/actionHandler/usersActionHandler";
import { getUsersSelector } from "../redux/selectors/getUsersSelector";
import { resetSuccess } from "../redux/slices/usersSlice";

const useUsers = (getOnMount=true) => {
  const dispatch = useDispatch();
  const {users,loading,error,success} = useSelector(getUsersSelector);
  const [createSuccess,setCreateSuccess ] = useState(false)
  
  const fetch = () => {
    dispatch(fetchUsers())
  };

  const handleSubmit = (value) => {
    setCreateSuccess(false)
    dispatch(createUsers({...value})).then(() => {
      setCreateSuccess(true)
    });
    setCreateSuccess(false)
  };

  const handleDelete = (e) => {
    dispatch(deleteUsers(e._id));
  };

  const handleEdit = (e) => {
    dispatch(updateUsers(e));
  }

  useEffect(() => {
    if(getOnMount){
      fetch();
    }
  }, [dispatch,getOnMount]);
  useEffect(() => {
    if (createSuccess) {
      fetch();
    }
  }, [createSuccess]);
  
  console.log(createSuccess)
  return {handleSubmit,handleDelete,handleEdit};
  
};

export default useUsers;
