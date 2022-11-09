import axios from "axios";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "https://shopper-wmd5.onrender.com/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//logout

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
  dispatch({ type: "USER_LIST_RESET" });
  dispatch({ type: "USER_DETAILS_RESET" });
  dispatch({ type: "MY_ORDER_LIST_RESET" });
};

//register

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_REGISTER_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "https://shopper-wmd5.onrender.com/api/users/register",
      { email, password, name },
      config
    );

    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data,
    });
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//details

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DETAILS_REQUEST",
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
    const { data } = await axios.get(
      `https://shopper-wmd5.onrender.com/api/users/${id}`,
      config
    );

    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_DETAILS_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update details

export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_REQUEST",
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
      `https://shopper-wmd5.onrender.com/api/users/profile`,
      user,
      config
    );

    dispatch({
      type: "USER_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//LIST USERS

export const listUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_LIST_REQUEST",
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
      `https://shopper-wmd5.onrender.com/api/users/`,
      config
    );

    dispatch({
      type: "USER_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_LIST_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//delete user

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DELETE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(
      `https://shopper-wmd5.onrender.com/api/users/${id}`,
      config
    );

    dispatch({
      type: "USER_DELETE_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "USER_DELETE_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//updateuser//admin

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_ADMIN_UPDATE_REQUEST",
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
      `https://shopper-wmd5.onrender.com/api/users/${user._id}`,
      user,
      config
    );

    dispatch({
      type: "USER_ADMIN_UPDATE_SUCCESS",
    });
    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_ADMIN_UPDATE_FAILURE",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
