import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { register } from "../store/action/userAction";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const registerHandler = (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      dispatch(register(name, email, password));
    } else {
      setMsg("Passwords does not match");
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <FormContainer>
      <h1>Register New Account</h1>
      {loading && <ThreeDots color="#00BFFF" height={80} width={80} />}
      {error && <Message variant="danger" message={error} />}
      {msg && <Message variant="danger" message={msg} />}
      <Form onSubmit={registerHandler}>
        <FormGroup controlId="username" className="mb-3">
          <FormLabel>Username</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="email" className="mb-3">
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type="email"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" className="mb-3">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" className="mb-3">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>

        <Button type="submit" variant="primary" className="mt-3">
          Signup
        </Button>

        <Row className="py-3">
          <Col>
            Already a Customer ? <Link to="/login">Login Now !</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Register;
