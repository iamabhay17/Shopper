export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST": {
      return { loading: true };
    }
    case "ORDER_CREATE_SUCCESS": {
      return { loading: false, success: true, order: action.payload };
    }
    case "ORDER_CREATE_FAIL": {
      return { loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case "ORDER_DETAILS_REQUEST": {
      return { ...state, loading: true };
    }
    case "ORDER_DETAILS_SUCCESS": {
      return { loading: false, order: action.payload };
    }
    case "ORDER_DETAILS_FAILURE": {
      return { loading: false, error: action.payload };
    }
    case "ORDER_DETAILS_RESET": {
      return {};
    }
    default: {
      return state;
    }
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_PAY_REQUEST": {
      return { loading: true };
    }
    case "ORDER_PAY_SUCCESS": {
      return { loading: false, success: true };
    }
    case "ORDER_PAY_FAILURE": {
      return { loading: false, error: action.payload };
    }
    case "ORDER_PAY_RESET": {
      return {};
    }
    default: {
      return state;
    }
  }
};

export const myOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "MY_ORDER_LIST_REQUEST": {
      return { loading: true };
    }
    case "MY_ORDER_LIST_SUCCESS": {
      return { loading: false, orders: action.payload };
    }
    case "MY_ORDER_LIST_FAILURE": {
      return { loading: false, error: action.payload };
    }
    case "MY_ORDER_LIST_RESET": {
      return { orders: [] };
    }

    default: {
      return state;
    }
  }
};

//all orders

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ORDER_LIST_REQUEST": {
      return { loading: true };
    }
    case "ORDER_LIST_SUCCESS": {
      return { loading: false, orders: action.payload };
    }
    case "ORDER_LIST_FAILURE": {
      return { loading: false, error: action.payload };
    }
    case "ORDER_LIST_RESET": {
      return { orders: [] };
    }

    default: {
      return state;
    }
  }
};

//delivered

export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_DELIVERED_REQUEST": {
      return { loading: true };
    }
    case "ORDER_DELIVERED_SUCCESS": {
      return { loading: false, success: true };
    }
    case "ORDER_DELIVERED_FAILURE": {
      return { loading: false, error: action.payload };
    }
    case "ORDER_DELIVERED_RESET": {
      return {};
    }
    default: {
      return state;
    }
  }
};
