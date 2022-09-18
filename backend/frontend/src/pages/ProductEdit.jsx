import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import {
  listProductDetail,
  updateProduct,
} from "../store/action/productsAction";

const ProductEdit = () => {
  const params = useParams();
  const productId = params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = productUpdate;

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        image,
        countInStock,
        category,
        description,
      })
    );
  };
  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: "PRODUCT_UPDATE_RESET" });
      navigate("/admin/productList");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetail(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setDescription(product.description);
      }
    }
  }, [product, dispatch, productId, updateSuccess, navigate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/upload/",
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Go back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {updateError && <Message variant={"danger"} message={error} />}
        {updateLoading && <ThreeDots />}
        {loading ? (
          <ThreeDots />
        ) : error ? (
          <Message variant={"danger"} message={error} />
        ) : (
          <Form onSubmit={updateHandler}>
            <FormGroup controlId="name" className="mb-3">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="price" className="mb-3">
              <FormLabel>Price</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter PRice"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="brand" className="mb-3">
              <FormLabel>Brand</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="category" className="mb-3">
              <FormLabel>Category</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="image" className="mb-3">
              <FormLabel>Image</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Price"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                id="image-file"
                type="file"
                label="Choose file"
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <ThreeDots />}
            </FormGroup>
            <FormGroup controlId="countinstock" className="mb-3">
              <FormLabel>Count in Stock</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter Count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="description" className="mb-3">
              <FormLabel>Description</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEdit;
