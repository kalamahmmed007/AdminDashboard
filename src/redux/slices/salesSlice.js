import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ---- DISCOUNTS ----
export const fetchDiscounts = createAsyncThunk("sales/fetchDiscounts", async () => {
  // API call
});
export const addDiscount = createAsyncThunk("sales/addDiscount", async (data) => {});
export const updateDiscount = createAsyncThunk("sales/updateDiscount", async ({id, data}) => {});
export const deleteDiscount = createAsyncThunk("sales/deleteDiscount", async (id) => {});

// ---- GIFT CARDS ----
export const fetchGiftCards = createAsyncThunk("sales/fetchGiftCards", async () => {});
export const addGiftCard = createAsyncThunk("sales/addGiftCard", async (data) => {});
export const updateGiftCard = createAsyncThunk("sales/updateGiftCard", async ({id,data}) => {});
export const deleteGiftCard = createAsyncThunk("sales/deleteGiftCard", async (id) => {});

// ---- LOYALTY ----
export const fetchLoyalty = createAsyncThunk("sales/fetchLoyalty", async () => {});
export const addLoyalty = createAsyncThunk("sales/addLoyalty", async (data) => {});
export const updateLoyalty = createAsyncThunk("sales/updateLoyalty", async ({id,data}) => {});
export const deleteLoyalty = createAsyncThunk("sales/deleteLoyalty", async (id) => {});

// ---- AFFILIATES ----
export const fetchAffiliates = createAsyncThunk("sales/fetchAffiliates", async () => {});
export const addAffiliate = createAsyncThunk("sales/addAffiliate", async (data) => {});
export const updateAffiliate = createAsyncThunk("sales/updateAffiliate", async ({id,data}) => {});
export const deleteAffiliate = createAsyncThunk("sales/deleteAffiliate", async (id) => {});

// ---- RETURNS ----
export const fetchReturns = createAsyncThunk("sales/fetchReturns", async () => {});
export const addReturn = createAsyncThunk("sales/addReturn", async (data) => {});
export const updateReturn = createAsyncThunk("sales/updateReturn", async ({id,data}) => {});
export const deleteReturn = createAsyncThunk("sales/deleteReturn", async (id) => {});

// ---- INVOICES ----
export const fetchInvoices = createAsyncThunk("sales/fetchInvoices", async () => {});
export const addInvoice = createAsyncThunk("sales/addInvoice", async (data) => {});
export const updateInvoice = createAsyncThunk("sales/updateInvoice", async ({id,data}) => {});
export const deleteInvoice = createAsyncThunk("sales/deleteInvoice", async (id) => {});

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    discounts: [],
    giftCards: [],
    loyalty: [],
    affiliates: [],
    returns: [],
    invoices: [],
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    // এখানে সব thunk এর pending/fulfilled/rejected handle করতে পারো
  }
});

export default salesSlice.reducer;
