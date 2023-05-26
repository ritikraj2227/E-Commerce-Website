import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  fetchFirestoreDataOrder } from "../../redux/slice/orderSlice";
import { selectUserID } from "../../redux/slice/authSlice";

const OrderHistory = () => {
	const orders = useSelector((state) => state.orders.orders);
	const userID = useSelector(selectUserID);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchFirestoreDataOrder());
	}, [dispatch]);

	const handleClick = (id) => {
		navigate(`/order-details/${id}`);
	};

	const filteredOrders = orders.filter((order) => order.userID === userID);

	return (
		<section style={{marginTop:'10rem'}}>
			<div className='container order'>
				<h2>Your Order History</h2>
			
				<br />
				<>
					<div className='table'>
						{filteredOrders.length === 0 ? (
							<p>No order found</p>
						) : (
							<table>
								<thead>
									<tr>
										<th>s/n</th>
										<th>Date</th>
										<th>Order ID</th>
										<th>Order Amount</th>
										<th>Order Status</th>
									</tr>
								</thead>
								<tbody>
									{filteredOrders.map((order, index) => {
										const { id, orderDate, orderTime, orderAmount, orderStatus } = order;
										return (
											<tr
												key={id}
												onClick={() => handleClick(id)}>
												<td>{index + 1}</td>
												<td>
													{orderDate} at {orderTime}
												</td>
												<td>{id}</td>
												<td>
													{"$"}
													{orderAmount}
												</td>
												<td>
													<p className={orderStatus !== "Delivered" ? 'pending' : 'delivered'}>{orderStatus}</p>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						)}
					</div>
				</>
			</div>
		</section>
	);
};

export default OrderHistory;
