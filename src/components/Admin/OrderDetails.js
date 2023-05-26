import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirestoreDataOrder } from "../../redux/slice/orderSlice";
import ChangeOrderStatus from "./ChangeOrderStatus";

const OrderDetails = () => {
	const orders = useSelector((state) => state.orders.orders);
	const { id } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchFirestoreDataOrder());
	}, [dispatch]);

	const Order = orders.filter((order) => order.id === id);

	return (
		<>
			<div className='table'>
				<h2>Order Details</h2>
				<div>
					<Link to="/admin/orders">&larr; Back To Orders</Link>
				</div>
				<br />
				{Order === null ? (
					<p>No Order Found</p>
				) : (
					<>
						<p>
							<b>Order ID</b> {Order[0].id}
						</p>
						<p>
							<b>Order Amount</b> ${Order[0].orderAmount}
						</p>
						<p>
							<b>Order Status</b> {Order[0].orderStatus}
						</p>
						<p>
							<b>Shipping Address</b>
							<br />
							Address: {Order[0].shippingAddress.line1},{Order[0].shippingAddress.line2}, {Order[0].shippingAddress.city}
							<br />
							State: {Order[0].shippingAddress.state}
							<br />
							Country: {Order[0].shippingAddress.country}
						</p>
						<br />
						<table>
							<thead>
								<tr>
									<th>s/n</th>
									<th>Product</th>
									<th>Price</th>
									<th>Quantity</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{Order[0].cartItems.map((cart, index) => {
									const { id, name, price, imageURL, cartQuantity } = cart;
									return (
										<tr key={id}>
											<td>
												<b>{index + 1}</b>
											</td>
											<td>
												<p>
													<b>{name}</b>
												</p>
												<img
													src={imageURL}
													alt={name}
													style={{ width: "100px" }}
												/>
											</td>
											<td>{price}</td>
											<td>{cartQuantity}</td>
											<td>{(price * cartQuantity).toFixed(2)}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</>
				)}
				<ChangeOrderStatus
					order={Order[0]}
					id={id}
				/>
			</div>
		</>
	);
};

export default OrderDetails;
