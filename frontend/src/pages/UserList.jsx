import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { deleteUser, listUser } from "../store/action/userAction";
import Message from "../components/Message";
import { Button, Table } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUser());
    } else {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure ? ")) {
      dispatch(deleteUser(id));
    }
  };

  console.log(users);

  return (
    <>
      <h3>Users</h3>
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
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <BsCheckLg style={{ color: "Green", fontSize: "1.2rem" }} />
                  ) : (
                    <ImCross style={{ color: "Red", fontSize: "1.2rem" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FiEdit style={{ fontSize: "1.2rem" }} />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="dark"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
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

export default UserList;
