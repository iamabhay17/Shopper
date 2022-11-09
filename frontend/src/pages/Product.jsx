import React from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Rating from "../components/Rating";
import { listProductDetail } from "../store/action/productsAction";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import Message from "../components/Message";
import { useState } from "react";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(listProductDetail(params.id));
  }, [dispatch, params.id]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  const productDetails = useSelector((state) => state.productDetails);

  const { product, error, loading } = productDetails;

  return (
    <>
      {loading ? (
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
        <div>
          <Link to="/" className="btn">
            Go Back
          </Link>
          <Row className="mt-3">
            <Col md={6}>
              <Image src={product.image} alt="image" fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    rating={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price : ${product.price}</ListGroupItem>
                <ListGroupItem>
                  Description : {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3}>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col>Price :</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty :</Col>
                      <Col>
                        <FormControl
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((n) => (
                            <option key={n + 1} value={n + 1}>
                              {" "}
                              {n + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem>
                  <Button
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Product;
