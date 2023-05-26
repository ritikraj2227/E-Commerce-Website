import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY  } from "../../../redux/slice/cartSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
import { toast } from "react-toastify";

const ProductDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [product, setProduct] = useState({});


	useEffect(() => {
		const fetchData = async () => {
			const docRef = doc(db, "products", id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setProduct(docSnap.data());
			} else {
				toast.error("No such Data Found!");
			}
		};
		fetchData();
	}, [id]);

	const addToCart = (product) => {
		dispatch(ADD_TO_CART(product));
		dispatch(CALCULATE_TOTAL_QUANTITY());
	};



	return (
		<section style={{ marginTop: "10rem" }}>
			<div className="container product">
				<h2>Product Details</h2>
				<div>
					<Link to="/">&larr; Back To Products</Link>
				</div>

				<div className="product-details">
					<div className="img">
						<img
							src={product.imageURL}
							alt={product.name}
						/>
					</div>
					<div className="product-content">
						<h3>{product.name}</h3>
						<p className="price">{`$${product.price}`}</p>
						<p>{product.desc}</p>
						<p>
							<b>SKU</b> {id}
						</p>
						<p>
							<b>Brand</b> {product.brand}
						</p>

						
						<button
							className="--btn --btn-danger"
							onClick={() => addToCart(product)}>
							ADD TO CART
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
