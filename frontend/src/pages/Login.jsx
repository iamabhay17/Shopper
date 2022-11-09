import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { login } from "../store/action/userAction";
import { ThreeDots } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loading && <ThreeDots color="#00BFFF" height={80} width={80} />}
      {error && <Message variant="danger" message={error} />}
      <Form onSubmit={loginHandler}>
        <FormGroup controlId="email">
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <Button type="submit" variant="primary" className="mt-3">
          Login
        </Button>

        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Now !</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Login;
