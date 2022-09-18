import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../store/action/productsAction";
import Message from "../components/Message";
import { Button, Row, Table, Col } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: "PRODUCT_CREATE_RESET" });

    if (!userInfo.isAdmin) {
      navigate("/");
    }

    if (createSuccess) {
      navigate(`/admin/products/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    deleteSuccess,
    createSuccess,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure ? ")) {
      //delete
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="text-right">
          <Button className="m-3" onClick={createProductHandler}>
            Add Product
          </Button>
        </Col>
      </Row>

      {deleteLoading && <ThreeDots />}
      {deleteError && <Message variant={"danger"} message={error} />}

      {createLoading && <ThreeDots />}
      {createError && <Message variant={"danger"} message={error} />}
      {loading ? (
        <ThreeDots />
      ) : error ? (
        <Message variant={"danger"} message={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FiEdit style={{ fontSize: "1.2rem" }} />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="dark"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <AiOutlineDelete style={{ fontSize: "1.2rem" }} />
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

export default ProductList;
