import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Lấy token từ localStorage (hoặc nơi bạn lưu trữ)
const getToken = () => {
   return localStorage.getItem("token");
};

// Đăng ký người mua
export const registerBuyer = createAsyncThunk("auth/register-buyer", async (formData) => {
   try {
      const request = await axios.post("http://localhost:5000/api/auth/register-buyer", formData, {
         headers: {
            "Content-Type": "application/json",
         },
         withCredentials: true,
      });
      return request.data;
   } catch (error) {
      console.log("Error register buyer: " + error.message);
   }
});

// Đăng ký người ban
export const registerSeller = createAsyncThunk("auth/register-seller", async (formData) => {
   try {
      const request = await axios.post("http://localhost:5000/api/auth/register-seller", formData, {
         headers: {
            "Content-Type": "application/json",
         },
         withCredentials: true,
      });
      return request.data;
   } catch (error) {
      console.log("Error register buyer: " + error.message);
   }
});

// Đăng ký dong vi van chuyen
export const registerDelivery = createAsyncThunk("auth/register-delivery", async (formData) => {
   try {
      const request = await axios.post("http://localhost:5000/api/auth/register-delivery", formData, {
         headers: {
            "Content-Type": "application/json",
         },
         withCredentials: true,
      });
      return request.data;
   } catch (error) {
      console.log("Error register buyer: " + error.message);
   }
});


// Đăng nhập người dùng
export const loginUser = createAsyncThunk("auth/login", async (formData) => {
   try {
      const request = await axios.post("http://localhost:5000/api/auth/login", formData, {
         headers: {
            "Content-Type": "application/json",
         },
         withCredentials: true,
      });
      return request.data;
   } catch (error) {
      console.log("Error login: " + error.message);
   }
});


// Đăng xuất người dùng
export const logoutUser = createAsyncThunk("auth/logout", async () => {
   try {
      const request = await axios.post("http://localhost:5000/api/auth/logout", {}, {
         headers: {
            "Content-Type": "application/json",
         },
         withCredentials: true,
      });
      return request.data;
   } catch (error) {
      console.log("Error logout: " + error.message);
   }
});

// Kiểm tra trạng thái xác thực
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
   const token = getToken();
   try {
      const request = await axios.get("http://localhost:5000/api/auth/checkAuth", {
         headers: {
            "Authorization": `Bearer ${token}`,
         },
         withCredentials: true,
      });
      return request.data;
   } catch (error) {
      console.log("Error checking auth: " + error.message);
   }
});

const userSlice = createSlice({
   name: "Users",
   initialState: {
      isLoading: true,
      user: null,
   },
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload; // Cập nhật thông tin người dùng
      },
   },
   extraReducers: (builder) => {
      builder
         // Đăng ký người mua
         .addCase(registerBuyer.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(registerBuyer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user =  action.payload.user;
         })
         .addCase(registerBuyer.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
         })
         // Đăng ký người bán
         .addCase(registerSeller.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(registerSeller.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user =action.payload.user ;
         })
         .addCase(registerSeller.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
         })
         // Đăng ký đơn vị vận chuyển
         .addCase(registerDelivery.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(registerDelivery.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user =  action.payload.user;
         })
         .addCase(registerDelivery.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
         })
         // Đăng nhập người dùng
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.success) {
               state.user = action.payload.user; 
            } else {
               state.user = null;
            }
         })
         .addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
         })
         // Đăng xuất người dùng
         .addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
         });
   },
});

export default userSlice.reducer;
