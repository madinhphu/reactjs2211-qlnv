import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "../components/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="logo-text-style">
              CRM V.ReactJS.2211
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {userInfo ? (
              <Nav className="me-auto">
                <NavDropdown
                  title={
                    userInfo.firstName === "null"
                      ? "Nhân viên"
                      : userInfo.firstName
                  }
                  id="username"
                  className="me-2"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Hồ sơ</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Thoát
                  </NavDropdown.Item>
                </NavDropdown>
                <div className="vr" />
                <NavDropdown title="Quản lý KPI" id="kpi" className="ms-2">
                  <LinkContainer to="/kpi-view">
                    <NavDropdown.Item>Tổng quan</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/kpi-add">
                    <NavDropdown.Item>Báo cáo KPI</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo.isAdmin && (
                    <LinkContainer to="/kpi-setting">
                      <NavDropdown.Item>Cài đặt KPI</NavDropdown.Item>
                    </LinkContainer>
                  )}
                </NavDropdown>
                {userInfo.isAdmin && (
                  <NavDropdown title="Quản lý nhân viên" id="user">
                    <LinkContainer to="/list-user">
                      <NavDropdown.Item>Danh sách nhân viên</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            ) : (
              <Nav className="me-auto"></Nav>
            )}
            <Nav>
              {userInfo ? (
                <SearchBox />
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Đăng nhập
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
