import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getKpiTypes } from "../redux/kpiSlice";
import { useSelector, useDispatch } from "react-redux";
import { createReportKpi } from "../redux/kpiSlice/reportKpi";

const AddKpi = () => {
  const [reportKpiData, setReportKpiData] = useState([]);
  const [indexConvert, setIndexConvert] = useState();
  const [changeValue, setchangeValue] = useState({});

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const kpiReport = useSelector((state) => state.createReportKpi);
  const {
    error: errorKpiReport,
    loading: loadingKpiReport,
    success,
  } = kpiReport;

  const kpiTypesList = useSelector((state) => state.listKpiTypes);
  const {
    error: errorListKpiType,
    loading: loadingListKpiType,
    listKpiType,
  } = kpiTypesList;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      dispatch(getKpiTypes({ token: userInfo.token }));
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  const submitReportKpiHandle = ({ id, value }) => {
    if (userInfo && reportKpiData) {
      dispatch(createReportKpi({ token: userInfo.token, data: reportKpiData }));
    } else {
      console.log("Chưa có data");
    }
    //
  };

  const convertReportKpi = ({ id, value, indexA }) => {
    const convertData = JSON.parse(JSON.stringify(reportKpiData));
    if (!indexA) {
      convertData.splice(indexA, 1, { id, value });
      setReportKpiData(convertData);
    }
  };

  return (
    <>
      <FormContainer>
        <h1 className="text-center mb-4">Báo cáo KPI hôm nay</h1>
        <Form onSubmit={submitReportKpiHandle}>
          {listKpiType &&
            listKpiType.map((kpiType, index) => (
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
                key={index}
              >
                <Form.Label column sm="4">
                  {kpiType.name}
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type={kpiType.value ? "number" : "text"}
                    placeholder="Số lượng"
                    onChange={(e) => {
                      const index = reportKpiData.find(
                        (item) => kpiType._id === item.id
                      );
                      if (!index) {
                        setReportKpiData([
                          ...reportKpiData,
                          { id: kpiType._id, value: e.target.value },
                        ]);
                      } else {
                        const indexA = reportKpiData.findIndex(
                          (item) => item.id === kpiType._id
                        );
                        convertReportKpi({
                          id: kpiType._id,
                          value: e.target.value,
                          idex: indexA,
                        });
                      }
                    }}
                    required
                  />
                </Col>
              </Form.Group>
            ))}
          <Form.Group className="text-center">
            <Button type="submit">Gửi</Button>
          </Form.Group>
        </Form>
      </FormContainer>
    </>
  );
};

export default AddKpi;
