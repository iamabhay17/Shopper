import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { listMyOrders } from "../store/action/orderAction";
import { getUserDetails, updateUserDetails } from "../store/action/userAction";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const myOrderlist = useSelector((state) => state.myOrderlist);
  const { loading: loadingOrders, error: errorOrders, orders } = myOrderlist;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  const registerHandler = (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      //dispatch
      dispatch(updateUserDetails({ id: user._id, name, email, password }));
    } else {
      setMsg("Passwords does not match");
    }
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user.name, user.email]);

  return (
    <Row>
      <Col md={4}>
        <h3>Update Account</h3>
        {loading && <ThreeDots color="#00BFFF" height={80} width={80} />}
        {error && <Message variant="danger" message={error} />}
        {success && (
          <Message variant="success" message={"Updated Successfully"} />
        )}
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
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h3>MY ORDERS</h3>
        {loadingOrders ? (
          <ThreeDots />
        ) : errorOrders ? (
          <Message variant={"danger"} message={error} />
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <div style={{ color: "green" }}>Yes</div>
                    ) : (
                      <div style={{ color: "red" }}>No</div>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <div style={{ color: "green" }}>Yes</div>
                    ) : (
                      <div style={{ color: "red" }}>No</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
