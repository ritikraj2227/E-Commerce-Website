import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount } from "../../redux/slice/cartSlice";
import { selectEmail } from "../../redux/slice/authSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe("pk_test_51MtPOLSIN0ds0Lr7fXRNaZKIfLoR2osrVLRn7U05936UoOr9dt8OKq4mO3Ml7QUNk6cn0yQgg3KfWmQxbf2Sh4Jr00jknyYp7C");

const Checkout = () => {
	const [message, setMessage] = useState("Initializing checkout...");
	const [clientSecret, setClientSecret] = useState("");

	const cartItems = useSelector(selectCartItems);
	const totalAmount = useSelector(selectCartTotalAmount);
	const customerEmail = useSelector(selectEmail);

	const shippingAddress = useSelector(selectShippingAddress);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(CALCULATE_SUBTOTAL());
		dispatch(CALCULATE_TOTAL_QUANTITY());
	}, [dispatch, cartItems]);

	const description = `eShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;

	useEffect(() => {
		
		fetch("http://localhost:4242/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				items: cartItems,
				userEmail: customerEmail,
				shipping: shippingAddress,
				billing: shippingAddress,
				description,
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return res.json().then((json) => Promise.reject(json));
			})
			.then((data) => {
				setClientSecret(data.clientSecret);
			})
			.catch((error) => {
				setMessage("Failed to initialize checkout");
				toast.error("Something went wrong!!!");
			});
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<>
			<section>
				<div className="container">{!clientSecret && <h3>{message}</h3>}</div>
			</section>
			{clientSecret && (
				<Elements
					options={options}
					stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</>
	);
};

export default Checkout;
