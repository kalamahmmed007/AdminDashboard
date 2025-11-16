// src/redux/slices/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,         // global loading flag
    sidebarOpen: true,      // sidebar toggle
    modal: null,            // currently open modal id or component
    toast: null,            // { message, type: 'success'|'error'|'info', duration }
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        openModal: (state, action) => {
            state.modal = action.payload; // could be modal id or object
        },
        closeModal: (state) => {
            state.modal = null;
        },
        showToast: (state, action) => {
            const { message, type = "info", duration = 3000 } = action.payload;
            state.toast = { message, type, duration };
        },
        hideToast: (state) => {
            state.toast = null;
        },
    },
});

export const { setLoading, toggleSidebar, openModal, closeModal, showToast, hideToast } = uiSlice.actions;

export default uiSlice.reducer;
