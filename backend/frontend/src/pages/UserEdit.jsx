import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormCheck,
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
import { getUserDetails, updateUser } from "../store/action/userAction";

const UserEdit = () => {
  const params = useParams();
  const userId = params.id;

  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userAdminUpdate = useSelector((state) => state.userAdminUpdate);

  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = userAdminUpdate;

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: "USER_ADMIN_UPDATE_RESET" });
      navigate("/admin/userList");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [
    userId,
    dispatch,
    user.email,
    user.name,
    user.isAdmin,
    user._id,
    navigate,
    updateSuccess,
  ]);

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {updateLoading && <ThreeDots />}
        {updateError && <Message variant={"danger"} message={error} />}
        {loading ? (
          <ThreeDots />
        ) : error ? (
          <Message variant={"danger"} message={error} />
        ) : (
          <Form onSubmit={updateHandler}>
            <FormGroup controlId="username" className="mb-3">
              <FormLabel>Username</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="email" className="mb-3">
              <FormLabel>Email Address</FormLabel>
              <FormControl
                type="email"
                placeholder="Enter your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="isadmin" className="mb-3">
              <FormCheck
                type="checkbox"
                label="Is Admin?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
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

export default UserEdit;
