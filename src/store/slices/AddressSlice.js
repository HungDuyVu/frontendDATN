import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProvinces = createAsyncThunk('address/fetchProvinces', async () => {
  const response = await axios.get('https://provinces.open-api.vn/api/?depth=1');
  return response.data;
});

export const fetchDistricts = createAsyncThunk('address/fetchDistricts', async (provinceCode) => {
  const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
  return response.data.districts;
});

export const fetchWards = createAsyncThunk('address/fetchWards', async (districtCode) => {
  const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
  return response.data.wards;
});

const AddressSlice = createSlice({
  name: 'address',
  initialState: {
    provinces: [],
    districts: [],
    wards: [],
    selectedProvince: null,
    selectedDistrict: null,
    selectedWard: null, // Đã thêm biến này
    status: 'idle',
  },
  reducers: {
    setSelectedProvince: (state, action) => {
      state.selectedProvince = action.payload;
      state.districts = [];
      state.wards = [];
      state.selectedDistrict = null; // Reset selected district
      state.selectedWard = null;     // Reset selected ward
    },
    setSelectedDistrict: (state, action) => {
      state.selectedDistrict = action.payload;
      state.wards = [];
      state.selectedWard = null;     // Reset selected ward
    },
    setSelectedWard: (state, action) => { // Đã thêm action này
      state.selectedWard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.provinces = action.payload;
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.districts = action.payload;
      })
      .addCase(fetchWards.fulfilled, (state, action) => {
        state.wards = action.payload;
      });
  },
});

export const { setSelectedProvince, setSelectedDistrict, setSelectedWard } = AddressSlice.actions;
export default AddressSlice.reducer;