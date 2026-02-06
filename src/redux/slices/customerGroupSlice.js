import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchGroupsAPI,
  addGroupAPI,
  updateGroupAPI,
  deleteGroupAPI,
} from "../../services/customerGroupService";

export const fetchGroups = createAsyncThunk(
  "groups/fetch",
  fetchGroupsAPI
);

export const addGroup = createAsyncThunk(
  "groups/add",
  addGroupAPI
);

export const updateGroup = createAsyncThunk(
  "groups/update",
  async ({ id, data }) => {
    await updateGroupAPI(id, data);
    return { id, data };
  }
);

export const deleteGroup = createAsyncThunk(
  "groups/delete",
  async (id) => {
    await deleteGroupAPI(id);
    return id;
  }
);

const groupSlice = createSlice({
  name: "groups",
  initialState: { groups: [] },
  extraReducers: (b) => {
    b.addCase(fetchGroups.fulfilled, (s, a) => {
      s.groups = a.payload;
    })
     .addCase(addGroup.fulfilled, (s, a) => {
      s.groups.push(a.payload);
    })
     .addCase(updateGroup.fulfilled, (s, a) => {
      s.groups = s.groups.map((g) =>
        g.id === a.payload.id ? { ...g, ...a.payload.data } : g
      );
    })
     .addCase(deleteGroup.fulfilled, (s, a) => {
      s.groups = s.groups.filter((g) => g.id !== a.payload);
    });
  },
});

export default groupSlice.reducer;
