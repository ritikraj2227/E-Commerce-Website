import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchFirestoreDataOrder } from "../../redux/slice/orderSlice";

const OrderDetails = () => {
	const orders = useSelector((state) => state.orders.orders);
	const { id } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchFirestoreDataOrder());
	}, [dispatch]);

	const Order = orders.filter((order) => order.id === id);

	return (
		<section style={{ marginTop: "10rem" }}>
			<div className="container table">
				<h2>Order Details</h2>
				<div>
					<Link to="/order-history">&larr; Back To Orders</Link>
				</div>
				<br />
				{Order[0] === null ? (
					<p>No Order Available</p>
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
			</div>
		</section>
	);
};

export default OrderDetails;
