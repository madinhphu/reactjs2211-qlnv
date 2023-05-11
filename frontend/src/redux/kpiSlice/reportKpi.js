import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getReportKpi = createAsyncThunk(
  "kpi/getReportKpi",
  async (arg) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${arg.token}`,
      },
    };
    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/kpi/get-report-kpi/",
      config
    );
    return data;
  }
);

export const createReportKpi = createAsyncThunk(
  "kpi/createReportKpi",
  async (arg) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${arg.token}`,
      },
    };
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/kpi/create-report-kpi/",
      arg.data,
      config
    );
    return data;
  }
);

export const reportKpiSlice = createSlice({
  name: "kpi",
  initialState: {},

  reducers: {},
  extraReducers(builder) {
    builder

      //Get report kpi
      .addCase(getReportKpi.pending, (state, action) => {
        return { loading: true };
      })
      .addCase(getReportKpi.fulfilled, (state, action) => {
        return { loading: false, reportKpi: action.payload };
      })
      .addCase(getReportKpi.rejected, (state, action) => {
        return { loading: false, error: action.payload };
      })

      //Create report kpi
      .addCase(createReportKpi.pending, (state, action) => {
        return { loading: true };
      })
      .addCase(createReportKpi.fulfilled, (state, action) => {
        return { loading: false, success: true };
      })
      .addCase(createReportKpi.rejected, (state, action) => {
        return { loading: false, error: action.payload };
      });
  },
});

export const {} = reportKpiSlice.actions;

export default reportKpiSlice.reducer;
