import React from "react";
import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Col,
  Image,
  ListGroup,
  Row,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../store/action/cartAction";

const Cart = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const productID = params.id;
  const navigate = useNavigate();
  const qty = location.search ? location.search.split("=")[1] : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHandler = (id) => {
    navigate(`/login?redirect=shipping`);
  };

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  const handleRemoveProduct = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div>
      <Row>
        <Col md={8}>
          <h4 className="p-3">Shopping Cart</h4>
          {cartItems.length === 0 ? (
            <Message message={"Cart is empty"} />
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} rounded fluid />
                    </Col>
                    <Col md={4}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={2}>
                      <FormControl
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((n) => (
                          <option key={n + 1} value={n + 1}>
                            {" "}
                            {n + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => handleRemoveProduct(item.product)}
                      >
                        <AiOutlineDelete /> Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4} className="p-3">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>
                  Sub Total :{" "}
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}{" "}
                  items
                </h4>
                Total Price :{" "}
                {cartItems
                  .reduce(
                    (acc, item) => acc + Number(item.qty) * Number(item.price),
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
