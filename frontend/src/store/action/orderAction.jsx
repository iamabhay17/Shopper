import axios from "axios";

//create Order

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_CREATE_REQUEST",
    });

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
      `https://shopper-api.vercel.app/api/orders`,
      order,
      config
    );

    dispatch({
      type: "ORDER_CREATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_CREATE_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get order by ID

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_DETAILS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `https://shopper-api.vercel.app/api/orders/${id}`,
      config
    );

    dispatch({
      type: "ORDER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//payment

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_PAY_REQUEST",
    });

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
      `https://shopper-api.vercel.app/api/orders/${id}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: "ORDER_PAY_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_PAY_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//my orders

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "MY_ORDER_LIST_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `https://shopper-api.vercel.app/api/orders/myorders`,
      config
    );

    dispatch({
      type: "MY_ORDER_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "MY_ORDER_LIST_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//all orders

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_LIST_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `https://shopper-api.vercel.app/api/orders/`,
      config
    );

    dispatch({
      type: "ORDER_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_LIST_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//deliverOrder

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_DELIVERED_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(
      `https://shopper-api.vercel.app/api/orders/${order._id}/deliver`,
      config
    );

    dispatch({
      type: "ORDER_DELIVERED_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "ORDER_DELIVERED_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
