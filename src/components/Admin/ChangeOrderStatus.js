import {  doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../Firebase";

const ChangeOrderStatus = ({ order, id }) => {
	const [status, setStatus] = useState("");
	const navigate = useNavigate();

	const editOrder = (e, id) => {
		e.preventDefault();

		const orderConfig = {
			userID: order.userID,
			userEmail: order.userEmail,
			orderDate: order.orderDate,
			orderTime: order.orderTime,
			orderAmount: order.orderAmount,
			orderStatus: status,
			cartItems: order.cartItems,
			shippingAddress: order.shippingAddress,
			createdAt: order.createdAt,
			editedAt: Timestamp.now().toDate(),
		};
		try {
			setDoc(doc(db, "orders", id), orderConfig);

			toast.success("Order status changes successfully");
			navigate("/admin/vieworder");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>

			<div className='status'>
				<div className="card"  >
					<h4>Update Status</h4>
					<form onSubmit={(e) => editOrder(e, id)}>
						<span>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}>
								<option
									value=""
									disabled>
									-- Choose one --
								</option>
								<option value="Order Placed...">Order Placed...</option>
								<option value="Processing...">Processing...</option>
								<option value="Shipped...">Shipped...</option>
								<option value="Delivered">Delivered</option>
							</select>
						</span>
						<span>
							<button
								type="submit"
								className="--btn --btn-primary">
								Update Status
							</button>
						</span>
					</form>
				</div>
			</div>
		</>
	);
};

export default ChangeOrderStatus;
