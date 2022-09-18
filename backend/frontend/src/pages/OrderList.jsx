import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { listOrders } from "../store/action/orderAction";
import Message from "../components/Message";
import { Button, Row, Table, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: "ORDER_LIST_RESET" });
    if (userInfo.isAdmin) {
      dispatch(listOrders());
    }
  }, [dispatch, userInfo.isAdmin]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h3>Orders</h3>
        </Col>
      </Row>

      {loading && <ThreeDots />}
      {error && <Message variant={"danger"} message={error} />}
      {loading ? (
        <ThreeDots />
      ) : error ? (
        <Message variant={"danger"} message={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tax</th>
              <th>Shipping</th>
              <th>Total</th>
              <th>Method</th>
              <th>Paid</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.taxPrice}</td>
                <td>{order.shippingPrice}</td>
                <td>{order.totalPrice}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.isPaid ? "Yes" : "No"}</td>
                <td>
                  <Button
                    variant="dark"
                    className="btn-sm"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderList;
