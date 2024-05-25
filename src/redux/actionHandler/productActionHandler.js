import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../helpers/api';


// Create
export const createProduct = createAsyncThunk('product/create', async (item, { rejectWithValue }) => {
  
  try {
    const response = await api.post("product", item);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Read
export const fetchProduct = createAsyncThunk('product/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("product");
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update
export const updateProduct = createAsyncThunk('product/update', async ( item , { rejectWithValue }) => {
  try {
    const response = await api.patch(`product/${item._id}`,{product:item.product} );

    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

//Delete
export const deleteProduct = createAsyncThunk('product/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(`product/${id}`);
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});