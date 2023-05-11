import React, { useEffect, useMemo, useState } from "react";
import FormContainer from "../components/FormContainer";
import { ResponsiveLine } from "@nivo/line";
import {
  Button,
  ButtonGroup,
  Row,
  Col,
  ListGroup,
  Card,
  Table,
  Stack,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKpiTypes } from "../redux/kpiSlice";
import { getUsers } from "../redux/userSlice";
import { getReportKpi } from "../redux/kpiSlice/reportKpi";

const today = new Date();
const formattedDate = today.toLocaleDateString();

const Home = () => {
  const [dataReport, setDataReport] = useState([]);
  const [output, setOutput] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo, listUser } = userLogin;

  const kpiReport = useSelector((state) => state.getReportKpi);
  const {
    error: errorKpiReport,
    loading: loadingKpiReport,
    reportKpi,
  } = kpiReport;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const kpiTypesList = useSelector((state) => state.listKpiTypes);
  const {
    error: errorListKpiType,
    loading: loadingListKpiType,
    listKpiType,
  } = kpiTypesList;

  console.log(listKpiType);

  useEffect(() => {
    if (userInfo) {
      dispatch(getKpiTypes({ token: userInfo.token }));
      dispatch(getReportKpi({ token: userInfo.token }));
      dispatch(getUsers({ token: userInfo.token }));
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, output]);

  if (reportKpi) {
    const convertReportKpi = reportKpi.reduce((acc, item) => {
      const key = `${item.createdAt.split("T")[0]}_${item.user}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
    var newOutput = [Object.entries(convertReportKpi)].map((key, value) => {
      return key.map(([key, arr]) => ({
        key,
        values: arr.map(({ _id, value, createdAt, updatedAt, user, kpi }) => ({
          _id,
          value,
          createdAt,
          updatedAt,
          user,
          kpi,
        })),
      }));
    });
  }

  console.log(listUser);

  // if (result) {
  //   const arr = Object.entries(result);
  //   const mappedObj = Object.fromEntries(
  //     arr.map(([key, value]) => [
  //       console.log(key),
  //       value.map((item) => console.log(item)),
  //     ])
  //   );
  // }

  return (
    <>
      {userInfo && (
        <Row>
          <Col md={7}>
            <>
              {/* {convertReportKpi &&
                [Object.entries(convertReportKpi)].map((key, value) => {
                  console.log("key", key);
                  var output = key.map(([key, arr]) => ({
                    key,
                    values: arr.map(
                      ({ _id, value, createdAt, updatedAt, user, kpi }) => ({
                        _id,
                        value,
                        createdAt,
                        updatedAt,
                        user,
                        kpi,
                      })
                    ),
                  }));
                })} */}
              {console.log(newOutput)}

              {newOutput &&
                newOutput[0].map((item, index) => (
                  <>
                    {console.log(item)}
                    <Card className="mb-2">
                      <Card.Body>
                        <Card.Title>
                          {/* {listUser &&
                            console.log(
                              listUser.find(
                                (user) =>
                                  user._id === Number(item.key.slice(-1))
                              ).username
                            )} */}
                          {listUser &&
                            listUser.find((user) => user._id === 2).username}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {item.key.split("_")[0]}
                        </Card.Subtitle>
                        <Card.Text>
                          <Card.Text>
                            {item.values.map((item, value) => (
                              <Card.Text>
                                {listKpiType &&
                                  listKpiType.find(
                                    (kpi) => kpi._id === item.kpi
                                  ).name}
                                : {item.value}
                              </Card.Text>
                            ))}
                          </Card.Text>
                        </Card.Text>
                        {/* <Stack
                          direction="horizontal"
                          className="justify-content-between"
                        >
                          <ButtonGroup></ButtonGroup>
                          <ButtonGroup>
                            <Button variant="success">Sửa</Button>
                            <Button variant="danger">Xóa</Button>
                          </ButtonGroup>
                        </Stack> */}
                      </Card.Body>
                    </Card>
                  </>
                ))}
            </>
          </Col>
          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>KPI cần làm {formattedDate}</h2>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Nội dung</th>
                      <th className="text-center">Đã làm</th>
                      <th className="text-center">Yêu cầu</th>
                      <th className="text-center">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listKpiType &&
                      listKpiType.map((kpiType, index) => (
                        <>
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>{kpiType.name}</td>
                            <td className="text-center">0</td>
                            <td className="text-center">{kpiType.value}</td>
                            <td className="text-center">Chưa hoàn thành</td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                </Table>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Home;
