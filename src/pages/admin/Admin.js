import React from "react";
import { Route, Routes } from "react-router-dom";
import ViewProducts from "../../components/Admin/ViewProducts";
import AddProduct from "../../components/Admin/AddProduct";
import Sidebar from "../../components/Admin/Sidebar";
import EditProduct from "../../components/Admin/EditProduct";
import Orders from "../../components/Admin/Orders";
import ViewOrder from "../../components/Admin/ViewOrder";
import OrderDetails from "../../components/Admin/OrderDetails";


const Admin = () => {
	return (
		<div className="admin">
			<div className="sidebar">
				<Sidebar />
			</div>
			<div className="admin-content">
				<Routes>
					<Route
						path="all-products"
						element={<ViewProducts />}
					/>
					<Route
						path="addproduct"
						element={<AddProduct />}
					/>
					<Route
						path="editproduct/:id"
						element={<EditProduct />}
					/>

					<Route
						path="orders"
						element={<Orders />}
					/>
					<Route
						path="vieworder"
						element={<ViewOrder />}
					/>
					<Route
						path="order-details/:id"
						element={<OrderDetails />}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default Admin;
