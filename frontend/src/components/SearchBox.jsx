import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SearchBox = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Form className="d-flex" onSubmit={submitHandler}>
        <Form.Control
          type="text"
          name="q"
          placeholder="Keywords..."
          className="me-1"
          aria-label="Search"
          onChange={() => {}}
        />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
    </>
  );
};

export default SearchBox;
