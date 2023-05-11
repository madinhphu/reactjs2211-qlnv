import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userInfoFromStore = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const getUsers = createAsyncThunk("user/getUsers", async (arg) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${arg.token}`,
    },
  };
  const { data } = await axios.get("http://127.0.0.1:8000/api/users/", config);
  return data;
});

export const registerUser = createAsyncThunk("user/register", async (arg) => {
  console.log(arg);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${arg.token}`,
    },
  };
  const { data } = await axios.post(
    "http://127.0.0.1:8000/api/users/register/",
    {
      email: arg.email,
      firstName: arg.firstName,
      lastName: arg.lastName,
      username: arg.username,
      password: arg.password,
    },
    config
  );
  return data;
});

export const deleteUser = createAsyncThunk("user/delete", async (arg) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${arg.token}`,
    },
  };
  const { data } = await axios.delete(
    `http://127.0.0.1:8000/api/users/delete/${arg.id}/`,
    config
  );
  return data;
});

export const updateUser = createAsyncThunk("user/update", async (arg) => {
  console.log(arg);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${arg.token}`,
    },
  };
  const { data } = await axios.put(
    `http://127.0.0.1:8000/api/users/update/${arg.id}/`,
    {
      email: arg.email,
      firstName: arg.firstName,
      lastName: arg.lastName,
      isAdmin: arg.isAdmin,
    },
    config
  );
  return data;
});

export const loginUser = createAsyncThunk("user/login", async (arg) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.post(
    "http://localhost:8000/api/users/login/",
    {
      username: arg.username,
      password: arg.password,
    },
    config
  );
  localStorage.setItem("userInfo", JSON.stringify(data));
  return data;
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("userInfo");
});

const initialState = {
  userInfo: userInfoFromStore,
  listUser: null,
  loading: false,
  success: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // changeToken: (state, action) => {
    //   state.token = "Token da duoc doi ";
    // },
    // changeName: (state, action) => {
    //   state.name = action.payload.data;
    // },
  },
  extraReducers(builder) {
    builder

      //get list users
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      //get list users
      .addCase(getUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.listUser = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      //Login user
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userInfo = null;
      })

      //get list users
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      //get list users
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
