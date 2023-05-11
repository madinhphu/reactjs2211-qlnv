import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import kpiReducer from "./kpiSlice";
import reportKpiReducer from "./kpiSlice/reportKpi";

export default configureStore({
  reducer: {
    userLogin: userReducer,

    listKpiTypes: kpiReducer,
    deleteKpiTypes: kpiReducer,
    updateKpiTypes: kpiReducer,

    createReportKpi: reportKpiReducer,
    getReportKpi: reportKpiReducer,
  },
});
