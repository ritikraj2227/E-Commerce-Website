import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary";
import { SAVE_SHIPPING_ADDRESS } from "../../redux/slice/checkoutSlice";


const CheckoutDetails = () => {
    

    const initialAddressState = {
        name: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        phone: "",
    };
	const [shippingAddress, setShippingAddress] = useState({
		...initialAddressState,
	});
	

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleShipping = (e) => {
		const { name, value } = e.target;
		setShippingAddress({
			...shippingAddress,
			[name]: value,
		});
	};

	

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
		navigate("/checkout");
	};

	return (
		<section>
			<div className="container checkout">
				<h2>Checkout Details</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<div className="card">
							<h3>Shipping Address</h3>
							<label>Recipient Name</label>
							<input
								type="text"
								placeholder="Recipient Name"
								required
								name="name"
								value={shippingAddress.name}
								onChange={(e) => handleShipping(e)}
							/>
							<label>Address line 1</label>
							<input
								type="text"
								placeholder="Address line 1"
								required
								name="line1"
								value={shippingAddress.line1}
								onChange={(e) => handleShipping(e)}
							/>
							<label>Address line 2</label>
							<input
								type="text"
								placeholder="Address line 2"
								name="line2"
								value={shippingAddress.line2}
								onChange={(e) => handleShipping(e)}
							/>
							<label>City</label>
							<input
								type="text"
								placeholder="City"
								required
								name="city"
								value={shippingAddress.city}
								onChange={(e) => handleShipping(e)}
							/>
							<label>State</label>
							<input
								type="text"
								placeholder="State"
								required
								name="state"
								value={shippingAddress.state}
								onChange={(e) => handleShipping(e)}
							/>
							<label>Postal code</label>
							<input
								type="text"
								placeholder="Postal code"
								required
								name="postal_code"
								value={shippingAddress.postal_code}
								onChange={(e) => handleShipping(e)}
							/>
							{/* COUNTRY INPUT */}
							<CountryDropdown
								className="select"
								valueType="short"
								value={shippingAddress.country}
								onChange={(val) =>
									handleShipping({
										target: {
											name: "country",
											value: val,
										},
									})
								}
							/>
							<label>Phone</label>
							<input
								type="text"
								placeholder="Phone"
								required
								name="phone"
								value={shippingAddress.phone}
								onChange={(e) => handleShipping(e)}
							/>
						<button
							type="submit"
							className="--btn --btn-primary">
							Proceed To Checkout
						</button>
						
						</div>

					</div>
					<div>
						<div className="card">
							<CheckoutSummary />
						</div>
					</div>
				</form>
			</div>
		</section>
	);
};

export default CheckoutDetails;
