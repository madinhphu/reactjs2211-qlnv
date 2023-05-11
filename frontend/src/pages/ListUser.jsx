import React, { useEffect, useState } from "react";
import {
  getUsers,
  registerUser,
  deleteUser,
  updateUser,
} from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Row,
  Col,
  ListGroup,
  Card,
  Table,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";

const ListUser = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [show, setShow] = useState(false);

  const handleRegisterUserClose = () => setShow(false);
  const handleRegisterUserShow = () => setShow(true);

  const showEditUserClose = () => setShowEditUser(false);
  const showEditUserOpen = (user) => {
    setSelectedUser(user);
    setShowEditUser(true);
    setIsAdmin(user.isAdmin);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo, listUser, success } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(getUsers({ token: userInfo.token }));
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, success]);

  const registerUserSubmit = () => {
    console.log("Testing registration");

    dispatch(
      registerUser({
        token: userInfo.token,
        email: email,
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      })
    );
  };

  const deleteUserHandler = (id) => {
    if (window.confirm("Bạn cần xóa User này?")) {
      dispatch(deleteUser({ id, token: userInfo.token }));
    }
  };

  const submitEditUser = () => {
    console.log(selectedUser.id);
    dispatch(
      updateUser({
        id: selectedUser.id,
        token: userInfo.token,
        email: selectedUser.email,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        isAdmin: isAdmin,
      })
    );
  };

  return (
    <>
      {userInfo.isAdmin && (
        <>
          <Row className="justify-content-between">
            <Col>
              <h1>Danh sách nhân viên</h1>
            </Col>
            <Col className="text-end">
              <Button variant="info" onClick={handleRegisterUserShow}>
                Thêm nhân viên
              </Button>{" "}
              <Modal show={show} onHide={handleRegisterUserClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Thêm nhân viên mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Username
                      </InputGroup.Text>
                      <Form.Control
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập tên tài khoản..."
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon2">Mail</InputGroup.Text>
                      <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập địa chỉ email..."
                        required
                      />

                      <Row className="mt-3">
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom01"
                          required
                        >
                          <Form.Label>Tên</Form.Label>
                          <Form.Control
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            type="text"
                            placeholder="Nhập tên..."
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom02"
                          required
                        >
                          <Form.Label>Họ</Form.Label>
                          <Form.Control
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            type="text"
                            placeholder="Nhập họ..."
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                    </InputGroup>
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="password"
                      required
                    />
                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                    <Form.Control
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      id="confirmpassword"
                      required
                    />
                    <Button
                      className="mt-3"
                      variant="primary"
                      type="button"
                      onClick={(handleRegisterUserClose, registerUserSubmit)}
                    >
                      Thêm
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Chức vụ</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {listUser &&
                  listUser.map((item, index) => (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>
                        {item.firstName === "null"
                          ? "Chưa có tên"
                          : item.firstName}
                      </td>
                      <td>
                        {item.lastName === "null"
                          ? "Chưa có tên"
                          : item.lastName}
                      </td>

                      <td>{item.isAdmin ? "Quản lý" : "Nhân viên"}</td>
                      <td className="text-center">
                        <Button variant="light" className="btn-sm me-1">
                          <i
                            className="fas fa-edit"
                            style={{ color: "#5a3" }}
                            onClick={() => showEditUserOpen(item)}
                          ></i>{" "}
                        </Button>
                        <Modal show={showEditUser} onHide={showEditUserClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Sửa nhân viên</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <InputGroup className="mb-3">
                                <Form.Control
                                  value={selectedUser && selectedUser.email}
                                  onChange={(e) => {
                                    setSelectedUser({
                                      ...selectedUser,
                                      email: e.target.value,
                                    });
                                  }}
                                  placeholder="Email address"
                                  required
                                />
                                <InputGroup.Text id="basic-addon2">
                                  @gmail.com
                                </InputGroup.Text>
                                <Row className="mt-3">
                                  <Form.Group
                                    as={Col}
                                    md="6"
                                    controlId="validationCustom01"
                                    required
                                  >
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                      value={
                                        selectedUser && selectedUser.firstName
                                      }
                                      onChange={(e) => {
                                        setSelectedUser({
                                          ...selectedUser,
                                          firstName: e.target.value,
                                        });
                                      }}
                                      required
                                      type="text"
                                      placeholder="First name"
                                    />
                                    <Form.Control.Feedback>
                                      Looks good!
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                  <Form.Group
                                    as={Col}
                                    md="6"
                                    controlId="validationCustom02"
                                    required
                                  >
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                      value={
                                        selectedUser && selectedUser.lastName
                                      }
                                      onChange={(e) => {
                                        setSelectedUser({
                                          ...selectedUser,
                                          lastName: e.target.value,
                                        });
                                      }}
                                      required
                                      type="text"
                                      placeholder="Last name"
                                    />
                                    <Form.Control.Feedback>
                                      Looks good!
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Row>
                              </InputGroup>

                              {["checkbox"].map((type) => (
                                <div key={type} className="mb-3">
                                  <Form.Check
                                    checked={isAdmin}
                                    onChange={(e) =>
                                      setIsAdmin(e.target.checked)
                                    }
                                    type={type}
                                    id="admin"
                                    label="Quản lý"
                                    className="mt-3"
                                  />
                                </div>
                              ))}
                              <Button
                                className="mt-3"
                                variant="primary"
                                type="button"
                                onClick={() => submitEditUser()}
                              >
                                Sửa
                              </Button>
                            </Form>
                          </Modal.Body>
                        </Modal>

                        <Button
                          variant="light"
                          className="btn-sm"
                          onClick={() => deleteUserHandler(item._id)}
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
          </Row>
        </>
      )}
    </>
  );
};

export default ListUser;
