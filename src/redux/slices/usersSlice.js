import { createSlice } from '@reduxjs/toolkit';
import {  fetchUsers, createUsers, updateUsers, deleteUsers } from '../actionHandler/usersActionHandler'; // Adjust the import path

const initialState = {
  users: [],
  loading: false,
  error: null,
  success: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch User
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create User
      .addCase(createUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User
      .addCase(updateUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        console.log(state,action)
        state.loading = false;
        const index = state.users.findIndex(user => user._id === action.meta.arg);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.meta.arg);
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
