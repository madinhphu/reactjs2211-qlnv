import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./layout/Header";

import Login from "./pages/Login";
import Home from "./pages/Home";
import KpiSetting from "./pages/KpiSetting";
import AddKpi from "./pages/AddKpi";
import ListUser from "./pages/ListUser";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/kpi-setting" element={<KpiSetting />} exact />
            <Route path="/kpi-add" element={<AddKpi />} exact />
            <Route path="/list-user" element={<ListUser />} exact />
            <Route path="/profile" element={<Profile />} exact />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
