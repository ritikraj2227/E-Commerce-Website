import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../Firebase";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const EditProduct = () => {
	const { id } = useParams();
	const [productName, setProductName] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productDesc, setProductDesc] = useState("");
	const [productBrand, setProductBrand] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [createdAt, setCreatedAt] = useState("");
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
		const fetchData = async () => {
			const docRef = doc(db, "products", id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setProductName(docSnap.data().name);
				setProductBrand(docSnap.data().price);
				setProductCategory(docSnap.data().category);
				setProductDesc(docSnap.data().desc);
				setProductPrice(docSnap.data().price);
				setImgUrl(docSnap.data().imageURL);
				setCreatedAt(docSnap.data().createdAt);
			} else {
				toast.error("No such Data Found!");
			}
		};

		fetchData();

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
	}, [file, id]);

	const editProduct = async (e) => {
		e.preventDefault();
		try {
			await setDoc(doc(db, "products", id), {
				name: productName,
				imageURL: imgUrl,
				price: Number(productPrice),
				category: productCategory,
				brand: productBrand,
				desc: productDesc,
				createdAt: createdAt,
				updatedAt: Timestamp.now().toDate(),
			});

			toast.success("Product Edited successfully.");
			navigate("/admin/all-products");
		} catch (err) {
			toast.error(err.message);
			console.log(err.message);
		}
	};

	return (
		<div className="product">
			<h2>Edit Product</h2>
			<div className="card">
				<form onSubmit={editProduct}>
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
						<img
							src={imgUrl}
							alt={productName}
							style={{ width: "100px" }}
						/>
						<input
							type="file"
							accept="image/*"
							placeholder="Product Image"
							name="image"
							onChange={(e) => setFile(e.target.files[0])}
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
						Edit Product
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProduct;
