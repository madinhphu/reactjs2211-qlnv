import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import Message from "../components/Message";

const Login = (location, history) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: username, password: password }));
  };
  return (
    <FormContainer>
      <h1>Đăng nhập tài khoản</h1>
      {error && (
        <Message variant="danger">
          Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.
        </Message>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="mt-2" type="submit" variant="primary">
          Đăng nhập
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Login;
