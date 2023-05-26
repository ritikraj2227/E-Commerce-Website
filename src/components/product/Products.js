import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirestoreData, filterByCategory, searchByName } from "../../redux/slice/productSlice";
import { BsFillGridFill } from "react-icons/bs";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";

const Products = () => {
	const { filteredProducts, categories } = useSelector((state) => state.product);

	const dispatch = useDispatch();

	const addToCart = (product) => {
		dispatch(ADD_TO_CART(product));
		dispatch(CALCULATE_TOTAL_QUANTITY());
	};

	useEffect(() => {
		dispatch(fetchFirestoreData());
	}, [dispatch]);

	const handleCategoryFilter = (category) => {
		dispatch(filterByCategory(category));
	};

	const handleNameSearch = (search) => {
		dispatch(searchByName(search));
	};

	return (
		<>
			<div className="filter">
				<div className="cate">
					<BsFillGridFill
						size={22}
						color="orangered"
					/>
					<p>
						<b>{filteredProducts.length}</b> Products found.
					</p>
				</div>
				<div className="cate">
					<label htmlFor="category">category:</label>
					<select
						id="category"
						onChange={(e) => handleCategoryFilter(e.target.value)}>
						{categories.map((cat, index) => {
							return (
								<option
									value={cat}
									key={index}>
									{cat}
								</option>
							);
						})}
					</select>
				</div>
				<div>
					<input
						type="text"
						id="search"
						placeholder="Search A Product"
						onChange={(e) => handleNameSearch(e.target.value)}
					/>
				</div>
			</div>

			<div
				className="product-container"
				id="product">
				{filteredProducts.map((product) => {
					const { id, name, price, imageURL } = product;

					return (
						<div
							className="product"
							key={id}>
							<Link to={`/product-details/${id}`}>
								<img
									src={imageURL}
									alt={name}
								/>
							</Link>

							<p className="heading">{name}</p>
							<div className="priceBtn">
								<p className="price">{`$${price}`}</p>
								<button onClick={() => addToCart(product)}>Add To Cart</button>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Products;
