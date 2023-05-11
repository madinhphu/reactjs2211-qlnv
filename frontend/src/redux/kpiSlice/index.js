import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getKpiTypes = createAsyncThunk("kpi/getKpiTypes", async (arg) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${arg.token}`,
    },
  };
  const { data } = await axios.get(
    "http://127.0.0.1:8000/api/kpi/list-kpi-type/",
    config
  );
  return data;
});

export const createKpiType = createAsyncThunk(
  "kpi/createKpiType",
  async (arg) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${arg.token}`,
      },
    };
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/kpi/create-kpi-type/",
      {
        name: arg.name,
        value: arg.value,
        description: arg.description,
      },
      config
    );
    return data;
  }
);

export const deleteKpiType = createAsyncThunk(
  "kpi/deleteKpiType",
  async (arg) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${arg.token}`,
      },
    };
    const { data } = await axios.delete(
      `http://127.0.0.1:8000/api/kpi/delete-kpi-type/${arg.id}/`,
      config
    );
    return data;
  }
);

export const updateKpiType = createAsyncThunk(
  "kpi/updateKpiType",
  async (arg) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${arg.token}`,
      },
    };
    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/kpi/update-kpi-type/${arg.id}/`,
      {
        name: arg.name,
        value: arg.value,
        description: arg.description,
      },
      config
    );
    return data;
  }
);

export const kpiSlice = createSlice({
  name: "kpi",
  initialState: {},

  reducers: {},
  extraReducers(builder) {
    builder

      //Get List Kpi Types
      .addCase(getKpiTypes.pending, (state, action) => {
        return { loading: true };
      })
      .addCase(getKpiTypes.fulfilled, (state, action) => {
        return { loading: false, listKpiType: action.payload };
      })
      .addCase(getKpiTypes.rejected, (state, action) => {
        return { loading: false, error: action.payload };
      })

      //Create Kpi Type
      .addCase(createKpiType.pending, (state, action) => {
        return { loading: true };
      })
      .addCase(createKpiType.fulfilled, (state, action) => {
        return { loading: false, userInfo: action.payload };
      })
      .addCase(createKpiType.rejected, (state, action) => {
        return { loading: false, error: action.error };
      })

      //Delete Kpi Types
      .addCase(deleteKpiType.pending, (state, action) => {
        return { loading: true };
      })
      .addCase(deleteKpiType.fulfilled, (state, action) => {
        return { loading: false, success: true };
      })
      .addCase(deleteKpiType.rejected, (state, action) => {
        return { loading: false, error: action.payload };
      })

      //Update Kpi Types
      .addCase(updateKpiType.pending, (state, action) => {
        return { loading: true };
      })
      .addCase(updateKpiType.fulfilled, (state, action) => {
        return { loading: false, success: true };
      })
      .addCase(updateKpiType.rejected, (state, action) => {
        return { loading: false, error: action.payload };
      });
  },
});

export const {} = kpiSlice.actions;

export default kpiSlice.reducer;
