import React, { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../Firebase";

const AddProduct = () => {
	const [productName, setProductName] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productDesc, setProductDesc] = useState("");
	const [productBrand, setProductBrand] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [file, setFile] = useState("");
	const [imgUrl, setImgUrl] = useState("");

	const navigate = useNavigate();

	const categories = [
		{ id: 1, name: "Laptop" },
		{ id: 2, name: "Electronics" },
		{ id: 3, name: "Fashion" },
		{ id: 4, name: "Phone" },
	];

	useEffect(() => {
		const uploadimg = () => {
			const name = `eCommerce/${Date.now()}${file.name}`;
			const storageRef = ref(storage, name);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(progress);
				},
				(error) => {
					toast.error(error.message);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						toast.success("Image uploaded successfully.");
						setImgUrl(downloadURL);
					});
				}
			);
		};

		file && uploadimg();
	}, [file]);

	const addProduct = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collection(db , "products"), {
				name: productName,
				imageURL: imgUrl,
				price: Number(productPrice),
				category: productCategory,
				brand: productBrand,
				desc: productDesc,
				createdAt: Timestamp.now().toDate(),
			});

			toast.success("Product uploaded successfully.");
			navigate("/admin/all-products");
		} catch (err) {
			toast.error(err.message);
			console.log(err.message);
		}
	};

	return (
		<div className="product">
			<h2>Add New Product</h2>
			<div className="card">
				<form onSubmit={addProduct}>
					<label>Product name:</label>
					<input
						type="text"
						placeholder="Product Name"
						required
						name="name"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
					/>

					<label>Product image:</label>
					<div className="group card">
						<input
							type="file"
							accept="image/*"
							placeholder="Product Image"
							name="image"
							onChange={(e) => setFile(e.target.files[0])}
							required
						/>
					</div>

					<label>Product price:</label>
					<input
						type="number"
						placeholder="Product Price"
						name="price"
						required
						onChange={(e) => setProductPrice(e.target.value)}
						value={productPrice}
					/>
					<label>Product Category:</label>
					<select
						required
						name="category"
						value={productCategory}
						onChange={(e) => setProductCategory(e.target.value)}>
						<option value="">-- Choose Product Category --</option>
						{categories.map((cat) => {
							return (
								<option
									key={cat.id}
									value={cat.name}>
									{cat.name}
								</option>
							);
						})}
					</select>

					<label>Product Company/Brand:</label>
					<input
						type="text"
						placeholder="Product Brand"
						name="brand"
						value={productBrand}
						onChange={(e) => setProductBrand(e.target.value)}
						required
					/>

					<label>Product Description</label>
					<textarea
						name="desc"
						required
						cols="30"
						rows="10"
						placeholder="Add Product Description"
						value={productDesc}
						onChange={(e) => setProductDesc(e.target.value)}></textarea>

					<button
						className="--btn --btn-primary"
						type="submit">
						Add Product
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddProduct;
