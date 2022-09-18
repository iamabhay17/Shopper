import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: "ADD_TO_CART",
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//shipping address

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: "SAVE_SHIPPING_ADDRESS",
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

//payment method

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: "SAVE_PAYMENT_METHOD",
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
