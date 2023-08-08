import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Pagenotfound from "./pages/Pagenotfound";
import Contact from "./pages/Contact";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Spinner from "./component/Spinner";
import Dashboard from "./pages/protectedPage/user/Dashboard";
import Private from "./component/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoutes from "./component/Routes/AdminRoutes";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import User from "./pages/Admin/User";
import Profile from "./pages/protectedPage/user/Profile";
import Order from "./pages/protectedPage/user/Order";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard />}></Route>
          <Route path="user/order" element={<Order />}></Route>
          <Route path="user/profile" element={<Profile />}></Route>
        </Route>
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route
            path="admin/create-category"
            element={<CreateCategory />}
          ></Route>
          <Route
            path="admin/create-product"
            element={<CreateProduct />}
          ></Route>
          <Route path="admin/products" element={<Products />}></Route>
          <Route path="admin/product/:slug" element={<UpdateProduct />}></Route>
          <Route path="admin/user" element={<User />}></Route>
        </Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/spinner" element={<Spinner />}></Route>
        <Route path="*" element={<Pagenotfound />}></Route>
      </Routes>
    </>
  );
}

export default App;
