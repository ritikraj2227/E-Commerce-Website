import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Contact from "./pages/contactUs/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import NotFound from "./pages/notfound/NotFound";

import Admin from "./pages/admin/Admin";

import { useSelector } from "react-redux";
import Cart from "./pages/cart/Cart";
import ProductDetails from "./components/product/product-details/ProductDetails";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import { selectEmail } from "./redux/slice/authSlice";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";

const AdminOnlyRoute = ({ children }) => {
	const userEmail = useSelector(selectEmail);

	if (userEmail === "admin@gmail.com") {
		return children;
	}
	return (
		<section style={{ height: "87vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
			<div className="container">
				<h2>Permission Denied.</h2>
				<p>This page can only be view by an Admin user.</p>
				<br />
				<Link to="/">
					<button className="--btn --btn-primary">&larr; Back To Home</button>
				</Link>
			</div>
		</section>
	);
};

function App() {
	return (
		<>
			<BrowserRouter>
				<ToastContainer />
				<Header />

				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>

					<Route
						path="/contact"
						element={<Contact />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/register"
						element={<Register />}
					/>

					<Route
						path="/admin/*"
						element={
							<AdminOnlyRoute>
								<Admin />
							</AdminOnlyRoute>
						}
					/>

					<Route
						path="/register"
						element={<Register />}
					/>

					<Route
						path="/product-details/:id"
						element={<ProductDetails />}
					/>
					<Route
						path="/checkout-details"
						element={<CheckoutDetails />}
					/>
					<Route
						path="/checkout"
						element={<Checkout />}
					/>
					<Route
						path="/checkout-success"
						element={<CheckoutSuccess />}
					/>
					<Route
						path="/order-history"
						element={<OrderHistory />}
					/>
					<Route
						path="/order-details/:id"
						element={<OrderDetails />}
					/>
					<Route
						path="/cart"
						element={<Cart />}
					/>

					<Route
						path="*"
						element={<NotFound />}
					/>
				</Routes>

				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
