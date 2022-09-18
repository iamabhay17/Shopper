export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST": {
      return { loading: true, ...state };
    }
    case "PRODUCT_LIST_SUCCESS": {
      return { loading: false, products: action.payload };
    }
    case "PRODUCT_LIST_FAILURE": {
      return { loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

//single product

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST": {
      return { loading: true, ...state };
    }
    case "PRODUCT_DETAILS_SUCCESS": {
      return { loading: false, product: action.payload };
    }
    case "PRODUCT_DETAILS_FAILURE": {
      return { loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

//delete product

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_DELETE_REQUEST": {
      return { loading: true };
    }
    case "PRODUCT_DELETE_SUCCESS": {
      return { loading: false, success: true };
    }
    case "PRODUCT_DELETE_FAILURE": {
      return { loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

//create product

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_CREATE_REQUEST": {
      return { loading: true };
    }
    case "PRODUCT_CREATE_SUCCESS": {
      return { loading: false, success: true, product: action.payload };
    }
    case "PRODUCT_CREATE_FAILURE": {
      return { loading: false, error: action.payload };
    }
    case "PRODUCT_CREATE_RESET": {
      return {};
    }
    default: {
      return state;
    }
  }
};

//update product

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "PRODUCT_UPDATE_REQUEST": {
      return { loading: true };
    }
    case "PRODUCT_UPDATE_SUCCESS": {
      return { loading: false, success: true, product: action.payload };
    }
    case "PRODUCT_UPDATE_FAILURE": {
      return { loading: false, error: action.payload };
    }
    case "PRODUCT_UPDATE_RESET": {
      return { product: {} };
    }
    default: {
      return state;
    }
  }
};
