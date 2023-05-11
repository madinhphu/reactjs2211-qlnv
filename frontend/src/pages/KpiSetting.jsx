import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  ListGroup,
  Row,
  Col,
  Card,
  Stack,
  Table,
  Form,
  Tab,
  Nav,
  Modal,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createKpiType } from "../redux/kpiSlice";
import { getKpiTypes, deleteKpiType, updateKpiType } from "../redux/kpiSlice";

const KpiSetting = () => {
  const [nameKpiType, setNameKpiType] = useState("");
  const [descriptionKpiType, setDescriptionKpiType] = useState("");
  const [valueKpi, setValueKpi] = useState(0);
  const [showEditKpiType, setShowEditKpiType] = useState(false);
  const [selectedKpiType, setSelectedKpiType] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const kpiTypesList = useSelector((state) => state.listKpiTypes);
  const {
    error: errorListKpiType,
    loading: loadingListKpiType,
    listKpiType,
  } = kpiTypesList;

  const kpiTypeDelete = useSelector((state) => state.deleteKpiTypes);
  const {
    error: errorDeleteKpiType,
    loading: loadingDeleteKpiType,
    success: successDeleteKpiType,
  } = kpiTypeDelete;

  const kpiTypeUpdate = useSelector((state) => state.updateKpiTypes);
  const {
    error: errorUpdateKpiType,
    loading: loadingUpdateKpiType,
    success: successUpdateKpiType,
  } = kpiTypeUpdate;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(getKpiTypes({ token: userInfo.token }));
    } else {
      navigate("/login");
    }
  }, [dispatch, successDeleteKpiType]);

  const submitAddKpiType = () => {
    dispatch(
      createKpiType({
        name: nameKpiType,
        value: valueKpi,
        description: descriptionKpiType,
        token: userInfo.token,
      })
    );
  };

  const deleteKpiTypeHandler = (id) => {
    if (window.confirm("Bạn cần xóa loại KPI này?")) {
      dispatch(deleteKpiType({ id: id, token: userInfo.token }));
    }
  };

  const updateKpiTypeHandler = (id) => {
    if (selectedKpiType) {
      dispatch(
        updateKpiType({
          id: id,
          name: selectedKpiType.name,
          value: selectedKpiType.value,
          description: selectedKpiType.description,
          token: userInfo.token,
        })
      );
    }
  };

  const showEditKpiTypeClose = () => setShowEditKpiType(false);
  const showEditKpiTypeOpen = (kpiType) => {
    setSelectedKpiType(kpiType);
    setShowEditKpiType(true);
  };

  return (
    <>
      {userInfo && (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Card>
                <Card.Body>
                  <Nav variant="pills" className="flex-column tab-kpi">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Thêm loại KPI</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Cài đặt KPI</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Card className="mb-2">
                    <Card.Body>
                      <h1>Thêm loại KPI</h1>
                      <Form onSubmit={submitAddKpiType}>
                        <Form.Group className="mb-1" controlId="namekpi">
                          <Form.Label>Tên KPI</Form.Label>
                          <Form.Control
                            value={nameKpiType}
                            type="text"
                            placeholder="Nhập tên KPI"
                            onChange={(e) => {
                              setNameKpiType(e.target.value);
                            }}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="descriptionkpi">
                          <Form.Label>Nhập yêu cầu KPI</Form.Label>
                          <Form.Control
                            value={valueKpi}
                            type="number"
                            placeholder="VD: 10"
                            onChange={(e) => {
                              setValueKpi(e.target.value);
                            }}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descriptionkpi">
                          <Form.Label>Mô tả</Form.Label>
                          <Form.Control
                            value={descriptionKpiType}
                            type="text"
                            placeholder="Nhập mô tả KPI"
                            onChange={(e) => {
                              setDescriptionKpiType(e.target.value);
                            }}
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Thêm
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h1>Danh sách KPI</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th className="text-center">ID</th>
                            <th>Nội dung</th>
                            <th className="text-center">Yêu cầu</th>
                            <th className="text-center">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listKpiType &&
                            listKpiType.map((kpiType, index) => (
                              <tr key={kpiType._id}>
                                <td className="text-center">{kpiType._id}</td>
                                <td>{kpiType.name}</td>
                                <td className="text-center">{kpiType.value}</td>
                                <td className="text-center">
                                  <Button
                                    variant="light"
                                    className="btn-sm me-1"
                                    onClick={() => showEditKpiTypeOpen(kpiType)}
                                  >
                                    <i
                                      className="fas fa-edit"
                                      style={{ color: "#5a3" }}
                                    ></i>{" "}
                                  </Button>

                                  <Modal
                                    show={showEditKpiType}
                                    onHide={showEditKpiTypeClose}
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title>
                                        {selectedKpiType &&
                                          selectedKpiType.name}
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <Form onSubmit={submitAddKpiType}>
                                        <Form.Group
                                          className="mb-1"
                                          controlId="namekpi"
                                        >
                                          <Form.Label>Tên KPI</Form.Label>
                                          <Form.Control
                                            value={
                                              selectedKpiType &&
                                              selectedKpiType.name
                                            }
                                            type="text"
                                            placeholder="Nhập tên KPI"
                                            onChange={(e) => {
                                              setSelectedKpiType({
                                                ...selectedKpiType,
                                                name: e.target.value,
                                              });
                                            }}
                                            required
                                          />
                                        </Form.Group>

                                        <Form.Group
                                          className="mb-1"
                                          controlId="descriptionkpi"
                                        >
                                          <Form.Label>
                                            Nhập yêu cầu KPI
                                          </Form.Label>
                                          <Form.Control
                                            value={
                                              selectedKpiType &&
                                              selectedKpiType.value
                                            }
                                            type="number"
                                            placeholder="VD: 10"
                                            onChange={(e) => {
                                              setSelectedKpiType({
                                                ...selectedKpiType,
                                                value: e.target.value,
                                              });
                                            }}
                                            required
                                          />
                                        </Form.Group>

                                        <Form.Group
                                          className="mb-3"
                                          controlId="descriptionkpi"
                                        >
                                          <Form.Label>Mô tả</Form.Label>
                                          <Form.Control
                                            value={
                                              selectedKpiType &&
                                              selectedKpiType.description
                                            }
                                            type="text"
                                            placeholder="Nhập mô tả KPI"
                                            onChange={(e) => {
                                              setSelectedKpiType({
                                                ...selectedKpiType,
                                                description: e.target.value,
                                              });
                                            }}
                                          />
                                        </Form.Group>
                                      </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        variant="secondary"
                                        onClick={showEditKpiTypeClose}
                                      >
                                        Hủy
                                      </Button>
                                      <Button
                                        variant="primary"
                                        onClick={() => {
                                          showEditKpiTypeClose();
                                          updateKpiTypeHandler(
                                            selectedKpiType &&
                                              selectedKpiType._id
                                          );
                                        }}
                                      >
                                        Cập nhật
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>

                                  <Button
                                    variant="light"
                                    className="btn-sm"
                                    onClick={() =>
                                      deleteKpiTypeHandler(kpiType._id)
                                    }
                                  >
                                    <i
                                      className="fas fa-trash"
                                      style={{ color: "#923" }}
                                    ></i>
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </ListGroup.Item>
                  </ListGroup>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </>
  );
};

export default KpiSetting;
