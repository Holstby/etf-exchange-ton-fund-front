import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from "@/API/API.ts";
import {InitialStateType} from "@/types.ts";


export const fetchWalletInfoTC = createAsyncThunk(
  'app/fetchWalletInfo',
  async (
    param: {
      address: string;
    },
    {rejectWithValue}
  ) => {
    let response = await API.getWalletInfo(param.address);
    if (!response) return rejectWithValue(null)
    return response
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState: {
  } as InitialStateType,
  reducers: {
    setWalletAddress: (state, action) => {
      state.wallet_address = action.payload.message;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchWalletInfoTC.fulfilled, (state, action) => {
      state.wallet_info = action.payload;
    });
  }
});

export const {setWalletAddress} = appSlice.actions;
export default appSlice.reducer;



