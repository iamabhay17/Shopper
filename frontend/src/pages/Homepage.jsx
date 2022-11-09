import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/action/productsAction";
import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import Message from "../components/Message";

const Homepage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  const productList = useSelector((state) => state.productList);

  const { products, error, loading } = productList;

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
          <h3>latest products</h3>
          <Row>
            {products && products.length
              ? products.map((product) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <ProductCard product={product} />
                  </Col>
                ))
              : null}
          </Row>
        </div>
      )}
    </>
  );
};

export default Homepage;
