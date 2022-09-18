import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Message from "../components/Message";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../store/action/orderAction";

const Order = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const [sdkReady, setSdkReady] = useState(false);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const orderId = params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(
        "http://localhost:5000/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: "ORDER_PAY_RESET" });
      dispatch({ type: "ORDER_DELIVERED_RESET" });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay, successDeliver]);

  return loading ? (
    <div
      style={{
        height: "75vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThreeDots color="#00BFFF" height={80} width={80} />
    </div>
  ) : error ? (
    <Message variant={"danger"} message={error} />
  ) : (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Name : </strong> {order.user.name}
              </p>
              <p>
                <strong>Email : </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address : </strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>
                <strong>Method : </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant={"success"} message={"Order is paid"} />
              ) : (
                <Message variant={"danger"} message={"Order payment is due"} />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.isDelivered ? (
                <Message variant={"success"} message={"Order is delivered"} />
              ) : (
                <Message variant={"danger"} message={"Order not delivered"} />
              )}
              {order.orderItems.length === 0 ? (
                <Message variant={"danger"} message={"Your Cart is Empty"} />
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            rounded
                            fluid
                          />
                        </Col>
                        <Col md={4}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {" "}
                          {item.qty} x ${item.price}={item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>Order Summary</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>OrderId:</Col>
                  <Col>{order._id}</Col>
                </Row>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax Price:</Col>
                  <Col>{order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>{order.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <ThreeDots />}
                  {!sdkReady ? (
                    <ThreeDots />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroupItem>
              )}

              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroupItem>
                  {loadingDeliver && <ThreeDots />}
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark as delivered
                  </Button>
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Order;
