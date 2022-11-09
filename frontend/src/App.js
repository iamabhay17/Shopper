import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import UserList from "./pages/UserList";
import UserEdit from "./pages/UserEdit";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import OrderList from "./pages/OrderList";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container my-3">
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/productlist" element={<ProductList />} />
          <Route path="/admin/user/:id/edit" element={<UserEdit />} />
          <Route path="/admin/products/:id/edit" element={<ProductEdit />} />
          <Route path="/admin/orderslist" element={<OrderList />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
