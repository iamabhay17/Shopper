import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const { data } = await axios.get(
      "https://shopper-wmd5.onrender.com/api/products"
    );

    dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_LIST_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//single product action

export const listProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    const { data } = await axios.get(
      `https://shopper-wmd5.onrender.com/api/products/${id}`
    );

    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAILS_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//delete product

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_DELETE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `https://shopper-wmd5.onrender.com/api/products/${id}`,
      config
    );

    dispatch({ type: "PRODUCT_DELETE_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DELETE_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//create product
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_CREATE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `https://shopper-wmd5.onrender.com/api/products/`,
      {},
      config
    );

    dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_CREATE_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_UPDATE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `https://shopper-wmd5.onrender.com/api/products/${product._id}`,
      product,
      config
    );

    dispatch({ type: "PRODUCT_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_UPDATE_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
