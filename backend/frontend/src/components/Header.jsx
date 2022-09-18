import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/action/userAction";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
  };
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>Shopper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Dashboard">
                <NavDropdown.Item>
                  <Link to="/admin/userlist">Users</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/admin/productlist">Products</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/admin/orderslist">Orders</Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link onClick={() => navigate("/cart")}>
              <AiOutlineShoppingCart className="icon" />
              Cart
            </Nav.Link>

            {userInfo ? (
              <NavDropdown title={userInfo.name}>
                <NavDropdown.Item>
                  <Link to="/profile">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link onClick={() => navigate("/login")}>
                <AiOutlineUser className="icon" />
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
