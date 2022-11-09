import React from "react";
import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../store/action/cartAction";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postal, setPostal] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postal, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1={true} step2={true} />
      <h3>Shipping Address</h3>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="address" className="mb-3">
          <FormLabel>Address</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="city" className="mb-3">
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="postalCode" className="mb-3">
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your postal Code"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="country" className="mb-3">
          <FormLabel>Country</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
