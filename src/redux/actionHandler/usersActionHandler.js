import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../helpers/api';


// Create
export const createUsers = createAsyncThunk('users/create', async (item, { rejectWithValue }) => {
  
  try {
    const response = await api.post("signup", item);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Read
export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("users");
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update
export const updateUsers = createAsyncThunk('users/update', async ( item , { rejectWithValue }) => {
  try {
    const response = await api.patch(`product/${item._id}`,{product:item.product} );

    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

//Delete
export const deleteUsers = createAsyncThunk('users/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`delete/${id}`);
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});